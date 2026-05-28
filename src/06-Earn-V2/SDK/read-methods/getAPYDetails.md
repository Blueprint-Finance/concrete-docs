---
title: "getApyDetails()"
description: "Read-method reference for getApyDetails() in the Concrete Earn V2 SDK, including expected inputs, outputs, and usage context."
sidebar_label: "getApyDetails()"
---

Fetches APY history and headline metrics for a vault. The method is exposed on the vault instance but is backed by the Concrete API, not an on-chain call.

:::tip
Works the same in vanilla, React, and Wagmi integrations because all return the same vault object.
:::

## Signature

```tsx
const apy = await vault.getApyDetails(): Promise<ApyDetails>
```

## Parameters

- None

## Returns

```tsx
type ApyPoint = { timestamp: string | number; amount: string };

type ApyDetails = {
  apyHistory30Days: ApyPoint[];
  tvlHistory30Days: ApyPoint[];
  totalAssetsHistory30Days: ApyPoint[];
  apy: string | undefined;            // latest APY point amount, as a numeric string
  tvl: string | undefined;            // latest TVL point amount, as a numeric string
  totalAssets: string | undefined;    // latest total-assets point amount, as a numeric string
  nextPayout: Date | null;            // next payout timestamp, when reported
};
```

The headline `apy`, `tvl`, and `totalAssets` fields are numeric strings taken from the latest history point. Convert them with `Number(...)` before doing arithmetic. The underlying token price is exposed separately via `vault.getUnderlyingPrice()`.

## Examples

### Vanilla (ethers)

```tsx
import { getVault } from "@concrete-xyz/sdk";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://ethereum-rpc.publicnode.com");
const vault = getVault("v2", "0xE2d8267D285a7ae1eDf48498fF044241d04e9608", chainId, provider);

const apy = await vault.getApyDetails();
console.log("APY Details:", apy);

if (apy.apy != null) {
  const price = await vault.getUnderlyingPrice();
  console.log(`APY: ${(Number(apy.apy) * 100).toFixed(2)}%`);
  console.log(`Underlying ~ $${price.toFixed(2)} USD`);
}
```

### React (custom hook)

```tsx
import { useEffect, useState } from "react";
import { useVault } from "@concrete-xyz/sdk/react";

export function ApyWidget({ version, address, chainId, provider, signer }) {
  const vault = useVault(version, address, chainId, provider, signer);
  const [apy, setApy] = useState<any>(null);
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const [data, p] = await Promise.all([vault.getApyDetails(), vault.getUnderlyingPrice()]);
      if (active) {
        setApy(data);
        setPrice(p);
      }
    })();
    return () => { active = false; };
  }, [vault]);

  if (!apy) return <div>Loading APY...</div>;
  return (
    <div>
      <div>APY: {(Number(apy.apy) * 100).toFixed(2)}%</div>
      {price != null && <div>Underlying: ${price.toFixed(2)}</div>}
    </div>
  );
}
```

### Wagmi with `useVaultQuery`

```tsx
import { useVault, useVaultQuery } from "@concrete-xyz/sdk/wagmi";

const vaultConfig = {
  version: "v2",
  address: "0xE2d8267D285a7ae1eDf48498fF044241d04e9608",
  chainId: 1,
} as const;

export function ApyPanel() {
  const vault = useVault(vaultConfig);

  const q = useVaultQuery({
    vault: vaultConfig,
    queryKey: ["apy"],
    enabled: !!vault,
    queryFn: async (v) => {
      const [apy, price] = await Promise.all([v.getApyDetails(), v.getUnderlyingPrice()]);
      return { apy, price };
    },
    staleTime: 60_000,
    retry: 2,
  });

  if (q.isLoading) return <div>Loading APY...</div>;
  if (q.isError) return <div>Failed to load APY</div>;

  const { apy, price } = q.data!;
  return (
    <div>
      <div>APY: {(Number(apy.apy) * 100).toFixed(2)}%</div>
      {price != null && <div>Underlying: ${price.toFixed(2)}</div>}
    </div>
  );
}
```

## Notes and error handling

- **Backend-backed**: unlike `symbol()` or `totalAssets()`, this hits the Concrete API. Handle HTTP and network failures and timeouts.
- **Staleness**: APY is not block-by-block. Cache reasonably (`staleTime` 30 to 120 seconds).
- **String values**: headline fields are numeric strings. Convert with `Number(...)` before arithmetic.
- **Rate limits**: if you batch widgets, share a single query via React Query to avoid redundant calls.

**Minimal guard**

```tsx
try {
  const apy = await vault.getApyDetails();
  if (apy?.apy == null) throw new Error("APY unavailable");
} catch (e) {
  // fallback UI
}
```
