---
title: "Migrating from 1.x"
description: "Concrete Earn V2 SDK documentation for migrating from 1.x to 2.x, covering viem clients, transaction receipts, and changed method arguments."
sidebar_label: "Migrating from 1.x"
---

Version 2.0.0 of the [SDK](/glossary/#sdk) is built on [viem](https://viem.sh) instead of ethers. This guide lists each breaking change and the code that replaces it. Version 2.1.0 adds [`getWithdrawalForecast()`](./read-methods/getWithdrawalForecast.md) and has no further breaking changes.

| **Area** | **1.x** | **2.x** |
| --- | --- | --- |
| Peer dependency | ethers | viem `^2` |
| Runtime | No stated minimum | Node 20.10 or later |
| `getVault` and React `useVault` clients | `provider`, `signer` | `publicClient`, `walletClient` |
| Client update | `vault.updateProviders(provider, signer)` | `vault.updateClients(publicClient, walletClient)` |
| Oracle price | `getPrice(quote, symbol, chainId)` | `getPrice(tokenAddress, chainId)` |
| [ABI](/glossary/#abi) imports | `@concrete-xyz/sdk/dist/src/core/contracts/abi/vault.json` | `@concrete-xyz/sdk/abi/vault` |
| Receipt from `wait()` | ethers receipt | viem `TransactionReceipt` |

## Install viem

viem `^2` is a peer dependency. Install it next to the [SDK](/glossary/#sdk):

```bash
npm install @concrete-xyz/sdk@^2 viem@^2
```

The Wagmi subpath supports wagmi `^2`. wagmi `^3` is not supported.

## Replace the provider and signer

`getVault` and the React `useVault` hook take viem clients in place of the 1.x provider and signer: a `PublicClient` for reads and a `WalletClient` with an `account` for writes. The `version`, `address`, `chainId`, and `silent` arguments are unchanged.

```tsx
// 1.x
const vault = getVault("v1", address, 1, provider, signer);

// 2.x
const publicClient = createPublicClient({ chain: mainnet, transport: http(rpcUrl) });
const walletClient = createWalletClient({ account, chain: mainnet, transport: http(rpcUrl) });
const vault = getVault("v1", address, 1, publicClient, walletClient);
```

The Wagmi hooks need no code change. `useVault` resolves both clients from your Wagmi config, and `fallbackRpcUrl` creates a viem public client over `http(fallbackRpcUrl)`.

If you update clients on an existing vault instance, replace `vault.updateProviders(provider, signer)` with `vault.updateClients(publicClient, walletClient)`.

## Update transaction receipts

Write methods still resolve `{ hash, wait }`, and `wait(confirmations?)` still throws when the transaction reverts. The value that `wait()` resolves is now a viem `TransactionReceipt`. The Wagmi mutation hooks expose the same receipt as `data`. `wait()` has no receipt timeout.

| **1.x** | **2.x** |
| --- | --- |
| `receipt.hash` | `receipt.transactionHash` |
| `receipt.blockNumber` (`number`) | `receipt.blockNumber` (`bigint`) |
| `receipt.status` (`1` or `0`) | `receipt.status` (`"success"` or `"reverted"`) |

## Update oracle price calls

`getConcreteApi().oracle.getPrice(quote, symbol, chainId)` becomes `getConcreteApi().oracle.getPrice(tokenAddress, chainId)`. Pass the underlying token's address instead of its symbol. `vault.getUnderlyingPrice()` takes no quote argument and resolves the underlying address itself.

## Update direct ABI imports

The internal build paths that 1.x exposed no longer resolve. Import [ABIs](/glossary/#abi) from the two public subpaths instead.

```tsx
// 1.x
import abi from "@concrete-xyz/sdk/dist/src/core/contracts/abi/vault.json";

// 2.x
import abi from "@concrete-xyz/sdk/abi/vault";
import rawAbi from "@concrete-xyz/sdk/raw-abi/vault.json" with { type: "json" };
```

The default export of `abi/*` is a typed viem ABI array, so remove any JSON import assertion or attribute from that import. The ABI contents are unchanged. See [Contract ABIs](./setup-configuration.md#contract-abis) for the contracts each subpath covers.

## Replace the bundled error reporting

The [SDK](/glossary/#sdk) no longer depends on an error-tracking package and reports nothing by default. To receive instrumented errors, register a sink with `setErrorReporter`, as shown in [Error reporting](./setup-configuration.md#error-reporting).

## New reads in 2.x

- **Live [APY](/glossary/#apy)** – `getApyDetails()` returns `expectedApy` for the live rate next to the historical `apy`. See [`getApyDetails()`](./read-methods/getAPYDetails.md).
- **Withdrawal cooldown** – `getDepositLockWithFeeHook()` reads the cooldown duration and an account's locked shares. See [`getDepositLockWithFeeHook()`](./read-methods/getDepositLockWithFeeHook.md).
- **Deposit cap** – `getDepositLimits()` and `maxDeposit()` read the cap and remaining capacity. See [`getDepositLimits()`](./read-methods/getDepositLimits.md).
- **Withdrawal forecast** – `getWithdrawalForecast()`, added in 2.1.0, estimates when a Withdrawal Queue request becomes available. See [`getWithdrawalForecast()`](./read-methods/getWithdrawalForecast.md).
