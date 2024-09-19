---
title: "How It Works"
description: "How It Works"
sidebar_label: "How It Works"
sidebar_position: 2
---

Concrete is a decentralized protocol that aims to improve the borrowing and liquidation process in decentralized finance (DeFi), offering **automation** and **protection** against market volatility. It addresses inefficiencies in traditional DeFi lending mechanisms and helps users avoid costly liquidations.

Below is a step-by-step breakdown of how Concrete works.

## **Typical Borrowing and Liquidation Process**

In most DeFi lending platforms, such as **Aave**, users follow these basic steps:

### 1. Deposit Collateral (ETH)
   - Users provide collateral (e.g., ETH) to Aave or similar lending protocols to obtain a loan.
   - For example, a user deposits 100 USD worth of ETH into the protocol.

### 2. Borrow Stablecoins (USDC)
   - Users can borrow a percentage of the collateral’s value, typically around 80%.
   - In this case, borrowing 80 USD worth of USDC.

### 3. Market Fluctuations
   - If the collateral's value drops (e.g., ETH falls in price), the user’s position becomes undercollateralized.
   - Once the collateral reaches a threshold, liquidation is triggered.

###. 4. Liquidation on Aave
   - The protocol sells the collateral at auction to recover the borrowed funds.
   - The borrower receives only a small portion of their remaining collateral after liquidation (e.g., 5 USD left after liquidation).

This traditional process is depicted with Aave liquidating the collateral and the user receiving only a fraction of the initial deposit.

**Concrete** steps in **before liquidation** occurs, ensuring that the borrower retains more of their collateral.

## How Concrete Improves the Process (Early Liquidation Protection)

Concrete optimizes this process by integrating **liquidation protection** and **pre-emptive monitoring**, offering users better control over their assets. Here's how Concrete's system works:

### 1. Deposit Collateral via Concrete
   - Instead of interacting directly with Aave, the user deposits ETH into Concrete.
   - Concrete manages the interaction with Aave and other lending protocols on the user’s behalf.

### 2. Borrow USDC
   - The user can still borrow the same amount of USDC, but Concrete actively monitors their position for risk.

### 3. Market Monitoring
   - Concrete continuously checks the collateral’s value. When the market price starts to fall, Concrete steps in **before** liquidation is triggered.
   - This proactive approach ensures the borrower avoids Aave’s full 15% liquidation penalty.

### 4. Pre-Liquidation Closure
   - If Concrete detects that the collateral’s value is approaching the liquidation threshold, it closes the position early.
   - This prevents the user from incurring significant losses, ensuring a much smaller penalty (if any) compared to the traditional liquidation process.

## Concrete Protect

Concrete also offers **protection policies** that users can buy, creating additional buffers before liquidation.

1. **Buy Protection**:
   - Users can purchase protection policies through Concrete. These policies protect them by deploying additional capital if the collateral value drops below a certain threshold.

2. **Protection in Tranches**:
   - The protection is provided in **three tranches**. Each tranche creates a buffer zone before full liquidation occurs.
   - For instance, if the collateral value drops, the first tranche of protection is activated to maintain the loan.

3. **Final Liquidation (If Necessary)**:
   - If the collateral value continues to fall after all three tranches have been activated, Concrete will close the position.
   - However, Concrete’s process ensures a more favorable liquidation outcome for the user, as compared to Aave's direct liquidation.

## Example Scenario

Let’s walk through a simplified example:

- **User Action**: the user deposits 100 USD worth of ETH as collateral into Concrete and borrows 80 USD worth of USDC.

- **Market Drop**: the price of ETH drops, and the collateral’s value decreases from 100 USD to 80 USD. Without protection, Aave would typically liquidate the collateral.

- **Concrete’s Protection**: Concrete steps in when the collateral drops below 85 USD and closes the position early. This avoids Aave’s 15% liquidation penalty, and the user retains a higher portion of their collateral.

- **Protection Activation**: If the user had purchased Concrete's protection, it would have been activated in tranches, giving them additional time before final liquidation occurs.

## Revenue Streams

Concrete generates revenue through multiple streams, including:

- **Loan Protection Fees**: Fees charged for protecting loans from collateral depreciation.
- **Foreclosure Fees**: Fees when Concrete Lite forecloses a loan before liquidation.
- **Liquidity Provision**: Concrete earns a share of the yield from liquidity provider strategies.
- **Swap Fees**: Fees generated when liquidity providers swap their cToken positions.
- **Balance Sheet Strategy**: Using the **Probability Engine**, Concrete optimizes its treasury’s asset holdings and seizes arbitrage opportunities.
