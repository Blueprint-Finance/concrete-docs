---
title: "applyDecimals(amount)"
description: "applyDecimals(amount)"
sidebar_label: "applyDecimals(amount)"
---

Converts a raw `BigInt` amount into a human-readable decimal-adjusted string based on the vault’s share decimals. Useful to show vault share balances to users in UIs and to convert share amounts into display-friendly format.

## Parameters

- `amount: bigint` — raw token amount in base units.

## Returns

- `Promise<string>` — formatted string with decimals applied.

## Example

```tsx
const rawShares = BigInt("1000000000000000000"); // 1 ctAsset in base units
const display = await vault.applyDecimals(rawShares);
console.log("Formatted vault shares:", display);
```

## Example Response

```json
"1.0"
```
