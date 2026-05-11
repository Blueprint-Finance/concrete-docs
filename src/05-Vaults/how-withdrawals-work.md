---
title: "How Withdrawals Work"
description: "Concrete vault documentation for how Withdrawals Work, including strategy behavior, withdrawals, migrations, and operational guidance."
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

**Withdrawal Flow**

*Submit Withdrawal → In Queue → Funds Ready → Claim (if needed) → Tokens in Wallet (Wait up to 7 days)*

## Weekly Vault Batches

Some vaults operate on a **fixed withdrawal schedule**, processing requests once or twice a week. If you request after the cutoff, your funds will be processed in the **next batch**.

:::info[Example]
If Alice submits her request **before Monday, June 3 at 12:00 PM UTC**, she’ll receive her funds by **Thursday, June 6**.
If she submits after the cutoff (e.g., **Monday at 12:01 PM**), her request will be included in the **next week’s batch**, and her funds will arrive by **Thursday, June 13**.
:::

## Withdrawal Caps Per Epoch

A withdrawal cap limits the total volume of redemptions processed in a single epoch, expressed as a percentage of vault TVL. Caps work alongside cadence to keep batch sizes predictable and aligned with strategy's unwind capacity.

**How caps behave**

When requests within an epoch stay under the cap, the batch processes normally at the scheduled time. When requests exceed the cap, only requests up to the cap threshold are processed in that epoch — the remainder roll forward to subsequent epochs and are processed in the order they were originally requested (First In First Out). Depositors waiting across multiple epochs continue earning yield until their portion is processed.

:::info[Example - Weekly Vault with Withdrawal Cap]
Say a vault processes withdrawals every Tuesday, with a cap of 20% of TVL per epoch.

If Alice submits a withdrawal request on Friday, May 29, her request joins the queue for the next batch on Tuesday, June 3. If total requests that week are under the 20% cap, Alice receives her funds by Friday, June 6.

But if the vault has $10M in TVL and $3M in total withdrawal requests that week (30% of TVL), only the first $2M in requests are processed on June 3, in the order they were submitted (FIFO). If Alice's request falls beyond the $2M threshold, her portion rolls forward to the next epoch on Tuesday, June 10. She continues earning yield on her position while she waits, and her funds arrive by Friday, June 13.
:::

## Cross-Chain Withdrawals (Bridging)

If your vault operates across two different chains (e.g., Ethereum → Berachain or Ethereum → Corn), you’ll need to bridge your vault tokens before you can receive your funds.

The app handles this automatically — no need to use an external bridge or tool. You’ll see exactly what to do in your Portfolio view when your funds are available.

Once your vault tokens arrive on the destination chain:

- Some vaults send funds automatically
- Others require you to click “Claim” when ready

:::tip
**Always confirm you control the destination wallet**, if you're bridging to another chain in order to withdraw. Need to change your address after bridging?
Follow our [Request Address Change Guide](./01-Bera/request-address-change.md)
:::

![](/img/how-withdrawals-work-bridging.png)

## Why Withdrawal Queues Exist

Vaults use your deposited assets to generate yield or provide protection to borrowers.

Concrete uses queues to:

- Smooth out large withdrawals
- Maintain protocol liquidity
- Protect long-term earners
- Ensure no user is unfairly prioritized
