---
title: "Quick Start (Plug-and-Play Integration)"
description: "Hooks combine ethers, wagmi, and the Concrete SDK internals under the hood."
sidebar_label: "Quick Start"
---

Concrete’s SDK provides **ready-to-use React + Wagmi hooks** that allow you to integrate deposits, withdrawals, and balance views with just a few lines of code.

These hooks combine ethers, wagmi, and the Concrete SDK internals under the hood. As a developer, you can use them to go from setup → live app in minutes.

## Quick Wagmi Setup

If you’re using Wagmi hooks like `useVaultDeposit()` or `useVaultWithdraw()`, you only need a minimal configuration file.

Concrete’s hooks automatically detect your connected wallet and network from Wagmi.

The following example shows how to setup a vault configuration:

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
Developers already familiar with Wagmi can use their existing configuration — this snippet is only a quick reference. For full setup details, see [Setup Configuration](https://docs.concrete.xyz/Earn-V2/SDK/setup-configuration/) in the main SDK documentation.
:::

## SDK Playground

Concrete provides a **live SDK Playground** inside **Concrete Enterprise** — a lightweight web interface that demonstrates SDK + Wagmi hooks in real time.

It’s the fastest way to explore Concrete’s SDK without setting up a full app. You can view vault details, deposit, withdraw, and monitor balances all from your browser.

### Try It Yourself

[Open the Concrete SDK Playground](https://build.concrete.xyz/) (Requires wallet connection; runs on test vaults or live networks).

### Features

| Tab | Description | SDK Hook Used |
| --- | --- | --- |
| **Vault Details** | Displays live vault metadata and totals | `useVaultDetails()` |
| **Deposits** | Deposit with auto approvals and conversions | `useVaultDeposit()` |
| **Withdrawals** | Redeem shares for underlying assets | `useVaultWithdraw()` |
| **Balances** | Show current user balances | `useVaultBalance()` |

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

### What Happens Under the Hood

1. Detects provider & signer automatically via Wagmi.
2. Converts human-readable values → `BigInt` based on vault decimals.
3. Auto-wraps ETH → WETH when `useEther` is `true`.
4. Handles approvals automatically.
5. Executes deposit and updates transaction state.
6. Returns `isPending`, `isSuccess`, `isError`, and a `mutate()` trigger.

##

## Hook Options

```tsx
const deposit = useVaultDeposit(vaultConfig, options);
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` | `string | number` | — |
| `amountToBigInt` | `boolean` | `true` | Converts using vault decimals. |
| `useEther` | `boolean` | `false` | Wrap native ETH → WETH. |
| `onSuccess` | `function` | — | Callback when tx confirms. |
| `onError` | `function` | — | Callback on tx failure. |
| `onSettled` | `function` | — | Runs after success or error. |
