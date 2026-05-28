---
title: "Bridging and Depositing with Enso"
description: "Concrete vault documentation for bridging into vaults with Enso, covering the cross-chain deposit flow, costs and slippage, and what to expect."
sidebar_label: "Bridging and Depositing with Enso"
---

Concrete supports depositing into a vault directly from assets you hold on another chain, routed through [Enso](https://www.enso.build/). A cross-chain deposit removes the need to swap or bridge manually first and reduces the number of transactions to enter a vault. This page explains how it works, what it costs, and what to expect.

This option is available only for vaults whose assets Enso can route to. For example, you can deposit into a Berachain vault from USDC or ETH on Ethereum, while some vaults (such as Katana) do not support it. The app shows which assets and vaults are available.

**Example:**

- You hold **USDC** or **ETH** on Ethereum mainnet.
- Enso **swaps** your asset into the vault's base asset (for example, USDC to LBTC).
- That asset is **bridged** to the destination chain (for example, Berachain).
- The vault **mints your shares** (for example, `ctBeraLBTC`) and adds them to your portfolio.

## Control your destination wallet

Your shares are sent to the **same wallet address** on the destination chain. Make sure you control that address on the destination chain, because you withdraw your funds from there later. If you cannot control it, you will not be able to withdraw.

## How it works

1. Select a supported asset from your wallet on a supported source chain.
2. Select the destination vault. Enso calculates the route.
3. Confirm the transaction. Enso swaps your asset into the vault's base asset if needed, bridges it to the vault's network, and deposits it into the vault.
4. Receive your vault shares, which appear in your portfolio like a direct deposit.

## Costs and slippage

Three things affect how much you receive. The app shows the estimates before you confirm.

- **Slippage** – Cross-chain routes apply a fixed slippage tolerance of 3%. Slippage is the maximum acceptable gap between the quoted and executed price; the route does not execute if the price moves beyond it. You cannot change this value.
- **Price impact** – Large trades, or trades routed through low-liquidity pools, move the market price. Higher-liquidity assets such as USDC and WETH usually have lower price impact; thinly traded or volatile assets have more.
- **Gas** – Standard network gas applies on both the source and destination chains. The app shows an estimated gas cost in ETH and USD.
- **Bridge fees** – The underlying bridge protocol (for example, Stargate) may charge a fee. Any such fee is already reflected in the final amount you receive.

## What to expect

- **Availability varies** – Swap and bridge routes depend on provider liquidity, which changes over time and with the amount you deposit. A route is not guaranteed for every asset, amount, or moment. If none is available, the app tells you, and you can try a larger amount or deposit directly on the vault's own chain instead.
- **Very small deposits may not route** – Below a certain amount, route costs make a deposit inefficient or impossible. The minimum depends on the vault's base asset and the current route cost. The app warns you when your amount is too small.
- **Progress is shown step by step** – Each swap and bridge step appears as it happens, with a link to [LayerZero Scan](https://layerzeroscan.com) for that transaction. You can also check the status later by entering your original deposit transaction on LayerZero Scan.
- **Failures are rare, and gas is not refunded** – If a route cannot be built or the first transaction reverts, your assets stay in your wallet, but the gas you paid for any failed transaction is not returned. If a step fails after the first transaction has gone through, the swap or bridge is already in progress, and gas is likewise not returned.

## Withdrawals

Bridging and swapping apply only to deposits. When you withdraw, you always receive the vault's base asset in exchange for your shares, on the vault's own chain. To move those assets to another chain afterward, withdraw first, then bridge them yourself.

## Supported assets and vaults

Support starts with a limited set of assets and vaults and expands over time. The current options always appear in the Concrete app.

## Need help?

If you run into any issues depositing into a vault:

- Ask in the [Concrete Discord](https://discord.gg/concretexyz).
- Email [support@blueprintfinance.com](mailto:support@blueprintfinance.com).

## FAQ

**Q: Do I need to approve assets before depositing?**
A: For ERC-20 tokens such as USDC, the app prompts you to approve the token before the first transaction. Native ETH needs no approval.

**Q: Can I bridge out of a vault?**
A: No. Cross-chain routing applies to deposits only. To exit, withdraw from the vault to receive its base asset on the vault's chain, then bridge those assets yourself if needed.
