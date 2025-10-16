---
title: "previewConversion(amount)"
description: "previewConversion(amount)"
sidebar_label: "previewConversion(amount)"
---


Previews how many tokens would be received from:

- A **deposit** (underlying → shares)
- A **redeem** (shares → underlying)

## Signature

```tsx
previewConversion(amount: bigint): Promise<{
  vaultTokensReciving?: bigint;
  underlyingReciving?: bigint;
}>
```

## Parameters

- `amount` (bigint, required) — amount of tokens to simulate deposit/redeem with.

## Returns

- `vaultTokensReciving` (bigint, optional) — shares received when depositing underlying.
- `underlyingReciving` (bigint, optional) — underlying received when redeeming shares.

## Deposit Example

```tsx
import { ethers } from "ethers";

const details = await vault.getVaultDetails();

// Use helper to get 1.0 underlying as bigint
const oneUnderlying = await vault.toUnderlyingBigInt("1.0");

// Preview how many vault tokens you'd receive
const preview = await vault.previewConversion(oneUnderlying);

console.log(
  `1 ${details.underlaying.symbol} -> ${await vault.applyDecimals(
    preview.vaultTokensReciving
  )} ${details.vaultAsset.symbol}`
);
```

## Redeem Example

```tsx
import { ethers } from "ethers";

const details = await vault.getVaultDetails();

// Use helper to get 1.0 share as bigint
const oneShare = await vault.toBigInt("1.0");

// Preview how much underlying you'd receive
const preview = await vault.previewConversion(oneShare);

console.log(
  `1 ${details.vaultAsset.symbol} -> ${await vault.toUnderlayingDecimals(
    preview.underlyingReciving
  )} ${details.underlaying.symbol}`
);
```

## Response Example (Deposit)

```json
{ "vaultTokensReciving": "10000000000000000" }
```

## Response Example (Redeem)

```json
{ "underlyingReciving": "0" }
```
