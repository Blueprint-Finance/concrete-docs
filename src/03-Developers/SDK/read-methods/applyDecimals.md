---
title: "applyDecimals(amount)"
description: "Read-method reference for applyDecimals(amount) in the Concrete Earn V2 SDK, including expected inputs, outputs, and usage context."
sidebar_label: "applyDecimals(amount)"
---

Converts a raw `BigInt` amount into a human-readable decimal-adjusted value using the vault's share decimals. Use it to display vault share balances and to convert share amounts into a display-friendly format.

## Parameters

- `amount: anyNumber` (`number | string | bigint`): the token amount in base units to format.
- `precision?: number` (optional): number of decimal places to round the result to. When omitted, the raw decimal-adjusted value is returned.

## Returns

- `Promise<number>`: numeric value with decimals applied.

## Example

```tsx
const rawShares = BigInt("1000000000000000000"); // 1 ctAsset in base units
const display = await vault.applyDecimals(rawShares);
console.log("Formatted vault shares:", display);
```

## Example response

```json
1.0
```
