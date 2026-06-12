---
title: "Vault Transparency"
description: "How the Vault Transparency panel on the Earn vault page shows off-chain portfolio breakdowns by asset, protocol, and network, including the 24-hour data delay."
sidebar_label: "Vault Transparency"
---

# Vault Transparency

On each Earn vault page, the **Vault transparency** panel shows how that vault's off-chain portfolio is distributed across assets, protocols, and networks. Use it to see where capital is deployed without leaving the vault detail view.

The panel sits in the left column of the vault page, below the withdrawal cycle section. It appears only when breakdown data is available for that vault. If no breakdown is reported, the section is hidden.

## What you see

The panel label is **Vault transparency**. A tooltip next to the label states that data is delayed by 24 hours.

Three tabs switch the chart. **Assets** is selected by default:

- **Assets** – share of the off-chain portfolio by token symbol.
- **Protocols** – share deployed in each protocol.
- **Networks** – share held on each network.

Each tab renders a segmented bar chart. Each segment is one row in the breakdown; segment width reflects that row's share of the total shown for the tab.

:::info
This page describes the panel and how the data is produced. Live amounts and per-vault composition appear only on the vault page in the [Concrete app](https://app.concrete.xyz/earn).
:::

## Data delay

Figures in the panel reflect the vault's off-chain portfolio as captured on the timestamp returned by the backing [API](/glossary/#api), roughly one day before you view the page. They are not a live, block-by-block snapshot of on-chain balances.

## How the app loads the breakdown

The panel reads `GET /v1/vault:transparency/stats` with the vault address and chain ID. The response includes:

- `totalPortfolioAssetsOffchainUsd` – total USD value of the off-chain portfolio.
- `byAsset` – per-asset rows with `symbol`, `amount`, `amountUsd`, and optional `logoUrl`.
- `byProtocol` – per-protocol rows with `name`, `amountUsd`, and optional `logoUrl`.
- `byPlatform` – per-network rows with `platformId` and `amountUsd`.
- `timestamp` – when the breakdown was captured.

The **Assets**, **Protocols**, and **Networks** tabs map to `byAsset`, `byProtocol`, and `byPlatform` respectively.

For the full request and response reference, see [Vault transparency stats (API)](/Developers/SDK/read-methods/getVaultTransparencyStats/).
