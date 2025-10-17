---
title: "deposit(amount)"
description: "deposit(amount)"
sidebar_label: "deposit(amount)"
---

Mint **ctAssets** by consuming the underlying token previously approved to the vault. Before calling the `deposit(amount)` method, the vault must be approved to spend the underlying token.

## Signature

```tsx
await vault.deposit(amount: bigint): Promise<Tx>
```

## Parameters

- `amount`: **underlying** amount (in underlying decimals).

## Returns

- `Tx`: transaction object; call `await tx.wait()` to confirm.

## Example

```tsx
// Prerequisite: you created the vault with a signer:
// const vault = getVault(version, vaultAddress, network, provider, signer)
// vanilla SDK: needs version, react only SDK: needs version

const details = await vault.getVaultDetails();
const vaultAddr = vault.getAddress();

// Approve 1.0 underlying (SDK helper → BigInt in underlying units)
const amount = await vault.toUnderlyingBigInt("1.0");

// 1) Approve underlying to the vault
const approveTx = await details.underlaying.erc20.approve(vaultAddr, amount);
await approveTx.wait();

// (Optional) Preview how many shares you'll mint
const preview = await vault.previewConversion(amount);
// console.log("Expected shares:", await vault.applyDecimals(preview.vaultTokensReciving));

// 2) Deposit 1.0 underlying
const depositTx = await vault.deposit(amount);
const receipt = await depositTx.wait();
console.log("Deposit confirmed in block", receipt.blockNumber);

```
