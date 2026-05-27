---
title: "Architecture"
description: "Technical architecture documentation for Concrete Earn V2 smart contracts, roles, modules, and operational design."
sidebar_label: "Architecture"
---

This page is for integrators and curators working against the Concrete Earn V2 smart contracts. It walks through how the four cooperating layers fit together: a factory that deploys vaults, vaults that hold user deposits and account for value, strategies that route capital into yield venues, and hooks that gate behavior at specific lifecycle points.

## System overview

A Concrete vault is an [ERC-4626](https://eips.ethereum.org/EIPS/eip-4626) single-asset contract. Users deposit one asset, receive shares, and those shares track their proportional claim on everything the vault holds. The vault itself does not seek yield. It delegates that to strategies, adapters that move the underlying asset into lending markets, looping positions, custodied venues, or wherever the curator chooses. The vault's job is custody, accounting, and access control; everything else is an attached contract.

Three things sit around the vault:
- **The factory** – deploys vaults and manages their upgrade paths.
- **Strategies** – each bound to a single vault, executing the actual yield logic.
- **Hooks** – optional modules that run before and after each user operation.

This separation is the central design choice. The vault is small and standard; variation between products lives in contracts the vault holds references to, including what venues to use, what restrictions to enforce, and how withdrawals settle. A curator launching a new vault is composing modules, not forking a contract.

## Factory

The factory is a UUPS-upgradeable contract that CREATE2-deploys vaults as ERC-1967 proxies, maintains a registry of approved implementations, and controls upgrade paths between versions.

Two properties matter:
- **Vault deployment is permissionless.** Anyone can call `create()` to spin up a new vault, choosing from the implementations the factory owner has approved. The factory is the immutable admin of every vault proxy. Vault upgrade authority cannot be transferred off the factory short of upgrading the factory itself.
- **Implementations are curated.** Only approved (and not subsequently blocked) implementations can be deployed, and upgrades only succeed along migration paths the factory owner has explicitly enabled with `setMigratable`.

The result is permissionless launches against the set of vault implementations the factory owner has approved, with new vault types added without forcing existing vaults to migrate.

A separate **Periphery Factory** deploys strategies and position helpers. Unlike the vault factory, it supports `deregisterStrategy`, which transfers proxy admin ownership of a strategy to a new owner. Strategy custody can be handed to partners while vault custody stays with the Concrete team.

## Vault implementations

All vault behavior starts from a single abstract base. The Standard implementation is the baseline; other implementations override specific functions to change one aspect of behavior:
- **Standard** – the baseline ERC-4626 vault with strategy allocation.
- **Async** – overrides withdraw semantics with an epoch-based queue. See [How Withdrawals Work](../../05-Vaults/how-withdrawals-work.md) for the user-facing view.
- **Predeposit** – adds a LayerZero-based cross-chain claim flow for assets pre-staked on a source chain before vault deployment on the target. The claim path bypasses the hook lifecycle, so curators using a whitelist hook on a Predeposit vault need a separate gating mechanism for cross-chain claims.
- **Bridged Standard / Bridged Async** – add a single `unbackedMint` function for one-shot cross-chain migrations. The function requires `totalSupply() == 0` and `maxDepositLimit == 0`, so it can only be used to seed a vault at deployment-init time. These implementations are migration scaffolding rather than ongoing product variants.

Looping strategies and fee splitting are not vault implementations. Looping is a strategy plugged into a Standard vault, and fee splitting lives in downstream contracts the vault mints to.

## The vault: custody, shares, and accounting

The vault is the share token. Depositing mints ERC-20 shares; redeeming burns them. The vault keeps a cached snapshot of total assets and refreshes it through the `withYieldAccrual` modifier before any economic operation. The combination of a controlled-update cache and accrual-before-conversion defends against donation and inflation attacks, because user-facing conversions settle against the snapshot taken at the start of the call rather than against the live `balanceOf` of the vault.

Note that `totalAssets()` is not the cached snapshot. It calls `_previewAccrueYieldAndFees()`, which re-reads each active strategy's `totalAllocatedValue()` live. The cached snapshot is exposed separately as `cachedTotalAssets()` and is the value conversion math reads inside `withYieldAccrual`-guarded operations.

Every user-facing economic operation (`deposit`, `mint`, `withdraw`, `redeem`, `allocate`), plus `configure` and the fee-recipient setters, is wrapped in `withYieldAccrual`. Before the operation runs, the vault polls each strategy's reported value, books the delta as yield or loss, accrues management and performance fees against the new state, and only then proceeds. Share prices users transact against always reflect the latest reconciled value. Pure book-keeping ops (strategy registry, hook updates, deallocation order, pause) skip the modifier because they do not move asset values.

### Strategy reverts and vault halts

The vault treats whatever a strategy reports as ground truth. There is no on-vault delta threshold, no oracle cross-check, no safety flag. Safety rails live on the strategy side, and the distinction that matters is whether a strategy's value is fully on-chain or depends on an operator push:
- **Strategies with on-chain accounting** (for example, a lending position) compute their value directly from on-chain state. No off-chain dependency.
- **Strategies with asynchronous accounting** (for example, multisig-custodied positions) require an operator to push a signed value within a configured `accountingValidityPeriod`. If the push is late, the strategy's value function reverts. `totalAssets()` reverts with it, halting deposits, withdrawals, and async epoch processing until either the strategy admin calls `unpauseAndAdjustTotalAssets` or the **Strategy Manager** toggles the strategy inactive on the vault.

If a vault's strategy mix includes asynchronous-accounting strategies, the vault has a hard off-chain dependency on operator availability. Pick the validity period accordingly.

## Strategies

Strategies are adapters. Each is bound to a single vault, uses the same underlying asset, and implements the `IStrategyTemplate` interface. The vault only knows how to ask a strategy for its current value, push assets in, and pull assets out. New strategies plug in without changing the vault.

Strategies built against this interface include a simple idle strategy that holds assets without seeking yield, a `MultisigStrategy` that forwards assets to a designated multisig with off-chain accounting reported back on-chain, and a looping strategy that runs flash-loan-driven leveraged positions composed from interchangeable lender, flash, and swap modules. New venues integrate by implementing the three module interfaces (roughly two dozen functions in total). The looping strategy contract itself contains no protocol-specific code.

A vault can hold a conservative lending strategy alongside a leveraged looping strategy and a custodied multisig strategy at the same time. The **Allocator** (`ALLOCATOR`) decides what proportion sits where, calling `vault.allocate(...)` with per-strategy instructions. Routing and sizing decisions are off-chain; the allocator's payload tells the vault exactly which strategy to move how much into. The vault enforces postconditions (idle balance covers locked assets, and on async vaults also covers past-epoch unclaimed assets) but does not make policy decisions on-chain. From a user's perspective, the vault is one share token with one yield curve.

## Hooks

Hooks are optional modules that run at fixed lifecycle points: before and after `deposit`, `mint`, `withdraw`, and `redeem`. A vault stores at most one hook target plus a flag bitmap; the hook fires only when the relevant bit is set. Shipped hooks include `UserDepositCapHook` (a per-user deposit cap, deployed per vault) and `WhitelistUserDepositHook` (gates deposits to an approved address set). To attach multiple hooks, curators use a `HookContainer` contract that fans out a single vault-side call into up to six downstream hook calls.

Two things to know:
- **Hook reverts are not isolated.** A revert in any hook, pre or post, reverts the whole user operation. A buggy or misconfigured hook can block all vault operations until the hook configuration is updated. Only the **Hook Manager** (`HOOK_MANAGER`) can attach or replace hooks.
- **Hooks gate the standard vault lifecycle, not every state change.** Cross-chain claim paths on the Predeposit vault and the `unbackedMint` function on Bridged variants do not fire hooks. Curators relying on whitelist enforcement on those implementations need to scope gating appropriately.

## Authority and roles

Authority is split across three axes so that no single key controls every dimension of a vault:
- **Vault Owner** – gates `factory.upgrade(...)`. The curator's lever for accepting a new implementation; does not go through the role system.
- **`ROLE_ADMIN` and operational roles** – `VAULT_MANAGER` for state changes, `STRATEGY_MANAGER` for adding and removing strategies, `HOOK_MANAGER` for hooks, `ALLOCATOR` for moving capital, `PAUSER` for emergencies, and `WITHDRAWAL_MANAGER` / `PRIORITY_WITHDRAWAL_EXECUTOR` on async vaults. The default OpenZeppelin `DEFAULT_ADMIN_ROLE` is intentionally unassigned at the vault.
- **Factory Owner** – controls fee-recipient configuration on every vault. A protocol-level lever that bypasses the vault's own role system.

Operational keys can be split across multiple parties. The curator does not need to be the allocator, and neither needs to be the pauser.

A freshly deployed vault is **not** ready for production. The factory's initialization grants only `ROLE_ADMIN` and `VAULT_MANAGER`, both to the `initialVaultManager` passed in the deployment data. Every other role has no holder until `ROLE_ADMIN` grants it. Deploying a vault is a two-step operation: a runbook needs to follow `create()` with role grants before any allocation or strategy work can happen.

## Async withdrawals

On Async vaults, withdrawals queue into epochs. The **Withdrawal Manager** (`WITHDRAWAL_MANAGER`) advances epochs through close, process, and claim phases. Users can cancel a request only while the epoch is open; once `closeEpoch()` is called, the user is locked in for that epoch and depends on the Withdrawal Manager to move their request forward via `moveRequestToNextEpoch(...)`.

The **Priority Withdrawal Executor** (`PRIORITY_WITHDRAWAL_EXECUTOR`) is a privileged fast-path that can settle a withdrawal against the active epoch immediately, paying the user out at `grossAssets - unwindCost`. The executor supplies the `unwindCost` at call time, bounded by an admin-configured cap (`unwindCostCapBP`, default 500 bps, ceiling 10000 bps, set via `setUnwindCostCap`). Calls where the supplied `unwindCost` exceeds the cap revert. This is a trusted operational role, not an automated mechanism.

See [How Withdrawals Work](../../05-Vaults/how-withdrawals-work.md) for the user-side timeline and the relationship between epochs, the cutoff, and queue placement.

## Fee distribution

Vaults charge management and performance fees by minting shares to a `managementFeeRecipient` and a `performanceFeeRecipient`. Both addresses are set by the factory owner via vault-side setters (`updateManagementFeeRecipient`, `updatePerformanceFeeRecipient`). Each recipient typically points to a `TwoWayFeeSplitter` contract, which routes accumulated fees between two configurable recipients (commonly the curator and the protocol) according to a basis-points share.

The splitter lives in the periphery, separate from the vault, so a single vault can mint to one shared splitter or to per-recipient splitters. See [Fees](../../fees.md) for the user-facing fee schedule.

## Operational notes

A short worked example, then two operational facts.

### Example: deploying and turning on a vault

A curator wants to launch a USDC vault that allocates between an idle reserve and one looping strategy.

1. Call `factory.create(version, ownerAddr, abi.encode(allocateModule, USDC, initialVaultManager, "Concrete USDC", "ctUSDC"), salt)`. The factory deploys a vault proxy. `ROLE_ADMIN` and `VAULT_MANAGER` are granted to `initialVaultManager`.
2. From the `ROLE_ADMIN` account, grant `STRATEGY_MANAGER`, `ALLOCATOR`, `PAUSER`, and (for an async vault) `WITHDRAWAL_MANAGER`. The vault cannot service users yet because no strategy is attached and no role can yet add one.
3. From the `STRATEGY_MANAGER` account, call `addStrategy` for the idle strategy and the looping strategy.
4. From the `ALLOCATOR` account, call `setDeallocationOrder` covering both strategies, then call `vault.allocate(...)` to move funds into the looping strategy as users deposit. Any strategy that is registered but missing from the deallocation order will still count toward `totalAssets()` but cannot be sourced for user withdrawals.

### Things to know

- **Paused vaults cannot complete an upgrade.** Each vault implementation's post-upgrade init hook (`_upgrade`) carries `whenNotPaused`. A vault paused for safety cannot receive a fix until it is unpaused. Plan emergency response accordingly.
- **Deallocation order is load-bearing.** When users withdraw, the vault drains strategies in a configured order. Strategies allocated to but not added to the deallocation order are invisible to user withdrawals: their assets count toward `totalAssets()` but cannot be sourced for redemptions. Keep the order aligned with the active strategy set.

## Source access

Concrete's smart contract source is held in a private repository. Partners and integrators can request access by contacting the team after signing an NDA.
