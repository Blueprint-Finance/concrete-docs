---
title: "Setup Configuration"
description: "Concrete Earn V2 SDK documentation for setup Configuration, with implementation guidance for production-grade integrations."
sidebar_label: "Setup Configuration"
---

This guide shows how to install the [SDK](/glossary/#sdk), handle optional dependencies, set up providers, and initialize a vault instance using vanilla [JS](/glossary/#js)/[TS](/glossary/#ts), React, or Wagmi.

## Prerequisites

Before you can interact with the [SDK](/glossary/#sdk), you need:

- **A vault address**. Each SDK call targets a specific vault contract (for example `0x15cE9bE...`). Without it, you cannot query metadata, preview conversions, or deposit.
- **A supported network**. The vault must exist on one of the supported chains: Ethereum, Arbitrum, Berachain, Katana, Corn, Morph.
- **A signer (optional)**. Required for transactions (deposits, approvals, redemptions). Read-only queries only need a provider.

## Installation

Install the core [SDK](/glossary/#sdk):

```bash
npm install @concrete-xyz/sdk
```

Optional subpaths:

- **React integration**

```
npm install @concrete-xyz/sdk
import { useVault } from "@concrete-xyz/sdk/react";
```

- **Wagmi integration**

```
npm install @concrete-xyz/sdk
import { useVault, useVaultQuery } from "@concrete-xyz/sdk/wagmi";
```


Peer dependencies like ethers.js or wagmi are optional:

- For **vanilla** integration, you need `ethers`.
- For **Wagmi**, the SDK auto-wires into your Wagmi setup.

## Provider setup

Depending on your environment:

- **Vanilla (ethers.js)**: pass a `JsonRpcProvider`, and optionally a `signer` for write methods.
- **React hook**: pass both `provider` and `signer`.
- **Wagmi hook**: no provider config required. The [SDK](/glossary/#sdk) auto-detects from your Wagmi app.

## Initializing a vault

### Vanilla ([JS](/glossary/#js)/[TS](/glossary/#ts))

```tsx
import { getVault } from "@concrete-xyz/sdk";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://ethereum-rpc.publicnode.com");

// Read-only vault instance
const vault = getVault("v1", "0xVaultAddress", chainId, provider);

// Example: get metadata
const details = await vault.getVaultDetails();
console.log("Vault symbol:", details.vaultAsset.symbol);
```

To send transactions (approve, deposit, redeem), pass a signer:

```tsx
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const vaultWithSigner = getVault("v1", "0xVaultAddress", chainId, provider, signer);
```

### React hook

The React hook wraps `getVault` in a `useMemo`. The `chainId` must be a number. For reads and writes, pass both `provider` and `signer`.

```tsx
import { useEffect, useState } from "react";
import { useVault } from "@concrete-xyz/sdk/react";

function VaultInfo({ provider, signer }) {
  const vault = useVault("v1", "0xVaultAddress", 80094, provider, signer);
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

## Summary

- **Reads** (for example `getVaultDetails`, `totalAssets`): only need a provider.
- **Writes** (for example `approve`, `deposit`, `redeem`): require a signer.
- **Wagmi hook**: may briefly return `undefined` while connectors load. `useVaultQuery` handles this safely.
