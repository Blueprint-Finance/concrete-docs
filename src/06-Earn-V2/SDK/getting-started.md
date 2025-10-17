---
title: "Getting Started"
description: "how to install the SDK, handle optional dependencies, set up providers, and initialize a vault instance using vanilla JS/TS, React, or Wagmi."
sidebar_label: "Getting Started"
---

This guide shows how to install the SDK, handle optional dependencies, set up providers, and initialize a vault instance using vanilla JS/TS, React, or Wagmi.

## Prerequisites

Before you can interact with the SDK, you’ll need:

- **A Vault Address** → Each call to the SDK requires a target vault contract (e.g., `0x15cE9bE...`). Without it, you can’t query metadata, preview conversions, or deposit.
- **A Supported Network** → The vault must exist on one of the supported chains (Ethereum, Arbitrum, Berachain, Katana, Corn, Morph).
- **(Optional) A Signer** → Needed only if you plan to send transactions (e.g., deposits, approvals, redemptions). For read-only queries, a provider is enough.

## Installation

Install the core SDK:

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


Peer dependencies like ethers.js or wagmi are optional.

- If you’re using **vanilla** integration, you’ll need `ethers`.
- If you’re using **Wagmi**, the SDK auto-wires into your Wagmi setup.

## Provider Setup

Depending on your environment:

- **Vanilla (ethers.js):** you must pass a `JsonRpcProvider`, and optionally a `signer` for write methods.
- **React hook:** you provide both `provider` and `signer`.
- **Wagmi hook:** no provider config needed; it auto-detects from your Wagmi app.

## Initializing a Vault

### Vanilla (JS/TS)

```tsx
import { getVault } from "@concrete-xyz/sdk";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("<https://ethereum-rpc.publicnode.com>");

// Read-only vault instance
const vault = getVault("0xVaultAddress", "Ethereum", provider);

// Example: get metadata
const details = await vault.getVaultDetails();
console.log("Vault symbol:", details.vaultAsset.symbol);

```

To **write** (approve, deposit, redeem), pass a signer:

```tsx
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const vaultWithSigner = getVault("0xVaultAddress", "Ethereum", provider, signer);

```

### React Hook

The React hook wraps `getVault` in a `useMemo`. For reads/writes, pass both `provider` and `signer`.

```tsx
import { useEffect, useState } from "react";
import { useVault } from "@concrete-xyz/sdk/react";

function VaultInfo({ provider, signer }) {
  const vault = useVault("0xVaultAddress", "Berachain", provider, signer);
  const [symbol, setSymbol] = useState<string>();

  useEffect(() => {
    if (!vault) return;
    (async () => {
      const details = await vault.getVaultDetails();
      setSymbol(details.vaultAsset.symbol);
    })();
  }, [vault]);

  return <div>Vault: {symbol ?? "…"}</div>;
}

```

### Wagmi Hook

If your app already uses Wagmi, the SDK wires in automatically.
For **queries**, prefer `useVaultQuery`, which handles `loading`/`error` states.

```tsx
import { useVaultQuery } from "@concrete-xyz/sdk/wagmi";

function VaultInfo() {
  const { data, isLoading, error } = useVaultQuery({
    address: "0xVaultAddress",
    network: "Ethereum",
    queryKey: ["vaultDetails"],
    queryFn: (vault) => vault.getVaultDetails(),
  });

  if (isLoading) return <>Loading…</>;
  if (error) return <>Error</>;
  return <div>Vault: {data?.vaultAsset.symbol}</div>;
}
```

## Summary

- **Reads** (e.g., `getVaultDetails`, `totalAssets`) → only need a provider.
- **Writes** (e.g., `approve`, `deposit`, `redeem`) → require a signer.
- **Wagmi hook** → may briefly return `undefined` while connectors load; `useVaultQuery` handles this safely.
