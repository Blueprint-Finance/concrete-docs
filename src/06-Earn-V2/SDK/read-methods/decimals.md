---
title: "decimals()"
description: "Read-method reference for decimals() in the Concrete Earn V2 SDK, including expected inputs, outputs, and usage context."
sidebar_label: "decimals()"
---

Returns the number of decimals used by vault shares.

## Signature

```tsx
decimals(): Promise<number>
```

## Parameters

- None

## Returns

- `number` — decimals used for ctAssets.

## Example

```tsx
console.log(await vault.decimals()); // 18
```

## Response Example

```json
18
```
