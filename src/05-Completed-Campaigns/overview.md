---
title: "Overview"
description: "Overview of Concrete's completed vault campaigns, covering wind-down behavior, withdrawal paths, and how rewards remain claimable."
sidebar_label: "Overview"
---

Some Concrete vaults run as time-bounded campaigns. When such a campaign reaches its end date, the vault transitions to withdraw-only mode through a controlled wind-down process. Once the campaign closes, the vault moves to the Completed Campaigns section of the [Concrete app](https://app.concrete.xyz/). If you still hold [ctAssets](/glossary/#ct-asset) from that vault, they remain accessible in the Portfolio tab.

During the wind-down, deposits are permanently disabled and strategies are deallocated. The mechanism that returns funds to depositors depends on the vault's structure and strategy:

- **Async withdrawal** – Requests are settled through the [Withdrawal Queue](/Using-Concrete-Vaults/withdraw/) over one or more epochs.
- **Instant withdrawal** – Redemption settles in a single transaction.
- **Direct distribution** – Assets are sent directly to depositor wallets.

For vaults hosted in partnership and displayed on the Concrete website, visit the partner's site for details about their specific wind-down process.

If you deposited into any vault listed in the [Concrete app](https://app.concrete.xyz/) under Completed Campaigns, withdraw your funds promptly or contact the vault curator for guidance. Withdrawing during the open window keeps you in full control of your assets and avoids delays.

## What Happens When a Campaign Closes

Each closed campaign has a withdrawal window during which you can redeem your holdings and claim any earned rewards. The duration varies by vault. Within that window, the following applies to your position:

- **Deposits are permanently disabled** – The vault no longer accepts new funds.
- **No new fees accrue** – Fee parameters are set to zero to stop accrual.
- **Remaining balances stop earning yield** – Strategies are deallocated and funds are returned to the vault.
- **Withdrawal paths depend on the vault type** – Check the dedicated vault page for the applied withdrawal path.
- **Previously earned rewards remain claimable** – Reward eligibility is not affected by the campaign closing.
- **The vault contract remains on-chain** – The vault stays queryable for auditing after all depositors have exited.

If you do not withdraw during the open window, your holdings may be migrated to a new vault, and any unclaimed rewards may be forfeited. For the full terms covering this period, see the [Terms of Use](https://concrete.xyz/terms).

For more on support, see [Support](/support/). For more on withdrawals, see [Withdraw](/Using-Concrete-Vaults/withdraw/).
