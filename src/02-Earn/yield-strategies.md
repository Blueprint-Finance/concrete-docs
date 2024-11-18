---
title: "Yield Strategies"
description: "Yield Strategies"
sidebar_label: "Yield Strategies"
sidebar_position: 2
---

Concrete focuses on **automated strategies** to ensure users receive the best return possible. It offers different yield strategies tailored to each asset type, such as BTC, ETH, and stablecoins. For instance, while BTC might have a safer, lower APY to cater to risk-averse users, ETH and stablecoin vaults may offer higher yields for those comfortable with more risk.

Concrete uses historical and real-time performance data to provide a trailing APY for each vault, allowing users to choose the best strategy for their assets. However, the exact displayed APY may vary based on the chain and market conditions.

These strategies primarily include:

## Rebalancing or Lending Between Money Markets

Concrete actively manages liquidity by reallocating funds between different money markets to ensure the best returns. For example, if Aave offers 9% APY on Ethereum lending while Compound offers 4%, funds are initially placed in Aave. If Compound later increases its APY to 12%, Concrete rebalances the liquidity to take advantage of the better rate. This process considers the cost of moving funds and the expected long-term returns, making sure users get optimal performance without the need for active management.

Predicting the compression of the yield curve (i.e., the reduction in yield as liquidity increases in a pool) helps Concrete make smart reallocation decisions without significantly reducing potential earnings.

## Vanilla Lending Strategy

This strategy involves lending user assets to platforms like Aave to generate stable returns, typically around 2–3%. It provides a simple yet effective way for users to earn passive income without additional complexity. This forms the foundation for the protocol’s income generation and is ideal for users who prefer low-risk, steady earnings.

## Leveraged Yield Generation

For users looking for higher returns, Concrete engages in leveraged yield strategies. These involve using liquidity from **earn vaults** to offer **flash loans** or participate in **capital disbursements**, generating income through the fees collected during these activities. By leveraging user deposits, the protocol amplifies potential returns while securing additional protocol rewards through fees.

For instance, when **Concrete Light** (a liquidation protection product) is used, the platform takes **flash loans** from its own vaults and charges a fee (0.3%) for providing the credit lines. These fees add to the protocol's revenue stream, alongside the core lending strategy.

## Loan Protection Income

Concrete's **Protect** and **Concrete Light** products offer users a form of liquidation protection. Users engaging in these products benefit from the security of not being liquidated unexpectedly, while the protocol earns revenue through the associated fees from flash loans and credit line services. This strategy complements the passive and leveraged yield methods, adding an additional layer of income for both the protocol and its users.

## Future Yield Strategies - Ecosystem ETFs

Concrete plans to roll out Ecosystem ETFs, which will diversify user positions across multiple DeFi protocols, reducing risk while maintaining attractive returns. By balancing exposure to different protocols, users can achieve a more stable income stream, making this strategy ideal for those who want to diversify without taking on high levels of risk.

These ETFs will provide opportunities for users to take part in a multi-protocol investment strategy, allowing them to benefit from the broader DeFi ecosystem while Concrete manages and optimizes the underlying yield.

## Flow of Funds

- **Earn Vaults**: Users deposit assets (such as **ETH**, **BTC**, or stablecoins) into earn vaults.
- **Liquidity Allocation**: The platform distributes these funds into different yield-generating strategies, such as lending on money markets or engaging in leveraged activities like flash loans.
- **Yield Generation**: Profits from these strategies are returned to the users, while protocol fees from leveraged activities (e.g., flash loans) contribute to Concrete's revenue.

## The Honeypot Model and Master Funds

Concrete envisions a **Honeypot model**, managing large liquidity pools at a high level, while allowing users to create custom strategies underneath.

These **master funds** operate for different assets (BTC, ETH, USDT, etc.) and can handle substantial liquidity, up to $200 million. As the platform scales, these funds will evolve into **strategies within strategies**, ensuring efficient liquidity management.

Eventually, Concrete will allow the community to build their own **ERC-4626 vaults**, incorporating personalized strategies into the platform’s broader liquidity management system.
