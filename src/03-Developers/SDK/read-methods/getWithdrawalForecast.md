---
title: "getWithdrawalForecast(options)"
description: "Read-method reference for getWithdrawalForecast(options) in the Concrete Earn V2 SDK, including expected inputs, outputs, and usage context."
sidebar_label: "getWithdrawalForecast(options)"
---

Estimates when Withdrawal Queue requests on a V2 async vault become available. The forecast covers the Epoch schedule, the load on the queue, the receiver's outstanding requests, and the assets that are claimable now. It can also preview a request before you submit it. Available from [SDK](/glossary/#sdk) 2.1.0.

The method is backed by the Concrete [API](/glossary/#api), not an on-chain call, so it needs no [RPC](/glossary/#rpc) client or wallet.

## Signature

The method takes a single options object.

```tsx
getWithdrawalForecast(options: GetWithdrawalForecastOptions): Promise<WithdrawalForecast>
```

## Parameters

- `account` (Address, required): the withdrawal receiver.
- `additionalShares` (bigint, optional): a positive amount of shares, in share base units, to preview as a new request.

A preview adds `additionalShares` to the receiver's existing requests. It assumes the caller, the share owner, and the receiver are all `account`. An ineligible preview does not remove existing requests or claims.

## Returns

| **Field** | **Use** |
| --- | --- |
| `status`, `reasons`, `snapshot` | Check availability and source freshness before you display estimates. |
| `schedule` | Distinguish scheduled close and process times from the observed Epoch state. |
| `pressure` | Read the withdrawal cap and idle-liquidity budgets, the queued shares, and the capacity for a new request. |
| `existing` | Read outstanding requests and their forecast portions. Processed claims are separate. |
| `claimable` | Read the assets and Epochs that are available to claim now. |
| `preview` | Check eligibility and the forecast for existing requests plus the proposed request. `null` when `additionalShares` is omitted. |
| `assumptions` | Read the conditions the estimate depends on. |

`existing` and `preview.forecast` share one shape:

```tsx
type AccountWithdrawalForecast = {
  status: "ready" | "partial" | "unavailable" | "unsupported";
  reasons: string[];
  requestedSharesRaw: bigint | null;
  positions: { epochId: bigint; sharesRaw: bigint }[];
  portions: {
    sharesRaw: bigint;
    epochId: bigint;
    estimatedAvailableAt: string | null;
    outcome: "direct_payment" | "claim";
  }[];
  firstAvailableAt: string | null;
  fullAvailableAt: string | null;
  unallocatedSharesRaw: bigint | null;
};
```

Amounts are `bigint` in share or underlying base units. Format them with the returned `shareDecimals` and `assetDecimals`. Epoch IDs and block numbers are also `bigint`. Timestamps are [UTC](/glossary/#utc) ISO 8601 strings, and `snapshot.maxAgeSeconds` is in seconds. `policy.thresholdPercent` keeps the exact decimal percentage as a string.

## Example

The first call reads the receiver's current forecast. The second previews a new request of 1,000,000 share base units.

```tsx
import { getVault, type WithdrawalForecast } from "@concrete-xyz/sdk";

const vault = getVault("v2", vaultAddress, chainId, undefined, undefined, true);

const current: WithdrawalForecast = await vault.getWithdrawalForecast({ account });
console.log("Fully available at:", current.existing.fullAvailableAt);

const preview = await vault.getWithdrawalForecast({ account, additionalShares: 1_000_000n });
if (preview.preview?.eligibility === "eligible") {
  console.log("New request available at:", preview.preview.forecast?.fullAvailableAt);
}
```

:::info[Example]
Alice holds ctUSDC shares on an async vault and previews a withdrawal of all her shares. If the forecast splits her request across two Epochs, `portions` has two entries, each with its own `epochId` and `estimatedAvailableAt`. `firstAvailableAt` then holds the earlier date and `fullAvailableAt` the later one.
:::

## Notes and error handling

- **Estimates, not guarantees**: dates are conditional on the returned `assumptions`. A scheduled date alone does not enable a claim.
- **Portion outcomes**: a `direct_payment` portion pays assets directly. A `claim` portion requires a later claim after the Epoch is processed.
- **Partial results**: preserve `partial`, `unavailable`, and `unsupported` results and their `reasons`. A `null` amount is unknown, not zero. `fullAvailableAt` is `null` when the forecast cannot allocate the full amount, and `unallocatedSharesRaw` holds the remainder.
- **Input validation**: the call throws for an invalid vault or receiver address, and for an `additionalShares` value that is not a positive `bigint`.
- **Timeout**: the request aborts after 30 seconds. Network, [API](/glossary/#api), and timeout errors reject the call.
