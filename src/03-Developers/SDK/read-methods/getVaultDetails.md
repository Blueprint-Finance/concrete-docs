---
title: "getVaultDetails()"
description: "Read-method reference for getVaultDetails() in the Concrete Earn V2 SDK, including expected inputs, outputs, and usage context."
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
  version: 1 | 2;
  source: "onchain" | "gql";
  address: string;
  paused: boolean;
  symbolDetails: { symbol: string; underlyingSymbol: string };
  underlying: { address: string; decimals: number; symbol: string };
  vaultAsset: { address: string; decimals: number; symbol: string; token: string };
  deposits: {
    enabled: boolean;
    depositedRaw: bigint;
    deposited: number;
    limitUsed: number;
    limitRaw: bigint;
    minLimitRaw: bigint;
    depositedUsd: number | null;
    limitUsd: number | null;
  };
  withdrawals: {
    isQueueMandatory: boolean;
    limitRaw: bigint;
    minLimitRaw: bigint;
  };
  network: EnabledNetwork;
};
```

To get an ERC20 instance for the underlying token, call `await vault.getUnderlyingErc20()`. The `underlying` object on `VaultDetails` only exposes metadata.

## Example

```tsx
const details = await vault.getVaultDetails();
console.log(details.symbolDetails.symbol);   // "ctBeraLBTC"
console.log(details.vaultAsset.symbol);      // "ctLBTC"
console.log(details.underlying.symbol);      // "LBTC"
```

## Response example

```json
{
  "version": 2,
  "source": "onchain",
  "address": "0x15cE9bE6609db102b70D68ca75a39c555bEa5Fac",
  "paused": false,
  "symbolDetails": { "symbol": "ctBeraLBTC", "underlyingSymbol": "LBTC" },
  "underlying": { "address": "0x...", "symbol": "LBTC", "decimals": 18 },
  "vaultAsset": { "address": "0x...", "symbol": "ctLBTC", "decimals": 18, "token": "ctberalbtc" },
  "deposits": {
    "enabled": true,
    "depositedRaw": "123456789",
    "deposited": 123.456,
    "limitUsed": 0.5,
    "limitRaw": "1000000000",
    "minLimitRaw": "0",
    "depositedUsd": null,
    "limitUsd": null
  },
  "withdrawals": {
    "isQueueMandatory": true,
    "limitRaw": "-1",
    "minLimitRaw": "0"
  },
  "network": "berachain"
}
```
