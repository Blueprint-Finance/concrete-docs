---
title: "Troubleshooting & Error Handling"
description: "Concrete Earn V2 SDK documentation for troubleshooting & Error Handling, with implementation guidance for production-grade integrations."
sidebar_label: "Troubleshooting & Error Handling"
---

## Quick patterns

### 1) Vanilla (viem)

On-chain reads throw viem errors. Use `BaseError.walk()` to find the cause inside the error chain.

```tsx
import { getVault } from "@concrete-xyz/sdk";
import { BaseError, ContractFunctionRevertedError, HttpRequestError, createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const publicClient = createPublicClient({ chain: mainnet, transport: http(process.env.RPC_URL!) });
const vault = getVault("v2", "0xYourVault", 1, publicClient);

async function safeGetDetails() {
  try {
    const details = await vault.getVaultDetails();
    return details;
  } catch (err) {
    if (!(err instanceof BaseError)) throw err;
    if (err.walk((e) => e instanceof HttpRequestError)) {
      // RPC down or bad URL
      throw new Error("RPC unavailable: check RPC_URL and network.");
    }
    if (err.walk((e) => e instanceof ContractFunctionRevertedError)) {
      // Wrong chain, wrong address, or ABI mismatch
      throw new Error("Call failed: verify vault address and network match.");
    }
    throw err;
  }
}
```

### 2) Wagmi and React Query

```tsx
import { useVault, useVaultQuery } from "@concrete-xyz/sdk/wagmi";

const vaultConfig = {
  version: "v2",
  address: "0xYourVault",
  chainId: 1,
} as const;

export function UseDetails() {
  const vault = useVault(vaultConfig);

  const query = useVaultQuery({
    vault: vaultConfig,
    queryKey: ["vaultDetails"],
    enabled: !!vault, // Avoid running before the hook resolves
    queryFn: (v) => v.getVaultDetails(),
    retry: 2,
    staleTime: 30_000,
  });

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Failed to load vault details. {String(query.error)}</div>;

  return <pre>{JSON.stringify(query.data, null, 2)}</pre>;
}
```

## Common error sources and fixes

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `HttpRequestError`, `failed to fetch` | Bad or unstable [RPC](/glossary/#rpc) [URL](/glossary/#url), rate limiting | Switch to a reliable RPC. Add retries and backoff. |
| `ContractFunctionExecutionError` or `execution reverted` | Wrong network for the vault address, wrong address, or deprecated contract | Ensure the `chainId` passed to `getVault(version, address, chainId, ...)` matches the contract's chain. Verify the address is the vault, not the underlying. |
| `Signer not available` | A write was called on a vault created without a wallet client, or the wallet client has no `account` | Pass a `WalletClient` with an `account` to `getVault`, or call `vault.updateClients(publicClient, walletClient)`. |
| `undefined` or `Cannot read properties of undefined` | Hook not ready (Wagmi client not connected) | Gate reads with `enabled: !!vault` (React Query) or `if (!vault) return`. |
| `BigInt` range or format issues | Mixing [JS](/glossary/#js) `number` with token base units | Always use `BigInt`. Derive units from `await vault.getUnderlyingDecimals()`. |
| Wrong display amounts | Using wrong decimals for formatting | Use `getUnderlyingDecimals()` for the underlying and `decimals()` for shares. |
| CORS or browser blocking | Direct RPC calls from the browser blocked | Use a proxy RPC provider or call from the server. |
| Inconsistent results caching | React Query defaults | Provide a `queryKey`, and set `staleTime`, `gcTime`, and `retry` policies explicitly. |

## Read method recommendations

### `getVaultDetails()`

Validate the shape and presence of nested fields (for example `underlying`).

```tsx
const details = await vault.getVaultDetails();
if (!details?.underlying?.address) {
  throw new Error("Malformed details: missing underlying metadata");
}
```

### `totalAssets()`

Wrap with retries. RPCs can flake.

```tsx
async function withRetry<T>(fn: () => Promise<T>, n = 2): Promise<T> {
  try { return await fn(); } catch (e) { if (n <= 0) throw e; return withRetry(fn, n - 1); }
}
const total = await withRetry(() => vault.totalAssets());
```

### `symbol()`, `decimals()`, `getUnderlyingDecimals()`

Handle non-standard tokens by falling back to cached metadata.

```tsx
let uDec = 18;
try { uDec = await vault.getUnderlyingDecimals(); }
catch { uDec = 18; /* fallback default if needed */ }
```

### `balanceOf(address)`

Validate the address. Resolve ENS externally if needed.

```tsx
import { isAddress } from "viem";
if (!isAddress(user)) throw new Error("Invalid address");
const bal = await vault.balanceOf(user);
```

### `previewConversion(amount)`

Always build `amount` with correct decimals, and catch contract reverts for paused or frozen states.

```tsx
const uDec = await vault.getUnderlyingDecimals();
const amount = BigInt(10) ** BigInt(uDec); // 1 unit
try {
  const preview = await vault.previewConversion(amount);
  // Use preview.vaultTokensReceiving / preview.underlyingReceiving,
  // or the *Raw bigint siblings when you need raw values.
} catch (e) {
  if (e instanceof BaseError && e.walk((cause) => cause instanceof ContractFunctionRevertedError)) {
    throw new Error("Preview unavailable (vault paused, wrong chain, or wrong address).");
  }
  throw e;
}
```

### `applyDecimals(value)` and `toUnderlyingDecimals(value)`

Use the built-in helpers to avoid unit mistakes.

Common pitfalls:

- **Input type**: must be `BigInt`, not `number` or `string`.
- **Order of calls**: call after `getVaultDetails()` so decimals are loaded.
- **Correct usage**:
    - `applyDecimals()` formats vault shares ([ctAssets](/glossary/#ct-asset)).
    - `toUnderlyingDecimals()` formats the underlying [ERC20](/glossary/#erc-20).
- **Precision**: use for display only. Keep core math in `BigInt`.
- **Network differences**: do not assume decimals. [USDC](/glossary/#usdc) is 6 on Ethereum, and may differ elsewhere.

```tsx
const details = await vault.getVaultDetails();

const rawShares = await vault.balanceOf(user);
const displayShares = await vault.applyDecimals(rawShares); // "1.00"

const erc20 = await vault.getUnderlyingErc20();
const rawUnderlying = await erc20.balanceOf(user);
const displayUnderlying = await vault.toUnderlyingDecimals(rawUnderlying); // "5000.00"
```

**When not to use them**

- Do not pass formatted strings back into write calls. Always pass `BigInt` base units.
- Never feed `applyDecimals()` or `toUnderlyingDecimals()` outputs back into write methods like `deposit()`, `redeem()`, or `approve()`.
- These helpers are for display only.
- Always pass raw `BigInt` values (base units) into transactions.

## Network and address guards

### Validate the vault address early

```tsx
import { isAddress } from "viem";
if (!isAddress(vaultAddress)) throw new Error("Invalid vault address");
```

## React Query: robust defaults

```tsx
const result = useVaultQuery({
  vault: vaultConfig,
  queryKey: ["details"],
  queryFn: (v) => v.getVaultDetails(),
  retry: (count, error: any) => {
    // Retry only transient RPC issues
    return count < 2 && /HTTP request failed|timeout|429/.test(String(error?.message));
  },
  staleTime: 30_000,    // fresh for 30s
  gcTime: 5 * 60_000,   // cache 5m (React Query v5 uses gcTime)
  refetchOnWindowFocus: false,
});
```

## Logging and telemetry

Avoid logging private keys.

```tsx
function logReadError(method: string, vaultAddr: string, chainId: string, err: unknown) {
  console.warn(`[ConcreteSDK] read error`, { method, vaultAddr, chainId, err: String(err) });
}
```

## Write methods: common failures and fixes

### Insufficient allowance (underlying)

**Symptom**: `execution reverted: ERC20: insufficient allowance` (or a router-specific revert).
**Fix**: Approve the underlying (not shares) for a sufficient amount.

```tsx
// Re-approve the remaining delta
const erc20 = await vault.getUnderlyingErc20();
const need = await vault.toUnderlyingBigInt("1.0");
const cur = await erc20.allowance(user, vault.getAddress());
if (cur < need) {
  await (await erc20.approve(vault.getAddress(), need)).wait();
}
```

### Insufficient balance or gas

**Symptom**: `insufficient funds for intrinsic transaction cost` or `transfer amount exceeds balance`.
**Fix**: Check native gas token ([ETH](/glossary/#eth)) balance and underlying or share balances before sending.

```tsx
const erc20 = await vault.getUnderlyingErc20();
const bal = await erc20.balanceOf(user);
if (bal < amount) throw new Error("Not enough underlying to deposit.");
```

### Nonce or replacement errors

**Symptom**: `nonce too low`, `replacement fee too low`.
**Fix**: Wait for the pending transaction before you send the next one. [SDK](/glossary/#sdk) write methods do not take nonce or gas overrides. The wallet client sets both, so speed up or cancel a stuck transaction from the wallet.

```tsx
await (await erc20.approve(vault.getAddress(), amount)).wait();
await (await vault.deposit(amount)).wait();
```

### Paused or deprecated vaults

**Symptom**: a contract revert on `deposit` or `redeem`. The SDK simulates each write first, decodes the custom error, and attaches it to the thrown error as `error.error`, with `{ name, args }`.
**Fix**: Surface a clear [UI](/glossary/#ui) message. Gate write actions based on a health flag where available.

```tsx
try { await vault.deposit(amount); }
catch (e: any) {
  if (/paused|deprecated/i.test(`${e.error?.name} ${e.message}`)) {
    throw new Error("This vault is paused or deprecated. Withdrawals only.");
  }
  throw e;
}
```

### Preview differs from final (state changed between calls)

**Symptom**: Actual mint or redeem differs from `previewConversion` because [TVL](/glossary/#tvl) or price moved.
**Fix**: Treat preview as indicative. Consider a tolerance check and re-preview on the confirm step.

```tsx
const pre = await vault.previewConversion(amount);
// Optional: assert a minimum expected output for UX. On-chain output is still authoritative.
```

## Non-standard [ERC20](/glossary/#erc-20) tokens

Some tokens:

- Do not return `bool` from `approve` or `transfer`.
- Require resetting allowance to zero before increasing it.
- Have chain-specific decimals (for example [USDC](/glossary/#usdc) is 6 on Ethereum).

**Defensive pattern**:

```tsx
// Reset-to-zero pattern (safe for non-standard tokens)
await (await erc20.approve(vault.getAddress(), 0n)).wait();
await (await erc20.approve(vault.getAddress(), amount)).wait();
```

## Allowance race conditions

If you fire multiple approvals or deposits in parallel, transactions can race and revert.

**Fix**: Sequence writes, or serialize by vault and user key.

```tsx
await (await erc20.approve(vault.getAddress(), amount)).wait();
await (await vault.deposit(amount)).wait();
```

## Wallet client lifecycle

**Symptoms**: `vault is undefined`, `Signer not available`, user switched accounts or networks mid-flow.
**Fix**: Pass the current wallet client before writes and assert the chain ID matches.

```tsx
// Wagmi
if (!vault) throw new Error("Wallet not connected. Connect before writing.");
// Vanilla
const networkOk = (await walletClient.getChainId()) === expectedChainId;
if (!networkOk) throw new Error("Wrong network selected in wallet.");
vault.updateClients(publicClient, walletClient);
```

## Reorgs and finality

A receipt can succeed and then be reorged in rare cases.
**Fix**: Wait for extra confirmations where it matters (admin ops, high [TVL](/glossary/#tvl)).

```tsx
const rc = await (await vault.deposit(amount)).wait(2);
// Wait for 2 confirmations
```

## Retry and backoff for transient [RPC](/glossary/#rpc) errors

Only retry idempotent reads or broadcast errors clearly marked transient.

```tsx
async function retry<T>(fn: () => Promise<T>, times = 2) {
  try { return await fn(); }
  catch (e: any) {
    if (times && /timeout|429|HTTP request failed/.test(String(e?.message))) {
      await new Promise(r => setTimeout(r, 800));
      return retry(fn, times - 1);
    }
    throw e;
  }
}
```
