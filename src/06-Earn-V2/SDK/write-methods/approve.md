---
title: "approve(spender, amount)"
description: "Write-method reference for approve(spender, amount) in the Concrete Earn V2 SDK, including transaction flow, required approvals, and integration notes."
sidebar_label: "approve(spender, amount)"
---

Set an allowance on ctAssets (vault shares). This is not required for a normal `deposit`. Use it when another contract or account needs permission to move your shares via `transferFrom`.

## Signature

```tsx
await vault.approve(spender: string, amount: bigint): Promise<Tx>
```

## Parameters

- `spender`: the address allowed to move the shares.
- `amount`: allowance in share base units (`bigint`).

## Returns

- `Tx`: an Ethers v6 `TransactionResponse`-like object. Use `await tx.wait()` for confirmation.

## Example

```tsx
const spender = "0xSpender...";
const allowance = await vault.toBigInt("100.0"); // 100 shares
const tx = await vault.approve(spender, allowance);
await tx.wait();
```

## Approve: underlying versus shares

There are two separate approvals you may encounter when working with Concrete Vaults.

| Type | When to use | Method | Units | Required? |
| --- | --- | --- | --- | --- |
| **Underlying approval** | Before calling `deposit`. The vault must be allowed to pull the underlying ERC20 (for example USDC, WETH). | `(await vault.getUnderlyingErc20()).approve(vault.getAddress(), amount)` | Underlying decimals | Always required for deposits |
| **Share approval** | When another contract or account needs to move your vault shares (ctAssets) with `transferFrom`. | `vault.approve(spender, amount)` | Share decimals | Only for external share movement (not required for deposits) |

### Examples

```tsx
// Approve underlying (required before deposit)
const erc20 = await vault.getUnderlyingErc20();
const amount = await vault.toUnderlyingBigInt("1.0");
await (await erc20.approve(vault.getAddress(), amount)).wait();

// Approve shares (optional, for transferFrom)
const shareAllowance = await vault.toBigInt("50.0");
await (await vault.approve(spender, shareAllowance)).wait();
```
