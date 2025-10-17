---
title: "approve(spender, amount)"
description: "approve(spender, amount)"
sidebar_label: "approve(spender, amount)"
---

Set an allowance on **ctAssets** (vault shares). This is **not** required for a normal `deposit`.
Use it if another contract (or account) needs permission to move your **shares** via `transferFrom`.

## Signature

```tsx
await vault.approve(spender: string, amount: bigint): Promise<Tx>
```

## Parameters

- `spender`: the vault address (`vault.getAddress()`).
- `amount`: allowance in underlying token units (BigInt).

## Returns

- `Tx`: an Ethers v6 `TransactionResponse`like object (use `await tx.wait()` for confirmation).

## Example

```tsx
const spender = "0xSpender...";
const allowance = await vault.toBigInt("100.0"); // 100 shares
const tx = await vault.approve(spender, allowance);
await tx.wait();
```

## Approve: Underlying vs. Shares

There are **two separate approvals** you may encounter when working with Concrete Vaults.

| **Type** | **When to Use** | **Method** | **Units** | **Required?** |
| --- | --- | --- | --- | --- |
| **Underlying Approval** | Before calling `deposit` — vault must be allowed to pull the underlying ERC20 (e.g. USDC, WETH). | `details.underlaying.erc20.approve(vault.getAddress(), amount)` | Underlying decimals | Always required for deposits |
| **Share Approval** | If another contract/account needs to move your **vault shares** (ctAssets) with `transferFrom`. | `vault.approve(spender, amount)` | Share decimals | Only for external share movement (not required for deposits) |

### Examples

```tsx
// Approve underlying (required before deposit)
const amount = await vault.toUnderlyingBigInt("1.0");
await (await details.underlaying.erc20.approve(vault.getAddress(), amount)).wait();

// Approve shares (optional, for transferFrom)
const shareAllowance = await vault.toBigInt("50.0");
await (await vault.approve(spender, shareAllowance)).wait();
```
