---
title: "Concrete Assets and Yield-Bearing Tokens"
description: "ct[assets] and Yield-Bearing Tokens"
sidebar_label: "Concrete Assets"
sidebar_position: 0
---

ct[assets] are yield-bearing tokens issued to users when they provide liquidity to Concrete’s vaults. Each ct[asset] represents the underlying asset deposited plus any yield accrued during the holding period. When users deposit into an asset-specific vault, they receive ct[asset-type] tokens, which function as a proof of their stake in the vault.

These tokens ensure that users not only maintain the value of their initial deposit but also benefit from the accumulated yield over time by the vault’s strategies. The tokens are structured to track accrued interest and yield accurately, aligning with Concrete’s goal of offering transparent and optimized yield solutions.

For instance, if a user deposits 1 ETH into an ETH vault, the Concrete protocol mints 10 ctETH tokens and transfers them to the user's wallet. These tokens accrue yield based on the performance of the vault’s strategies and entitle the holder to claim the accrued yield whenever they decide.

## Advantages of ct[assets] Over Similar Tokens in DeFi

### 1. Borrowing Against ct[assets]

One of the key differentiators of Concrete’s ct[assets] is the ability to use them as collateral for borrowing within the platform. Users can lock their ct[assets] and borrow against them, accessing liquidity without liquidating their holdings. This allows users to keep earning yield while also benefiting from additional liquidity.

For example, if a user deposits ETH into a vault and earns 25% APY, they can borrow stablecoins against their ctETH at a lower rate, say 5%. The yield generated from the vault is used to offset borrowing costs, providing a net positive return. This setup maximizes capital efficiency and removes the need for users to constantly rebalance their positions.

### 2. Flexibility in Asset Swaps

Concrete plans to enable swapping between ct[assets], providing users the flexibility to transition between different assets without exiting the vault system. For example, if a user holds ctETH but wants exposure to WBTC, they can swap ctETH for ctWBTC directly within the platform. This swap mechanism is designed to happen seamlessly, maintaining user convenience and minimizing transaction fees.

## How ct[assets] Are Structured

ct[assets] are structured as ERC-20 tokens, providing flexibility and compatibility within the Ethereum ecosystem. Users can transfer or swap these tokens between wallets or protocols. However, certain restrictions might apply in the early stages to ensure proper implementation and security.

- **Type**: ERC-20  
  ct[assets] adhere to the ERC-20 standard, ensuring compatibility and interoperability within the DeFi ecosystem.
- **Yield-Bearing**:  
  ct[assets] accrue yield from their respective vaults. Holders can claim the yield accumulated during their ownership period, giving them flexibility over when they receive returns.
- **Transferrable**:  
  ct[assets] are fully transferrable, meaning holders can move them between wallets or sell them, allowing for the development of a secondary market. This enables users to trade their positions based on the embedded value of the underlying assets and their projected future yields.
- **Redeemable**:  
  Users can redeem ct[assets] to withdraw their original assets plus the accrued yield. When redeemed, the ct[assets] are burned, and the equivalent underlying tokens are returned to the user.

## Tokenization of Deposits

Initially, users can only deposit into Concrete’s predefined vaults, which are programmed with optimized strategies. These vaults have varying risk profiles depending on the type of asset (e.g., ETH, BTC) and the specific chain.

When a user deposits assets (e.g., ETH) into Concrete’s vaults, they receive ct[assets] (like ctETH) in return. These tokens function as a digital receipt, confirming the deposit and entitling the holder to the underlying assets plus any accrued interest.


Each issuance of ct[assets] is timestamped, which records when the assets were deposited. This timestamp is crucial as it determines how yield accrual is calculated over time for each user. For instance, if one user deposits ETH today and another deposits the same amount a week later, their ct[assets] will have different yields based on the duration they have been active.

**What Information is Displayed on the Dashboard?**

Concrete ensures that users have access to real-time updates on their dashboard, showing not only the amount deposited but also the yield that has been accrued. The dashboard also provides a proportional view of the user’s share relative to the total assets in the vault, giving insight into the overall performance of their investment.

- **Total Deposited Amount**: The exact amount of assets deposited into the vault.
- **ct[assets] Balance**: The corresponding ct[assets] received upon deposit, representing the user’s stake in the vault.
- **Real-Time Updates**: The dashboard provides updates on the user’s current holdings and the yield accrued, offering a transparent view of their investments.
- **APY and Yield Performance**: A clear breakdown of the historical yield and current APY of the vault, ensuring users can track their returns effectively.

Note that users are currently unable to create custom vaults, as this feature is planned for a future release once the platform reaches a stable maturity level (e.g., after accumulating a significant amount of liquidity). The goal is to eventually allow users to create their own vaults and strategies, similar to platforms like Hyperliquid, where qualified users can manage liquidity.

### Example: How User Balances Increase Over Time

Imagine the user deposits 1 ETH into a Concrete vault, and the protocol mints 10 ctETH tokens as digital receipt. Over time, as the vault generates yield through its strategies the value associated with the user's ctETH increases.

- On **Day 1**, User’s dashboard shows holdings of 10 ctETH, which represent the initial deposit of 1 ETH.
- After **90 days**, assuming the vault’s APY is 15%, User’s ctETH tokens would now reflect the accrued yield. The dashboard might show that the 10 ctETH is now equivalent to 1.0375 ETH, indicating the growth of user's investment based on the yield accumulated.


## How Yield Accrues with ct[assets]

The accrued yield is based on the underlying performance of the vault strategies, and users can claim these yields when they choose.

Concrete currently offers flexibility in how yields are accrued and presented.

### Yield Accrual Tracking

Concrete uses the timestamped data to ensure that users earn yields proportional to their time in the vault and the overall performance of the vault. This approach prevents any discrepancies between early and late depositors and ensures fairness across the vault ecosystem.

The ct[assets] keep track of yield based on the performance of the underlying strategies within the vault. As yields vary over time due to changing APYs or strategies, each user’s entitlement is adjusted accordingly, offering an accurate reflection of their earnings when they redeem their ct[assets].

### Yield Calculation

Yield is calculated based on several metrics, including the APY performance of the vaults, emission rates from protocols, and other relevant factors. The system accurately tracks the duration of each deposit and the yield rates applicable during that period to provide an exact value for each ct[asset] holder.


## How to Withdraw Liquidity from the Vaults

When a user wants to withdraw liquidity from the protocol, they can redeem or burn their ct[assets].

To redeem ct[assets], users simply convert their tokens back into the original asset. The system ensures that users receive the value of their deposit plus accrued yield. If liquidity is fully available, the process is immediate. However, for larger withdrawals or when liquidity is tied up in other strategies (funds may be deployed in other money markets or reserved for loan protections), the platform might implement a queuing mechanism to manage the flow of funds effectively. This ensures stability and transparency in the withdrawal process.

### Redemption Queue  

If immediate liquidity is unavailable, the protocol calculates redemption availability based on current utilization rates, active loan protections, and forecasted redemption demands. If immediate redemption isn't possible, the user’s request enters a queue, ensuring that liquidity is released as it becomes available.

### On-Chain Verification

The protocol guarantees transparency by allowing any user to verify the on-chain availability of funds. Users can execute a function that checks liquidity and calculates the estimated redemption period, mathematically guaranteeing the user's funds are redeemable within a defined timeframe.

### User Interface (UI)

The Concrete UI provides a clear view of expected withdrawal timelines, ensuring users know when their liquidity will be available. The platform automatically transfers the funds to the user’s wallet once they become available, simplifying the process.

For example, suppose a user deposits 1 ETH into a vault and receives ctETH. They can monitor their holdings through Concrete’s dashboard, which displays yield accumulation in real-time. If, over a certain period, the user’s vault strategy generates 10% APY, they will see this reflected in their ctETH value. When they decide to redeem their ctETH, they can do so via a simple process that converts their ctETH back into ETH, including the accumulated yield.

## Future Swapping ct[assets] Feature

Concrete’s protocol includes a swap feature that enables earners to optimize their liquidity by swapping ct[assets] directly within the platform. Users can swap ct[asset]A for ct[asset]B without manually redeeming and reinvesting their tokens, enhancing user flexibility.

### Automated Swapping

When users initiate a swap, the protocol handles it automatically in the background, maintaining the simplicity and efficiency of the process. The swap ratio reflects the underlying asset prices and liquidity requirements set by the protocol.

### Optimized Liquidity Strategy

The platform adjusts swap fees based on its liquidity needs. For instance, if Concrete needs to attract more WBTC liquidity, the swap fee for exchanging ETH to WBTC may be lower than the reverse, incentivizing users to adjust their holdings according to the protocol's needs.

### Claiming Pending Rewards

When users swap ct[assets], any pending rewards tied to their initial ct[asset] position are automatically claimed and transferred to their wallet. This ensures users receive the full value of their accrued yield before the swap is executed.
