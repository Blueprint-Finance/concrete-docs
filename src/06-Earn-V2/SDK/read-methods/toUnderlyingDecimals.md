---
title: "toUnderlyingDecimals(amount)"
description: "Read-method reference for toUnderlyingDecimals(amount) in the Concrete Earn V2 SDK, including expected inputs, outputs, and usage context."
sidebar_label: "toUnderlyingDecimals(amount)"
---

Converts a raw `BigInt` amount into a human-readable decimal-adjusted value using the underlying asset's decimals. Use it to display underlying balances (for example USDC, WETH) and to interpret preview results from `previewConversion()`.

## Parameters

- `amount: bigint`: raw token amount in base units.

## Returns

- `Promise<number>`: numeric value with decimals applied.

## Example

```tsx
const rawUnderlying = BigInt("1000000"); // 1 USDC in base units (6 decimals)
const display = await vault.toUnderlyingDecimals(rawUnderlying);
console.log("Formatted underlying:", display);
```

## Example response

```json
1.0
```
