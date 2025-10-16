---
title: "Overview"
description: "Overview"
sidebar_label: "Overview"
---

**Concrete Earn V2** is the next version of Concrete’s on-chain yield system. It’s built around a single goal: make yield vaults flexible, upgradeable, and safe to operate — all directly on Ethereum ecosystem.

Earn V2 lets curators and partners deploy vaults, connect yield strategies, manage allocations, and upgrade over time — all without centralized control.

## What it does

Each Earn V2 vault accepts one underlying asset (for example, USDC), issues ERC-20 shares in return, and tracks performance through transparent on-chain accounting.
Vaults collect deposits from users, pool those assets together, and allocate or deallocate funds across yield strategies as needed — automatically recording gains, losses, and fees.

Vaults can add, remove, or swap strategies, add new hooks, and upgrade their logic — all without redeploying. All actions emit events that can be tracked through Concrete’s subgraph.

## What’s new in Earn V2

- **Upgradeable vaults** — Safe migrations between versions through a controlled factory.
- **Modular architecture** — Strategies, hooks, and fee logic are all plug-and-play.
- **Explicit accounting** — Explicit accounting — Cached totals and accrual events make vault state auditable and consistent.
- **Configurable exits** — Async withdrawals make liquidity management smoother.
- **Granular roles** — Clear boundaries between managers, allocators, and operators.
- **Full observability** — Complete event coverage for dashboards and audits.

## Fees

All fees are calculated at the vault level and reflected in the exchange rate between vault shares and underlying assets.

Each vault defines its **fee parameters** during configuration. While Concrete handles internal splitting, partners always see total accruals with precise timestamps.

| Fee Type | Description | Example |
| --- | --- | --- |
| **Management Fee** | Continuous fee based on total vault assets (AUM). | 1% annualized, accrued daily. |
| **Performance Fee** | Applied on yield earned above baseline or high-water mark. | 10% of profits generated. |

## Roles and controls

Earn V2 separates permissions clearly:

- **Factory owner:** manages approved implementations, version upgrades, and setting the fee splitter or fee recipient.
- **Vault owner:** controls upgrades for a specific vault.

**Vault roles:**

Each operational role has its own A**dmin Role**, allowing secure delegation and reassignment.

- **Vault Manager** – updates parameters, limits, and fees
- **Strategy Manager** – adds or removes strategies
- **Hook Manager** – manages custom logic hooks
- **Allocator** – moves capital between strategies
- **Withdrawal Manager** (async vaults) – handles epoch processing and claims

All admin roles default to the vault owner at deployment, but can be reassigned to other addresses or automation services. All upgradeable contracts use **EIP-7201** storage and **UUPS proxies** for long-term upgrade safety.

## How it’s built

**Factory**
A single factory contract deploys vaults, registers approved implementations, and handles upgrades between versions.
Each chain has its own factory that follows the **UUPS** upgrade standard with **EIP-7201** storage layout for safe migrations..

**Vaults**
Vaults follow the ERC-4626 tokenized-vault standard for deposits, withdrawals, and accounting.
They store a cached version of `totalAssets` (updated explicitly) instead of recalculating balances on every function call/execution. This keeps gas predictable, efficient, and prevents donation-based inflation attacks.

Vaults can hold multiple strategies and charge two built-in fee types:

- **Management fee:** time-based, applied on each yield update.
- **Performance fee:** taken from positive yield only.

Both fees are minted as vault shares to the fee recipient for transparency and simplicity.

**Async withdrawals (optional)**
Beyond standard instant withdrawals, vaults can also run in “asynchronous” mode.
This queues withdrawal requests into epochs, processes them in batches, and locks a fixed price per epoch.
It’s designed for vaults managing large or less-liquid strategies.
Operators can toggle between async and instant modes when needed.

**Periphery**
Around the core vaults, several helper modules provide additional functionality:

- **Strategies:** small contracts that handle fund movement to yield sources.
- **Allocation Module:** a built-in module that lets the “Allocator” ****role move funds between strategies safely and efficiently. The allocator submits batched allocation or deallocation calls, and the module executes them while enforcing vault limits and role checks.
- **Hooks:** optional contracts that add custom behavior (for example, deposit caps or KYC checks).
- **Fee Splitter:** routes fees between one or two recipients with a configurable share.

## Accounting and accrual

Before any user or admin action, vaults refresh their cached `totalAssets` value by calling an explicit yield-accrual routine.
This updates strategy performance, applies any fees, and ensures all share-to-asset conversions reflect the current vault value.
Conversions follow ERC-4626 rounding rules and guard against zero-division or rounding drift.

## Events and indexing

Every key action — deployments, upgrades, deposits, withdrawals, yield updates, fee accruals, and async-queue events — emits structured events.
These are indexed by Concrete’s subgraph for full on-chain transparency and analytics.
