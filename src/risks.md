---
title: "Risks and Safety"
description: "Risks and Safety"
sidebar_label: "Risks and Safety"
sidebar_position: 5
---

Concrete vaults are designed to optimize yield while prioritizing security and transparency. However, like all DeFi products, they carry inherent risks. This article outlines the main categories of risk and how Concrete addresses them.

For details on each vault’s allocation and strategy, visit its dedicated page or reach out to our team for support.

## Smart Contract Risk

All vaults are governed by smart contracts. While our contracts are thoroughly [audited by leading security firms](../src/audits.md) like **Trail of Bits**, **Halborn**, and **Code4rena**, there is always residual risk of bugs or vulnerabilities.

**How we mitigate:**

- Regular audits by top-tier firms
- Open-source contracts with community review
- Bug bounty programs and ongoing security testing

## Impermanent Loss (IL)

Impermanent loss occurs when the price of tokens in a liquidity pool diverges, potentially making LP positions less valuable than simply holding the tokens. This affects vaults that allocate to AMMs, LP pools, or engage in multi-asset yield farming.

**When IL is more likely:**

- Non-stablecoin pairs (e.g. ETH/BTC)
- Volatile or low-liquidity environments
- Pre-deposit campaigns on new chains

**How we mitigate:**

- Diversified vault strategies to reduce single-pool exposure
- Dynamic reallocation to minimize risk during volatile periods

## Slippage Risk

Slippage refers to the difference between the expected price of a trade and the price at which it is actually executed. This can occur during vault deposit swaps, reward conversions, or vault rebalancing—especially when trading large amounts or in low-liquidity markets.

**When slippage is more likely:**

- Swapping between volatile or thinly traded tokens
- High market activity or low liquidity conditions
- Executing large trades relative to pool size

**How we mitigate:**

- Integration with leading aggregators (e.g. 1inch) for optimal swap routing
- Built-in slippage protection in vault contracts
- Clear UI warnings when expected slippage exceeds thresholds

## Strategy-Specific Risks

Each vault may expose users to different underlying protocols. These come with their own assumptions and potential vulnerabilities.

**How we mitigate:**

- Vetting and monitoring of all integrated protocols
- Capped exposures for experimental or new strategies
- Transparent reward and allocation disclosures
