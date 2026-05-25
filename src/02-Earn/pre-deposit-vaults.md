---
title: "Pre-Deposit Vaults"
description: "Concrete Earn documentation for pre-deposit vaults, covering deposits, yield accrual, the lock-up period, and claiming shares on the launched vault."
sidebar_label: "Pre-Deposit Vaults"
sidebar_position: 3
---

A pre-deposit vault accepts deposits during a set open period, before the vault launches as its full version. Your assets start accruing yield as soon as you deposit, but you cannot withdraw them until the vault launches. This page explains how deposits and yield work during the pre-deposit period, why withdrawals are paused, and how you claim your position once the vault launches.

## How Deposits and Yield Work

As soon as you deposit, your balance begins accruing yield based on the vault's strategy. The headline yield is not fixed during the pre-deposit period. The final yield is determined when the pre-deposit period ends and the vault launches.

## Why Withdrawals Are Paused

Deposits stay locked for the duration of the pre-deposit period, so withdrawals are not available during this time. Treat a pre-deposit allocation as committed until the vault launches. The vault page shows the date the pre-deposit period ends and your funds become claimable.

## Claiming Your Position at Launch

When the pre-deposit period ends, the vault launches as its full version, sometimes on a different network, and your deposit becomes claimable there. You claim your [shares](./ct-assets.md) (ctAssets) on the launched vault through the [Concrete app](https://app.concrete.xyz). Your claimed position reflects your deposit plus the yield accrued during the pre-deposit period. The vault page provides the claim steps and the date claiming opens.

## Tracking Your Balance

The Portfolio tab in the Concrete app shows your deposited assets throughout the pre-deposit period. Your balance reflects what you deposited, while the final yield is confirmed when the vault launches and you claim.

:::info[Example]
You deposit 1,000 USDC into a pre-deposit vault. Your balance starts accruing yield immediately, but you cannot withdraw during the pre-deposit period. When the vault launches, you claim your ctAssets on the launched vault, and your final yield is reflected in that position.
:::

:::tip
Check the vault page for two dates: when the pre-deposit period ends and when claiming opens. Until then, your deposit stays locked and your final yield is not yet set.
:::
