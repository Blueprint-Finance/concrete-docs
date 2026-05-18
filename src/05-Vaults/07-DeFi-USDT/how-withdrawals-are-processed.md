---
title: "How Withdrawals Are Processed For Concrete DeFi USDT"
description: "Concrete DeFi USDT vault documentation for how Withdrawals Are Processed, including withdrawal operations, disclosures, and user safeguards."
sidebar_label: "How Withdrawals Are Processed"
---

The Concrete DeFi USDT vault deploys deposits into yield-generating strategies that require time to unwind. To protect APY for all depositors while still offering reasonable liquidity, withdrawals are processed through a scheduled queue.

## Standard Timing

Withdrawals typically take between 3.5 and 7 days, depending on when you submit your request and on available liquidity (see below). They're processed twice weekly on a fixed schedule (all times UTC):

| Request submitted between | Claimable from |
| :---- | :---- |
| Monday 8:10 PM – Thursday 8:10 PM | Following Monday, 8:00 AM |
| Thursday 8:10 PM – Monday 8:10 PM | Following Thursday, 8:00 AM |

## Liquidity Buffer and Extended Queues

Up to 10% of the vault's TVL is available for withdrawals each cycle. If requests exceed this threshold, the queue extends beyond 7 days and withdrawals are processed in the order they were requested (FIFO). During periods of high demand, your wait may be longer than the standard schedule.

## How to Check Your Next Withdrawal Date

To see when your withdrawal will be available:

1. Navigate to the Withdrawal tab in the app.
2. Enter a withdrawal amount.
3. The expected date will be displayed.

The app will always reflect the next upcoming batch date.

<div style={{textAlign: 'center'}}>
<img src="/img/defi-usdt-withdrawal-tab.png" width="400" />
</div>

## Frequently Asked Questions

**Do my deposits continue earning yield while in the queue?**
Yes. Your position continues to earn yield until your withdrawal is processed.

**Can I cancel a withdrawal request?**
Yes, but only before processing has begun. Once your request enters processing at the scheduled cutoff, it can no longer be cancelled.

:::note
All withdrawals are subject to the specific terms of this vault. See [Important Disclosures](./important-disclosures.md).
:::
