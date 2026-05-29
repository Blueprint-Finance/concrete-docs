---
title: "Quick Start (Plug-and-Play Integration)"
description: "Concrete Earn V2 SDK documentation for quick Start, with implementation guidance for production-grade integrations."
sidebar_label: "Quick Start"
---

Concrete's SDK provides ready-to-use React and Wagmi hooks for integrating deposits, withdrawals, and balance views in a few lines of code.

These hooks combine ethers, wagmi, and the Concrete SDK internals under the hood. You can use them to go from setup to a live app in minutes.

## Quick Wagmi setup

If you use Wagmi hooks like `useVaultDeposit()` or `useVaultWithdraw()`, you only need a minimal vault configuration object.

Concrete's hooks automatically detect your connected wallet and network from Wagmi.

The following example shows a vault configuration:

```tsx
// src/vault-config.ts
export const vault = {
  version: "v1",
  address: "0x6d8d73bD121970e7c12c34caac9ce9bc975c0a9", // Example vault
  chainId: 42161, // Arbitrum
  fallbackRpcUrl: "https://arb1.arbitrum.io/rpc", // Optional fallback
} as const;
```

:::tip
Developers already familiar with Wagmi can use their existing configuration. This snippet is only a quick reference. For full setup details, see [Setup Configuration](https://docs.concrete.xyz/Developers/SDK/setup-configuration/) in the main SDK documentation.
:::

## SDK Playground

Concrete provides a live SDK Playground inside Concrete Enterprise: a web interface that demonstrates the SDK and Wagmi hooks in real time.

It is the fastest way to explore the SDK without setting up a full app. You can view vault details, deposit, withdraw, and monitor balances from your browser.

### Try it yourself

[Open the Concrete SDK Playground](https://build.concrete.xyz/). Requires a wallet connection. Runs on test vaults or live networks.

### Features

| Tab | Description | SDK hook |
| --- | --- | --- |
| **Vault details** | Displays live vault metadata and totals | `useVaultDetails()` |
| **Deposits** | Deposit with auto approvals and conversions | `useVaultDeposit()` |
| **Withdrawals** | Redeem shares for underlying assets | `useVaultWithdraw()` |
| **Balances** | Show current user balances | `useVaultUserBalance()` |

## Simple USDC Deposit

```tsx
import { useVaultDeposit } from "@concrete-xyz/sdk/wagmi";
import { vault } from "src/vault-config";

function DepositUSDC() {
  const deposit = useVaultDeposit(
    vault,
    { amount: "100", amountToBigInt: true }
  );

  return (
    <button disabled={deposit.isPending} onClick={() => deposit.mutate({})}>
      {deposit.isPending ? "Depositing…" : "Deposit 100 USDC"}
    </button>
  );
}
```

## Withdraw Hook

```tsx
import { useVaultWithdraw } from "@concrete-xyz/sdk/wagmi";
import { vault } from "src/vault-config";

export default function VaultWithdrawPage() {
  const [amount, setAmount] = useState("0");
  const withdraw = useVaultWithdraw(vault, { amount, amountToBigInt: true });

  if (withdraw.loading) return <div>Loading...</div>;

  return (
    <div>
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to withdraw"
      />
      <button onClick={() => withdraw.withdraw.mutate({})}>Withdraw</button>

      {withdraw.withdraw.isPending && "In progress..."}
      {withdraw.withdraw.isSuccess && "✅ Success!"}
      {withdraw.withdraw.isError && `❌ ${withdraw.withdraw.error.message}`}
    </div>
  );
}
```

## Deposit ETH → WETH Vault

```tsx
import { useState } from "react";
import { useVaultDeposit } from "@concrete-xyz/sdk/wagmi";

import { vault } from "src/vault-config";

function DepositETH() {

  const [amount, setAmount] = useState("1");

  const deposit = useVaultDeposit(vault, {
    amount,              // accepts string or number
    amountToBigInt: true, // auto converts based on vault decimals
    useEther: true,       // wraps ETH → WETH automatically
  });

  const handleDeposit = () => deposit.mutate({});

  return (
    <div>
      <input
        type="number"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in ETH"
      />
      <button onClick={handleDeposit}>
        {deposit.isPending ? "Processing..." : `Deposit ${amount} ETH`}
      </button>
      {deposit.isSuccess && <div>Deposit confirmed ✅</div>}
      {deposit.isError && <div>Error: {String(deposit.error)}</div>}
    </div>
  );
}

export default DepositETH;
```

### What happens under the hood

1. Detects provider and signer automatically via Wagmi.
2. Converts human-readable values to `BigInt` based on vault decimals.
3. Auto-wraps ETH to WETH when `useEther` is `true`.
4. Handles approvals automatically.
5. Executes the deposit and updates transaction state.
6. Returns `isPending`, `isSuccess`, `isError`, and a `mutate()` trigger.

## Hook options

```tsx
const deposit = useVaultDeposit(vaultConfig, options);
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` | `string \| number \| bigint` | – | Amount to deposit. Pass a human value when using `amountToBigInt: true`, or a `BigInt` in base units otherwise. |
| `amountToBigInt` | `boolean` | `false` | When `true`, converts `amount` to a `BigInt` using the vault's underlying decimals. |
| `useEther` | `boolean` | `false` | Wrap native ETH to WETH before depositing. |
| `onSuccess` | `function` | – | Callback when the transaction confirms. |
| `onError` | `function` | – | Callback on transaction failure. |
| `onSettled` | `function` | – | Runs after success or error. |
