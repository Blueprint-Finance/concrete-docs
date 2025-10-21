---
title: "Our Solution"
description: "An Approach to DeFi Lending and Liquidation Protection"
sidebar_label: "Our Solution"
sidebar_position: 1
---

Concrete Earn transforms DeFi vaults from manual, governance-heavy systems into fully automated yield infrastructure that’s transparent, secure, and scalable.

| **Component**                  | **Purpose**                                                                                                                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Concrete Earn**              | Automated vault infrastructure for on-chain yield strategies. Partners can deploy custom ERC-4626 vaults, manage roles, and connect strategies safely through Concrete Build. |
| **Automation Engine**          | Keeps vault accounting up to date through automated yield accrual and fee calculation, ensuring daily NAV precision and real-time performance tracking.                       |
| **Subgraph Indexing**          | Tracks all deposits, withdrawals, fees, and yield events — delivering full on-chain transparency and analytics.                                                               |

## Concrete Earn

**Concrete Earn** provides automated, transparent yield vaults for liquidity providers and partners.

Each vault accepts one base asset (for example, USDC or ETH) and issues ERC-20 shares that represent proportional ownership of the vault.
Vaults deploy capital across curated DeFi strategies — such as lending, liquidity provision, or yield tokenization — and automatically rebalance allocations as market conditions evolve.

Concrete Earn is built for both scalability and flexibility:

* **Granular Role Controls** – Vault operators can delegate permissions for managing fees, strategies, and withdrawals.
* **Modular Strategies** – Plug-and-play strategy contracts let vaults adapt to any yield source.
* **Async Withdrawals** – Vaults can enable epoch-based withdrawal cycles for reliable liquidity management.

## Earn V1

Earn V1 introduced the foundation of Concrete’s vault system — a unified framework for earning on-chain yield through ERC-4626 vaults.
It provided fee-free, single-asset vaults optimized for consistent returns across lending markets and DeFi strategies.

While highly efficient for early users, Earn V1 still required manual accounting and operational oversight. Withdrawals and rebalancing processes relied on curator actions and multi-signature approvals, which limited the system’s speed and scalability.

## Earn V2

Earn V2 represents a complete evolution of the platform — a next-generation vault architecture designed for automation and institutional-grade transparency.

**Key Upgrades in V2:**

* **Role-Based Automation** – Introduces operational roles (Vault Manager, Allocator, Strategy Manager, Hook Manager, and Withdrawal Manager) to separate high-impact changes from daily operations.
* **Automated Accounting System** – Integrates a three-party process (Transaction Proposer, Independent Signer, and Smart Contract Safeguards) for verified, daily NAV updates.
* **Multisig Strategy Support** – Enables external custodians and curators to manage positions securely with automated data syncs.
* **Institutional Partnerships** – Built-in integration for real-time security monitoring.
* **Async Vault Mode** – Allows withdrawal requests to queue into epochs, giving operators control over liquidity while users maintain predictable exits.

**Result:** Earn V2 vaults operate at market speed — updating daily, rebalancing automatically, and providing full transparency without requiring manual oversight.
