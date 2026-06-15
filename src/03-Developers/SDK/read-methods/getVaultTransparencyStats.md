---
title: "getVaultTransparencyStats (API)"
description: "HTTP API reference for vault off-chain portfolio transparency stats: assets, protocols, and networks breakdown by vault address and chain ID."
sidebar_label: "getVaultTransparencyStats (API)"
---

Returns a delayed off-chain portfolio breakdown for a vault: total [USD](/glossary/#usd), per-asset, per-protocol, and per-network slices. The Concrete app uses this endpoint for the [Vault Transparency](/Using-Concrete-Vaults/vault-transparency/) panel on Earn vault pages.

This is a Concrete [API](/glossary/#api) route, not an on-chain `eth_call`. It is not exposed on the `@concrete-xyz/sdk` vault instance at this time. Integrators call the HTTP endpoint directly.

:::tip
Treat `amountUsd` and `totalPortfolioAssetsOffchainUsd` as display numbers in USD. Asset `amount` values use the asset's native decimals as reported by the API.
:::

## HTTP request

```http
GET /v1/vault:transparency/stats?address={vaultAddress}&chain_id={chainId}
```

### Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `address` | string | Vault contract address. The app lowercases the address before sending. |
| `chain_id` | number | EVM chain ID for the vault (for example `1` for Ethereum mainnet). |

## Response

```tsx
type VaultTransparencyStats = {
  totalPortfolioAssetsOffchainUsd: number;
  timestamp: string;
  byAsset: {
    symbol: string;
    amount: number;
    amountUsd: number;
    logoUrl: string | null;
  }[];
  byProtocol: {
    name: string;
    amountUsd: number;
    logoUrl: string | null;
  }[];
  byPlatform: {
    platformId: string;
    amountUsd: number;
    logoUrl: string | null;
  }[];
};
```

`byPlatform` rows include `logoUrl`, which is `null` when no logo is available. `timestamp` is an ISO-style string indicating when the breakdown was captured.

## Example

```tsx
const vaultAddress = "0xe2d8267d285a7ae1edf48498ff044241d04e9608";
const chainId = 1;

const url = new URL("https://api.concrete.xyz/v1/vault:transparency/stats");
url.searchParams.set("address", vaultAddress.toLowerCase());
url.searchParams.set("chain_id", String(chainId));

const res = await fetch(url);
if (!res.ok) throw new Error(`transparency stats failed: ${res.status}`);

const stats: VaultTransparencyStats = await res.json();

console.log(stats.totalPortfolioAssetsOffchainUsd);
console.log(stats.byAsset);
console.log(stats.byProtocol);
console.log(stats.byPlatform);
```

Replace the base [URL](/glossary/#url) with the Concrete [API](/glossary/#api) host your environment uses.

## Notes

- **Staleness**: panel copy in the app states a 24-hour delay. Cache responses accordingly; the app uses a 60-minute client cache.
- **Empty breakdown**: when all of `byAsset`, `byProtocol`, and `byPlatform` are empty, the app hides the Vault Transparency panel.
- **Errors**: handle non-2xx responses and network failures; the [UI](/glossary/#ui) omits the panel when data is unavailable.

**Minimal guard**

```tsx
try {
  const stats = await fetchTransparencyStats(address, chainId);
  const hasBreakdown =
    stats.byAsset.length > 0 ||
    stats.byProtocol.length > 0 ||
    stats.byPlatform.length > 0;
  if (!hasBreakdown) {
    // no panel
  }
} catch {
  // fallback UI
}
```
