---
title: "How to Borrow Against Collateral"
description: "How to Borrow Against Collateral"
sidebar_label: "How to Borrow Against Collateral"
sidebar_position: 2
---

<!--
<video controls width="90%">
  <source src="/vid/borrow-against-collateral.mp4"/>
</video>
-->

## 1. Access the Borrow Interface

Navigate to the **Borrow** tab and select a loan pair, such as WETH/USDC.
Example: Choose **WETH to borrow USDC** on **Arbitrum**.

## 2. Open Loan  

- Click **Open Loan** to proceed. This will display loan options across supported platforms (e.g., Aave, Compound) with optimized Net APR details.  

## 3. Specify Loan Parameters

- Enter the amount of collateral (e.g., 120 WETH) and the desired borrow amount (e.g., 150,000 USDC). The system will automatically calculate your Loan-to-Value (LTV), current asset prices, liquidation threshold, and Net APR.
- Click **Continue**.

## 4. Supply Collateral

- Confirm the collateral amount by clicking **Supply**.  
- Approve the transaction in MetaMask or any connected wallet.

## 5. Borrow Against Supplied Collateral

- Once collateral is supplied, click **Borrow**.  
- Confirm this transaction in MetaMask.

## 6. Select a Protection Plan (Optional)

If you do not select any plans then by default you will be getting the Concrete Borrow Lite. By default, Concrete Borrow comes with **Concrete Lite**, which forecloses loans early, reducing the risk of liquidation penalties.

After the loan is created, you'll be presented with Concrete protection plans (e.g., Foundation, Fortitude, Fortress). These plans offer different liquidation thresholds and fees.  

- Select a plan or opt to add protection later.  
- Confirm the protection to apply it to your loan.

If a protection plan is enabled, you'll see the estimated gas savings, lower liquidation penalty, and improved liquidation price compared to borrowing directly on Aave.

## 7. Loan Management  

Your loan is now active and protected (if selected).
You can manage your loan in the **Portfolio** tab, which displays:
   - Loan health (LTV, collateral price, etc.)
   - Protection plan status
   - Loan history (transaction details)
