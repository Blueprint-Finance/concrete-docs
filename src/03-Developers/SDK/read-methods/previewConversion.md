---
title: "previewConversion(amount)"
description: "Read-method reference for previewConversion(amount) in the Concrete Earn V2 SDK, including expected inputs, outputs, and usage context."
sidebar_label: "previewConversion(amount)"
---

Previews how many tokens would be received from:

- A deposit (underlying to shares)
- A redeem (shares to underlying)

## Signature

```tsx
previewConversion(amount: bigint): Promise<{
  vaultTokensReceiving: number | null;
  vaultTokensReceivingRaw: bigint | null;
  vaultTokensRate: number;
  underlyingReceiving: number | null;
  underlyingReceivingRaw: bigint | null;
  underlyingRate: number;
}>
```

## Parameters

- `amount` (bigint, required): amount of tokens to simulate the deposit or redeem with.

## Returns

- `vaultTokensReceiving` (`number | null`): shares received when depositing the underlying.
- `vaultTokensReceivingRaw` (`bigint | null`): raw share amount in base units.
- `vaultTokensRate` (`number`): vault tokens per unit of underlying.
- `underlyingReceiving` (`number | null`): underlying received when redeeming shares.
- `underlyingReceivingRaw` (`bigint | null`): raw underlying amount in base units.
- `underlyingRate` (`number`): underlying per unit of shares.

## Deposit example

```tsx
const details = await vault.getVaultDetails();

// Use the helper to get 1.0 underlying as bigint
const oneUnderlying = await vault.toUnderlyingBigInt("1.0");

// Preview how many vault tokens you would receive
const preview = await vault.previewConversion(oneUnderlying);

console.log(
  `1 ${details.underlying.symbol} -> ${await vault.applyDecimals(
    preview.vaultTokensReceivingRaw
  )} ${details.vaultAsset.symbol}`
);
```

## Redeem example

```tsx
const details = await vault.getVaultDetails();

// Use the helper to get 1.0 share as bigint
const oneShare = await vault.toBigInt("1.0");

// Preview how much underlying you would receive
const preview = await vault.previewConversion(oneShare);

console.log(
  `1 ${details.vaultAsset.symbol} -> ${await vault.toUnderlyingDecimals(
    preview.underlyingReceivingRaw
  )} ${details.underlying.symbol}`
);
```

## Response example (deposit)

```json
{ "vaultTokensReceiving": 0.01, "vaultTokensReceivingRaw": "10000000000000000" }
```

## Response example (redeem)

```json
{ "underlyingReceiving": 0, "underlyingReceivingRaw": "0" }
```
