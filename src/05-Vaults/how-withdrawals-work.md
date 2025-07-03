---
title: "How Withdrawals Work"
description: "How Withdrawals Work"
sidebar_label: "How Withdrawals Work"
---

Concrete vaults use a **Withdrawal Queue** to make redemptions predictable, secure, and fair. This protects both users and the protocol.

## What Is the Withdrawal Queue?

If a vault uses a queue, this will be clearly shown in the Concrete App before you deposit.

When you submit a withdrawal request:

- Your request is **added to a queue**
- Funds are prepared and released in batches
- You’ll see your **estimated withdrawal time** in the app
- Track your withdrawal status in your Portfolio tab — you’ll see labels like **“Queued”**, **“Processing”**, or **“Available”**

**Withdrawal Flow:**

*Submit Withdrawal → In Queue → Funds Ready → Claim (if needed) → Tokens in Wallet (Wait up to 7 days)*

## Weekly Vault Batches

Some vaults operate on a **fixed withdrawal schedule**, processing requests once or twice a week. If you request after the cutoff, your funds will be processed in the **next batch**.

### Standard Weekly Schedule

- **Cutoff Time:** Wednesdays at 12:00 PM UTC
- **Processing Time:** Thursdays at 12:00 PM UTC
- Requests made after the cutoff roll into the next week’s batch

### Corn Stables Vault Schedule

- **Cutoff Time:** Mondays at 12:00 PM UTC
- **Processing Time:** Thursdays at 12:00 PM UTC
- Requests made after the cutoff roll into the next week’s batch

:::tip
A live countdown timer and next batch details are always visible in the app under the withdrawal tab.
:::

### Berachain Bitcoin Schedule

- **Cutoff Times:** Mondays and Thursdays at 12:00 PM UTC
- **Processing Time:** 24 hours later (Tuesdays and Fridays at 12:00 PM UTC)
- Requests made after the cutoff roll into the **next available batch**

### Example – Corn USDT Vault

If Alice submits her request **before Monday, June 3 at 12:00 PM UTC**, she’ll receive her funds by **Thursday, June 6**.
If she submits after the cutoff (e.g., **Monday at 12:01 PM**), her request will be included in the **next week’s batch**, and her funds will arrive by **Thursday, June 13**.

## Withdrawal Timing by Vault Type

| Vault Name | Max Wait Time | Schedule |
| --- | --- | --- |
| **Berachain Bitcoin** | Up to 5 days | Processed Mondays & Thursdays |
| **Berachain Ethereum / Stables / BERA / Berabaddies** | Up to 7 days | Cutoff Wed 12 PM, release Thurs 12 PM |
| **Corn Stables** | Up to 7 days | Cutoff Mon 12 PM, release Thurs 12 PM |
| **Corn Bitcoin** | Instant | Withdraw anytime |
| **Morpho Bitcoin / Ethereum / USD** | Instant | Withdraw anytime |
| **Ethena (USDe, sUSDe)** | Up to 7 days | Bridge first, then claim via UI |
| **Dinero Ethereum** | Up to 7 days | Bridge first, then claim via UI |
| **Bitcoin Bera (Lombard)** | Up to 7 days | Claim through Lombard, not Concrete |

## Cross-Chain Withdrawals (Bridging)

If your vault operates across two different chains (e.g., Ethereum → Berachain or Ethereum → Corn), you’ll need to bridge your vault tokens before you can receive your funds.

The app handles this automatically — no need to use an external bridge or tool. You’ll see exactly what to do in your Portfolio view when your funds are available.

Once your vault tokens arrive on the destination chain:

- Some vaults send funds automatically
- Others require you to click “Claim” when ready

:::tip
**Always confirm you control the destination wallet**, if you're bridging to another chain in order to withdraw. Need to change your address after bridging?

Follow our [**Request Address Change Guide**](./01-Bera/request-address-change.md)
:::

## Why Withdrawal Queues Exist

Vaults use your deposited assets to generate yield or provide protection to borrowers.

Concrete uses queues to:

- Smooth out large withdrawals
- Maintain protocol liquidity
- Protect long-term earners
- Ensure no user is unfairly prioritized

## Summary Table

| Feature | Weekly Vaults (Berachain, Corn) | Instant Vaults (Morpho) |
| --- | --- | --- |
| Wait Time | Up to 5–7 days | None |
| Schedule | Fixed days (Mon or Thurs) | Anytime |
| Cutoff Time | Wed 12 PM UTC (Berachain)Mon 12 PM UTC (Corn) | N/A |
| Vault Examples | BTC, ETH, BERA, Stables | Morpho ETH, BTC, Stables |
| Bridging Required? | Yes (if cross-chain vault) | No |
| Claim Step Required? | Sometimes (App UI will show) | No |
