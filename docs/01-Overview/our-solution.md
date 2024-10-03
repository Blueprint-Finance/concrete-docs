---
title: "Our Solution"
description: "An Approach to DeFi Lending and Liquidation Protection"
sidebar_label: "Our Solution"
sidebar_position: 1
---

Concrete provides a **liquidation protection tool**, helping users avoid being liquidated at the worst possible moment. Traditional DeFi loans are liquidated once the **loan-to-value (LTV)** ratio crosses a threshold set by the lender, which can result in users losing a significant portion of their assets.

In Concrete, users can opt into different levels of protection:
- **Concrete Light**: This base-level protection reduces the penalties associated with liquidation, ensuring users lose less value if liquidated. By default, users are enrolled in Concrete Light, which applies a **2% fee**.
- **Concrete Protect**: The premium level of protection, Concrete Protect, prevents liquidation entirely by injecting credit into the user’s loan once their LTV approaches the liquidation threshold. This pulls the loan’s LTV back to safer levels, preventing the loan from entering a liquidation event.

## 1. Concrete Borrow (Base Level)

At the core, **Concrete Borrow** gives users access to optimal lending rates across leading DeFi money markets, such as **Aave**, **Radiant**, **Silo**, and **Compound**. By supplying collateral, users can borrow funds with Concrete's algorithm automatically selecting the most favorable rate across multiple platforms. While this method offers straightforward access to liquidity, it leaves borrowers exposed to the standard liquidation penalties (typically 5-15%) set by the underlying money market.

- **Rate Optimization**: Concrete ensures borrowers get the most competitive rate available by scanning multiple DeFi lending markets.
- **Lending Market Access**: While initially focusing on **Aave**, future updates plan to integrate other major protocols, including **Radiant** and **Compound**.

**Example**:  
A borrower deposits 100 ETH into Concrete and borrows USDC using the best rate available on Aave (or another integrated platform). Without Concrete Lite, if the value of ETH drops significantly, the position would face liquidation, and the user might lose a large portion of their collateral due to high liquidation penalties (10-15%).

## 2. Concrete Lite (Default Protection)

For users who want an extra layer of protection, **Concrete Lite** is applied by default for supported assets (with the option to opt out if desired). This feature proactively manages positions, closing loans before full liquidation is triggered, significantly reducing penalties. It charges a smaller foreclosure fee (3.5%) compared to the typical fees charged by lending markets (5-15%).

By acting before liquidation triggers, Concrete Lite helps users retain more of their collateral.

**Example**:
With Concrete Lite enabled (default for supported assets), the system forecloses the position before liquidation occurs, saving the user from the full liquidation penalty. Instead of losing up to 15% of their collateral, the borrower only pays a 3.5% fee.

## 3. Concrete Protect (Enhanced Protection)

Concrete Protect enhances security by offering **credit lines** that improve the loan's LTV (Loan-to-Value) ratio, protecting users from liquidation when collateral value falls. This layer of protection is added on top of Concrete Lite and deploys capital in **tranches**, each providing an extra buffer against liquidation. If all protection tranches are exhausted, Concrete ensures a more favorable exit by returning any remaining assets, minimizing the impact of liquidation.

- **Tranche-Based Protection**: Users can buy multiple tranches of protection, with each tranche activating additional capital to prevent liquidation.
- **Boosted LTV**: Concrete Protect enhances LTV by injecting credit, reducing the likelihood of liquidation.
- **Exit Protection**: Even if all protections are used, Concrete ensures remaining assets are returned in better standing than typical liquidation.

**Example**:  
For users who want maximum protection, Concrete Protect can be added. When the value of ETH drops, Concrete injects additional capital into the loan, improving the LTV and avoiding liquidation altogether. Protection is purchased in tranches, and if the borrower uses up all the available credit, Concrete closes the position favorably, returning the remaining collateral to the user.

## Yield and Borrowing Strategies

Users can deposit assets directly into **ERC-4626 standard vaults**, which execute sophisticated and automated yield strategies. This allows users to skip the arduous process of researching various protocols or connecting to multiple wallets. Instead, they can deposit assets (such as Ethereum or stablecoins) into Concrete’s vaults, and the platform optimizes returns across various decentralized money markets.

Once deposited, users receive **Concrete tokens** (e.g., Concrete ETH) that represent their holdings in the vault. These tokens can then be used as collateral within the Concrete ecosystem to borrow against, providing seamless integration between earning and borrowing. This functionality eliminates the need to repeatedly withdraw, move assets, and deposit into other money markets.

Concrete aims to create a sustainable cycle of capital inflow and yield generation. Alongside Loan Protect, Concrete's vault products serve as vital tools, enabling the deployment of liquidity into yield-optimizing strategies while potentially generating revenue through other mechanisms like IP features.

## Money Market Functionality

Users can utilize their shares (tokens like ETH) from the ERC-4626 vaults as collateral in the money market. This allows them to create positions in the market and earn additional returns by letting other users borrow their collateralized assets, including the native Concrete Token (CT).

## Network-Specific Routing
Concrete currently operates within the constraints of specific blockchain ecosystems. For instance, if a money market like Aave is unavailable on a particular chain, Concrete can only operate within the markets present on that chain. This isolated routing is part of Concrete's current design, which focuses on optimizing within each blockchain's ecosystem.

## Hub-and-Spoke Architecture

Concrete's architecture follows a **hub-and-spoke model**, where each blockchain acts as a spoke connected to a central hub. The hub handles computation and accounting for cross-chain interactions. Future iterations of this architecture will also support decentralized exchanges, enabling seamless liquidity movement and collateralized borrowing across different blockchains.
