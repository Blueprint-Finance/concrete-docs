---
title: "AssetCX"
description: "Concrete documentation for AssetCX, covering how custodied assets are minted 1:1 for use in Concrete vaults, how vault shares and yield work, and how to request access."
sidebar_label: "AssetCX"
---

AssetCX allows assets in a custodian to be productive in [DeFi](/glossary/#defi) via Concrete vaults, whilst remaining in the client's custodial wallet.

Clients transfer assets to a designated wallet inside the client's custody account. Concrete mints AssetCX 1:1 against that custody balance and deposits it into your vault, and you receive vault shares at the vault's current exchange rate, the same as any [ERC-4626](/glossary/#erc-4626) vault. Those shares are your receipt for the deposit and any yield. Their value can rise or fall with strategy performance, but the strategies never touch your asset: AssetCX serves as collateral to borrow tokens, and only those borrowed tokens are deployed. Your AssetCX stays fully 1:1 backed throughout.

Assets that were previously idle can now be used as collateral to earn a return.

On the Concrete Earn app, AssetCX vaults are displayed with the naming convention `[asset]cx`, display "Permission Required". If you wish to participate in this offering, please contact [support@blueprintfinance.com](mailto:support@blueprintfinance.com).
