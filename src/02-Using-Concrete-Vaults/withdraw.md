---
title: "Withdraw"
description: "Withdrawal documentation for Concrete vaults, covering vault types, the Withdrawal Queue, Epoch cadence, and withdrawal caps."
sidebar_label: "Withdraw"
---

Withdrawal behavior depends on the vault. Most Concrete vaults are async vaults: you submit a withdrawal request, the vault groups requests into Epochs, processes them on a schedule, and makes the funds available to claim from the **Portfolio** tab. Other vaults settle atomically, and pre-deposit vaults exit through a cross-chain claim. Each vault's page in the Concrete app states which model it uses.

## Vault Types and Withdrawal Behavior

Concrete ships two vault implementations and one launch-time variant, each with different withdrawal behavior:

- **Atomic vault** – `withdraw()` and `redeem()` execute in a single transaction. Used when the underlying strategy can return assets immediately. Withdrawn assets are returned to the depositor instantly.
- **Async vault** – settles withdrawals through the **Withdrawal Queue**. Used whenever the strategy cannot return assets atomically, for example positions held in a multi-sig wallet for off-chain or multi-venue execution, Pendle LP unwinds, or money markets with withdrawal cooldowns. A depositor submits a withdrawal request and waits in the queue for a predefined period. This is the most common configuration on Concrete.
- **Pre-deposit vault** – accepts deposits on one chain before the target vault launches on another. Exit is via a cross-chain share claim, not the Withdrawal Queue. See [Pre-Deposit (Cross-Chain) Vault](#pre-deposit-cross-chain-vault) below.

## Atomic Vault

An atomic vault returns assets in a single transaction. `withdraw()` and `redeem()` deallocate from strategies in the vault's configured deallocation order, burn your shares, and transfer the underlying asset to your wallet in one call.

1. **Submit your request.** On the vault page, open the Withdraw tab, enter the amount, and confirm in your wallet.
2. **The vault settles.** The vault deallocates from strategies in its configured order to cover the withdrawal.
3. **Receive your assets.** Your shares are burned and the underlying asset is transferred to your wallet in the same transaction.

## Async Vault (Withdrawal Queue)

1. **Submit your request.** On the vault page, open the Withdraw tab, enter the amount, and confirm in your wallet. Your ct[Asset] shares are held by the vault and the request joins the current Epoch.
2. **The cutoff passes.** At the vault's scheduled cutoff, the Epoch closes to new requests. You can cancel up to the cutoff; once it passes, the request is locked in and a new Epoch opens.
3. **The Epoch is processed.** Shortly after the cutoff:
   - The share price for the Epoch is locked in at that moment, not at request time.
   - Your shares are burned.
   - Your assets are reserved for you to claim. They come from the vault's unallocated balance first (idle deposits and previous unwind leftovers); if that is not enough, the **Allocator** deallocates from strategies to cover the difference.
4. **Claim your assets.** Your withdrawal status moves to **Available** in the Portfolio tab. Click Claim, confirm in your wallet, and the assets arrive in your wallet. If you have multiple withdrawals ready across different Epochs, you can claim them together.

You can track each request in the **Portfolio** tab with status labels **Queued**, **Processing**, and **Available**. The app shows an **estimated withdrawal time** based on the vault's cadence and queue depth.

### Withdrawal Caps Per Epoch

Some vaults set a withdrawal cap that limits the total volume of redemptions processed in a single Epoch, expressed as a percentage of vault TVL. Whether a cap is enabled, and at what threshold, is decided per vault based on the strategy's liquidity profile and unwind capacity. Not all vaults use caps. Caps work alongside cadence to keep Epoch sizes aligned with the strategy's unwind capacity.

To check the exact redemption process, including whether a cap is active and at what threshold, visit the specific vault's page.

**How caps behave**

When requests in an Epoch stay under the cap, the Epoch processes normally at the scheduled time. When requests exceed the cap, only requests up to the cap threshold are processed in that Epoch. The remainder roll forward to subsequent Epochs and are processed in the order they were originally requested (First In, First Out). Depositors waiting across multiple Epochs continue earning yield until their portion is processed.

:::info[Example: weekly vault with withdrawal cap]
Say a vault processes withdrawals every Tuesday with a cap of 20% of TVL per Epoch.

If Alice submits a withdrawal request on Friday, May 29, her request joins the queue for the next Epoch on Tuesday, June 3. If total requests that week are under the 20% cap, Alice receives her funds by Friday, June 6.

If requests in a given Epoch exceed the cap, the queue processes them in the order they were submitted (FIFO) across subsequent Epochs. Alice continues earning yield on her position while she waits, and her funds are returned as her place in the queue is reached.
:::

### Things to Know About Async Vaults

- **Withdrawals are not instant** – there is a delay between requesting and receiving your funds, set by the vault's Epoch schedule and the time needed to deallocate from strategies.
- **Your share price is set at processing, not at request** – the share price applied to your withdrawal is locked in when the Epoch is processed, so your final amount can move up or down between submission and settlement.
- **You keep your position until the Epoch is processed** – your shares sit with the vault and are not burned until processing happens.
- **You can cancel, but only before the cutoff** – once the Epoch closes, the request is locked in and cannot be cancelled.
- **Requests can roll into the next Epoch** – when an Epoch hits the cap or processing is delayed, the remainder of a request can move to the next Epoch.
- **Each vault sets minimum and maximum withdrawal sizes** – your request must fall within these limits.

## Pre-Deposit (Cross-Chain) Vault

Some Concrete vaults are pre-deposit vaults, designed for launches where you deposit on one chain and receive shares on another. These do not use the Withdrawal Queue; instead, you claim your shares on the destination chain when the vault is ready.

**What you see in the app**

When a pre-deposit vault enters its claim phase, the vault page in the Concrete app shows a **Claim** action. Click it and confirm in your wallet. Your shares on the original chain are exchanged for shares on the destination chain, delivered to the same wallet address.

**Before you claim, make sure:**

- **You control the wallet on the destination network** – for some multi-sig wallets, you need to confirm you control the same address on the destination chain.
- **You have enough native token on the source chain to cover the fee** – the app shows the estimated fee before you confirm.

## Frequently Asked Questions

- **Do my shares continue earning yield while in the queue?** Shares are held by the vault and are not burned until the Epoch is processed. Share price is locked at processing time, so any yield (or loss) the vault records between request and processing is reflected in the price applied to the request.
- **Can I cancel a withdrawal request?** Yes, for the current open Epoch only, you can cancel on the vault page. Once the cutoff passes, the request cannot be cancelled.
- **What happens if my request cannot be filled in its Epoch?** When the Epoch reaches its withdrawal cap, the remainder of your withdrawal request is moved to the next Epoch. Your queue position is preserved (FIFO).
