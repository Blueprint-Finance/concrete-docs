---
title: "Our Solution"
description: "An Approach to DeFi Lending and Liquidation Protection"
sidebar_label: "Our Solution"
sidebar_position: 1
---

| **Solution**           | **Concrete Earn**                                                                                                   | **Concrete Borrow (with Concrete Lite)**                                                                                                   | **Concrete Protect**                                                                                                       |
|-----------------------|---------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| **Purpose**           | Provides a fee-free yield-generating vault for liquidity providers                                                 | Offers optimized DeFi borrowing rates with default foreclosure protection through Concrete Lite                                             | Premium protection that prevents liquidation by injecting credit when LTV is at risk                                        |
| **Protection Level**  | N/A                                                                                                                | Concrete Lite reduces liquidation penalties by foreclosing early (default protection)                                                       | Prevents liquidation entirely by improving LTV through credit line injections                                              |
| **Fee Structure**     | None – all deposit, maintenance, and withdrawal fees waived                                                        | 3.5% foreclosure fee (vs. standard 5-15% on other platforms)                                                                                | Opening Fee + Claim Fee per credit line disbursement; protects LTV by adding capital before liquidation                     |
| **Usage Scenario**    | Ideal for liquidity providers looking to maximize returns without additional fees                                  | Suitable for users needing low-cost access to DeFi lending, with reduced risk of high liquidation penalties                                | Best for high-risk borrowers seeking maximum protection from liquidation, with flexible credit-based support                |
| **Example Outcome**   | Earns yield by deploying funds across multiple DeFi protocols                                                      | Forecloses a position if LTV approaches the liquidation threshold, charging a lower foreclosure fee                                        | Injects credit to improve LTV, avoiding liquidation altogether and ensuring asset recovery even in high-volatility markets  |


In Concrete, users can opt into different levels of protection:

- **Concrete Light**: Reduces the penalties associated with liquidation, ensuring users lose less value if liquidated. By default, users are enrolled in Concrete Light, which applies a **3.5% fee**.

- **Concrete Protect**: The premium level of protection, prevents liquidation entirely by injecting credit into the user’s loan once their LTV approaches the liquidation threshold. This pulls the loan’s LTV back to safer levels, preventing the loan from entering a liquidation event.

## 1. Concrete Borrow (Base Level)

At the core, **Concrete Borrow** gives users access to optimal lending rates across leading DeFi money markets, such as **Aave**, **Radiant**, **Silo**, and **Compound**. By supplying collateral, users can borrow funds with Concrete's algorithm automatically selecting the most favorable rate across multiple platforms. While this method offers straightforward access to liquidity, it leaves borrowers exposed to the standard liquidation penalties (typically 5-15%) set by the underlying money market.

- **Rate Optimization**: Concrete ensures borrowers get the most competitive rate available by scanning multiple DeFi lending markets.
- **Lending Market Access**: While initially focusing on **Aave**, future updates plan to integrate other major protocols, including **Radiant** and **Compound**.

**Example**:  
A borrower deposits 100 ETH into Concrete and borrows USDC using the best rate available on Aave (or another integrated platform). Without Concrete Lite, if the value of ETH drops significantly, the position would face liquidation, and the user might lose a large portion of their collateral due to high liquidation penalties (10-15%).

## 2. Concrete Lite (Default Protection)

**Concrete Lite** provides basic liquidation prevention for borrowers. By default, it activates for supported assets (with the option to opt out if desired), closing positions before they reach full liquidation. Unlike traditional DeFi platforms that impose 5-15% penalties upon liquidation, Concrete Lite forecloses positions early, saving users from steep liquidation fees and charging a reduced 3.5% foreclosure fee instead. This feature operates automatically, allowing users to avoid liquidation with minimal intervention.

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

Once deposited, users receive **Concrete Assets** (e.g., ctETH) that represent their holdings in the vault. These tokens can then be used as collateral within the Concrete ecosystem to borrow against, providing seamless integration between earning and borrowing. This functionality eliminates the need to repeatedly withdraw, move assets, and deposit into other money markets.

Concrete aims to create a sustainable cycle of capital inflow and yield generation. Alongside Loan Protect, Concrete's vault products serve as vital tools, enabling the deployment of liquidity into yield-optimizing strategies while potentially generating revenue through other mechanisms like IP features.

## Money Market Functionality

Users can utilize their shares (tokens like ETH) from the ERC-4626 vaults as collateral in the money market. This allows them to create positions in the market and earn additional returns by letting other users borrow their collateralized assets.

## Network-Specific Routing
Concrete currently operates within the constraints of specific blockchain ecosystems. For instance, if a money market like Aave is unavailable on a particular chain, Concrete can only operate within the markets present on that chain. This isolated routing is part of Concrete's current design, which focuses on optimizing within each blockchain's ecosystem.

## Hub-and-Spoke Architecture

Concrete's architecture follows a **hub-and-spoke model**, where each blockchain acts as a spoke connected to a central hub. The hub handles computation and accounting for cross-chain interactions. This architecture allows users to manage liquidity across multiple blockchains, overcoming the typical fragmentation in DeFi ecosystems. Users will be able to deposit assets on one chain (e.g., Ethereum) and borrow against them on another (e.g., Avalanche), ensuring liquidity is used in the most effective way across platforms.

 Future iterations of this architecture will also support decentralized exchanges, enabling seamless liquidity movement and collateralized borrowing across different blockchains.

## Roadmap

Concrete's roadmap includes robust plans for cross-chain liquidity and asset management, to be implemented across different stages:

### V1

All liquidity remains localized within a specific blockchain, with no cross-chain movement allowed.

### V2

Users will be able to swap assets within the same blockchain ecosystem, facilitating smoother transitions between vaults without external trading.

### V3

Cross-chain lending will be introduced, allowing users to deposit assets on one blockchain and borrow against them on another.

### V4

Full cross-chain liquidity management will enable users to consolidate assets and borrow across multiple connected blockchains.
