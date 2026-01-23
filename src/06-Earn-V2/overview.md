---
title: "Overview"
description: "Overview"
sidebar_label: "Overview"
---

[Concrete Earn V2](https://app.concrete.xyz/earn) is the next version of Concrete's on-chain yield system, setting the new institutional standard for DeFi vault infrastructure — where strategy drives decisions, governance protects capital, and automation keeps everything in motion.

Built around a single goal of making yield vaults flexible, upgradeable, and safe to operate directly on Ethereum ecosystem, Earn V2 lets curators and partners deploy vaults, connect yield strategies, manage allocations, and upgrade over time with seamless operations that never sacrifice control.

This is the groundwork for a faster, safer, and more transparent generation of vault infrastructure.

## What it does

Each Earn V2 vault accepts one underlying asset (for example, USDC), issues ERC-20 shares in return, and tracks performance through transparent on-chain accounting.
Vaults collect deposits from users, pool those assets together, and allocate or deallocate funds across yield strategies as needed — automatically recording gains, losses, and fees.

Vaults can add, remove, or swap strategies, add custom business logic via hooks, and upgrade their logic. All actions emit events that can be tracked through Concrete’s subgraph.

## What’s new in Earn V2

Earn V2 builds directly on the foundation of Earn V1, addressing operational bottlenecks that limited scalability. Where V1 required manual coordination for rebalances and withdrawal processing, V2 introduces automation and role-based permissions that remove friction without compromising security. The result is a vault system that moves at market speed while preserving control and transparency.

- **Granular Roles** — Clear boundaries to delegate high-frequency but less critical tasks to specific team members or automations, while maintaining full control over critical actions.
- **Growing Library of Implementations** — Flexible vault setups with predefined behaviors and clear upgrade paths specific to your vault.
- **Any Strategy Design** — strategy interfaces built for maximum flexibility and composability.
- **Modular Architecture** — Pluggable components for strategies and allocation logic
- **Liquidity Management** — Epoch-based withdrawal system for reliable asynchronous withdrawal schedules and improved operational control.

## Roles and controls

**Vault owner:** controls upgrades for a specific vault.

**Vault roles:** Each operational role has its own **Admin Role**, allowing secure delegation and reassignment.

Earn V2 distinguishes between structural changes that require oversight and routine operations that can run instantly — enabling governance to protect capital while automation handles daily flows.

- **Vault Manager** – updates parameters, limits, fees, and manages the withdrawal queue
- **Strategy Manager** – adds or removes strategies
- **Hook Manager** – manages custom logic hooks and withdrawal logic
- **Allocator** – moves capital between strategies, withdrawal processing, and the unwinding of funds for users.
- **Withdrawal Manager** (async vaults) – handles epoch processing and claims

This separation keeps high-impact moves under tight governance, while letting routine operations flow without delay.

All admin roles default to the vault owner at deployment. Role reassignment to other addresses or automation services will be available following the upcoming epoch remediations. All upgradeable contracts use **EIP-7201** storage and **UUPS proxies** for long-term upgrade safety.

## How it’s built

**Factory**
A single factory contract deploys vaults, registers approved implementations, and handles upgrades between versions.
Each chain has its own factory that follows the **UUPS** upgrade standard with **EIP-7201** storage layout for safe migrations..

**Vaults**
Vaults follow the ERC-4626 tokenized-vault standard for deposits, withdrawals, and accounting. They can hold multiple strategies.

Both fees are minted as vault shares to the fee recipient for transparency and simplicity.

**Async withdrawals (optional)**
Beyond standard instant withdrawals, vaults can also run in “asynchronous” mode.
This queues withdrawal requests into epochs, processes them in batches, and locks a fixed price per epoch.
Vault owners can toggle between async and instant modes when needed.

**Periphery**
Around the core vaults, several helper modules provide additional functionality:

- **Strategies:** smart contracts which deploy funds into yield strategies whilst tracking vault accounting.
- **Multisig Strategies:** Earn V2 supports strategies that forward assets to multi-signature wallets — allowing curators or external partners to custody funds while preserving accurate on-chain accounting. Automated accounting integrations continuously monitor these wallets and update the vault’s reported assets to reflect yield accrued.
- **Allocation Module:** a built-in module that lets the “Allocator” ****role move funds between strategies safely and efficiently. The allocator submits batched allocation or deallocation calls, and the module executes them while enforcing vault limits and role checks.
- **Hooks:** optional contracts that add custom behavior (for example, deposit caps or KYC checks).
- **Fee Splitter:** routes fees between one or two recipients with a configurable share.

## Accounting and accrual

Before any user or admin action, vaults refresh their cached `totalAssets` value by calling an explicit yield-accrual routine.
This updates strategy performance, applies any fees, and ensures all share-to-asset conversions reflect the current vault value.

**Automated Accounting System**

Earn V2 introduces a three-party automation model that replaces manual bookkeeping and stale NAV updates with daily, verified accounting.

- **Transaction Proposer** — Tracks strategist wallet balances and proposes updates based on live data.
- **Independent Signer** — Validates that proposals match on-chain state.
- **Smart Contract Safeguards** — Only accepts updates within expected yield ranges; out-of-range updates require manual approval.

Together, these automations synchronize strategy balances and share prices with daily precision, enabling secure multisig strategies and real-time NAV reporting.

## Events and indexing

Every key action — deployments, upgrades, deposits, withdrawals, yield updates, fee accruals, and async-queue events — emits structured events.
These are indexed by Concrete’s subgraph for full on-chain transparency and analytics.

## Institutional-Grade Infrastructure

Earn V2 vaults integrate with partners and monitoring systems designed for institutional trust:

- [TRES Accounting Integration](https://tres.finance/) — Provides off-chain and verified accounting.
- [Hypernative Security Monitoring](https://www.hypernative.io/) — Delivers real-time risk detection and verification for trading wallets and multisigs, adding an independent protection layer to vault operations.

Together, these integrations position Earn V2 as the first DeFi vault infrastructure that meets institutional expectations for transparency and compliance.
