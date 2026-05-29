---
title: "Fees"
description: "Complete fee reference for Concrete products, including how fees are calculated, applied, and communicated across workflows."
sidebar_label: "Fees"
sidebar_position: 4
---

Concrete offers a transparent fee structure, ensuring competitive rates across its ecosystem.

**Not every vault applies all the fees. Each vault's fee configuration depends on its strategy and commercial terms.** Fees are paid by minting vault shares to a fee recipient rather than transferring the underlying asset, so the cost is reflected directly in the share price.

## Fee summary

| Fee type | Range | Description |
| --- | --- | --- |
| Deposit fee | None | No fees on deposits. |
| Withdrawal fee | None | No fees on withdrawals. |
| Cooldown Exit fee | 0–1% of position | The Withdrawal Cooldown can be bypassed for a fee. Fee size decays linearly as Cooldown approaches the expiry date. |
| Management fee | 0–10% of position | Annualized charge on vault AUM, accrued continuously based on time elapsed. Configured per vault, with a standard rate of 1.5% applied to most vaults. See individual vault pages for rates applied to your vault. |
| Performance fee | 0–30% of net positive yield | Charged only when strategies produce net gains after losses at the time of yield accrual. Configured per vault. See individual vault pages for current rates. |
| Hurdle rate on Performance fee | 0–30% of net positive yield | Target return (the hurdle) is defined for depositors, and fees apply only to yield generated above that threshold. Yield up to the hurdle is distributed to depositors.<br /><br />**Fixed APY** – a constant annualized target that compounds.<br />**Fixed APR** – a constant annualized target calculated on a simple (non-compounding) basis.<br />**Dynamic hurdle** – a variable target that adjusts based on external rate. |

Actual rates are configured per vault. Refer to individual vault pages for current values.

Because fees are paid in shares, existing shareholders are diluted proportionally rather than charged separately. Every fee accrual emits on-chain events indexed by Concrete's subgraph, so share-price impact is observable in real time.

## How fees accrue

Fees are calculated as part of the vault's yield accrual process, in this order:

1. **Yield and loss update.** Each strategy's current value is compared to its last recorded value.
2. **Management fee.** Accrues on the updated total assets, calculated based on time elapsed since the last accrual.
3. **Performance fee.** Accrues on net positive yield (gains minus losses). If there is no net positive yield, no performance fee is charged.
