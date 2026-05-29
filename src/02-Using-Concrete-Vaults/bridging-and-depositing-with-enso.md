---
title: "Bridging and Depositing with Enso"
description: "Concrete vault documentation for bridging into vaults with Enso, covering the cross-chain deposit flow, costs and slippage, and what to expect."
sidebar_label: "Bridging and Depositing with Enso"
---

# Bridging and Depositing with Enso

If you hold assets on a chain different from your target vault, you can deposit directly using [Enso](https://www.enso.build/) without manually swapping or bridging first. This page walks you through what happens, what it costs, and what to expect.

Cross-chain deposit is available only for vaults whose assets Enso can route to. For example, you can deposit into a Berachain vault from USDC or ETH on Ethereum, while some vaults (such as Katana) do not support it. The app shows which assets and vaults are available.

:::info[Example]
- You hold **USDC** or **ETH** on Ethereum mainnet.
- Enso **swaps** your asset into the vault's base asset (for example, USDC to LBTC).
- That asset is **bridged** to the destination chain (for example, Berachain).
- The vault **mints your shares** (for example, `ctBeraLBTC`) and adds them to your portfolio.
:::

## Before you deposit

:::warning[Control your destination address]
Your shares are sent to the same wallet address on the destination chain. Make sure you control that address on the destination chain, because you withdraw your funds from there later. If you cannot control it, you will not be able to withdraw.
:::

For ERC-20 tokens such as USDC, the app prompts you to approve the token before the first transaction. Native ETH needs no approval.

## How it works

1. In the Deposit tab, open the Accepted Tokens dropdown to see which tokens are accepted using Enso.
2. Select the destination vault. Enso calculates the route.
3. Confirm the transaction. Enso swaps your asset into the vault's base asset if needed, bridges it to the vault's network, and deposits it into the vault.
4. Receive your vault shares, which appear in your portfolio like a direct deposit.

## Costs and slippage

Three things affect how much you receive. The app shows the estimates before you confirm.

- **Slippage** – Cross-chain routes apply a fixed slippage tolerance of 3%, which you cannot change. The route does not execute if the price moves beyond that gap between quote and execution.
- **Price impact** – Large trades, or trades routed through low-liquidity pools, move the market price. Higher-liquidity assets such as USDC and WETH usually have lower price impact; thinly traded or volatile assets have more.
- **Gas** – Standard network gas applies on the source chain (destination execution is paid via the bridge fee, not as a separate user gas payment). The app shows an estimated gas cost in ETH and USD.
- **Bridge fees** – The underlying bridge protocol selected by Enso may charge a fee. Any such fee is already reflected in the final amount you receive.

## What to expect

- **Route availability** – Swap and bridge routes depend on provider liquidity and are not guaranteed for every asset, amount, or moment. If none is available, the app tells you, and you can try a larger amount or deposit directly on the vault's chain.
- **Minimum deposit size** – Below a certain amount, route costs make a deposit inefficient or impossible. The minimum depends on the vault's base asset and current route cost, and the app warns you when your amount is too small.
- **Step-by-step progress** – Each swap and bridge step appears as it happens, linking to [LayerZero Scan](https://layerzeroscan.com) for source-side steps (sending the route, verifying DVNs, sealing) and to the destination chain's block explorer for destination-side steps (executor transaction, executing on destination, delivery). You can also check the status later by entering your original deposit transaction on LayerZero Scan.
- **Failures and gas** – If a route cannot be built or the first transaction reverts, your assets stay in your wallet, but the gas you paid for any failed transaction is not returned. If a later step fails after the first transaction, the swap or bridge is already in progress and gas is likewise not returned.

## Withdrawals

Cross-chain routing applies only to deposits. There is no bridge-out of a vault. When you withdraw, you always receive the vault's base asset in exchange for your shares, on the vault's own chain. To move those assets to another chain afterward, withdraw first, then bridge them yourself.

## Need help?

If you run into any issues depositing into a vault:

- Ask in the [Concrete Discord](https://discord.gg/concretexyz).
- Email [support@blueprintfinance.com](mailto:support@blueprintfinance.com).
