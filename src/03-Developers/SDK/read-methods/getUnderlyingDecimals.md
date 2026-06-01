---
title: "getUnderlyingDecimals()"
description: "Read-method reference for getUnderlyingDecimals() in the Concrete Earn V2 SDK, including expected inputs, outputs, and usage context."
sidebar_label: "getUnderlyingDecimals()"
---

Returns the number of decimals used by the vault's underlying [ERC20](/glossary/#erc-20) token. Useful when formatting amounts or constructing `BigInt` inputs.

## Parameters

- None

## Returns

- `Promise<number>`: decimals used by the underlying [ERC20](/glossary/#erc-20) (for example `6` for [USDC](/glossary/#usdc), `18` for [WETH](/glossary/#weth)).

## Example

```tsx
const decimals = await vault.getUnderlyingDecimals();
console.log("Underlying decimals:", decimals);

const oneUnit = BigInt(10) ** BigInt(decimals);
console.log("One unit in base:", oneUnit.toString());
```

## Example response

```json
18
```
