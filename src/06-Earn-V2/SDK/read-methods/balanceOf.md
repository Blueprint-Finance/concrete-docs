---
title: "balanceOf(address)"
description: "balanceOf(address)"
sidebar_label: "balanceOf(address)"
---

Returns the vault share balance (ctAssets) for a given user.

## Signature

```tsx
balanceOf(holder: string): Promise<bigint>
```

## Parameters

- `holder` (string, required) — Ethereum address of the account.

## Returns

- `bigint` — balance of ctAssets (vault shares).

## Example

```tsx
const shares = await vault.balanceOf("0xUserAddress");

// Option 1: Use ethers.formatUnits
console.log("Shares:", ethers.formatUnits(shares, await vault.decimals()));

// Option 2: Use SDK helpers for faster + simpler conversions, It applies the decimals of the vault, and stores the decimal value
console.log("Shares (human):", await vault.applyDecimals(shares));

// Convert human → ctShares bigint
const sharesBigInt = await vault.toBigInt("1.0"); // "1.0" ctAsset
console.log("Shares BigInt:", sharesBigInt);

// Underlying conversions
console.log("Underlying (to human):", await vault.toUnderlayingDecimals(shares));
console.log("Underlying (from human):", await vault.toUnderlyingBigInt("1.0"));
```

### Response Example

```json
"1000000"
```
