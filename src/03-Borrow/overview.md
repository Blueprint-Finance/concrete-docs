---
title: "Overview"
description: "Borrow Overview"
sidebar_label: "Overview"
sidebar_position: 0
---

**Concrete Borrow** is Concrete Protocol’s decentralized lending and borrowing feature, designed to streamline access to liquidity across top DeFi money markets while offering unique protections. By integrating directly with multiple platforms such as Aave, Compound, and Silo, Concrete Borrow enables users to seamlessly find the most favorable rates, manage loans in one unified view, and benefit from unique protections like **Concrete Lite**. This article provides a technical breakdown of how Concrete Borrow works and the features that distinguish it from traditional DeFi borrowing.

| **Feature**                | **Concrete Borrow**                                                      |
|----------------------------|--------------------------------------------------------------------------|
| **Collateral Management**  | Deposits secured in Concrete Vault, issued as tokenized cETH            |
| **Rate Optimization**      | Aggregates best rates across Aave, Compound, Silo, and Radiant          |
| **Unified Management**     | One interface for managing loans across multiple DeFi money markets     |
| **Liquidation Protection** | Concrete Lite activated by default, with flash loan foreclosure at 2%   |
| **Gas Cost Reduction**     | Concrete subsidizes a portion of gas costs                              |
| **Historical Rate Data**   | 90-day interest rate tracking for user insight                          |

## Key Benefits

Concrete Borrow is crafted to address two primary user needs: accessing optimal borrowing rates and minimizing liquidation risks. Here’s a closer look at the advantages:

### Rate Optimization Across Multiple Markets

Concrete aggregates rates from various money markets and displays the most competitive borrowing options, saving users the hassle of manually comparing platforms. This optimization leverages smart contract architecture to automatically route users’ loans to platforms offering the best terms based on real-time market data.

### Unified Loan Management

By consolidating loans from multiple platforms into a single interface, Concrete Borrow enables users to view, track, and manage all of their loans in one dashboard. This simplifies portfolio monitoring and management, especially for users who hold loans across different platforms.

### Reduced Gas Costs

Concrete subsidizes a significant portion of the gas costs associated with borrowing, making transactions more cost-effective for users. This makes borrowing through Concrete particularly appealing for high-frequency users and larger portfolios where gas costs could otherwise add up.

### Enhanced Protection Against Liquidation

With **Concrete Lite** enabled by default, borrowers benefit from a foreclosure mechanism that intervenes before their position is fully liquidated. Unlike traditional DeFi platforms, which impose 5-15% liquidation penalties, Concrete Lite forecloses the loan early with a reduced 2% fee, helping users retain more of their assets.

## How Concrete Borrow Works

### 1. Deposit Collateral

To begin borrowing, users first deposit assets (e.g., ETH) into a **Concrete Vault**. In return, they receive a tokenized proof of deposit, known as **Concrete ETH (cETH)**, which represents their collateral on the platform. This token can be used to secure loans within the Concrete ecosystem.

### 2. Borrow Against Collateral

Using their cETH as collateral, users can borrow stablecoins or other assets. Concrete Borrow automatically finds the best rates from integrated money markets, ensuring that users receive the most competitive loan terms available. The protocol’s integration includes Aave, Compound, Silo, and Radiant, with plans to expand to additional DeFi platforms.

### 3. Rate Aggregation and Dynamic Optimization

Concrete Borrow’s backend is engineered to monitor rates, collateral limits (LTVs), and liquidity pools across all supported money markets. This allows Concrete to dynamically adjust the borrowing route and ensure users always have access to optimal rates. By implementing smart contract proxies, Concrete can move users’ loans to more favorable rates if they fluctuate significantly, effectively providing a “hot swap” of lending platforms without additional user input.

### 4. Liquidation Protection through Concrete Lite

Concrete Lite, enabled by default, protects users from standard liquidation events. When a position’s LTV ratio approaches the threshold for liquidation, Concrete’s foreclosure mechanism initiates a flash loan to cover the debt. This ensures the user’s position is closed with a minimal 2% fee rather than incurring the typical 5-15% penalty.

   - **Opt-Out Flexibility**: Users can choose to opt out of Concrete Lite if they prefer to manage liquidation risk manually.
   - **Automatic Intervention**: The foreclosure process activates automatically without user intervention, providing peace of mind and asset preservation.

### 5. Repayment and Withdrawal

To close a position, users must repay the borrowed amount. Once the loan is fully repaid, they can redeem their cETH tokens for the original ETH deposit. Concrete ensures all assets remain accessible upon loan closure, with no additional withdrawal fees.

## Technical Infrastructure and Optimization

Concrete Borrow leverages a robust technical infrastructure to deliver seamless access to borrowing across DeFi platforms. Here’s a breakdown of how Concrete optimizes loan management:

1. **Smart Contract Architecture for Rate Aggregation**  
   Concrete’s blueprint includes a smart contract system designed to manage user accounts across multiple money markets. Each borrower’s profile is stored as a unique **blueprint** that tracks positions and integrates with Aave, Compound, and other markets in real time.

2. **Flash Loan Mechanism**  
   The foreclosure feature in Concrete Lite is powered by flash loans, which enable the protocol to cover users’ positions without holding excess capital. By taking a temporary flash loan to cover collateral at risk, Concrete forecloses and returns assets with a much lower penalty compared to standard liquidation.

3. **Comprehensive Monitoring**  
   Concrete’s monitoring system continuously tracks all integrated money markets, updating metrics like interest rates, LTVs, liquidation activity, and liquidity availability. This data enables Concrete to optimize loan allocations and maintain a reliable, up-to-date portfolio view for users.

4. **User-Centric Rate Transparency**  
   While Concrete does not provide financial advice, it offers historical rate data (e.g., 90-day interest rate ranges) for users to assess market trends. Concrete allows users to compare current rates with historical averages, helping them make informed borrowing decisions.


## Workflow Overview: From Loan Initiation to Repayment

Here’s a step-by-step outline of the complete Concrete Borrow process:

1. **Collateral Deposit**  
   The user deposits assets into a Concrete Vault, receiving cETH as collateral.

2. **Borrowing Initiation**  
   Using cETH, the user borrows stablecoins or other assets. Concrete Borrow selects the best market rate from integrated platforms, ensuring competitive loan terms.

3. **Rate Management and Dynamic Optimization**  
   Concrete monitors rates continuously and adjusts the user’s borrowing route if necessary, ensuring the lowest cost of capital across the portfolio.

4. **Protection and Foreclosure**  
   Concrete Lite’s foreclosure feature activates if the position approaches liquidation, executing a flash loan to cover the user’s position. This minimizes liquidation penalties to a 2% fee instead of the standard 5-15%.

5. **Repayment and Collateral Withdrawal**  
   The user repays the loan, redeems their cETH for the original collateral, and can withdraw assets from the Concrete Vault.

## Fees

| **Fee Type**             | **Amount**              | **Denomination** | **Description**                                                                                                      |
|--------------------------|-------------------------|------------------|---------------------------------------------------------------------------------------------------------------------|
| Borrow & Supply Service  | None                    | N/A              | No additional fees from Concrete; users only pay underlying market fees. Designed to attract high-volume users and institutional participants. |
| Opening Fee              | None                    | N/A              | No cost to activate Concrete Lite, making it an accessible entry point for users seeking foreclosure protection.     |
| Early Safe Closure       | None                    | N/A              | Users who close their positions safely before foreclosure incur no charges.                                          |
| Foreclosure Fee          | 3.5% of borrowed amount | Collateral       | Applied only if foreclosure occurs. Replaces traditional liquidation penalties (typically 5% or more). Split as follows: 0.3% to Earn Vault, 3.2% to Concrete Treasury for operational costs. |
