---
title: "How Earn Vaults Maximize Risk-Adjusted Yields"
description: "Concrete Earn documentation for maximize Risk-Adjusted Yields, including deposits, withdrawals, and yield participation mechanics."
sidebar_label: "Maximize Risk-Adjusted Yields"
sidebar_position: 4
---

Concrete’s Earn Vaults are designed to maximize risk-adjusted returns by strategically allocating user funds across various DeFi protocols. These vaults automate the process of finding the best yield opportunities while managing risk to provide liquidity providers with optimized, secure returns.

By combining advanced research, real-time monitoring, and a robust risk management system, Concrete optimizes returns while ensuring that user funds remain secure, even in volatile markets.

## Yield Maximization

### 1. Research and Analysis

Concrete's team of experts, including researchers, financiers, and builders, works closely with blockchain foundations and Layer 1 and Layer 2 networks to gain insights into the long-term strategies of each network. This collaboration informs the vault’s allocation strategies, ensuring alignment with stable and promising protocols.

### 2. Security and Economic Assessment

Before allocating funds to a protocol, Concrete performs a detailed security analysis. The team assesses the safety measures, smart contract code, and economic structures of the protocol. By examining emission rates and the sustainability of yield generation mechanisms, Concrete ensures that only reliable and well-audited protocols are integrated into the vaults.

### 3. Liquidity Impact Assessment

Concrete calculates how much liquidity can be injected into a protocol without significantly disrupting its yield curve. By determining the optimal liquidity allocation, the platform maximizes returns while avoiding yield compression, maintaining a stable and profitable environment for users.

### 4. Dynamic Monitoring and Rebalancing

The platform constantly monitors APYs and yield rates across various DeFi protocols. If a yield opportunity arises, such as a sudden increase in a protocol’s APY, Concrete’s system automatically recalculates the impact and reallocates funds as needed. This ensures an optimal balance and avoids oversaturating any one protocol, preventing negative effects like yield compression.

## Risk Management

Concrete’s approach to managing risk involves its Probability Engine and robust risk mitigation models:

### Probability Engine and Quantitative Models

Concrete’s Probability Engine integrates advanced forecasting models, utilizing historical data, liquidity depth, and real-time market signals to predict potential market scenarios and rebalance liquidity accordingly. By continuously monitoring market signals and liquidity conditions, the engine dynamically reallocates liquidity within the vaults, ensuring they are prepared to protect against adverse market movements.

While it does not directly offer price protection or prediction markets, the system provides signals based on asset volatility, allowing users to make informed decisions.

### Strategic Asset Movement

Concrete minimizes unnecessary transaction costs and avoids disrupting yield curves by only moving the necessary amount of liquidity. By monitoring yield curve compression and transaction costs, Concrete ensures that liquidity moves between protocols in a way that maximizes yield while minimizing disruptions.

For instance, when one protocol suddenly offers a higher APY, the platform calculates the impact of shifting liquidity and adjusts the amount moved to optimize returns while avoiding compression effects.

## How the Probability Engine Assesses and Adjusts for Market Risk

The Probability Engine evaluates multiple data points and factors, ensuring the platform remains solvent and user funds are protected. Here's how it operates:

### Portfolio Concentration Assessment

The engine analyzes the distribution and concentration of assets within the vaults. It projects potential price movements and their impact on Concrete’s overall portfolio. For example, it calculates the probability of significant price drops (e.g., ETH dropping 8% within an hour) and assesses how that would affect the platform’s solvency.

### Beta Correlation Analysis

The engine looks at the correlation between different crypto assets, which is typically high in the market. This helps gauge the interconnected risks across assets and predict how a movement in one asset could affect others within Concrete’s ecosystem.

### Data Pipeline Integration

The system pulls data from multiple Oracle feeds, including both on-chain and off-chain sources, to gain a comprehensive view of market conditions. This includes price feeds from centralized exchanges, data from decentralized exchanges, and liquidity information from lending markets where Concrete has exposure.


## Key Risk Factors Monitored by the Probability Engine

Concrete’s Probability Engine monitors the following key risk factors:

- **Price Volatility**: The engine forecasts price movements and volatility across multiple timeframes to determine the probability of significant fluctuations.

- **Liquidity Depth**: It assesses liquidity across different lending and yield markets to understand how quickly and efficiently liquidity can be reallocated when market conditions change.

- **Emissions and Yield Curves**: The Probability Engine tracks the emission rates and APYs of different protocols, especially during bullish and bearish trends, to determine the most profitable allocation of assets.

## Example

Imagine you are a liquidity provider looking to earn yield without the hassle of constant monitoring. Concrete’s Earn Vaults automate the entire process for you.

A USDC vault holds two strategies — a Pendle yield strategy and a Morpho lending strategy. As market conditions change, the vault's Allocator role rebalances allocations between these strategies through the Allocation Module, subject to vault-level limits. The Quantitative Framework's signals inform target weights; on-chain execution remains under role-based access control.
