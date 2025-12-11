---
title: "Yield Vaults and ERC-4626 Standard"
description: "ERC-4626 and Concrete's Yield Vaults: Optimizing DeFi for Earners"
sidebar_label: "Yield Vaults"
sidebar_position: 1
---

The [ERC-4626 Tokenized Vault Standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-4626/) was designed to improve the functionality of yield-bearing vaults within DeFi ecosystems, creating a standardized approach to how vaults interact with tokens. ERC-4626 enables greater interoperability between vaults, enhancing deposits, withdrawals, and yield accounting across platforms.

Concrete adopts this standard to simplify the complex process of managing yields and to offer yield vaults. A key innovation is how Concrete vaults allocate capital—currently focused on yield generation.

## How ERC-4626 Enables Smooth Integration Between Yield Vaults

### 1. Standardized Deposits and Withdrawals

* With ERC-4626, the process of depositing and withdrawing assets from vaults is streamlined. Users deposit their assets (e.g., ETH, USDC, BTC) into vaults, receiving **cTokens** in return. These tokens represent their share of the vault and are fully transferable across different DeFi platforms that support ERC-4626.

* Withdrawals are just as simple. When a user decides to redeem their position, they burn their cTokens and receive their underlying assets back, along with any yield that has accrued over time.

### 2. Interoperability Across Platforms

* The standardization brought by ERC-4626 makes vaults and cTokens interoperable across various DeFi platforms, enabling users to move between protocols without friction. ERC-4626 vaults integrate smoothly with other DeFi solutions, giving users more flexibility and reducing the need for manual intervention.

### 3. Simplified Accounting for Yield Accrual

* Accounting for yield can be complicated across different DeFi platforms, but ERC-4626 simplifies this process by providing a uniform structure for tracking and distributing returns. Concrete’s vaults use this to automatically calculate the yield based on deposits, and the accrued returns are distributed in the form of the asset from which they originated.

* For users, this means they can easily see how much yield they’ve earned, making it straightforward to claim their rewards or reinvest them.

## How Yield is Accrued for Earners

Yield is accrued from multiple sources, and earners receive it in the form of the underlying assets. The protocol calculates a notional APY in the vault’s base asset to offer clarity on expected return.

### Money Markets

Funds from the vaults are deposited into various money markets (e.g., Aave, Compound) that offer the best yield opportunities for specific assets. The protocol constantly rebalances these deposits based on changing interest rates and transaction costs, ensuring the highest possible returns.




## Example

Imagine you deposit **1 ETH** into a Concrete yield vault. In return, you will receive **10 cETH**, which represents your share of the vault.
Behind the scenes, your ETH is currently used for yield generation through money markets.
In the future, portions of deposits will also provide liquidity for borrower protection mechanisms.

After some time, you accrue yield from multiple sources:

* 0.01 ETH from money markets,
* 150 USDC from planned loan-protection fees (future revenue stream), and

When you decide to withdraw your ETH, you redeem cETH tokens. Concrete’s system ensures there is enough liquidity to facilitate the withdrawal by managing the funds reserved for yield generation and (in future versions) protection modules.
If liquidity is momentarily tied up, your request enters a redemption queue, with full transparency on when your funds will be available.

## User Benefits

* Track your earnings through cTokens. The system calculates and displays the notional value of the yield accrued, expressed in the asset originally deposited (e.g., ETH).
* Redeem your cTokens to reclaim deposited assets and accrued yield with minimal hassle. Concrete’s liquidity management system ensures that withdrawals are executed efficiently, even if a redemption queue is needed to ensure liquidity.
* Assets are constantly being shifted to the best-performing money markets. By monitoring interest rates, transaction costs, and liquidity utilization across multiple DeFi platforms, Concrete optimizes returns without the user needing to micromanage their investments.
