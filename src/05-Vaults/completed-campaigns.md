---
title: "Completed Campaigns"
description: "Concrete vault documentation for deprecation Guide, including strategy behavior, withdrawals, migrations, and operational guidance."
sidebar_label: "Completed Campaigns"
---

Concrete vaults operate as time-bounded campaigns. When a campaign reaches its end date, the vault transitions to withdraw-only mode through a controlled wind-down process. Once the campaign is completed, the vault is move to the Completed Campaigns section of the [Concrete App](https://app.concrete.xyz/). If you have ct[Assets] they are still accessible via the Portfolio section.
During the wind-down, deposits are permanently disabled and strategies are deallocated. Depending on the vault's structure and underlying strategy, different mechanisms make funds available to depositors:
- Async withdrawals (epoch-based queue processing)
- Atomic withdrawals (single-transaction redemption)
- Direct asset distribution to depositor wallets

For vaults hosted in partnership and displayed on the Concrete website, visit the partner's site for details about their specific wind-down process.
If you deposited into any of the vaults listed in [Concrete App](https://app.concrete.xyz/) under Completed Campaigns, withdraw your funds promptly or contact the vault curator for guidance. Withdrawing early from closed campaigns ensures you retain full control over your assets and avoids delays.

## What Happens When a Campaign Closes

Each closed campaign has a designated Withdrawal Period during which you can redeem your holdings and claim any earned rewards. The duration of this period may vary by vault.
When a campaign closes, the following applies to your position within the Withdrawal Period:

- **Deposits are permanently disabled** The vault no longer accepts new funds. 
- **No new fees accrue** Fee parameters are set to zero to stop accrual. 
- **Remaining balances stop earning yield** Strategies are deallocated and funds are returned to the vault.
- **Withdrawal paths depend on the vault type** Check the dedicated vault page for details of the applied withdrawal path. 
- **Previously earned rewards remain claimable** Reward eligibility is not affected by the campaign closing.
- **The vault contract remains on-chain** The vault stays queryable for auditing after all depositors have exited. 

If you do not withdraw during the Withdrawal Period, your holdings may be migrated to a new vault, and any unclaimed rewards may be forfeited.
For full details on the Withdrawal Period and what it means for your position, see the [Terms of Use](https://concrete.xyz/terms).

For more on support, see [Support](/support/)
For more on withdrawals, see [Support](/how-withdrawals-work/)