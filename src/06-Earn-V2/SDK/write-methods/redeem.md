---
title: "redeem(amount)"
description: "redeem(amount)"
sidebar_label: "redeem(amount)"
---

Burn **ctAssets** (shares) and receive underlying.

## Signature

```tsx
await vault.redeem(amount: bigint): Promise<Tx>
```

## Parameters

- `amount`: **share** amount (in **share decimals**, i.e., `await vault.decimals()`).

## Returns

- `Tx`: transaction object; `await tx.wait()` to confirm.

## Example

```tsx
// Redeem all shares
const myShares = await vault.balanceOf(userAddress);

if (myShares > 0n) {
  console.log("Shares (human):", await vault.applyDecimals(myShares));
  const tx = await vault.redeem(myShares);
  await tx.wait();
}
```
