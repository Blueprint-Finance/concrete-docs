---
title: "deposit(amount)"
description: "Write-method reference for deposit(amount) in the Concrete Earn V2 SDK, including transaction flow, required approvals, and integration notes."
sidebar_label: "deposit(amount)"
---

Mint [ctAssets](/glossary/#ct-asset) by consuming the underlying token previously approved to the vault. Before calling `deposit(amount)`, the vault must be approved to spend the underlying token.

## Signature

```tsx
await vault.deposit(amount: bigint): Promise<Tx>
```

## Parameters

- `amount`: underlying amount, in underlying base units (`bigint`).

## Returns

- `Tx`: transaction object. Call `await tx.wait()` to confirm.

## Example

```tsx
// Prerequisite: the vault was created with a signer:
// const vault = getVault(version, vaultAddress, chainId, provider, signer)

const vaultAddr = vault.getAddress();

// Approve 1.0 underlying (SDK helper produces a BigInt in underlying units)
const amount = await vault.toUnderlyingBigInt("1.0");

// 1) Approve underlying to the vault
const erc20 = await vault.getUnderlyingErc20();
const approveTx = await erc20.approve(vaultAddr, amount);
await approveTx.wait();

// (Optional) Preview how many shares you will mint
const preview = await vault.previewConversion(amount);
// console.log("Expected shares:", await vault.applyDecimals(preview.vaultTokensReceivingRaw));

// 2) Deposit 1.0 underlying
const depositTx = await vault.deposit(amount);
const receipt = await depositTx.wait();
console.log("Deposit confirmed in block", receipt.blockNumber);
```
