---
title: "Setup Configuration"
description: "Concrete Earn V2 SDK documentation for setup Configuration, with implementation guidance for production-grade integrations."
sidebar_label: "Setup Configuration"
---

This guide shows how to install the [SDK](/glossary/#sdk), add its peer dependencies, create viem clients, and initialize a vault instance using vanilla [JS](/glossary/#js)/[TS](/glossary/#ts), React, or Wagmi.

:::info
This page describes SDK 2.x. To upgrade an existing 1.x integration, see [Migrating from 1.x](./migrating-from-1x.md).
:::

## Prerequisites

Before you can interact with the [SDK](/glossary/#sdk), you need:

- **Node 20.10 or later**. The SDK does not support earlier Node versions.
- **A vault address**. Each SDK call targets a specific vault contract (for example `0x15cE9bE...`). Without it, you cannot query metadata, preview conversions, or deposit.
- **A supported network**. The vault must exist on one of the supported chains: Ethereum, Arbitrum, Berachain, Katana, Corn, Morph.
- **A wallet client (optional)**. Required for transactions (deposits, approvals, redemptions). Read-only queries only need a public client.

## Installation

Install the core [SDK](/glossary/#sdk) together with [viem](https://viem.sh):

```bash
npm install @concrete-xyz/sdk viem@^2
```

viem `^2` is a peer dependency. The SDK takes viem `PublicClient` and `WalletClient` instances and does not bundle viem.

The React and Wagmi integrations ship in the same package under subpaths. The Wagmi subpath needs two more peer dependencies:

```bash
npm install @concrete-xyz/sdk viem@^2 wagmi@^2 @tanstack/react-query@^5
```

```tsx
import { useVault } from "@concrete-xyz/sdk/react";
import { useVault, useVaultQuery } from "@concrete-xyz/sdk/wagmi";
```

`react` (`^18` or `^19`), `wagmi`, and `@tanstack/react-query` are optional peer dependencies, needed only for the subpath that uses them. wagmi `^3` is not supported. Keep a single copy of each at the top level of your app: two copies of React break hooks, and two copies of wagmi split the `WagmiProvider` context.

## Client setup

Depending on your environment:

- **Vanilla (viem)**: pass a `PublicClient`, and optionally a `WalletClient` with an `account` for write methods.
- **React hook**: pass the same `publicClient` and `walletClient`.
- **Wagmi hook**: no client config required. The [SDK](/glossary/#sdk) resolves both clients from your Wagmi config.

## Initializing a vault

### Vanilla ([JS](/glossary/#js)/[TS](/glossary/#ts))

`getVault` takes the vault version, address, chain ID, and a viem public client.

```tsx
import { getVault } from "@concrete-xyz/sdk";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http("https://ethereum-rpc.publicnode.com"),
});

// Read-only vault instance
const vault = getVault("v1", "0xVaultAddress", 1, publicClient);

// Example: get metadata
const details = await vault.getVaultDetails();
console.log("Vault symbol:", details.vaultAsset.symbol);
```

To send transactions (approve, deposit, redeem), pass a wallet client that has an `account`:

```tsx
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";

const walletClient = createWalletClient({
  account: privateKeyToAccount(PRIVATE_KEY),
  chain: mainnet,
  transport: http("https://ethereum-rpc.publicnode.com"),
});
const vaultWithWallet = getVault("v1", "0xVaultAddress", 1, publicClient, walletClient);
```

Without a public client, on-chain reads and writes are unavailable. [API](/glossary/#api)-backed methods such as `getApyDetails()` and `getWithdrawalForecast()` still work. Pass `true` as the sixth argument to suppress the warning that `getVault` logs when no public client is passed.

### React hook

The React hook takes the same arguments as `getVault` and memoizes the instance. The `chainId` must be a number. For reads and writes, pass both `publicClient` and `walletClient`.

```tsx
import { useEffect, useState } from "react";
import { useVault } from "@concrete-xyz/sdk/react";

function VaultInfo({ publicClient, walletClient }) {
  const vault = useVault("v1", "0xVaultAddress", 80094, publicClient, walletClient);
  const [symbol, setSymbol] = useState<string>();

  useEffect(() => {
    if (!vault) return;
    (async () => {
      const details = await vault.getVaultDetails();
      setSymbol(details.vaultAsset.symbol);
    })();
  }, [vault]);

  return <div>Vault: {symbol ?? "..."}</div>;
}
```

### Wagmi hook

If your app already uses Wagmi, the [SDK](/glossary/#sdk) wires in automatically. For queries, prefer `useVaultQuery`, which handles `loading` and `error` states.

```tsx
import { useVaultQuery } from "@concrete-xyz/sdk/wagmi";

const vaultConfig = {
  version: "v1",
  address: "0xVaultAddress",
  chainId: 1,
} as const;

function VaultInfo() {
  const { data, isLoading, error } = useVaultQuery({
    vault: vaultConfig,
    queryKey: ["vaultDetails"],
    queryFn: (vault) => vault.getVaultDetails(),
  });

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error</>;
  return <div>Vault: {data?.vaultAsset.symbol}</div>;
}
```

## Error reporting

The [SDK](/glossary/#sdk) reports nothing by default. Register a sink with `setErrorReporter` to receive instrumented errors, for example to forward them to your own error tracker.

```tsx
import { setErrorReporter } from "@concrete-xyz/sdk";

setErrorReporter((error, report) => console.error(error, report));
```

## Contract ABIs

The [SDK](/glossary/#sdk) ships contract [ABIs](/glossary/#abi) under two wildcard subpaths.

| **Subpath** | **Form** | **Use it for** |
| --- | --- | --- |
| `@concrete-xyz/sdk/abi/<contract>` | Typed viem ABI | TypeScript. Literal types survive, so viem infers function names, arguments, and return types. |
| `@concrete-xyz/sdk/raw-abi/<contract>.json` | Standard JSON ABI array | Non-TypeScript consumers, other libraries, codegen, and contract verification. |

Prefer the typed subpath in TypeScript. A JSON import widens the literal types to `string`, and viem then loses all inference.

```tsx
import abi from "@concrete-xyz/sdk/abi/vault";
import rawAbi from "@concrete-xyz/sdk/raw-abi/vault.json" with { type: "json" };

const total = await publicClient.readContract({ address, abi, functionName: "totalAssets" });
```

The typed subpath covers `asset-pricer`, `hook-abstract`, `hook-container`, `hook-deposit-lock-with-fee`, `hook-multi-asset-deposit-cap`, `hook-whitelist-user-deposit`, `hurdle-rate-oracle`, `hurdle-rate-oracle-offchain`, `multicall`, `vault`, `vault-v2-async`, `weth`, and `withdraw-queue`. The raw subpath covers those and four more: `oapp`, `strategy`, `vault-distributor`, and `vault-registry`.

In TypeScript, the `with { type: "json" }` attribute needs `"module"` set to `"nodenext"`, `"esnext"`, or `"preserve"`. The typed subpath needs neither.

## Summary

- **Reads** (for example `getVaultDetails`, `totalAssets`): only need a public client.
- **Writes** (for example `approve`, `deposit`, `redeem`): require a wallet client with an `account`.
- **Wagmi hook**: may briefly return `undefined` while connectors load. `useVaultQuery` handles this safely.
