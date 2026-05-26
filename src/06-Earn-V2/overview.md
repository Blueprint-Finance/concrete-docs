---
title: "Overview"
description: "Overview of Concrete Earn V2 vault infrastructure, including architecture goals, operational model, and integration pathways."
sidebar_label: "Overview"
---

Concrete Earn V2 is the infrastructure for deploying and operating on-chain yield vaults. It lets curators and partners deploy vaults, connect strategies, manage allocations, and upgrade implementations over time, with role separation between high-impact governance actions and routine operations.

## What it does

Each Earn V2 vault accepts a single underlying asset (for example, USDC), issues ERC-20 shares in return, and tracks performance through on-chain accounting that refreshes before every user or admin action.
Vaults pool deposits, allocate and deallocate funds across one or more strategies, and record yield, losses, and fees as they accrue. They can add, remove, or swap strategies, extend lifecycle behavior through hooks, and upgrade their implementation via the factory.
All actions emit structured events, which are indexed by Concrete's subgraph for off-chain access.

## Roles and controls

Earn V2 separates structural changes that require oversight from routine operations that can run on automation. All operational roles have a dedicated admin role for delegation and reassignment.

- **Vault Manager** – Updates parameters, limits, fees, and (on async vaults) the withdrawal queue toggle.
- **Strategy Manager** – Adds, removes, and toggles strategies.
- **Hook Manager** – Configures lifecycle hooks.
- **Allocator** – Moves capital between strategies, processes withdrawals, and sets deallocation order.
- **Withdrawal Manager (async vaults)** – Closes and processes epochs, handles batch claims.
- **Pauser** – Allows the incident response team to take independent action and pause the vault.
- **Vault Owner** – Separate from the operational roles; controls upgrades for the vault.

All admin roles default to the initial vault manager at deployment and can be reassigned to other addresses or automation services.

## What's new in Earn V2

Earn V2 builds directly on Earn V1 and addresses the operational bottlenecks that limited V1's scalability. Where V1 required manual coordination for rebalances and withdrawal processing, V2 introduces automation, modular components, and role-based permissions that remove friction without compromising security.

- **Granular Roles** – Routine operational tasks can be delegated to specific addresses or automation services while high-impact actions stay under separate governance. Each role has a dedicated admin role for reassignment.
- **Factory and Implementations** – A single factory contract per chain deploys vaults from a library of pre-approved implementations and gates upgrades along approved migration paths. New implementations expand the library over time. All upgradeable contracts use EIP-7201 namespaced storage and UUPS proxies.
- **Flexible Strategy Interface** – Strategies are smart contracts that deploy funds into yield sources while tracking vault accounting. The production strategy in standard deployments is the `MultisigStrategy`, which forwards assets to a designated custody address (a Gnosis Safe or any other address, including an MPC wallet) and reports value back on-chain through bounded accounting updates.
- **Modular Architecture** – Vaults follow the ERC-4626 standard and can hold multiple strategies. Lifecycle hooks extend behavior at specific points (per-user deposit caps, whitelists, custom logic); a hook revert fails the entire vault operation.
- **Async Liquidity Management** – Vaults can run in asynchronous mode, queuing withdrawal requests into epochs, processing them in batches, and locking a price-per-share per epoch. This supports strategies that require unwind time.
- **Fee Accountant** – Each vault is paired with a `FeeAccountant` that acts as its fee recipient and executes a configured waterfall on a periodic schedule. Deal terms (priority levels, recipients, allocation methods, remainder splits, and choice of hurdle oracle) are expressed as configuration rather than custom code. The hurdle rate itself is read from an oracle, with implementations supporting fixed APR, fixed APY, or a live market benchmark.

## Accounting and on-chain / off-chain governance

Earn V2 vaults split governance between what smart contracts enforce on-chain and what operators execute off-chain within those bounds.

**On-chain (enforced by the smart contracts):** share accounting, role-based access control, fee accrual, strategy registration and allocation, epoch state transitions, and the accounting bounds on the MultisigStrategy.
**Off-chain (operated by Concrete’s automation and custody infrastructure):** daily exchange-rate updates, epoch lifecycle orchestration, transaction proposal and validation, and withdrawal processing.
The mechanism that connects them is the **MultisigStrategy**. Vault assets are held in a designated multi-signature custody address. On-chain accounting is kept current through a three-party model:
- **Transaction Proposer** – Tracks the custody wallet’s balance via external data sources and proposes an `adjustTotalAssets(diff, nonce)` update.
- **Independent Signer** – Validates the proposal against an independent data source and co-signs only if it matches.
- **Smart Contract Safeguards** – The strategy enforces three on-chain bounds: a `maxAccountingChangeThreshold` that auto-pauses the strategy on out-of-range updates, a `cooldownPeriod` between updates, and an `accountingValidityPeriod` after which accounting-dependent operations revert until a fresh update is posted.

No single party can unilaterally update vault NAV, and out-of-bounds proposals halt the strategy rather than being accepted.

## Events and indexing

Every key action (deployments, upgrades, deposits, withdrawals, yield updates, fee accruals, and async-queue events) emits structured events indexed by Concrete’s subgraph.

## Custody, monitoring, and incident response

Earn V2 integrates with custody, monitoring, and incident-response infrastructure operated alongside the smart contracts:

- **Custody** – MPC-based wallet infrastructure (Fordefi, Fireblocks) with policy engines that enforce contract whitelisting, function restrictions, amount limits, and quorum-based approval.
- **Monitoring** – Hypernative provides real-time monitoring of vault and strategy addresses, with alerts on anomalous activity and threshold breaches.
- **Incident response** – ZeroShadow operates as a retained partner with standing authorization to pause vaults when unwind risks are detected, enabling sub-minute response to active threats.
- **Independent attestation** – Partners can opt into Accountable as a third-party proof-of-funds dashboard for on-chain attestation of vault holdings.

These integrations are arrangements within Concrete’s operational stack, not on-chain protocol guarantees. Together, they extend the trust model beyond what the smart contracts enforce in isolation.
