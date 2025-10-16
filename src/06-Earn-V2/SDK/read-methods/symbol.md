---
title: "symbol()"
description: "symbol()"
sidebar_label: "symbol()"
---

Returns the vault share symbol (ctAsset symbol).

## Signature

```tsx
symbol(): Promise<string>
```

## Parameters

- None

## Returns

- `string` — vault share symbol.

## Example

```tsx
console.log(await vault.symbol()); // "ctLBTC"
```

## Response Example

```json
"ctLBTC"
```
