---
title: "Yield Vaults and ERC-4626 Standard"
description: "ERC-4626 and Concrete's Yield Vaults: Optimizing DeFi for Earners"
sidebar_label: "Yield Vaults"
sidebar_position: 1
---

The [ERC-4626 Tokenized Vault Standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-4626/) was designed to improve the functionality of yield-bearing vaults within DeFi ecosystems, creating a standardized approach to how vaults interact with tokens. ERC-4626 enables greater interoperability between vaults, enhancing deposits, withdrawals, and yield accounting across platforms.

Concrete adopts this standard to simplify the complex process of managing yields and to offer yield vaults that not only provide users with optimized returns but also **lay the groundwork for a future protection layer and borrowing system**. While these systems are not part of the current roadmap, they remain part of Concrete’s long-term product vision. This dual-utility model will ensure that deposited assets are maximized for yield generation while also safeguarding borrowers from liquidation risks once those features are introduced.

A key innovation is how Concrete vaults allocate capital—currently focused on yield generation, with future plans to reserve funds for protection mechanisms under development in Concrete’s roadmap.

## How Vaults Will Provide Capital for Future Protection Systems

In Concrete’s ecosystem, yield vaults are multi-functional by design. Today they generate returns for users; in future releases, they will also support the platform’s planned **liquidation protection** and **borrowing** modules.

When earners deposit assets into Concrete’s vaults, these funds currently serve the yield-generation function.
In future iterations, deposits will be split between two main roles:

1. **Yield Generation** – A portion of the deposited assets is actively managed through various money markets and strategies to optimize returns.
2. **Loan Protection (long-term product vision)** – Another portion of these funds will be reserved specifically to support loan protection features. Concrete’s **Probability Engine** will calculate how much liquidity needs to be set aside to protect loans, ensuring borrowers are safeguarded from liquidation once the Borrow and Protect systems launch.

This allocation will be critical for maintaining loan security in future versions. In cases where a borrower’s collateral might be at risk of liquidation, the reserved liquidity from the vaults will be deployed to stabilize the loan, preventing borrowers from losing their assets.

The reserved liquidity will act as a protective buffer, allowing Concrete to inject liquidity into a borrower’s position before reaching a liquidation threshold. This system will ensure that the vaults evolve from being a tool for passive yield generation to also serving as part of the platform’s risk-management and borrower-protection framework once those features are introduced.

## How ERC-4626 Enables Smooth Integration Between Yield Vaults

### 1. Standardized Deposits and Withdrawals

* With ERC-4626, the process of depositing and withdrawing assets from vaults is streamlined. Users deposit their assets (e.g., ETH, USDC, BTC) into vaults, receiving **cTokens** in return. These tokens represent their share of the vault and are fully transferable across different DeFi platforms that support ERC-4626.

* Withdrawals are just as simple. When a user decides to redeem their position, they burn their cTokens and receive their underlying assets back, along with any yield that has accrued over time.

### 2. Interoperability Across Platforms

* The standardization brought by ERC-4626 makes vaults and cTokens interoperable across various DeFi platforms, enabling users to move between protocols without friction. ERC-4626 vaults integrate smoothly with other DeFi solutions, giving users more flexibility and reducing the need for manual intervention.

### 3. Simplified Accounting for Yield Accrual

* Accounting for yield can be complicated across different DeFi platforms, but ERC-4626 simplifies this process by providing a uniform structure for tracking and distributing returns. Concrete’s vaults use this to automatically calculate the yield based on deposits, and the accrued returns are distributed in the form of the asset from which they originated—whether it’s ETH, USDC, or CT tokens.

* For users, this means they can easily see how much yield they’ve earned, making it straightforward to claim their rewards or reinvest them.

## How Yield is Accrued for Earners

Yield is accrued from multiple sources, and earners receive it in the form of the underlying assets. The protocol calculates a notional APY in the vault’s base asset to offer clarity on expected return.

### Money Markets

Funds from the vaults are deposited into various money markets (e.g., Aave, Compound) that offer the best yield opportunities for specific assets. The protocol constantly rebalances these deposits based on changing interest rates and transaction costs, ensuring the highest possible returns.

### Future Loan Protection Revenue *(Planned Feature)*

In long-term product vision, earners will also receive a portion of the fees generated from Concrete’s planned **loan protection** services.
This will include fees from opening and canceling protection plans, claims triggered during protection, and foreclosure events. Additionally, when borrowers repay credit lines, any difference in collateral value will be passed on to earners as yield.

### CT Token Emissions

Concrete rewards earners with CT tokens, adding an extra source of income for those participating in its yield vaults.

## Example

Imagine you deposit **1 ETH** into a Concrete yield vault. In return, you will receive **10 cETH**, which represents your share of the vault.
Behind the scenes, your ETH is currently used for yield generation through money markets.
In the future, portions of deposits will also provide liquidity for borrower protection mechanisms.

After some time, you accrue yield from multiple sources:

* 0.01 ETH from money markets,
* 150 USDC from planned loan-protection fees (future revenue stream), and
* 100 CT tokens from emissions.

When you decide to withdraw your ETH, you redeem cETH tokens. Concrete’s system ensures there is enough liquidity to facilitate the withdrawal by managing the funds reserved for yield generation and (in future versions) protection modules.
If liquidity is momentarily tied up, your request enters a redemption queue, with full transparency on when your funds will be available.

## User Benefits

* Track your earnings through cTokens. The system calculates and displays the notional value of the yield accrued, expressed in the asset originally deposited (e.g., ETH).
* Redeem your cTokens to reclaim deposited assets and accrued yield with minimal hassle. Concrete’s liquidity management system ensures that withdrawals are executed efficiently, even if a redemption queue is needed to ensure liquidity.
* Assets are constantly being shifted to the best-performing money markets. By monitoring interest rates, transaction costs, and liquidity utilization across multiple DeFi platforms, Concrete optimizes returns without the user needing to micromanage their investments.
