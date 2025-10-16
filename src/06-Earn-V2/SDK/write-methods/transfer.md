---
title: "transfer(to, amount)"
description: "transfer(to, amount)"
sidebar_label: "transfer(to, amount)"
---

Transfer **ctAssets** (vault shares) directly to another address.

## Signature

```tsx
await vault.transfer(to: string, amount: bigint): Promise<Tx>
```

## Parameters

- `to` (**string**) — Recipient wallet address.
- `amount` (**bigint**) — Amount of **shares** (in vault decimals).
Use `vault.toBigInt("10.0")` to convert a human number to `bigint`.

## Returns

- `Tx`: an Ethers v6 `TransactionResponse`like object.
Call `await tx.wait()` to confirm.

## Example

```tsx
const to = "0xRecipient...";
const shareAmount = await vault.toBigInt("10.0"); // 10 ctAssets
await (await vault.transfer(to, shareAmount)).wait();
```
