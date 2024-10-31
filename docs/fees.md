---
title: "Fees"
description: "Fees"
sidebar_label: "Fees"
---

Before diving into the specifics of each service, here’s a quick look at the main fee types users will encounter across Concrete Protocol services:

- **Foreclosure Fee**: Applied only when foreclosure is required; it replaces traditional liquidation penalties.
- **Claim Fee**: Charged per credit line disbursement, incentivizing users to maintain healthy positions.
- **Opening Fee**: Assessed upon policy activation for services like Concrete Protect, with rates based on liquidation proximity.
- **Cancellation Fee**: Set to zero, allowing users to cancel services early without penalty.
- **Deposit, Maintenance, and Withdrawal Fees**: Applied in traditional finance settings but waived in Concrete Earn, maximizing returns for liquidity providers.

## 1. Concrete Borrow

Concrete Borrow provides users with direct access to third-party lending markets, such as AAVE and Compound, without any additional fees. This design encourages usage by high-volume and institutional players by offering streamlined, cost-effective access to DeFi borrowing.

| **Fee Type**             | **Amount** | **Denomination** | **Description**                                                                                      |
|--------------------------|------------|------------------|-----------------------------------------------------------------------------------------------------|
| Borrow & Supply Service  | None       | N/A              | No additional fees from Concrete, so users only pay underlying market fees. This fee-free approach is designed to attract high-volume users and institutional participants. |


## 2. Concrete Lite

Concrete Lite offers foreclosure protection, with fees charged only when foreclosure is required. This foreclosure fee is set below the typical liquidation penalties on other platforms, providing affordable and predictable liquidation risk mitigation.

| **Fee Type**       | **Amount**              | **Denomination** | **Description**                                                                                                      |
|--------------------|-------------------------|------------------|---------------------------------------------------------------------------------------------------------------------|
| Opening Fee        | None                    | N/A              | No cost to activate Concrete Lite, making it an accessible entry point for users seeking foreclosure protection.   |
| Early Safe Closure | None                    | N/A              | Users who close their positions safely before foreclosure incur no charges.                                         |
| Foreclosure Fee    | 3.5% of borrowed amount | Collateral       | Applied only if foreclosure occurs, this fee replaces traditional liquidation penalties (typically 5% or more). It is split as follows: 0.3% to the Earn Vault for liquidity support and 3.2% to the Concrete Treasury for operational costs. |

**Concrete Lite Summary**: Free to activate, Concrete Lite only charges a 3.5% foreclosure fee if foreclosure occurs, providing users with a low-cost safety net against liquidation.

## 3. Concrete Protect

Concrete Protect provides enhanced foreclosure protection with up to three credit line disbursements available upon request during the policy term. The **Opening Fee** is based on how close the user’s position is to liquidation, while **Claim Fees** are applied for each credit line disbursement. This fee structure ensures costs reflect risk level and actual service usage.

| **Fee Type**         | **Amount**                                           | **Denomination** | **Description**                                                                                                                                                |
|----------------------|------------------------------------------------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Opening Fee          | 0.5% - 0.65% of the promised amount                  | Collateral       | A one-time fee based on the user’s proximity to liquidation (LTV). Higher fees apply to users closer to liquidation, reflecting increased risk. The entire fee goes to the Concrete Treasury. |
| Claim Fee            | BTC: 1.65%, ETH: 2.95% per disbursed credit tranche  | Collateral       | Charged for each credit line disbursement (up to 3 times). 80% of this fee goes to the Earn Vault, rewarding liquidity providers, while 20% goes to the Concrete Treasury. |
| Early Cancellation Fee | 0%                                                  | N/A              | No fee for early cancellation, allowing users to cancel protection without penalty before the policy term ends.                                           |
| Foreclosure Fee      | 3.5% of the foreclosed amount                        | Collateral       | Similar to Concrete Lite, this fee replaces high liquidation penalties with a predictable 3.5% charge. The fee distribution mirrors Concrete Lite: 0.3% to Earn Vault, 3.2% to Concrete Treasury. |

## 4. Concrete Earn

Concrete Earn encourages liquidity providers by offering a completely fee-free structure. There are no charges for deposits, maintenance, performance, or withdrawals, creating an ideal environment for maximizing returns without any additional costs.

| **Fee Type**            | **Amount** | **Denomination** | **Description**                                                                                               |
|-------------------------|------------|------------------|--------------------------------------------------------------------------------------------------------------|
| Deposit Fee             | None       | N/A              | No fees on deposits, enabling liquidity providers to allocate funds without initial cost barriers.            |
| Maintenance Fee         | None       | N/A              | The protocol covers operational expenses, meaning no ongoing charges for liquidity providers.                 |
| Performance Fee         | None       | N/A              | No performance fees, allowing Earn Vault participants to retain their entire returns.                        |
| Withdrawal Fee          | None       | N/A              | Funds can be withdrawn without penalty, providing flexibility and control over invested capital.

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
