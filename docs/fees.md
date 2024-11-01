---
title: "Fees"
description: "Fees"
sidebar_label: "Fees"
---

Before diving into the specifics of each service, here’s a quick look at the main fee types users will encounter across Concrete Protocol services:

- **Foreclosure Fee**: Applied only when foreclosure is required; it replaces traditional liquidation penalties.
- **Claim Fee**: Charged per credit line disbursement (up to 3)
- **Opening Fee**: Assessed upon policy activation of Concrete Protect, it is based on how close the user’s position is to liquidation. It varies by the user’s liquidation distance (measured by Loan-to-Value (LTV) ratio). Users closer to liquidation pay a higher fee, managed through fee “buckets” calculated by backend and frontend systems.
- **Cancellation Fee**: Set to zero, allowing users to cancel services early without penalty.
- **Deposit, Maintenance, and Withdrawal Fees**: Applied in traditional finance settings but waived in Concrete Earn, maximizing returns for liquidity providers.

## 1. Concrete Lite: Your Affordable, Set-and-Forget Protection

Concrete Lite offers foreclosure protection with zero activation cost, so you get peace of mind without spending a penny upfront. The foreclosure fee is clarified to be the same for all assets.

If you ever face foreclosure, Concrete Lite’s fee is 3.5%—significantly lower than typical liquidation penalties of 5% or more. This means more savings in the long run and a safeguard to keep your assets safe.

**Why Concrete Lite?**
- **Zero Activation Cost**: Get foreclosure protection from the start, free of charge.
- **Lower Penalties**: Pay only a 3.5% foreclosure fee if liquidation becomes necessary, compared to the 5%+ standard on other platforms.
- **Set-and-Forget Security**: With Concrete Lite, you can relax knowing your assets have an affordable safety net.

**Fee Type**       | **Amount**              | **Denomination** | **Description**                                                                                                      |
|--------------------|-------------------------|------------------|---------------------------------------------------------------------------------------------------------------------|
| Opening Fee        | None                    | N/A              | No cost to activate Concrete Lite, making it an accessible entry point for users seeking foreclosure protection.   |
| Early Safe Closure | None                    | N/A              | Users who close their positions safely before foreclosure incur no charges.                                         |
| Foreclosure Fee    | 3.5% of borrowed amount | Collateral       | Applied only if foreclosure occurs, this fee replaces traditional liquidation penalties (typically 5% or more). It is split as follows: 0.3% to the Earn Vault for liquidity support and 3.2% to the Concrete Treasury for operational costs. |

## 2. Concrete Protect: Advanced Safety for Active Users

Concrete Protect adds powerful, flexible protection for users who want to take a more hands-on approach to managing their risk. With Concrete Protect, you have up to three credit line disbursements available during the policy term, giving you access to liquidity exactly when you need it. Its fee structure adapts to your position’s specific needs, with a one-time **Opening Fee** based on your distance from liquidation and a **Claim Fee** applied only when you actually use a credit line.

**Why Concrete Protect?**
- **Dynamic Risk Coverage**: A flexible fee structure ensures you only pay based on your actual exposure and service use.
- **Credit Line on Demand**: Access liquidity up to three times per policy term, giving you the resources to prevent liquidation.
- **Built-in Savings**: Say goodbye to high liquidation fees by proactively managing your position with tailored protection.


| **Fee Type**         | **Amount**                                           | **Denomination** | **Description**                                                                                                                                                |
|----------------------|------------------------------------------------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Opening Fee          | 0.5% - 0.65% of the promised amount                  | Collateral       | A one-time fee based on the user’s proximity to liquidation (LTV). Higher fees apply to users closer to liquidation, reflecting increased risk. The entire fee goes to the Concrete Treasury. |
| Claim Fee            | BTC: 1.65%, ETH: 2.95% per disbursed credit tranche  | Collateral       | Charged for each credit line disbursement (up to 3 times). 80% of this fee goes to the Earn Vault, rewarding liquidity providers, while 20% goes to the Concrete Treasury. |
| Early Cancellation Fee | 0%                                                  | N/A              | No fee for early cancellation, allowing users to cancel protection without penalty before the policy term ends.                                           |
| Foreclosure Fee      | 3.5% of the foreclosed amount                        | Collateral       | Similar to Concrete Lite, this fee replaces high liquidation penalties with a predictable 3.5% charge. The fee distribution mirrors Concrete Lite: 0.3% to Earn Vault, 3.2% to Concrete Treasury. |

## 3. Concrete Earn: Maximize Returns with a Zero-Fee Structure

Concrete Earn is designed with liquidity providers in mind, providing a fee-free experience that maximizes your returns. With **no deposit, maintenance, performance, or withdrawal fees**, Concrete Earn is the go-to solution for those looking to allocate funds with zero operational friction. Whether you're contributing to the liquidity pool or withdrawing, you won’t encounter hidden costs, allowing you to keep every bit of your yield.

**Why Concrete Earn?**
- **Fully Fee-Free**: With no charges on deposits, withdrawals, or maintenance, every penny you earn stays with you.
- **Optimized for Maximum Returns**: By removing all barriers, Concrete Earn enables you to invest and withdraw seamlessly, focusing purely on yield.
- **Flexible and Transparent**: Funds are accessible whenever you need them, with no penalties or performance fees, giving you complete control over your investments.

| **Fee Type**            | **Amount** | **Denomination** | **Description**                                                                                               |
|-------------------------|------------|------------------|--------------------------------------------------------------------------------------------------------------|
| Deposit Fee             | None       | N/A              | No fees on deposits, enabling liquidity providers to allocate funds without initial cost barriers.            |
| Maintenance Fee         | None       | N/A              | The protocol covers operational expenses, meaning no ongoing charges for liquidity providers.                 |
| Performance Fee         | None       | N/A              | No performance fees, allowing Earn Vault participants to retain their entire returns.                        |
| Withdrawal Fee          | None       | N/A              | Funds can be withdrawn without penalty, providing flexibility and control over invested capital.

## 4. Concrete Borrow: Seamless, Direct Access to DeFi Lending Markets

Concrete Borrow is your gateway to major third-party lending platforms like AAVE and Compound, with **zero additional fees** from Concrete Protocol. This means that you benefit from all the borrowing advantages DeFi offers, without paying extra fees, making it an ideal choice for both high-volume and institutional users who value efficiency and low costs. With Concrete Borrow, you’re only responsible for the underlying market fees, making it one of the most cost-effective ways to manage lending in the DeFi space.

**Why Concrete Borrow?**
- **Zero Additional Fees**: Pay only the underlying market fees from AAVE, Compound, or similar platforms, keeping your borrowing costs low.
- **Direct Market Access**: Enjoy streamlined access to top DeFi lending markets directly through Concrete Protocol.
- **Tailored for High-Volume Users**: Concrete Borrow is designed to support high-volume borrowing and institutional strategies, keeping costs down while giving you a direct line to essential DeFi tools.


| **Fee Type**             | **Amount** | **Denomination** | **Description**                                                                                      |
|--------------------------|------------|------------------|-----------------------------------------------------------------------------------------------------|
| Borrow & Supply Service  | None       | N/A              | No additional fees from Concrete, so users only pay underlying market fees. This fee-free approach is designed to attract high-volume users and institutional participants. |


## Fee Allocation

Concrete Protocol’s fee structure is designed to support both its treasury and liquidity providers through the Earn Vault. Specific fees, like the **foreclosure fee** and **claim fee**, are divided between the Concrete Treasury (which manages protocol operations) and the Earn Vault (which compensates liquidity providers who fund protective measures). The primary fee distributions are as follows:

| **Fee Type**         | **Total Fee** | **Earn Vault Allocation** | **Concrete Treasury Allocation** | **Purpose**                                                                                                           |
|----------------------|---------------|---------------------------|----------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| **Foreclosure Fee**  | 3.5%          | 0.3%                      | 3.2%                             | Applied only upon foreclosure, replacing traditional liquidation penalties.                                          |
| **Claim Fee**        | Varies        | 80%                       | 20%                              | Charged for each credit line disbursement in Concrete Protect, incentivizing healthy LTV maintenance and liquidity.   |


## Additional Clarifications

- **Risk and Pricing Background**: Concrete Protocol uses actuarial methods and risk analysis to ensure fees remain fair and reflect actual exposure. For instance, **Opening Fees** are carefully calibrated based on a user’s liquidation risk. By integrating traditional financial principles, Concrete ensures that fees are adjusted to align with the levels of protection each user actually needs.

- **Policy Duration in Concrete Protect**: Concrete Protect policies last 30 days, with a fixed cost during this period. Users can easily renew their policies, anticipating consistent protection while being able to budget for predictable costs over time.

- **Claim Fees (Concrete Protect)**: Each credit line disbursement incurs a Claim Fee, with 80% directed to the Earn Vault, rewarding liquidity providers, and 20% going to the Concrete Treasury. This fee is structured to align with market-standard flash loan rates, keeping Earn Vault providers competitive while ensuring sustainable income.

- **Foreclosure Fee Logic**: The foreclosure process involves a flash loan to cover the borrower’s outstanding debt, and Concrete Protocol liquidates the necessary collateral to repay the flash loan and associated fees. This method minimizes capital risk for Concrete, enabling predictable, fixed fees instead of volatile liquidation costs.

- **Variable Adjustments in Fees**: Concrete’s fee structure includes a flexible 10% adjustment range on claim and foreclosure fees, allowing the protocol to adapt to market conditions. This adjustment flexibility benefits both long-term users and liquidity providers, maintaining fairness as demand and capital needs fluctuate.
