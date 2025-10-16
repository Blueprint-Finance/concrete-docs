---
title: "totalAssets()"
description: "totalAssets()"
sidebar_label: "totalAssets()"
---

Returns the total underlying assets managed by the vault.

## Signature

```tsx
totalAssets(): Promise<bigint>
```

## Parameters

- None

## Returns

- `bigint` — total underlying managed by the vault.

## Example

```tsx
const details = await vault.getVaultDetails();
const total = await vault.totalAssets();

// Option 1: Using SDK helper (faster and simpler to calculate)
console.log(
  "Total assets:",
  await vault.toUnderlayingDecimals(total),
  details.underlaying.symbol
);

// Option 2: Using ethers.js formatting
console.log(
  "Total assets:",
  ethers.formatUnits(total, details.underlaying.decimals),
  details.underlaying.symbol
);
```

### Response Example

```json
"158974398534987534985349"
```
