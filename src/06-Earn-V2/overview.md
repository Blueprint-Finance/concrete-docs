---
title: "Overview"
description: "Overview"
sidebar_label: "Overview"
---

**Concrete Earn V2** is the next version of Concrete’s on-chain yield system. It’s built around a single goal: make yield vaults flexible, upgradeable, and safe to operate — all directly on Ethereum ecosystem.

Earn V2 lets curators and partners deploy vaults, connect yield strategies, manage allocations, and upgrade over time — seamless operations without sacrificing control.

## What it does

Each Earn V2 vault accepts one underlying asset (for example, USDC), issues ERC-20 shares in return, and tracks performance through transparent on-chain accounting.
Vaults collect deposits from users, pool those assets together, and allocate or deallocate funds across yield strategies as needed — automatically recording gains, losses, and fees.

Vaults can add, remove, or swap strategies, add custom business logic via hooks, and upgrade their logic. All actions emit events that can be tracked through Concrete’s subgraph.

## What’s new in Earn V2

- **Granular Roles** — Clear boundaries to delegate high-frequency but less critical tasks to specific team members or automations, while maintaining full control over critical actions.
- **Growing Library of Implementations** — Flexible vault setups with predefined behaviors and clear upgrade paths specific to your vault.
- **Any Strategy Design** — strategy interfaces built for maximum flexibility and composability.
- **Modular Architecture** — Pluggable components for strategies and allocation logic
- **Liquidity Management** — Epoch-based withdrawal system for reliable asynchronous withdrawal schedules and improved operational control.

## Automated Fee Management

Earn V2 supports management fees taken on AUM and performance, each configurable by the Vault owner. Concrete automates the routing of fee revenue between vault owners and concrete.

| Fee Type | Description | Example |
| --- | --- | --- |
| **Management Fee** | Continuous fee based on total vault assets (AUM). | 1% annualized, accrued daily. |
| **Performance Fee** | Applied directly on returns | 10% of profits generated. |

## Roles and controls

**Vault owner:** controls upgrades for a specific vault.

**Vault roles:** Each operational role has its own **Admin Role**, allowing secure delegation and reassignment.

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
Vaults follow the ERC-4626 tokenized-vault standard for deposits, withdrawals, and accounting. They can hold multiple strategies and charge management and performance fees.

Both fees are minted as vault shares to the fee recipient for transparency and simplicity.

**Async withdrawals (optional)**
Beyond standard instant withdrawals, vaults can also run in “asynchronous” mode.
This queues withdrawal requests into epochs, processes them in batches, and locks a fixed price per epoch.
Vault owners can toggle between async and instant modes when needed.

**Periphery**
Around the core vaults, several helper modules provide additional functionality:

- **Strategies:** smart contracts which deploy funds into yield strategies whilst tracking vault accounting.
- **Allocation Module:** a built-in module that lets the “Allocator” ****role move funds between strategies safely and efficiently. The allocator submits batched allocation or deallocation calls, and the module executes them while enforcing vault limits and role checks.
- **Hooks:** optional contracts that add custom behavior (for example, deposit caps or KYC checks).
- **Fee Splitter:** routes fees between one or two recipients with a configurable share.

## Accounting and accrual

Before any user or admin action, vaults refresh their cached `totalAssets` value by calling an explicit yield-accrual routine.
This updates strategy performance, applies any fees, and ensures all share-to-asset conversions reflect the current vault value.

## Events and indexing

Every key action — deployments, upgrades, deposits, withdrawals, yield updates, fee accruals, and async-queue events — emits structured events.
These are indexed by Concrete’s subgraph for full on-chain transparency and analytics.
