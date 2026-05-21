---
title: "Yield Strategies"
description: "Concrete vault documentation for yield Strategies, including strategy behavior, withdrawals, migrations, and operational guidance."
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

Lending strategies route vault assets into established money markets such as Aave, Morpho, and Compound. Returns vary with market conditions; consult each vault's page for current allocation and trailing APY.

## Leveraged Yield Generation

Selected vaults employ structured strategies — for example, delta-neutral basis trades, or restaking — to generate yield beyond passive lending. Each strategy is implemented as a discrete contract conforming to the `IStrategyTemplate` interface and operates within vault-level allocation limits and role-based controls.

## Flow of Funds

* **Earn Vaults**: Users deposit assets (such as **ETH**, **BTC**, or stablecoins) into earn vaults.
* **Liquidity Allocation**: The platform distributes these funds into different yield-generating strategies, such as lending on money markets or engaging in leveraged activities like flash loans.
* **Yield Generation**: Profits from these strategies are returned to the users, while protocol fees from leveraged activities (e.g., flash loans) contribute to Concrete's revenue.
