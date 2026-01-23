---
title: "How It Works"
description: "How It Works"
sidebar_label: "How It Works"
sidebar_position: 3
---

At its core, Concrete simplifies:

1. **Vault Creation:** Partners deploy new vaults through the Concrete Factory.
2. **Asset Management:** Deposited funds are allocated across yield strategies.
3. **Automated Operations:** Fees, yield, and accounting are all updated continuously through on-chain events and automations.

## Deposit

Users deposit a supported base asset (for example, USDC) into a vault.
The vault mints ERC-20 shares representing proportional ownership in the total assets under management.

Each vault focuses on a single asset and can deploy those funds across multiple strategies to earn yield.

## Yield Generation

Strategies are smart contracts that interact with DeFi protocols to earn yield.

Each vault can have several strategies — for example, lending on Aave, providing liquidity on Pendle, or holding yield-bearing assets.
The vault’s Allocator role moves funds between strategies safely, ensuring target exposures and limits are respected.

## Withdrawals

Withdrawals can happen instantly or in epochs (if the vault uses asynchronous mode).

Async vaults queue requests in time-based batches, allowing the vault to process redemptions efficiently and maintain liquidity control.
Instant withdrawals remain available for vaults configured in standard mode.

## Behind the Scenes

Concrete ties vault operations together through automations and on-chain transparency:

* **Automated yield accrual** keeps total asset values up to date.
* **Subgraph indexing** tracks every vault action, from deposits to yield updates.
* **Role-based access** ensures that only authorized operators can move funds or change parameters.
* **Factory deployment and upgrades** guarantee that vaults can evolve safely over time.

This automation framework eliminates manual interventions, enabling daily updates that reflect real-time NAV (Net Asset Value) accuracy and institutional-grade accounting.

## Example Scenario

Let’s look at how a typical Earn V2 vault works in practice:

1. **A partner launches a USDC vault** through Concrete Build using the Factory. The vault is configured with two strategies: a Pendle yield strategy and a Curve stable pool strategy.
2. **Users deposit USDC**, receiving vault shares that represent ownership of the vault’s total assets.
3. **The Allocator moves capital** — half into Pendle, half into Curve — balancing allocations as yields change.
4. **Each day**, the vault’s automated accounting updates total assets and calculates yield.
5. **When users withdraw**, the system converts their shares back into USDC, either instantly or after the next epoch (for async vaults).
6. **All activity is recorded** on-chain and reflected in the subgraph, giving full transparency to vault operators and depositors.
