---
title: "symbol()"
description: "Read-method reference for symbol() in the Concrete Earn V2 SDK, including expected inputs, outputs, and usage context."
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
