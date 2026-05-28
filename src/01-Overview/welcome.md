---
title: "Concrete: Earn Yield on Supported On-Chain Assets"
description: "Official welcome guide to Concrete, explaining the platform mission, core product pillars, and how to get started safely."
sidebar_label: "Introduction"
sidebar_position: 0
---

Concrete operates ERC-4626 vaults that accept deposits in a designated underlying asset and deploy that asset into vetted yield strategies. Concrete built the tech stack to handle allocation between strategies, real-time accounting updates, and withdrawal processing through automated operator roles — users interact only with the vault.

## What You Get

* **One deposit, fully deployed.** A single deposit puts your capital to work. Curators allocate it across strategies behind the scenes, so you do not juggle positions or chase yield across protocols.
* **Yield-bearing shares you actually hold.** Deposit and you receive ERC-20 vault shares like ctWBTC or ctDefiUSDT. Your share count stays constant — yield generation occurs through an exchange rate as the vault earns.
* **Points and rewards, tracked for you.** Eligible vaults accrue on-chain rewards that are indexed automatically.


## Security

Concrete's security model has several layers:

* **Roles are separated.** Governance roles (Vault Manager, Strategy Manager, Hook Manager) are held by the Vault Admin and handle low-frequency, high-impact decisions.
* **Operational roles are automated.** The Allocator and Withdrawal Manager execute high-frequency, low-impact actions through automated services built and run by Concrete.
* **Assets live in custody, not the vault.** Deposits forward to a MultisigStrategy backed by a Gnosis Safe or Fordefi MPC wallet.
* **Accounting updates are bounded on-chain.** A change threshold, cooldown, and validity window constrain how off-chain values move the vault.
* **Monitoring is independent.** Hypernative provides real-time risk detection
* **Pause authority is pre-delegated.** ZeroShadow can pause vaults per mandate.
* **Code is audited before it ships.** Audited by [Halborn, Cantina, Code4rena, and Zellic](../audits.md).
* **Upgrades are pull-based.** Vault owners pull from the factory; Concrete cannot push changes to deployed vaults.

**Risk.** Yields are not guaranteed and may fluctuate. Strategy losses reduce share price. You may lose some or all of your deposited assets. Past performance is not indicative of future results.

For full risk disclosures see [Risks and Safety](../risks.md)
