---
title: "Architecture Overview"
description: "Technical architecture documentation for Concrete Earn V2 smart contracts, roles, modules, and operational design."
sidebar_label: "Architecture"
---

Concrete Earn V2 is built as four cooperating layers — a factory that deploys vaults, vaults that hold user deposits and account for value, strategies that route capital into yield venues, and hooks that gate behaviour at specific lifecycle points. This page explains how those pieces fit together and why the system is arranged this way.

## The Shape of the System

A Concrete vault is an ERC-4626 single-asset contract. Users deposit one asset, receive shares, and those shares track their proportional claim on everything the vault holds. The vault itself does not seek yield — it delegates that to strategies, adapters that move the underlying asset into lending markets, looping positions, custodied venues, or wherever the curator chooses. The vault's job is custody, accounting, and access control; everything else is an attached contract.

Three things sit around the vault:
- **The factory** deploys vaults and manages their upgrade paths.
- **Strategies** are bound to a single vault and execute the actual yield logic.
- **Hooks** are optional modules that run at deposit, withdraw, and strategy-change boundaries.

This separation is the central design choice. The vault is small and standard; variation between products — what venues to use, what restrictions to enforce, how withdrawals settle — lives in contracts the vault holds references to. A curator launching a new vault is composing modules, not forking a contract.

### The Factory

The factory is a UUPS-upgradeable contract that CREATE2-deploys vaults as ERC-1967 proxies, maintains a registry of approved implementations, and controls upgrade paths between versions.

Two properties matter:
- **Vault deployment is permissionless.** Anyone can call create() to spin up a new vault, choosing from the implementations the factory owner has approved. The factory is the immutable admin of every vault proxy — vault upgrade authority cannot be transferred off the factory short of upgrading the factory itself.
- **Implementations are curated.** Only approved (and not subsequently blocked) implementations can be deployed, and upgrades only succeed along migration paths the factory owner has explicitly enabled.

The result: curators get fast, permissionless launches against a known-good set of vault contracts, and the protocol can ship new vault types without forcing existing vaults to migrate.

A separate Periphery Factory deploys strategies and position helpers. Unlike the vault factory, it supports deregisterStrategy, which transfers proxy admin ownership to a new owner — meaning strategy custody can be handed to partners, while vault custody stays with Blueprint Finance.

### Vault Implementations

All vault behaviour starts from a single abstract base. The Standard implementation is the baseline; other implementations override specific functions to change one aspect of behaviour:
- **Standard** — the baseline ERC-4626 vault with strategy allocation.
- **Async** — overrides withdraw semantics with an epoch-based queue.
- **Predeposit** — adds a LayerZero-based cross-chain claim flow for assets pre-staked on a source chain before vault deployment on the target. The claim path bypasses the hook lifecycle, so curators using whitelist hooks on a predeposit vault need a separate gating mechanism for cross-chain claims.
- **Bridged Standard / Bridged Async** — add a single unbackedMint function for one-shot cross-chain migrations. Migration scaffolding rather than ongoing product variants.

Looping strategies and fee splitting are not vault implementations — looping is a strategy plugged into a Standard vault, and fee splitting lives in downstream contracts the vault mints to.

## The Vault: Custody, Shares, and Accounting

The vault is the share token. Depositing mints ERC-20 shares; redeeming burns them. Conversions between assets and shares use a cached `totalAssets` rather than a live read across strategies — this defends against donation/inflation attacks (the cache only updates through controlled paths) and keeps user gas flat regardless of how many strategies are attached.

Every user-facing economic operation — deposit, mint, withdraw, redeem, allocate — and every fee or oracle update is wrapped in a `withYieldAccrual` modifier. Before the operation runs, the vault polls each strategy's reported value, books the delta as yield or loss, accrues management and performance fees against the new state, and only then proceeds. Share prices users transact against always reflect the latest reconciled value. Pure book-keeping ops (strategy registry, hook updates, deallocation order, pause) skip the modifier because they don't move asset values.

### What happens when a strategy returns bad data

The vault treats whatever a strategy reports as ground truth — no on-vault delta threshold, no oracle cross-check, no safety flag. Safety rails live on the strategy side, and the distinction that matters is whether a strategy's value is fully on-chain or depends on an operator push:
- **Strategies with on-chain accounting** (e.g. a lending position) compute their value directly from on-chain state. No off-chain dependency.
- **Strategies with asynchronous accounting** (e.g. multisig-custodied positions) require an operator to push a signed value within a configured accountingValidityPeriod. If the push is late, the strategy's value function reverts — and totalAssets() reverts with it, halting deposits, withdrawals, and async epoch processing until an admin unpauses the strategy.

If your strategy mix includes asynchronous-accounting strategies, the vault has a hard off-chain dependency on operator availability. Pick your validity period accordingly.

### Strategies: Where the Yield Actually Happens

Strategies are adapters. Each is bound to a single vault, uses the same underlying asset, and implements the `IStrategyTemplate` interface — the vault only knows how to ask a strategy for its current value, push assets in, and pull assets out. New strategies plug in without changing the vault.

Strategies built against this interface include a simple idle strategy, a multisig strategy that forwards assets to a designated multisig with off-chain accounting reported back on-chain, and a looping strategy that runs flash-loan-driven leveraged positions composed from interchangeable lender, flash, and swap modules. New venues integrate by implementing the three module interfaces (around 25 functions total) — the looping strategy contract itself contains no protocol-specific code.

A vault can hold a conservative lending strategy alongside a leveraged looping strategy and a custodied multisig strategy at the same time. The **ALLOCATOR** role decides what proportion sits where, calling vault.allocate(...) with per-strategy instructions. Routing and sizing decisions are off-chain — the allocator's payload tells the vault exactly which strategy to move how much into. The vault enforces postconditions (idle balance covers queued async withdrawals, for example) but does not make policy decisions on-chain. From a user's perspective, the vault is one share token with one yield curve.

### Hooks: Customising Behaviour Without Forking

Hooks are optional modules that run at fixed lifecycle points: before and after each user operation. A vault stores at most one hook target plus a flag bitmap; the hook fires only when the relevant bit is set. Shipped hooks include a per-vault deposit cap hook and a whitelist hook that gates deposits to an approved address set. To attach multiple hooks, curators use a hook container contract that fans out a single vault-side call into several downstream calls.

Two things to know:
- **Hook reverts are not isolated.** A revert in any hook — pre or post — reverts the whole user operation. A buggy or malicious hook can block all vault operations until the hook configuration is updated. Only the HOOK_MANAGER role can attach or replace hooks.
- **Hooks gate the standard vault lifecycle, not every state change.** Cross-chain claim paths on the Predeposit vault and the one-shot unbackedMint on Bridged variants do not fire hooks. Curators relying on whitelist enforcement on those implementations need to scope gating appropriately.

### Authority: Three Axes

Authority is split across three axes so that no single key controls every dimension of a vault:
- **Vault owner** — gates factory.upgrade(...). The curator's lever for accepting a new implementation; does not go through the role system.
- **ROLE_ADMIN and operational roles** — VAULT_MANAGER for state changes, STRATEGY_MANAGER for adding and removing strategies, HOOK_MANAGER for hooks, ALLOCATOR for moving capital, PAUSER for emergencies, and WITHDRAWAL_MANAGER / PRIORITY_WITHDRAWAL_EXECUTOR on async vaults. The default OpenZeppelin DEFAULT_ADMIN_ROLE is intentionally unassigned.
- **Factory owner** — controls fee-recipient configuration on every vault. A protocol-level lever that bypasses the vault's own role system.

Operational keys can be split across multiple parties — the curator does not need to be the allocator, and neither needs to be the pauser.

A freshly deployed vault is **not** ready for production. The factory's initialisation only grants `ROLE_ADMIN` and `VAULT_MANAGER`, both to the `initialVaultManager` passed in the deployment data. Every other role has no holder until `ROLE_ADMIN` grants it — deploying a vault is a two-step operation, and a runbook needs to follow `create()` before any allocation or strategy work can happen.

### Async withdrawals and the priority executor

On Async vaults, withdrawals queue into epochs. The `WITHDRAWAL_MANAGER` role advances epochs through close → process → claim phases. Users can cancel a request only while the epoch is open — once `closeEpoch()` is called, the user is locked in and depends on the manager to move their request to the next epoch.

The `PRIORITY_WITHDRAWAL_EXECUTOR` is a privileged fast-path that can settle a withdrawal against the active epoch immediately, paying the user out minus an `unwindCost`. The executor supplies the unwind cost at call time, capped by an admin-configured maximum — without that cap configured, all priority withdrawals revert. This is a trusted operational role, not an automated mechanism.

## Operational Notes

Two facts worth knowing as a curator or integrator:
- **Paused vaults cannot be upgraded.** The upgrade path carries whenNotPaused, so a vault paused for safety cannot receive a fix until it is unpaused. Plan emergency response accordingly.
- **Deallocation order is load-bearing.** When users withdraw, the vault drains strategies in a configured order. Strategies allocated to but not added to the deallocation order are invisible to user withdrawals — their assets count toward totalAssets() but cannot be sourced for redemptions. Keep the order aligned with the active strategy set.

## Source Access
e
Concrete's smart contract source is held in a private repository. Partners and integrators can request access by contacting the team after signing an NDA.