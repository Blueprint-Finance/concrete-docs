---
title: "getDepositLimits()"
description: "Read-method reference for getDepositLimits() in the Concrete Earn V2 SDK, including expected inputs, outputs, and usage context."
sidebar_label: "getDepositLimits()"
---

Returns the deposit cap and the minimum deposit of a V2 vault. The deposit cap limits the total assets the vault accepts across all depositors. Read it together with `maxDeposit(receiver)` to show how much capacity remains.

## Signature

```tsx
getDepositLimits(): Promise<[bigint, bigint]>
maxDeposit(receiver: Address): Promise<bigint>
```

## Parameters

- `receiver` (Address, required for `maxDeposit`): the address that receives the shares.

## Returns

- `getDepositLimits()`: a `[cap, minimumDeposit]` tuple in underlying base units. A cap equal to viem's `maxUint256` means no cap is set. A zero cap disables deposits.
- `maxDeposit(receiver)`: the remaining capacity in underlying base units. It returns zero when deposits are paused, the cap is reached, or the remaining capacity is below the minimum deposit.

Both values are denominated in the underlying token, not in [USD](/glossary/#usd).

## Example

```tsx
import { formatUnits, maxUint256 } from "viem";

const [capRaw, minimumDepositRaw] = await vault.getDepositLimits();
const remainingCapacityRaw = await vault.maxDeposit(receiverAddress);
const decimals = await vault.getUnderlyingDecimals();

console.log({
  cap: capRaw === maxUint256 ? "unlimited" : formatUnits(capRaw, decimals),
  minimumDeposit: formatUnits(minimumDepositRaw, decimals),
  remainingCapacity: formatUnits(remainingCapacityRaw, decimals),
});
```

Keep the raw `bigint` values for calculations and use the underlying decimals for display only.

## Notes

- `getWithdrawLimits()` returns the maximum and minimum withdrawal amounts per transaction, in the same tuple form.
- For deposits routed through additional hooks, including multi-asset deposits, check those hooks' restrictions separately.
