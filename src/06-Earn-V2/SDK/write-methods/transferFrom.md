---
title: "transferFrom(from, to, amount)"
description: "transferFrom(from, to, amount)"
sidebar_label: "transferFrom(from, to, amount)"
---

Move **ctAssets** from one address to another using an existing **shares allowance** (granted via `vault.approve`).

## Signature

```tsx
await vault.transferFrom(from: string, to: string, amount: bigint): Promise<Tx>
```

## Parameters

- `from` (**string**) — Owner of the shares (the address that approved you).
- `to` (**string**) — Recipient of the shares.
- `amount` (**bigint**) — Amount of **shares** (in vault decimals).
Use `vault.toBigInt("5.0")` to convert from human-readable input.

## Returns

- `Tx`: an Ethers v6 `TransactionResponse`like object.
Call `await tx.wait()` to confirm.

## Example

```tsx
const owner = "0xOwner...";
const to = "0xRecipient...";
const shareAmount = await vault.toBigInt("5.0"); // 5 ctAssets

// Requires: owner has called vault.approve(spender, amount)
await (await vault.transferFrom(owner, to, shareAmount)).wait();
```
