---
title: "getDepositLockWithFeeHook()"
description: "Read-method reference for getDepositLockWithFeeHook() in the Concrete Earn V2 SDK, including expected inputs, outputs, and usage context."
sidebar_label: "getDepositLockWithFeeHook()"
---

Resolves the hook that enforces a V2 vault's withdrawal cooldown. A withdrawal cooldown locks the shares issued on each deposit for a configured period. Use the hook to read that period, an account's locked shares, and the early unlock fee. For the user-facing behavior, see [Withdrawal Cooldowns](/Using-Concrete-Vaults/withdraw/#withdrawal-cooldowns).

## Signature

The method takes no arguments and resolves the hook instance.

```tsx
getDepositLockWithFeeHook(): Promise<DepositLockWithFeeHook | undefined>
```

## Parameters

- None

## Returns

The **DepositLockWithFeeHook** instance, or `undefined` when the vault has no such hook. An unresolved hook means the [SDK](/glossary/#sdk) cannot provide cooldown information for that vault.

| **Read** | **Method** | **Result** |
| --- | --- | --- |
| Cooldown period | `depositLockDuration()` | Duration in seconds |
| Locked shares | `effectiveTotalLocked(account)` | Shares still locked |
| Unlocked shares | `getUnlockedShares(account)` | Shares available without early unlocking |
| Stored lock count | `storedLockCount(account)` | Number of stored records, including expired locks |
| Individual lock | `getStoredLock(account, index)` | `{ shares, unlockTimestamp, duration }`, with times in seconds |
| Early unlock allowed | `earlyUnlockEnabled()` | `true` when early unlocking is allowed |
| Early unlock fee | `previewEarlyUnlock(account, shares)` | Fee in vault-share base units |

All numeric results are `bigint`.

## Example

The example reads the cooldown period and an account's locked shares.

```tsx
const lock = await vault.getDepositLockWithFeeHook();
const cooldownSeconds = lock ? await lock.depositLockDuration() : undefined;

if (lock) {
  const locked = await lock.effectiveTotalLocked(account);
  console.log("Locked shares:", await vault.applyDecimals(locked));
}
```

## Notes

- A nonzero duration requires the vault's deposit and mint hook flags to enforce locking. A zero duration disables locks on new deposits, but existing locks can remain active.
- `getEnabledDetails()` resolves `{ enabled, earlyUnlockEnabled, fees, feeRecipient, duration }`. `enabled` is `true` when the duration is nonzero. `earlyUnlockEnabled` is `true` when early unlocking is allowed and its fee can be paid.
- For async vaults, the Withdrawal Queue processes requests per Epoch. The cooldown alone does not determine when a withdrawal pays out.
