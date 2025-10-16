---
title: "getVaultDetails()"
description: "getVaultDetails()"
sidebar_label: "getVaultDetails()"
---

Returns metadata about the vault and its underlying ERC20.

## Signature

```tsx
getVaultDetails(): Promise<VaultDetails>
```

## Parameters

- None

## Returns

```tsx
type VaultDetails = {
  address: string;
  symbolDetails: string;
  vaultAsset: { address: string; symbol: string; decimals: number };
  underlying: { address: string; symbol: string; decimals: number; erc20: any };
};
```

## Example

```tsx
const details = await vault.getVaultDetails();
console.log(details.symbolDetails);      // "ctBeraLBTC"
console.log(details.vaultAsset.symbol);  // "ctLBTC"
console.log(details.underlying.symbol); // "LBTC
```

## Response Example

```json
{
  "address": "0x15cE9bE6609db102b70D68ca75a39c555bEa5Fac",
  "symbolDetails": "ctBeraLBTC",
  "vaultAsset": { "address": "0x...", "symbol": "ctLBTC", "decimals": 18 },
  "underlying": { "address": "0x...", "symbol": "LBTC", "decimals": 18 }
}
```
