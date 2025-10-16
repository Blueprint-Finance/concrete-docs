---
title: "Troubleshooting & Error Handling"
description: "Troubleshooting & Error Handling"
sidebar_label: "Troubleshooting & Error Handling"
---

## TL;DR Patterns

### 1) Vanilla (ethers)

```tsx
import { getVault } from "@concrete-xyz/sdk";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL!);
const vault = getVault("0xYourVault", "Ethereum", provider);

async function safeGetDetails() {
  try {
    const details = await vault.getVaultDetails();
    return details;
  } catch (err: any) {
    if (err.code === "NETWORK_ERROR") {
      // RPC down / bad URL
      throw new Error("RPC unavailable: check RPC_URL and network.");
    }
    if (err.code === "CALL_EXCEPTION") {
      // Wrong chain / wrong address / ABI mismatch
      throw new Error("Call failed: verify vault address & network match.");
    }
    throw err;
  }
}
```

### 2) Wagmi + React Query

```tsx
import { useVault, useVaultQuery } from "@concrete-xyz/sdk/wagmi";

export function UseDetails({ address, network }: { address: string; network: any }) {
  const vault = useVault(address, network);

  const query = useVaultQuery({
    address,
    network,
    queryKey: ["vaultDetails", address, network],
    enabled: !!vault, // Avoid running before the hook resolves
    queryFn: (v) => v.getVaultDetails(),
    retry: 2,
    staleTime: 30_000,
  });

  if (query.isLoading) return <div>Loading…</div>;
  if (query.isError) return <div>Failed to load vault details. {String(query.error)}</div>;

  return <pre>{JSON.stringify(query.data, null, 2)}</pre>;
}
```

## Common Error Sources & Fixes

| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| `NETWORK_ERROR`, `failed to fetch` | Bad/unstable RPC URL, rate limiting | Switch to a reliable RPC. Add retries/backoff. |
| `CALL_EXCEPTION` / `execution reverted` | Wrong **network** for the vault address; wrong address; deprecated contract | Ensure `getVault(address, network, …)` chain matches the contract’s chain. Verify address is the **vault**, not the underlying. |
| `undefined` / `Cannot read properties of undefined` | Hook not ready (Wagmi client not connected) | Gate reads with `enabled: !!vault` (React Query) or check `if (!vault) return`. |
| `BigInt` range/format issues | Mixing JS `number` with token base units | Always use `BigInt`; derive units from `await vault.getUnderlyingDecimals()`. |
| Wrong display amounts | Using wrong decimals for formatting | Use `getUnderlyingDecimals()` for underlying and `decimals()` for shares. |
| CORS / Browser blocking | Direct RPC calls from browser blocked | Use a proxy RPC provider or server side. |
| Inconsistent results caching | React Query defaults | Provide a `queryKey`, set `staleTime`, `cacheTime`, and `retry` policies explicitly. |

## Read Methods Recommendations

### `getVaultDetails()`

*Validate the shape and presence of nested fields (e.g., `underlying`).*

```tsx
const details = await vault.getVaultDetails();
if (!details?.underlying?.erc20) {
  throw new Error("Malformed details: missing underlying erc20");
}
```

### `totalAssets()`

*Wrap with retries—RPCs can flake.*

```tsx
async function withRetry<T>(fn: () => Promise<T>, n = 2): Promise<T> {
  try { return await fn(); } catch (e) { if (n <= 0) throw e; return withRetry(fn, n - 1); }
}
const total = await withRetry(() => vault.totalAssets());
```

### `symbol()` / `decimals()` / `getUnderlyingDecimals()`

*Handle non-standard tokens by falling back to metadata if you cache it.*

```tsx
let uDec = 18;
try { uDec = await vault.getUnderlyingDecimals(); }
catch { uDec = 18; /* fallback default if you must */ }
```

### `balanceOf(address)`

*Validate address and handle ENS resolution externally if needed.*

```tsx
import { isAddress } from "viem"; // or ethers
if (!isAddress(user)) throw new Error("Invalid address");
const bal = await vault.balanceOf(user);
```

### `previewConversion(amount)`

*Always build `amount` with correct decimals; catch `CALL_EXCEPTION` for paused/frozen states.*

```tsx
const uDec = await vault.getUnderlyingDecimals();
const amount = BigInt(10) ** BigInt(uDec); // 1 unit
try {
  const preview = await vault.previewConversion(amount);
  // use preview.vaultTokensReciving / preview.underlyingReciving
} catch (e: any) {
  if (e.code === "CALL_EXCEPTION") {
    throw new Error("Preview unavailable (vault paused / wrong chain / wrong address).");
  }
  throw e;
}
```

### `applyDecimals(value)` / `toUnderlyingDecimals(value)`

Avoid Decimal Bugs by using the built-in helpers to prevent unit mistakes.

Common pitfalls:

- **Input type** → must be `BigInt`, not `number` or `string`.
- **Order of calls** → call after `getVaultDetails()`, so decimals are loaded.
- **Correct usage** →
    - `applyDecimals()` = format **vault shares (ctAssets)**
    - `toUnderlyingDecimals()` = format **underlying ERC20**
- **Precision** → only use for display; keep core math in `BigInt`.
- **Network differences** → don’t assume decimals; USDC is 6 on Ethereum, 18 on other chains.

```tsx
const details = await vault.getVaultDetails();

const rawShares = await vault.balanceOf(user);
const displayShares = await vault.applyDecimals(rawShares); // "1.00 ctETH"

const rawUnderlying = await details.underlying.erc20.balanceOf(user);
const displayUnderlying = await vault.toUnderlyingDecimals(rawUnderlying); // "5000.00 USDC"

```

**When NOT to use them**

- **Do not** pass formatted strings back into write calls—always pass **BigInt** base units.
- Never feed `applyDecimals()` or `toUnderlyingDecimals()` outputs back into **write methods** like `deposit()`, `redeem()`, or `approve()`.
- These helpers are **for display only**.
- Always pass raw `BigInt` values (base units) into transactions.

## Network & Address Guards

### Ensure chain & address match

```tsx
function assertSameChain(configNet: string, uiNet: string) {
  if (configNet !== uiNet) throw new Error(`Network mismatch: SDK=${configNet}, UI=${uiNet}`);
}
assertSameChain("Ethereum", currentUiNetwork);
```

### Validate vault address early

```tsx
import { isAddress } from "viem";
if (!isAddress(vaultAddress)) throw new Error("Invalid vault address");
```

## React Query: Robust Defaults

```tsx
const result = useVaultQuery({
  address,
  network,
  queryKey: ["vault", address, network, "details"],
  queryFn: (v) => v.getVaultDetails(),
  retry: (count, error: any) => {
    // Retry only transient RPC issues
    return count < 2 && /NETWORK_ERROR|timeout|429/.test(String(error?.message));
  },
  staleTime: 30_000,    // fresh for 30s
  gcTime: 5 * 60_000,   // cache 5m (React Query v5 uses gcTime)
  refetchOnWindowFocus: false,
});
```

## Logging & Telemetry

Avoid logging private keys.

```tsx
function logReadError(method: string, vaultAddr: string, network: string, err: unknown) {
  console.warn(`[ConcreteSDK] read error`, { method, vaultAddr, network, err: String(err) });
}
```

## Write Methods: Common Failures & Fixes

### Insufficient Allowance (Underlying)

**Symptom:** `execution reverted: ERC20: insufficient allowance` (or router-specific revert)
**Fix:** Ensure you approved the **underlying** (not shares) and for **enough** amount.

```tsx
// Re-approve remaining delta
const need = await vault.toUnderlyingBigInt("1.0");
const cur = await details.underlaying.erc20.allowance(user, vault.getAddress());
if (cur < need) {
  await (await details.underlaying.erc20.approve(vault.getAddress(), need)).wait();
}

```

### Insufficient Balance/Gas

**Symptom:** `insufficient funds for intrinsic transaction cost` or `transfer amount exceeds balance`**Fix:** Check **native gas token** (ETH) balance and underlying/share balances before sending.

```tsx
const bal = await details.underlaying.erc20.balanceOf(user);
if (bal < amount) throw new Error("Not enough underlying to deposit.");

```

### Nonce/Replacement Errors

**Symptom:** `nonce too low`, `replacement fee too low`**Fix:** Read current nonce and resubmit with a higher max fee.

```tsx
const nonce = await signer.getNonce();
await vault.deposit(amount, { nonce, maxFeePerGas: prev * 12n / 10n }); // +20%

```

### Paused/Deprecated Vaults

**Symptom:** `CALL_EXCEPTION` or custom revert string (e.g., “paused”) on `deposit`/`redeem`**Fix:** Surface a clear UI message; gate write actions based on a health flag if you expose one.

```tsx
try { await vault.deposit(amount); }
catch (e:any) {
  if (/paused|deprecated/i.test(String(e.message))) {
    throw new Error("This vault is paused/deprecated. Withdrawals only.");
  }
  throw e;
}

```

### Preview ≠ Final (State Changed Between Calls)

**Symptom:** Actual mint/redeem differs from `previewConversion` (TVL/price moved)
**Fix:** Treat preview as indicative; consider a tolerance check and re-preview on confirm step.

```tsx
const pre = await vault.previewConversion(amount);
// (Optional) Assert minimum expected output for UX only; on-chain still authoritative

```

## ERC-20 Weirdness (Non-Standard Tokens)

Some tokens:

- Don’t return `bool` on `approve/transfer`.
- Require **reset-to-zero** before increasing allowance.
- Have chain-specific **decimals** (e.g., USDC 6 vs 18 elsewhere).

**Defensive pattern:**

```tsx
// Reset-to-zero pattern (safe for finicky tokens)
await (await erc20.approve(vault.getAddress(), 0n)).wait();
await (await erc20.approve(vault.getAddress(), amount)).wait();

```

## Allowance Race Conditions

If you fire multiple approvals/deposits in parallel, transactions can race and revert.

**Fix:** Sequence writes, or serialize by vault+user key.

```tsx
await (await erc20.approve(vault.getAddress(), amount)).wait();
await (await vault.deposit(amount)).wait();
```

## Signer/Wallet Lifecycle

**Symptoms:** `vault is undefined`, `signer missing`, user switched accounts/networks mid-flow.
**Fix:** Re-acquire signer before writes and assert chain id matches.

```tsx
// Wagmi
if (!vault) throw new Error("Wallet not connected. Connect before writing.");
// Vanilla
const networkOk = (await provider.getNetwork()).chainId === expectedChainId;
if (!networkOk) throw new Error("Wrong network selected in wallet.");

```

## EIP-1559 Fee Strategy (Busy Networks)

Avoid underpriced TXs on L2/L1 spikes.

```tsx
const fee = await provider.getFeeData();
await vault.deposit(amount, {
  maxFeePerGas: fee.maxFeePerGas! * 12n / 10n,
  maxPriorityFeePerGas: fee.maxPriorityFeePerGas! * 12n / 10n,
});
```

## Reorgs & Finality

A receipt can succeed, then be reorged in rare cases.
**Fix:** Wait for extra confirmations where it matters (admin ops, high TVL).

```tsx
const rc = await (await vault.deposit(amount)).wait(2);
// wait for 2 confirmations
```

## Retry & Backoff for Transient RPC Errors

Only retry **idempotent reads** or **broadcast** errors clearly marked transient.

```tsx
async function retry<T>(fn:()=>Promise<T>, times=2) {
  try { return await fn(); }
  catch (e:any) {
    if (times && /timeout|429|NETWORK_ERROR/.test(String(e?.message))) {
      await new Promise(r=>setTimeout(r, 800));
      return retry(fn, times-1);
    }
    throw e;
  }
}

```
