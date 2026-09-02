---
title: "AssetCX"
description: "Concrete documentation for AssetCX, covering how assets in qualified custody are minted 1:1 for use in Concrete vaults, how vault shares, yield, and losses work, and how to request access."
sidebar_label: "AssetCX"
---

AssetCX allows assets in qualified custody to be leveraged for certain [DeFi](/glossary/#defi) yield opportunities via Concrete vaults, whilst the underlying assets remain in clients' custodial wallets.

Clients transfer assets to a designated wallet that is still within the custodian account. Concrete mints AssetCX 1:1 against that custody balance and deposits it into your vault, and you receive vault shares at the vault's current exchange rate, the same as any [ERC-4626](/glossary/#erc-4626) vault. Those shares are your receipt for the deposit and any yield. Yield raises the vault's total assets and exchange rate while the share supply stays constant. Losses are also reflected in the exchange rate. When a strategy loses value, an operator reduces the vault's reported total assets. The exchange rate falls for all holders proportionally.

The core value proposition: qualified custody ([QC](/glossary/#qc)) assets that for compliance reasons cannot leave custody are represented on-chain at a 1:1 ratio to the custodied balance, so they earn yield while the underlying never leaves the QC environment. Your AssetCX stays fully 1:1 backed throughout.

Assets that were previously idle can now be used as collateral to earn a return.

On the Concrete Earn app, AssetCX vaults are displayed with the naming convention `[asset]cx`, display "Permission Required". If you wish to participate in this offering, please contact [support@blueprintfinance.com](mailto:support@blueprintfinance.com).
