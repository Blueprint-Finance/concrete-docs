---
title: "Withdrawal Cooldown"
description: "How the Withdrawal Cooldown works on Earn vaults: per-deposit lock periods, the decaying Cooldown Exit fee, and how the cooldown relates to the Withdrawal Queue."
sidebar_label: "Withdrawal Cooldown"
---

# Withdrawal Cooldown

Some Earn vaults apply a **Withdrawal Cooldown**: after you deposit, the shares from that deposit stay locked for a configured period. If you withdraw those shares before the period ends, the vault charges a **Cooldown Exit fee** that decays over time. This page explains the mechanism, what you see in the [Concrete app](https://app.concrete.xyz/earn), and how the cooldown relates to the [Withdrawal Queue](/Using-Concrete-Vaults/withdraw/).

Not every vault uses a Withdrawal Cooldown. Whether it applies, its duration, and its maximum bypass fee are configured per vault and shown on that vault's page in the app.

## What the cooldown does

A Withdrawal Cooldown starts when you deposit into a vault that enables it. During the cooldown, the shares from that deposit count as locked. The in-app copy states that a withdrawal cooldown optimises [APY](/glossary/#apy): holding deposits for a known minimum period lets strategies commit capital with more predictable liquidity.

The cooldown applies **per deposit**. Each deposit starts its own cooldown period, so a position built from several deposits can have several active cooldown entries at once.

You can still withdraw before a deposit's cooldown ends. When you do, the vault applies the **Cooldown Exit fee** to the shares that are still locked. The fee decays linearly from its maximum at the start of the cooldown to 0% when the cooldown expires. See [Fees](/Using-Concrete-Vaults/fees/) for the fee type and range.

## Cooldown and the Withdrawal Queue

The Withdrawal Cooldown and the [Withdrawal Queue](/Using-Concrete-Vaults/withdraw/) are separate mechanisms, and both can apply on the same vault.

- **Withdrawal Cooldown** – whether locked shares can be withdrawn without a Cooldown Exit fee.
- **Withdrawal Queue** – how a withdrawal request is batched into [Epochs](/glossary/#epoch), processed, and made available to claim.

On vaults that use both, the cooldown period is **in addition to** the queue period. The app states this in deposit tooltips, the Withdrawal Cooldown modal, and the Portfolio lock tooltip. After shares pass the cooldown, a queued withdrawal still follows the vault's Epoch schedule described in [Withdraw](/Using-Concrete-Vaults/withdraw/).

## Deposit panel

When a vault uses a Withdrawal Cooldown, the deposit panel on the vault page shows a **Withdrawal Cooldown** row with the configured duration in days.

A tooltip next to the row includes:

- A chart of the fee decay from the vault's maximum Cooldown Exit fee at day 0 to 0% at the end of the cooldown.
- Copy that a withdrawal cooldown optimises [APY](/glossary/#apy), that the cooldown may be bypassed for a fee, and that the cooldown period is in addition to the withdrawal queue.

If the vault also uses a queued withdrawal model, a **Withdrawal delay** row may appear when queue timing is available. That row describes queue timing, not the cooldown duration itself.

## Withdraw modal breakdown

When you withdraw from a vault with active cooldown entries, a modal titled **Withdrawal Cooldown** lists each deposit that is still in cooldown.

For every active lock, the modal shows three rows:

- **Deposit (date)** – the deposit date and the share amount from that deposit that is still locked, labelled with the vault asset.
- **Day N fee** – the Cooldown Exit fee percentage that applies to that deposit today. **Day N** counts from day 1 on the deposit date.
- **Withdrawal cooldown ends** – the date when that deposit's cooldown expires. After this date, no Cooldown Exit fee applies to those shares.

The modal also renders each lock's position on the fee-decay chart. Deposits that have finished their cooldown do not appear in the breakdown.

The footer copy repeats the optimises [APY](/glossary/#apy) explanation, the vault-specific maximum bypass fee, and that the cooldown period is in addition to the withdrawal queue.

:::info
Deposit dates, locked share amounts, day-N fee percentages, and cooldown end dates are computed from your wallet's on-chain lock state and shown live in the [Concrete app](https://app.concrete.xyz/earn). This page describes the rows; the live values appear in the modal.
:::

## Portfolio lock indicator

On the **Portfolio** tab, each vault position shows your share balance. When part of your position is still in cooldown, a lock icon appears next to the balance in both the table and card views.

Hovering the lock icon opens a tooltip labelled **Withdrawal Cooldown** with:

- The locked share amount and vault share symbol.
- Copy that the Withdrawal Cooldown is in addition to the Withdrawal Queue period, with a link to learn more about withdrawals.

The lock icon appears only when your effective locked amount for that vault is greater than zero. When all cooldown entries have expired, the icon is hidden.

## Example

Suppose a vault applies a Withdrawal Cooldown and you deposit on two separate days.

1. On the **Deposit** panel, the **Withdrawal Cooldown** row shows the configured duration. The tooltip explains the fee decay and that the cooldown stacks on top of the queue.
2. You open **Withdraw**. The **Withdrawal Cooldown** modal lists two breakdown groups, one per deposit still in cooldown, each with deposit date, **Day N fee**, and cooldown end date.
3. The more recent deposit is earlier in its cooldown, so its **Day N fee** is higher than the older deposit's.
4. If you withdraw while a deposit is still in cooldown, the vault applies the fee shown for that deposit. If you wait until its cooldown ends, that deposit drops out of the breakdown and no Cooldown Exit fee applies to it.
5. On a queued vault, the withdrawal request then settles through the [Withdrawal Queue](/Using-Concrete-Vaults/withdraw/) as usual.
6. On **Portfolio**, a lock icon appears next to your position while any shares remain locked. The tooltip shows how much is locked under **Withdrawal Cooldown**.

For contract-level detail on deposit-lock hooks, see [Architecture core concepts](/Developers/architecture-core-concepts/).
