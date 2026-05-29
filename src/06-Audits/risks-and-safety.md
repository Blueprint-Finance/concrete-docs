---
title: "Risks and Safety"
description: "Risk and safety overview for Concrete vault users, including smart contract, strategy, market, and operational risk considerations."
sidebar_label: "Risks and Safety"
---

Concrete vaults use smart contracts, connect to third-party protocols, and operate in on-chain markets. As with all DeFi products, this comes with risk.

This page explains the main risk categories and what Concrete does to protect your funds. Concrete organizes its vault's security into three layers. Each layer has its own controls, audits, and responsibilities.

## Vault Infrastructure Layer

The on-chain smart contracts and custody setup that hold your funds.

### Smart Contract Protections

**Audited before launch.** All smart contract code is audited by established security firms (Halborn, Cantina, Code4rena or Zellic) before it goes live. Concrete also runs an ongoing bug bounty program with Cantina. See all reports on the [Audits](/Audits/overview/) page.

**Separated roles.** Vault operations are split across distinct roles. No single key has full control or can drain a vault.

**On-chain accounting limits.** The vault automatically pauses if it detects unusual changes in asset values. Accounting updates are rate-limited to prevent manipulation.

**Controlled upgrades.** Vault contracts use the UUPS proxy pattern. Upgrades are only possible through authorized paths approved by the protocol. Any unauthorized upgrade attempt is automatically rejected.

**Multi-signature custody.** All vault wallets require multiple approvals to move funds. Signing authority is divided across independent authorised groups.

### Withdrawal Timing

Most production vaults use Queued Withdrawal. This means withdrawals enter a queue and are processed on a set schedule. This delay creates a monitoring window where irregularities can be detected before funds leave the vault.

## Strategy Layer

This layer controls how your funds are deployed and how transactions are checked before they run.

### Strategy-Specific Protections

**Vetted before use.** Every strategy passes a risk, accounting, and compliance review before receiving any funds.

**Whitelisted interactions only.** Vaults can only transact with pre-approved addresses. All others are blocked.

**Transaction validation.** Every automated transaction must clear multiple independent checks including a full simulation, before it executes.

**Granular controls.** Each strategy can be paused independently, and a policy engine governs what actions are allowed. Changes require multi-party approval.

---

## Oversight and Verification Layer

This layer operates above the vault and strategy layers. It provides independent monitoring, incident response, and accounting checks.

**24/7 monitoring.** Hypernative watches all vault addresses around the clock and alerts the Concrete team about unusual activity.

**Automatic safeguards.** If something unexpected is detected, protective measures activate immediately, no manual intervention needed.

**Ongoing asset verification.** Vault values are cross-checked by multiple independent sources at regular intervals to ensure accuracy.

## Market Risks

Even with the protections above, DeFi markets carry inherent risks. Vaults that interact with lending protocols, AMMs (automated market makers), or liquidity pools may be affected by price volatility, impermanent loss, and slippage. Here are the main ones to be aware of.

## Impermanent Loss (IL)

Impermanent loss occurs when the price of tokens in a liquidity pool diverges, potentially making LP positions less valuable than simply holding the tokens. This affects vaults that allocate to AMMs, LP pools, or engage in multi-asset yield farming.

**When IL is more likely:**

* Non-stablecoin pairs (e.g. ETH/BTC)
* Volatile or low-liquidity environments
* Pre-deposit campaigns on new chains

**How we mitigate:**

* Diversified vault strategies to reduce single-pool exposure
* Dynamic reallocation to minimize risk during volatile periods

## Slippage Risk

Slippage refers to the difference between the expected price of a trade and the price at which it is actually executed. This can occur during vault deposit swaps, reward conversions, or vault rebalancing, especially when trading large amounts or in low-liquidity markets.

**When slippage is more likely:**

* Swapping between volatile or thinly traded tokens
* High market activity or low liquidity conditions
* Executing large trades relative to pool size

**How we mitigate:**

* Integration with leading aggregators (e.g. 1inch) for optimal swap routing
* Built-in slippage protection in vault contracts
* Clear UI warnings when expected slippage exceeds thresholds

## Strategy-Specific Risks

Each vault may expose users to different underlying protocols. These come with their own assumptions and potential vulnerabilities.

**How we mitigate:**

* Vetting and monitoring of all integrated protocols
* Capped exposures for experimental or new strategies
* Transparent reward and allocation disclosures

## Jurisdiction Restrictions

Access to Concrete products is not available in every jurisdiction. Before depositing, review the [Restricted Jurisdictions](/Audits/restricted-jurisdictions/) page to confirm eligibility.
