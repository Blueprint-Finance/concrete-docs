---
title: "decimals()"
description: "decimals()"
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
