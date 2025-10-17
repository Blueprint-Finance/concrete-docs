---
title: "toUnderlyingDecimals(amount)"
description: "toUnderlyingDecimals(amount)"
sidebar_label: "toUnderlyingDecimals(amount)"
---

Converts a raw `BigInt` amount into a human-readable decimal-adjusted string based on the **underlying asset’s** decimals. Useful to displaying underlying balances (e.g., USDC, WETH) and to Interpret preview results from `previewConversion()` .

## Parameters

- `amount: bigint` — raw token amount in base units.

## Returns

- `Promise<string>` — formatted string with decimals applied.

## Example

```tsx
const rawUnderlying = BigInt("1000000"); // 1 USDC in base units (6 decimals)
const display = await vault.toUnderlayingDecimals(rawUnderlying);
console.log("Formatted underlying:", display);
```

## Example Response

```json
"1.0"
```
