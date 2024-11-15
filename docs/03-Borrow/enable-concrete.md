---
title: "How to Activate Concrete Borrow (Default Lite)"
description: "Borrow Overview"
sidebar_label: "How to Activate Concrete"
sidebar_position: 1
---

<video controls width="90%">
  <source src="/vid/get-lite.mov"/>
</video>

## Concrete Borrow (Lite)

Concrete Borrow (Lite) is the foundational borrowing solution in the Concrete ecosystem, providing users with a streamlined experience and default protection against liquidation.

By default, Concrete Borrow comes with **Concrete Lite**, which forecloses loans early, reducing the risk of liquidation penalties:

- **Early Foreclosure**: If the Loan-to-Value (LTV) ratio approaches the liquidation threshold, Concrete Lite triggers an early foreclosure, avoiding traditional liquidation.
- **Reduced Fees**: This process incurs a **3.5% foreclosure fee**, significantly lower than typical market liquidation penalties (5%-15%).
- **No Activation Fee**: Concrete Borrow (Lite) is active by default, with no upfront costs.
- **Gas Fee Subsidy**: Borrowers receive partial coverage for gas fees when taking out loans through Concrete.

## Managing Concrete Borrow (Lite)

![](/img/borrow-4.png)

1. **View Loan Overview**:
   - The loan dashboard shows the current LTV, liquidation threshold, and the status of Concrete Lite.

2. **Enable or Disable Protection**:
   - Users can choose to disable the default protection by toggling the **disable** button next to the **Concrete Lite** status.
   - If disabled, users are fully exposed to the underlying market’s liquidation penalties.

### Loan Overview Details

1. **LTV (Loan-to-Value):**
   - Displays the percentage of the loan amount relative to the value of the collateral.
   - In this case, the LTV is 51.23%, indicating the health of the position.

2. **Loan Health:**
   - A visual bar showing the current health status of the loan.
   - As marked "Healthy," it shows that the loan is far from the liquidation threshold.

3. **Liquidation LTV & Price:**
   - Liquidation LTV: 80.80%, representing the point at which liquidation occurs.
   - Liquidation Price: $1,547.89, the collateral value at which liquidation would be triggered.

4. **Current Collateral Price:**
   - The market price of the collateralized asset, $2,443.85.

5. **Concrete Lite Status:**
   - **Active** status indicates automatic foreclosure protection is enabled.
   - Reduces liquidation penalties by performing a controlled foreclosure before full liquidation occurs, minimizing user losses.

### Loan Details

1. **Amount Supplied & Supplied Value:**
   - Indicates the user deposited 119.928 WETH, valued at $292,811.70.

2. **Total Debt & Net APR:**
   - Displays the current outstanding loan value ($149,993.45) and the applied interest rate (13.59% Net APR).

3. **History Section:**
   - A record of all loan-related actions, including:
     - **Initial Borrow**: User borrowed $150,000 USDC.
     - **Subscribe Protection**: Protection Status.
     - **Cancel Protection**: Shows attempts to deactivate protection.
