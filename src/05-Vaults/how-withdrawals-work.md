---
title: "How Withdrawals Work"
description: "Concrete vault documentation for how Withdrawals Work, including strategy behavior, withdrawals, migrations, and operational guidance."
sidebar_label: "How Withdrawals Work"
---

Withdrawal behavior depends on the vault type. Most production Concrete Earn vaults use Queued Withdrawal Vaults, in which withdrawals are submitted as requests, batched into epochs, processed on a schedule, and then claimed by the user.

## Vault Types And Withdrawal Behavior

Concrete vaults support three vault implementations with different withdrawal behavior:
- **Queued Withdrawal Vault** — adds an epoch-based withdrawal queue. Required when the strategy involves off-chain custody. This is the most common vault on Concrete.
- **Standard (Atomic) Vault** — used when the underlying strategy can return assets immediately and atomically. withdraw() and redeem() execute in a single transaction.
- **Pre-deposit (Cross Chain) Vault** — used for cross-chain launch flows. Exit is via cross-chain share claim, not a standard withdrawal. See Predeposit / Cross-chain claims below.

Each vault's page in the Concrete app explains how that vault’s withdrawals behave. 

# Queued Withdrawal Vault

1. **Submit your request**
In the vault page, open the Withdraw tab, enter the amount, and confirm in your wallet. Your ct[Asset] shares move into the vault and join the current batch (an epoch) of withdrawal requests.
2. **The batch closes**
At the vault's scheduled time, the batch closes. No new requests can join it. Up until the batch closes you can cancel, afterwards you can no longer cancel a withdrawal request. A new batch opens for the next round.
3. **The batch is processed**
Shortly after closing:
- Your price is locked in — based on the vault's value at that moment, not when you submitted.
- Your shares are burned.
- Your assets are reserved for you to claim.
The vault unwinds positions from its strategies if it needs more liquidity to cover the batch.
4. **Claim your assets**
Once processed, your withdrawal shows as available to claim in the app. Click Claim, confirm in your wallet, and the tokens land in your wallet.
If you have multiple withdrawals ready across different batches, you can claim them together.

## Withdrawal Caps Per Epoch

Some vaults may have a withdrawal cap that limits the total volume of redemptions processed in a single epoch, expressed as a percentage of vault TVL. Whether a cap is enabled, and at what threshold, is determined by the vault curator based on the strategy's liquidity profile and unwind capacity. Not all vaults use caps. Caps work alongside cadence to keep batch sizes predictable and aligned with the strategy's unwind capacity. By keeping redemption batches predictable, caps allow curators to maintain more consistent strategy execution, which can contribute to better vault APY over time.

To check the exact redemption process, including whether a cap is active and at what threshold, visit the withdrawal management page for the vault you are interested in.

**How caps behave**

When requests within an epoch stay under the cap, the batch processes normally at the scheduled time. When requests exceed the cap, only requests up to the cap threshold are processed in that epoch — the remainder roll forward to subsequent epochs and are processed in the order they were originally requested (First In First Out). Depositors waiting across multiple epochs continue earning yield until their portion is processed.

:::info[Example - Weekly Vault with Withdrawal Cap]
Say a vault processes withdrawals every Tuesday, with a cap of 20% of TVL per epoch.

If Alice submits a withdrawal request on Friday, May 29, her request joins the queue for the next batch on Tuesday, June 3. If total requests that week are under the 20% cap, Alice receives her funds by Friday, June 6.

If requests in a given epoch exceed the cap, the vault's withdrawal queuing service processes them in the order they were submitted (FIFO) across subsequent epochs. Alice continues earning yield on her position while she waits, and her funds are returned as her place in the queue is reached.
:::

## Cadence Of Epochs

Different vaults run on different epoch schedules, which determines how often withdrawals are processed. Vaults may close epochs daily, twice weekly, or weekly. The cadence of epochs being closed and processed will impact the Withdrawal Queue. For example, the Cocnrete DeFi USDT vault has two epochs per week, resulting in a maximum withdrawal queue of 7 days. 

## Things to know about Queued Withdrawals

- **Withdrawals aren't instant.** There's a delay between requesting and receiving your funds, based on the vault's schedule and the time needed to free up liquidity from its strategies.
- **Your price is set at processing, not at request.** The share price applied to your withdrawal is the one locked in when the batch is processed — so your final amount can move up or down between when you submit and when it settles.
- **You keep your position until the batch is processed.** Your shares sit with the vault but aren't burned until processing happens. Up to that point, you're still in.
- **You can cancel — but only before the batch closes.** Once your batch closes, your request is locked in and can't be cancelled.
- **Requests can be moved to the next batch.** If processing is delayed, Concrete's automation may roll your request forward to the next epoch.
- **Each vault sets minimum and maximum withdrawal sizes.** Your request needs to fall within these limits. Some vaults may also pause new withdrawal requests entirely.

# Standard (Atomic) Vault

Used when the underlying strategy can return assets immediately and atomically. withdraw() and redeem() execute in a single transaction.
1. Connect your wallet and select the amount in order to withdraw
2. The vault deallocates from strategies in the configured order to process the withdrawal
3. Your shares are then burned
4. You will receive your assets in the time it takes for the transaction to execute. 

# Predeposit (Crosschain) Vault

Some Concrete vaults are Predeposit vaults, designed for launches where you deposit on one chain and your shares end up on another. These work a little differently from a normal withdrawal.
Instead of going through the withdrawal queue, you'll claim your shares on the destination chain when the vault is ready.

**What you'll see in the app**
When a Predeposit vault enters its claim phase, the vault page in the Concrete app will show a Claim action. Click it and confirm in your wallet — your shares on the original chain are exchanged for shares on the destination chain, delivered to the same wallet address.

**Before you claim, make sure:**
- **You control the wallet on the destination network.** For some multi-sig wallets, depositors will need to ensure that they have control of the wallet address on the destination chain.
- **You have enough native token on the source chain to cover the fee.** The app will show you the estimated fee before you confirm.

## Frequently asked questions

**Do my shares continue earning yield while in the queue?** Shares are held by the vault and are not burned until `processEpoch()` runs. Share price is locked at processing time, so any yield (or loss) the vault records between request and processing is reflected in the price applied to the request.
**Can I cancel a withdrawal request?** Yes, for the current (still-open) epoch only, you can cancel on the vault page. Once the epoch closes, the request cannot be cancelled.
**What if epoch processing is delayed?** The `WITHDRAWAL_MANAGER` can move a request to the next epoch.
