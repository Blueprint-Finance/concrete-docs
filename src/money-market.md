---
title: "Money Market "
description: "Money Market "
sidebar_label: "Money Market "
sidebar_position: 3
---

The Concrete Money Market is a decentralized lending and borrowing platform designed to provide users with secure capital efficiency and liquidity access. It allows users to supply assets, earn interest, and borrow against their collateral in a transparent and optimized environment.

The platform was created to address the demand for a trusted lending infrastructure, particularly for DeFi users and blockchain partners who require a reliable, audited money market.

This guide explains how to use the **Concrete Money Market**, its key features, risk management measures, and collateralization process.

## Why Concrete Money Market?  

The Concrete Money Market was developed to solve a major gap in DeFi:  
- Many blockchain projects and ecosystem partners needed a reliable lending market, but they lacked the resources and expertise to build and secure one.
- Instead of relying on third-party platforms, the team decided to create its own money market by forking AAVE v3, ensuring trusted deployment, security, and integration with Concrete’s DeFi ecosystem.

### Key User Groups  

1. **Liquidity Providers (Lenders)** – Users who supply assets to the market and earn interest.
2. **Borrowers** – Users who borrow against their deposited collateral to access liquidity.
3. **Blockchain Partners** – Projects seeking a trusted, deployable lending market for their users.
4. **DeFi Market Participants** – Users who use recursive borrowing (looping strategies) to maximize capital efficiency.

### Key Features

- **Supply & Borrow Assets** – Deposit assets to earn interest or borrow against your holdings.  
- **Collateralized Borrowing** – Maintain liquidity without selling assets.  
- **Optimized Liquidation Protection** – Ensures efficient and fair liquidation mechanisms.  
- **Multi-Chain Support** – Expanding across multiple blockchain ecosystems.  
- **Robust Risk Management** – Automated monitoring, oracle-based pricing, and liquidation incentives protect against risk.

## How to Use the Concrete Money Market  

### Dashboard

The **Dashboard** provides a snapshot of:

- **Portfolio Value**: The total worth of supplied and borrowed assets.
- **Net APY:** Interest earned from supplied assets minus borrowing costs.
- **Your Supplies & Borrows:** An overview of active deposits and loans.
- **Viewing Transactions:** all Transactions – Logs deposits, withdrawals, and borrowings with export Options – Download transaction history in CSV or JSON format.

![](/img/money-market-1.png)

**Switching Networks:**
Concrete Money Market supports multiple blockchain networks, allowing users to move assets seamlessly.

- **Ethereum Concrete Money Market** – Primary lending market on Ethereum.
- **BNB Chain Fork** – An alternative deployment.

This allows cross-chain lending and borrowing opportunities.

![](/img/money-market-5.png)


### Markets

The **Markets** ta provides an overview of available assets, their supply and borrow metrics, and interest rates** within the lending protocol.

![](/img/money-market-6.png)

Here’s what it displays:

1. **Top-Level Market Summary**
   - **Total Market Size** – The total value of assets supplied to the market.
   - **Total Available Liquidity** – The portion of the supplied assets that are not currently borrowed and can be withdrawn or borrowed.
   - **Total Borrows** – The total amount of assets currently borrowed by users.

2. **Asset-Specific Details**
   - **Asset Name & Symbol** – The digital assets available for supply and borrowing, such as Ethereum (ETH), Wrapped Bitcoin (WBTC), Lombard Staked Bitcoin (LBTC), and stablecoins like USDT and USDC.
   - **Total Supplied** – The total amount of an asset deposited in the market.
   - **Supply APY (Annual Percentage Yield)** – The interest earned by users supplying the asset.
   - **Total Borrowed** – The amount of each asset currently borrowed.
   - **Borrow APY (Variable & Stable)** – The interest rates borrowers must pay for borrowing the asset.

3. **Search & Filtering**: a search bar allows users to find specific assets quickly using name, symbol, or contract address.

4. **Details Button**: clicking **"Details"** provides a deeper breakdown of asset-specific parameters, including Loan-to-Value (LTV), liquidation thresholds, and historical performance.
![](/img/money-market-2.png)

## Supplying Assets (Lending)  

Users can supply assets to earn interest and use them as collateral:
1. Connect your wallet.
![](/img/money-market.png)
2. Choose an asset and click Supply.  
3. Confirm the transaction in your wallet.  

Once supplied, the asset appears in the **"Your Supplies"** section.

**Available Assets to Supply:**
- Asset List – Displays supported assets (ETH, WBTC, USDC, etc.).  
- APY Rates – Shows interest rates earned on supplied assets.  
- Collateral Eligibility – Indicates whether an asset can be used as collateral.

![](/img/money-market-4.png)

## Borrowing Assets

Users can borrow assets by using their supplied collateral:

1. Supply assets to the platform.  
2. Go to "Assets to Borrow" and select an asset.  
3. Click "Borrow" and confirm the transaction.  

Once borrowed, your loan will appear in the **"Your Borrows"** section.

**Available Assets to Borrow**
- Collateral Requirement – Users must first supply assets before borrowing.  
- APY Rates – Interest rates applied to borrowed assets.  
- Loan-to-Value (LTV) Ratio – Determines borrowing limits based on supplied collateral.

## Market Statistics & Risk Management  

The Market Overview provides real-time financial data about the lending pools.  

- Total Reserve Size – Total liquidity available in the protocol.  
- Utilization Rate – The percentage of supplied assets being borrowed.  
- Oracle Price Feeds – Ensures accurate, real-time asset pricing.


**Concrete Money Market employs multiple mechanisms to protect users:**

- **Hard Caps on Collateral** – Limits the maximum amount of any asset used as collateral.
- **Variable LTVs** – Adjusts borrowing power based on liquidity availability.
- **Automated Market Monitoring** – Off-chain monitoring bots detect and prevent bad debt.
- **Oracle-Based Pricing (TWAP & Chainlink Feeds)** – Prevents price manipulation.

![](/img/money-market-3.png)  

## 5. Managing Your Position & Liquidation Protection

Users can optimize and safeguard their positions through risk management tools.

### Collateral & Borrowing Limits

- Max LTV – Maximum borrowing power against collateral.  
- Liquidation Threshold – The point where a position can be liquidated.  
- Liquidation Incentives – Compensation for liquidators in case of forced liquidations.  

### Liquidation Process

If a user’s collateral drops below the liquidation threshold, their position may be liquidated.  

How It Works:
- A Market Maker Strategy ensures that collateralized assets can be liquidated efficiently at a discounted price, preventing bad debt accumulation.
- Borrowers pay a penalty if liquidation occurs to compensate for the forced sale.
- Liquidators profit from incentivized liquidation rewards.

:::note
Maintain a safe LTV ratio to avoid liquidation.
:::

## Future Developments & Enhancements  

Concrete Money Market is constantly evolving with new features and optimizations.

- Expand Asset Support – Adding more cryptocurrencies and tokens.  
- Improve Liquidation Mechanisms – Enhancing efficiency in risk management.  
- UI/UX Enhancements – Refining the user interface for better usability.
