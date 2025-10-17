---
title: "Examples"
description: "User approves underlying ERC20, vault consumes underlying, mints ctAssets (shares), user can redeem later."
sidebar_label: "Examples"
---

## 1. Check & Top-Up Allowance

Before depositing, always confirm the user has approved enough underlying for the vault. If not, approve the difference.

```tsx
const details = await vaultWithSigner.getVaultDetails();
const vaultAddr = vaultWithSigner.getAddress();
const depositAmount = await vaultWithSigner.toUnderlyingBigInt("5.0"); // 5 underlying tokens

// Check existing allowance
const currentAllowance = await details.underlying.erc20.allowance(
  await signer.getAddress(),
  vaultAddr
);

if (currentAllowance < depositAmount) {
  const approveAmount = depositAmount - currentAllowance;
  console.log("Approving extra allowance:", approveAmount.toString());
  await (await details.underlying.erc20.approve(vaultAddr, approveAmount)).wait();
}

// Safe to deposit
await (await vaultWithSigner.deposit(depositAmount)).wait();
```

## 2. Read Total Assets

Get the vault’s TVL (total assets under management), and format it using the SDK’s helpers.

```tsx
const details = await vault.getVaultDetails();
const total = await vault.totalAssets();

console.log(
  "Total assets:",
  await vault.toUnderlyingDecimals(total),
  details.underlying.symbol
);
```

## 3. Fetch Vault Details

```tsx
import { getVault } from "@concrete-xyz/sdk";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("<https://ethereum-rpc.publicnode.com>");
const vault = getVault("0xYourVault", "Ethereum", provider);

const details = await vault.getVaultDetails();
console.log("Vault shares:", details.vaultAsset.symbol);
console.log("Underlying:", details.underlying.symbol);
```

## 4. Preview Deposit

Estimate how many shares (ctAssets) you’ll receive for a deposit.

```tsx
const oneUnderlying = await vault.toUnderlyingBigInt("1.0");
const preview = await vault.previewConversion(oneUnderlying);

console.log(
  `1 ${details.underlying.symbol} ≈ ${await vault.applyDecimals(preview.vaultTokensReciving)} ${details.vaultAsset.symbol}`
);
```

## 5. Deposit Flow

```tsx
import { ethers } from "ethers";

// 1. Approve vault to spend the underlying
// 2. Deposit underlying into the vault
// 3. Receive vault shares

const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const vaultWithSigner = getVault("0xYourVault", "Ethereum", provider, signer);

const depositAmount = await vaultWithSigner.toUnderlyingBigInt("1.0");

// (1) Approve underlying to the vault
await (await (await vaultWithSigner.getVaultDetails()).underlying.erc20
  .approve(vaultWithSigner.getAddress(), depositAmount)).wait();

// (2) Deposit
const receipt = await (await vaultWithSigner.deposit(depositAmount)).wait();
console.log("Deposit confirmed:", receipt.transactionHash);
```

## 6. Redeem Flow

```tsx
const owner = await signer.getAddress();
const shareBalance = await vaultWithSigner.balanceOf(owner);

if (shareBalance > 0n) {
  const preview = await vaultWithSigner.previewConversion(shareBalance);
  const details = await vaultWithSigner.getVaultDetails();

  console.log(
    `${await vaultWithSigner.applyDecimals(shareBalance)} ${details.vaultAsset.symbol} ≈ ` +
    `${await vaultWithSigner.toUnderlyingDecimals(preview.underlyingReciving)} ${details.underlying.symbol}`
  );

  const receipt = await (await vaultWithSigner.redeem(shareBalance)).wait();
  console.log("Redeemed:", receipt.transactionHash);
}
```

## 7. Transfer ctAssets

Shares (ctAssets) behave like ERC20s — they can be transferred.

```tsx
const recipient = "0xRecipient...";
const tenShares = await vaultWithSigner.toBigInt("10.0");
await (await vaultWithSigner.transfer(recipient, tenShares)).wait();
```

## 8. Move Shares with Allowance

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

## 9. End-to-End Example

```tsx
// (1 Underlying → Redeem)

const oneUnderlying = await vaultWithSigner.toUnderlyingBigInt("1.0");

// Preview deposit
const pvDeposit = await vaultWithSigner.previewConversion(oneUnderlying);
console.log("Expected shares:", await vaultWithSigner.applyDecimals(pvDeposit.vaultTokensReciving));

// Approve + Deposit
const details = await vaultWithSigner.getVaultDetails();
await (await details.underlying.erc20.approve(vaultWithSigner.getAddress(), oneUnderlying)).wait();
await (await vaultWithSigner.deposit(oneUnderlying)).wait();

// Redeem
const owner = await signer.getAddress();
const shares = await vaultWithSigner.balanceOf(owner);
await (await vaultWithSigner.redeem(shares)).wait();
```
