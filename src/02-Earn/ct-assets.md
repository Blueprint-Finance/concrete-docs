---
title: "Concrete Assets and Yield-Bearing Tokens"
description: "Concrete Earn documentation for concrete Assets, including deposits, withdrawals, and yield participation mechanics."
sidebar_label: "Concrete Assets"
sidebar_position: 1
---

**ct[asset] tokens** are ERC-20 vault shares that users receive when they deposit the underlying asset into a Concrete vault. The token name and symbol (e.g., "Concrete Senior USDC" / "ctSrUSDC") are set when the vault is deployed.

A user's share balance does **not** change over time on its own — what changes is the **value** of each share. Concrete vaults follow the ERC-4626 standard, where yield accrues by increasing the share's exchange rate rather than by minting more shares to the user.

Per-user yield works as follows: When a user deposits, they receive shares priced at the current exchange rate: `shares = assets × totalSupply / totalAssets` (with a +1 in numerator and denominator to prevent inflation attacks).

As strategies generate yield, the vault's `totalAssets` increases while `totalSupply` stays the same, so each share is now redeemable for more of the underlying asset. The share price is `totalAssets / totalSupply`.

Each user's share of the yield is therefore proportional to the number of shares they hold. Their realised yield equals the difference between the assets they can redeem now (`convertToAssets(shares)`) and what they originally deposited.

Yield is recalculated on-chain whenever `accrueYield()` runs, which is triggered automatically on every deposit, mint, withdraw, and redeem via the `withYieldAccrual` modifier.

For example, if a user deposits 1 ETH into an ETH vault when the share price is 1:1, they receive approximately 1 ctETH. Over time, as the vault generates yield, each ctETH becomes redeemable for more than 1 ETH — so 1 ctETH might later be worth 1.04 ETH after a 4% yield period. Share counts don't change; share value does.

## Advantages of ct[assets] Over Similar Tokens in DeFi

### Borrowing Against ct[assets] (Only Future Plans)

Concrete's long-term vision includes credit products that could use vault shares as collateral. These are not currently shipped and are not on the active Earn V2 roadmap. For current product scope, see Earn V2 Overview.

## How ct[assets] Are Structured

ct[assets] are structured as ERC-20 tokens, providing flexibility and compatibility within the Ethereum ecosystem. Users can transfer or swap these tokens between wallets or protocols.

* **Type**: ERC-20
  ct[assets] adhere to the ERC-20 standard, ensuring compatibility and interoperability within the DeFi ecosystem.
* **Yield-Bearing**:
  ct[assets] accrue yield from their respective vaults. Holders can claim the yield accumulated during their ownership period, giving them flexibility over when they receive returns.
* **Transferrable**:
  ct[assets] are fully transferrable, meaning holders can move them between wallets or sell them, allowing for the development of a secondary market. This enables users to trade their positions based on the embedded value of the underlying assets and their projected future yields.
* **Redeemable**:
  Users can redeem ct[assets] to withdraw their original assets plus the accrued yield. When redeemed, the ct[assets] are burned, and the equivalent underlying tokens are returned to the user.

## Tokenization of Deposits

Initially, users can only deposit into Concrete’s predefined vaults, which are programmed with optimized strategies. These vaults have varying risk profiles depending on the type of asset (e.g., ETH, BTC) and the specific chain.

When a user deposits assets (e.g., ETH) into Concrete’s vaults, they receive ct[assets] (like ctETH) in return. These tokens function as a digital receipt, confirming the deposit and entitling the holder to the underlying assets plus any accrued interest.

**What Information is Displayed on the Dashboard?**

Concrete ensures that users have access to real-time updates on their dashboard, showing not only the amount deposited but also the yield that has been accrued. The dashboard also provides a proportional view of the user’s share relative to the total assets in the vault, giving insight into the overall performance of their investment.

* **Total Deposited Amount**: The exact amount of assets deposited into the vault.
* **ct[assets] Balance**: The corresponding ct[assets] received upon deposit, representing the user’s stake in the vault.
* **Real-Time Updates**: The dashboard provides updates on the user’s current holdings and the yield accrued, offering a transparent view of their investments.
* **APY and Yield Performance**: A clear breakdown of the historical yield and current APY of the vault, ensuring users can track their returns effectively.

### Example: How User Balances Increase Over Time

On Day 1, the user holds 1 ctETH (assuming 1:1 share price at deposit), redeemable for 1 ETH. After 90 days, if the vault has generated approximately 3.75% over the period, the same 1 ctETH is now redeemable for ~1.0375 ETH. The share count is unchanged; the exchange rate has moved. The dashboard reflects this through the underlying-asset balance, not a change in ctETH quantity.

## How Yield Accrues with ct[assets]

The accrued yield is based on the underlying performance of the vault strategies, and users can claim these yields when they choose.

Concrete currently offers flexibility in how yields are accrued and presented.

### Yield Accrual Tracking

Yield enters the vault when strategies report a higher allocated value than their last recorded value. The vault updates its cached total assets, then accrues management and performance fees by minting shares to fee recipients. Existing shareholders see this reflected as a higher exchange rate per share. Late depositors enter at the prevailing share price, which already accounts for prior yield — preserving fairness without per-user timestamps.

### Yield Calculation

Yield is calculated from the underlying performance of the vault's strategies — APY across allocated protocols, emission rates, and other relevant factors — and is reflected in the share-to-asset exchange rate. A holder's redeemable value at any time is `convertToAssets(shares)` at the current exchange rate.

## How to Withdraw Liquidity from the Vaults

When a user wants to withdraw liquidity from the protocol, they can redeem or burn their ct[assets].

To redeem ct[assets], users simply convert their tokens back into the original asset. The system ensures that users receive the value of their deposit plus accrued yield. If liquidity is fully available, the process is immediate. However, for larger withdrawals or when liquidity is tied up in other strategies (funds may be deployed in other money markets), the platform might implement a queuing mechanism to manage the flow of funds effectively. This ensures stability and transparency in the withdrawal process.

### Redemption Queue

If immediate liquidity is unavailable, the protocol calculates redemption availability based on current utilization rates and forecasted redemption demands. If immediate redemption isn't possible, the user’s request enters a queue, ensuring that liquidity is released as it becomes available.

### On-Chain Verification

The protocol guarantees transparency by allowing any user to verify the on-chain availability of funds. Users can execute a function that checks liquidity and calculates the estimated redemption period, mathematically guaranteeing the user's funds are redeemable within a defined timeframe.

### User Interface (UI)

The Concrete UI provides a clear view of expected withdrawal timelines, ensuring users know when their liquidity will be available. The platform automatically transfers the funds to the user’s wallet once they become available, simplifying the process.

For example, suppose a user deposits 1 ETH into a vault and receives ctETH. They can monitor their holdings through Concrete’s dashboard, which displays yield accumulation in real-time. If, over a certain period, the user’s vault strategy generates 10% APY, they will see this reflected in their ctETH value. When they decide to redeem their ctETH, they can do so via a simple process that converts their ctETH back into ETH, including the accumulated yield.

