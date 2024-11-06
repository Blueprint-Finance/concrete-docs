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

1. **View Loan Overview**:
   - The loan dashboard shows the current LTV, liquidation threshold, and the status of Concrete Lite.

2. **Enable or Disable Protection**:
   - Users can choose to disable the default protection by toggling the **disable** button next to the **Concrete Lite** status.
   - If disabled, users are fully exposed to the underlying market’s liquidation penalties.
