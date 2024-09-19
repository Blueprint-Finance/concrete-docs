---
title: "Our Solution"
description: "An Approach to DeFi Lending and Liquidation Protection"
sidebar_label: "Our Solution"
sidebar_position: 1
---

Our solution offers three distinct levels of protection for users with varying needs:

* **Concrete Borrow**
* **Concrete Lite**
* **Concrete Protect**

## 1. Concrete Borrow (Base Level)

At the core, **Concrete Borrow** gives users access to optimal lending rates across leading DeFi money markets, such as **Aave**, **Radiant**, **Silo**, and **Compound**. By supplying collateral, users can borrow funds with Concrete's algorithm automatically selecting the most favorable rate across multiple platforms. While this method offers straightforward access to liquidity, it leaves borrowers exposed to the standard liquidation penalties (typically 5-15%) set by the underlying money market.

- **Rate Optimization**: Concrete ensures borrowers get the most competitive rate available by scanning multiple DeFi lending markets.
- **Lending Market Access**: While initially focusing on **Aave**, future updates plan to integrate other major protocols, including **Radiant** and **Compound**.

## 2. Concrete Lite (Default Protection)

For users who want an extra layer of protection, **Concrete Lite** is applied by default for supported assets (with the option to opt out if desired). This feature proactively manages positions, closing loans before full liquidation is triggered, significantly reducing penalties. It charges a smaller foreclosure fee (3.5%) compared to the typical fees charged by lending markets (5-15%).

By acting before liquidation triggers, Concrete Lite helps users retain more of their collateral.

## 3. Concrete Protect (Enhanced Protection)

Concrete Protect enhances security by offering **credit lines** that improve the loan's LTV (Loan-to-Value) ratio, protecting users from liquidation when collateral value falls. This layer of protection is added on top of Concrete Lite and deploys capital in **tranches**, each providing an extra buffer against liquidation. If all protection tranches are exhausted, Concrete ensures a more favorable exit by returning any remaining assets, minimizing the impact of liquidation.

- **Tranche-Based Protection**: Users can buy multiple tranches of protection, with each tranche activating additional capital to prevent liquidation.
- **Boosted LTV**: Concrete Protect enhances LTV by injecting credit, reducing the likelihood of liquidation.
- **Exit Protection**: Even if all protections are used, Concrete ensures remaining assets are returned in better standing than typical liquidation.

## Examples

Let’s illustrate how **Concrete Borrow**, **Concrete Lite**, and **Concrete Protect** work together to safeguard users:

- **Example 1**:  
   *A borrower deposits 100 ETH into Concrete and borrows USDC using the best rate available on Aave (or another integrated platform). Without Concrete Lite, if the value of ETH drops significantly, the position would face liquidation, and the user might lose a large portion of their collateral due to high liquidation penalties (10-15%).*

- **Example 2 (Concrete Lite)**:  
   *With Concrete Lite enabled (default for supported assets), the system forecloses the position before liquidation occurs, saving the user from the full liquidation penalty. Instead of losing up to 15% of their collateral, the borrower only pays a 3.5% fee.*

- **Example 3 (Concrete Protect)**:  
   *For users who want maximum protection, Concrete Protect can be added. When the value of ETH drops, Concrete injects additional capital into the loan, improving the LTV and avoiding liquidation altogether. Protection is purchased in tranches, and if the borrower uses up all the available credit, Concrete closes the position favorably, returning the remaining collateral to the user.*
