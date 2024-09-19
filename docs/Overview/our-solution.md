---
title: "Our Solution"
description: "An Approach to DeFi Lending and Liquidation Protection"
sidebar_label: "Our Solution"
sidebar_position: 1
---

Our solution offers three distinct levels of protection for users with varying needs: **Concrete Borrow**, **Concrete Lite**, and **Concrete Protect**.

## 1. Concrete Borrow (Base Level)
At the base level, **Concrete Borrow** provides users with access to the best lending rates across multiple money markets like **Aave**, **Radiant**, **Silo**, and **Compound**. Users can borrow funds by supplying collateral, and the protocol optimizes their loan by choosing the most favorable rate. This is the most straightforward way to access liquidity, without additional protection from liquidation. However, users are still subject to the standard liquidation penalties (e.g., 5-15%) from the money market.

- **Best Rate Optimization**: Concrete scans multiple DeFi lending markets to ensure borrowers get the best rate available on their selected chain.
- **Accessible Lending Markets**: Initially focusing on **Aave**, Concrete aims to expand to other protocols such as **Radiant** and **Compound** for future versions.

## 2. Concrete Lite (Default Protection)
For users who want an extra layer of protection, **Concrete Lite** is applied by default for supported assets (although users can opt out). **Concrete Lite** helps foreclose loans before full liquidation, reducing the penalties borrowers would otherwise face. This service charges a smaller foreclosure fee (3.5%) compared to the typical fees charged by lending markets (5-15%). By acting before liquidation triggers, Concrete Lite helps users retain more of their collateral.

- **Automatic Foreclosure**: Concrete Lite automatically forecloses a loan before liquidation occurs, saving users from higher penalties imposed by the lending market.
- **Lower Fees**: Instead of paying up to 15% in liquidation fees, users are only charged a 3.5% fee by Concrete Lite, offering significant savings.

## 3. Concrete Protect (Enhanced Protection)
Concrete Protect adds a further layer of security by offering **credit lines** that protect users from liquidation even when their collateral depreciates. This service is on top of Concrete Lite, enhancing the loan's LTV (Loan-to-Value) ratio by injecting credit into the position when necessary. Users can purchase protection in **tranches**, with each tranche providing additional liquidation buffers. If all tranches are used up, Concrete ensures that any remaining assets are returned to the user in good standing, preventing them from being wiped out.

- **Protection in Tranches**: Concrete Protect allows users to buy protection in multiple tranches, deploying extra capital to cover any further depreciation.
- **Credit Lines to Improve LTV**: By using Concrete Protect, users get access to credit lines that boost their LTV, minimizing the risk of liquidation.
- **Final Liquidation Protection**: Even if the collateral drops through all protection levels, Concrete ensures a more favorable exit than typical liquidation, returning remaining assets to the user.

## Examples

Let’s illustrate how **Concrete Borrow**, **Concrete Lite**, and **Concrete Protect** work together to safeguard users:

- **Example 1**:  
   *A borrower deposits 100 ETH into Concrete and borrows USDC using the best rate available on Aave (or another integrated platform). Without Concrete Lite, if the value of ETH drops significantly, the position would face liquidation, and the user might lose a large portion of their collateral due to high liquidation penalties (10-15%).*

- **Example 2 (Concrete Lite)**:  
   *With Concrete Lite enabled (default for supported assets), the system forecloses the position before liquidation occurs, saving the user from the full liquidation penalty. Instead of losing up to 15% of their collateral, the borrower only pays a 3.5% fee.*

- **Example 3 (Concrete Protect)**:  
   *For users who want maximum protection, Concrete Protect can be added. When the value of ETH drops, Concrete injects additional capital into the loan, improving the LTV and avoiding liquidation altogether. Protection is purchased in tranches, and if the borrower uses up all the available credit, Concrete closes the position favorably, returning the remaining collateral to the user.*
