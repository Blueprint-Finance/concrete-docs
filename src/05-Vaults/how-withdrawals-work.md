---
title: "How Withdrawals Work"
description: "Withdrawal documentation for Concrete vaults, covering vault types, the Withdrawal Queue, epoch cadence, and withdrawal caps."
sidebar_label: "How Withdrawals Work"
---

Withdrawal behavior depends on the vault. Most Concrete Earn vaults are async vaults: you submit a withdrawal request, the vault groups requests into epochs, processes them on a schedule, and makes the funds available to claim from the **Portfolio** tab. Other vaults settle atomically, and pre-deposit vaults exit through a cross-chain claim. Each vault's page in the Concrete app states which model it uses.

## Vault Types and Withdrawal Behavior

Concrete Earn ships two vault implementations and one launch-time variant, each with different withdrawal behavior:

- **Async vault** – settles withdrawals through the **Withdrawal Queue**. Used whenever the strategy cannot return assets atomically, for example positions held in a multi-sig wallet for off-chain or multi-venue execution, Pendle LP unwinds, or money markets with withdrawal cooldowns. This is the most common configuration on Concrete.
- **Standard (atomic) vault** – `withdraw()` and `redeem()` execute in a single transaction. Used when the underlying strategy can return assets immediately.
- **Pre-deposit vault** – accepts deposits on one chain before the target vault launches on another. Exit is via a cross-chain share claim, not the Withdrawal Queue. See [Pre-Deposit (Cross-Chain) Vault](#pre-deposit-cross-chain-vault) below.

## Async Vault (Withdrawal Queue)

1. **Submit your request.** On the vault page, open the Withdraw tab, enter the amount, and confirm in your wallet. Your ct[Asset] shares are held by the vault and the request joins the current epoch.
2. **The cutoff passes.** At the vault's scheduled cutoff, the epoch closes to new requests. You can cancel up to the cutoff; once it passes, the request is locked in and a new epoch opens.
3. **The epoch is processed.** Shortly after the cutoff:
   - The share price for the epoch is locked in at that moment, not at request time.
   - Your shares are burned.
   - Your assets are reserved for you to claim. They come from the vault's unallocated balance first (idle deposits and previous unwind leftovers); if that is not enough, the **Allocator** deallocates from strategies to cover the difference.
4. **Claim your assets.** Your withdrawal status moves to **Available** in the Portfolio tab. Click Claim, confirm in your wallet, and the assets arrive in your wallet. If you have multiple withdrawals ready across different epochs, you can claim them together.

You can track each request in the **Portfolio** tab with status labels **Queued**, **Processing**, and **Available**. The app shows an **estimated withdrawal time** based on the vault's cadence and queue depth.

### Withdrawal Caps Per Epoch

Some vaults set a withdrawal cap that limits the total volume of redemptions processed in a single epoch, expressed as a percentage of vault TVL. Whether a cap is enabled, and at what threshold, is set by the vault curator based on the strategy's liquidity profile and unwind capacity. Not all vaults use caps. Caps work alongside cadence to keep epoch sizes aligned with the strategy's unwind capacity.

To check the exact redemption process, including whether a cap is active and at what threshold, visit the withdrawal management page for the vault.

**How caps behave**

When requests in an epoch stay under the cap, the epoch processes normally at the scheduled time. When requests exceed the cap, only requests up to the cap threshold are processed in that epoch. The remainder roll forward to subsequent epochs and are processed in the order they were originally requested (First In, First Out). Depositors waiting across multiple epochs continue earning yield until their portion is processed.

:::info[Example: weekly vault with withdrawal cap]
Say a vault processes withdrawals every Tuesday with a cap of 20% of TVL per epoch.

If Alice submits a withdrawal request on Friday, May 29, her request joins the queue for the next epoch on Tuesday, June 3. If total requests that week are under the 20% cap, Alice receives her funds by Friday, June 6.

If requests in a given epoch exceed the cap, the queue processes them in the order they were submitted (FIFO) across subsequent epochs. Alice continues earning yield on her position while she waits, and her funds are returned as her place in the queue is reached.
:::

### Cadence of Epochs

Different vaults run on different epoch schedules, which determines how often withdrawals are processed. The default cadence is one epoch per week. The Concrete DeFi USDT vault runs two epochs per week, so under normal load its queue settles within 3.5 to 7 days; if requests exceed the vault's withdrawal cap, the queue extends until later epochs settle the remainder. Each vault's page lists its specific schedule.

### Things to Know About Async Vaults

- **Withdrawals are not instant** – there is a delay between requesting and receiving your funds, set by the vault's epoch schedule and the time needed to deallocate from strategies.
- **Your share price is set at processing, not at request** – the share price applied to your withdrawal is locked in when the epoch is processed, so your final amount can move up or down between submission and settlement.
- **You keep your position until the epoch is processed** – your shares sit with the vault and are not burned until processing happens.
- **You can cancel, but only before the cutoff** – once the epoch closes, the request is locked in and cannot be cancelled.
- **Requests can roll into the next epoch** – when an epoch hits the cap or processing is delayed, the **Withdrawal Manager** can move a request to the next epoch.
- **Each vault sets minimum and maximum withdrawal sizes** – your request must fall within these limits. Some vaults can also pause new withdrawal requests entirely.

## Standard (Atomic) Vault

A standard vault returns assets in a single transaction. `withdraw()` and `redeem()` deallocate from strategies in the vault's configured deallocation order, burn your shares, and transfer the underlying asset to your wallet in one call.

1. On the vault page, open the Withdraw tab, enter the amount, and confirm in your wallet.
2. The vault deallocates from strategies in its configured order to cover the withdrawal.
3. Your shares are burned and the underlying asset is transferred to your wallet in the same transaction.

## Pre-Deposit (Cross-Chain) Vault

Some Concrete vaults are pre-deposit vaults, designed for launches where you deposit on one chain and receive shares on another. These do not use the Withdrawal Queue; instead, you claim your shares on the destination chain when the vault is ready.

**What you see in the app**

When a pre-deposit vault enters its claim phase, the vault page in the Concrete app shows a **Claim** action. Click it and confirm in your wallet. Your shares on the original chain are exchanged for shares on the destination chain, delivered to the same wallet address.

**Before you claim, make sure:**

- **You control the wallet on the destination network** – for some multi-sig wallets, you need to confirm you control the same address on the destination chain.
- **You have enough native token on the source chain to cover the fee** – the app shows the estimated fee before you confirm.

## Frequently Asked Questions

- **Do my shares continue earning yield while in the queue?** Shares are held by the vault and are not burned until `processEpoch()` runs. Share price is locked at processing time, so any yield (or loss) the vault records between request and processing is reflected in the price applied to the request.
- **Can I cancel a withdrawal request?** Yes, for the current open epoch only, you can cancel on the vault page. Once the cutoff passes, the request cannot be cancelled.
- **What happens if my request cannot be filled in its epoch?** When the epoch reaches its withdrawal cap or processing is delayed, the **Withdrawal Manager** moves the remainder to the next epoch via `moveRequestToNextEpoch()`. Your queue position is preserved (FIFO).
