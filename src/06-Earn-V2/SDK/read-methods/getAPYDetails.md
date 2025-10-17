---
title: "getApyDetails()"
description: "getApyDetails()"
sidebar_label: "getApyDetails()"
---

Fetch APY info and the current underlying price for a vault.
This method is exposed on the **Vault instance**, but it’s backed by the **ConcreteAPI** (our backend), not an on-chain call.

:::tip
Works the same in vanilla, React, and Wagmi integrations because all return the same Vault object.
:::

## Signature

```tsx
const apy = await vault.getApyDetails(): Promise<ApyDetails>
```

## Parameters

None.

## Returns

A plain object with APY/price metadata from ConcreteAPI.

The exact payload may evolve. Typical fields include:

```tsx
type ApyDetails = {
  // headline fields
  apy?: number;                // annualized % as a decimal (e.g., 0.072 = 7.2%)
  apr?: number;                // optional APR if reported
  netApy?: number;             // after-fee APY (if available)
  grossApy?: number;           // before-fee APY (if available)

  // decomposition (if available)
  components?: Array<{
    label: string;             // e.g., "Lending", "Restaking", "Incentives"
    apy: number;               // decimal (0.01 = 1%)
  }>;

  // price metadata
  underlyingPriceUsd?: number; // current underlying price in USD
  underlyingSymbol?: string;   // e.g., "USDC", "WBTC"

  // bookkeeping
  updatedAt?: string | number; // ISO timestamp or epoch
  source?: "ConcreteAPI";      // data source marker
};
```

## Examples

### Vanilla (ethers)

```tsx
import { getVault } from "@concrete-xyz/sdk";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("<https://ethereum-rpc.publicnode.com>");
const vault = getVault("0xE2d8267D285a7ae1eDf48498fF044241d04e9608", "Arbitrum", provider);

const apy = await vault.getApyDetails();
console.log("APY Details:", apy);

// Example usage
if (apy.apy != null && apy.underlyingPriceUsd != null) {
  console.log(`APY: ${(apy.apy * 100).toFixed(2)}%`);
  console.log(`Underlying ~ $${apy.underlyingPriceUsd.toFixed(2)} USD`);
}
```

### React (custom hook)

```tsx
import { useEffect, useState } from "react";
import { useVault } from "@concrete-xyz/sdk/react";

export function ApyWidget({ address, network, provider, signer }) {
  const vault = useVault(version, address, network, provider, signer);
  const [apy, setApy] = useState<any>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const data = await vault.getApyDetails();
      if (active) setApy(data);
    })();
    return () => { active = false; };
  }, [vault]);

  if (!apy) return <div>Loading APY…</div>;
  return (
    <div>
      <div>APY: {(apy.apy * 100).toFixed(2)}%</div>
      {apy.underlyingPriceUsd != null && (
        <div>Underlying: ${apy.underlyingPriceUsd.toFixed(2)}</div>
      )}
    </div>
  );
}
```

### Wagmi + `useVaultQuery`

```tsx
import { useVault, useVaultQuery } from "@concrete-xyz/sdk/wagmi";

export function ApyPanel({ address, network }) {
  const vault = useVault(vault config object);

  const q = useVaultQuery({
    address,
    network,
    queryKey: ["apy", address, network],
    enabled: !!vault,
    queryFn: (v) => v.getApyDetails(),
    staleTime: 60_000, // cache APY for 60s
    retry: 2,
  });

  if (q.isLoading) return <div>Loading APY…</div>;
  if (q.isError) return <div>Failed to load APY</div>;

  const apy = q.data!;
  return (
    <div>
      <div>APY: {(apy.apy * 100).toFixed(2)}%</div>
      {apy.underlyingPriceUsd != null && (
        <div>Underlying: ${apy.underlyingPriceUsd.toFixed(2)}</div>
      )}
    </div>
  );
}
```

## Notes & Error Handling

- **Backend-backed:** Unlike `symbol()` or `totalAssets()`, this hits ConcreteAPI. Handle **HTTP/network** failures and timeouts.
- **Staleness:** APY is not block-by-block; cache reasonably (`staleTime` 30–120s).
- **Evolving schema:** Treat extra fields as optional; guard with null checks.
- **Rate limits:** If you batch widgets, share a single query via React Query to avoid redundant calls.

**Minimal guard**

```tsx
try {
  const apy = await vault.getApyDetails();
  if (apy?.apy == null) throw new Error("APY unavailable");
} catch (e) {
  // fallback UI
}
```
