---
title: "getUnderlyingDecimals()"
description: "getUnderlyingDecimals()"
sidebar_label: "getUnderlyingDecimals()"
---

Returns the number of **decimals** used by the vault’s underlying ERC20 token.
This is helpful when formatting amounts or constructing `BigInt` inputs.

## Parameters

- *None*

## Returns

- `Promise<number>` — decimals used by the underlying ERC20 (e.g., `6` for USDC, `18` for WETH).

## Example

```tsx
const decimals = await vault.getUnderlyingDecimals();
console.log("Underlying decimals:", decimals);

const oneUnit = BigInt(10) ** BigInt(decimals);
console.log("One unit in base:", oneUnit.toString());
```

## Example Response

```json
18
```
