---
title: "Understanding Balance Accrual in Locked Vaults"
description: "Understanding Balance Accrual in Locked Vaults"
sidebar_label: "Balance Accrual"
sidebar_position: 3
---

When you deposit assets into a Concrete vault, your balance starts accruing yield based on the vault's strategy. However, during the lock-up period, withdrawals are not available, and the final yield percentage will only be determined at the end of the vault cycle.

## How Yield Works in Locked Vaults

### 1. Your Balance Accrues Yield Continuously, But Final Rewards Are Confirmed at Unlock

- When you deposit into a vault, your Balance Accruing Yield will reflect the ongoing increase in value as APR and/or vault rewards are added over time.
- Your displayed balance will increase as rewards are applied, but the final, total rewards can only be fully determined when the vault unlocks.

### 2. Withdrawals Are Not Available Until the Vault Unlocks
- Since vaults follow a fixed lock-up period, users cannot withdraw assets early.  
- Your assets remain in the vault, earning rewards until the end of the cycle.  

### 3. The Total Yield is Calculated at Unlock
- Once the vault unlocks, the full earnings will be available for withdrawal.  
- Until then, your dashboard will display your current Balance Accruing Yield.

## Scenario: User Deposits into a 90-Day Locked Vault

- A user deposits $1,000 into a Concrete vault that is locked for 90 days.
- Concrete implements the vault strategy, generating yield through APR and/or vault rewards.

### How the Balance Changes Over Time
1. **Day 1**  
   - The user sees their Balance Accruing Yield as $1,000.  
   - The vault strategy has started, but no rewards have been applied yet.

2. **Day 30**
   - Concrete has accrued 3% APR and an additional $10 in vault rewards.  
   - The user’s Balance Accruing Yield now shows ~$1,030, reflecting earned yield so far.  
   - However, this is still subject to change as the vault continues earning over time.

3. **Day 60**  
   - More APR is added, and additional vault rewards accumulate.  
   - The displayed balance might now be $1,060, but final calculations are still ongoing.

4. **Day 90 (Vault Unlocks)**  
   - The vault’s total rewards are finalized based on the full performance over the 90-day period.  
   - The user can now withdraw their original deposit plus the earned yield.  
   - If the vault achieved 6% APR and $50 in additional vault rewards, the final total would be $1,110.
