---
title: "Examples"
description: "Concrete Earn V2 SDK documentation for examples, with implementation guidance for production-grade integrations."
sidebar_label: "Examples"
---

## 1. Check and top up allowance

Before depositing, confirm the user has approved enough underlying for the vault. If not, approve the difference.

```tsx
const vaultAddr = vaultWithSigner.getAddress();
const erc20 = await vaultWithSigner.getUnderlyingErc20();
const depositAmount = await vaultWithSigner.toUnderlyingBigInt("5.0"); // 5 underlying tokens

// Check existing allowance
const currentAllowance = await erc20.allowance(
  await signer.getAddress(),
  vaultAddr
);

if (currentAllowance < depositAmount) {
  const approveAmount = depositAmount - currentAllowance;
  console.log("Approving extra allowance:", approveAmount.toString());
  await (await erc20.approve(vaultAddr, approveAmount)).wait();
}

// Safe to deposit
await (await vaultWithSigner.deposit(depositAmount)).wait();
```

## 2. Read total assets

Get the vault's total assets and format the value with the SDK's helpers.

```tsx
const details = await vault.getVaultDetails();
const total = await vault.totalAssets();

console.log(
  "Total assets:",
  await vault.toUnderlyingDecimals(total),
  details.underlying.symbol
);
```

## 3. Fetch vault details

```tsx
import { getVault } from "@concrete-xyz/sdk";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://ethereum-rpc.publicnode.com");
const vault = getVault("v2", "0xYourVault", chainId, provider);

const details = await vault.getVaultDetails();
console.log("Vault shares:", details.vaultAsset.symbol);
console.log("Underlying:", details.underlying.symbol);
```

## 4. Preview deposit

Estimate how many shares (ctAssets) you will receive for a deposit.

```tsx
const oneUnderlying = await vault.toUnderlyingBigInt("1.0");
const preview = await vault.previewConversion(oneUnderlying);

console.log(
  `1 ${details.underlying.symbol} ≈ ${await vault.applyDecimals(preview.vaultTokensReceivingRaw)} ${details.vaultAsset.symbol}`
);
```

## 5. Deposit flow

```tsx
import { ethers } from "ethers";

// 1. Approve vault to spend the underlying
// 2. Deposit underlying into the vault
// 3. Receive vault shares

const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const vaultWithSigner = getVault("v2", "0xYourVault", chainId, provider, signer);

const depositAmount = await vaultWithSigner.toUnderlyingBigInt("1.0");

// (1) Approve underlying to the vault
const erc20 = await vaultWithSigner.getUnderlyingErc20();
await (await erc20.approve(vaultWithSigner.getAddress(), depositAmount)).wait();

// (2) Deposit
const receipt = await (await vaultWithSigner.deposit(depositAmount)).wait();
console.log("Deposit confirmed:", receipt.transactionHash);
```

## 6. Redeem flow

```tsx
const owner = await signer.getAddress();
const shareBalance = await vaultWithSigner.balanceOf(owner);

if (shareBalance > 0n) {
  const preview = await vaultWithSigner.previewConversion(shareBalance);
  const details = await vaultWithSigner.getVaultDetails();

  console.log(
    `${await vaultWithSigner.applyDecimals(shareBalance)} ${details.vaultAsset.symbol} ≈ ` +
    `${await vaultWithSigner.toUnderlyingDecimals(preview.underlyingReceivingRaw)} ${details.underlying.symbol}`
  );

  const receipt = await (await vaultWithSigner.redeem(shareBalance)).wait();
  console.log("Redeemed:", receipt.transactionHash);
}
```

## 7. Transfer ctAssets

Shares (ctAssets) behave like ERC20 tokens and can be transferred.

```tsx
const recipient = "0xRecipient...";
const tenShares = await vaultWithSigner.toBigInt("10.0");
await (await vaultWithSigner.transfer(recipient, tenShares)).wait();
```

## 8. Move shares with allowance

Grant another address permission to spend your shares.

```tsx
const spender = "0xSpender...";
const owner = await signer.getAddress();
const recipient = "0xRecipient...";
const allowance = await vaultWithSigner.toBigInt("5.0");

// Owner approves spender
await (await vaultWithSigner.approve(spender, allowance)).wait();

// Spender calls transferFrom (as the connected signer)
await (await vaultWithSigner.transferFrom(owner, recipient, allowance)).wait();
```

## 9. End-to-end example

```tsx
// 1 underlying deposit, then redeem

const oneUnderlying = await vaultWithSigner.toUnderlyingBigInt("1.0");

// Preview deposit
const pvDeposit = await vaultWithSigner.previewConversion(oneUnderlying);
console.log("Expected shares:", await vaultWithSigner.applyDecimals(pvDeposit.vaultTokensReceivingRaw));

// Approve and deposit
const erc20 = await vaultWithSigner.getUnderlyingErc20();
await (await erc20.approve(vaultWithSigner.getAddress(), oneUnderlying)).wait();
await (await vaultWithSigner.deposit(oneUnderlying)).wait();

// Redeem
const owner = await signer.getAddress();
const shares = await vaultWithSigner.balanceOf(owner);
await (await vaultWithSigner.redeem(shares)).wait();
```
