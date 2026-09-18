---
title: "Examples"
description: "Concrete Earn V2 SDK documentation for examples, with implementation guidance for production-grade integrations."
sidebar_label: "Examples"
---

The write examples on this page use `vaultWithWallet` and `account`, which [example 5](#5-deposit-flow) creates. The read examples use the `vault` from [example 3](#3-fetch-vault-details).

## 1. Check and top up allowance

Before depositing, confirm the user has approved enough underlying for the vault. If not, approve the difference.

```tsx
const vaultAddr = vaultWithWallet.getAddress();
const erc20 = await vaultWithWallet.getUnderlyingErc20();
const depositAmount = await vaultWithWallet.toUnderlyingBigInt("5.0"); // 5 underlying tokens

// Check existing allowance
const currentAllowance = await erc20.allowance(
  account.address,
  vaultAddr
);

if (currentAllowance < depositAmount) {
  const approveAmount = depositAmount - currentAllowance;
  console.log("Approving extra allowance:", approveAmount.toString());
  await (await erc20.approve(vaultAddr, approveAmount)).wait();
}

// Safe to deposit
await (await vaultWithWallet.deposit(depositAmount)).wait();
```

## 2. Read total assets

Get the vault's total assets and format the value with the [SDK](/glossary/#sdk)'s helpers.

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
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const transport = http("https://ethereum-rpc.publicnode.com");
const publicClient = createPublicClient({ chain: mainnet, transport });
const vault = getVault("v2", "0xYourVault", 1, publicClient);

const details = await vault.getVaultDetails();
console.log("Vault shares:", details.vaultAsset.symbol);
console.log("Underlying:", details.underlying.symbol);
```

## 4. Preview deposit

Estimate how many shares ([ctAssets](/glossary/#ct-asset)) you will receive for a deposit.

```tsx
const oneUnderlying = await vault.toUnderlyingBigInt("1.0");
const preview = await vault.previewConversion(oneUnderlying);

console.log(
  `1 ${details.underlying.symbol} ≈ ${await vault.applyDecimals(preview.vaultTokensReceivingRaw)} ${details.vaultAsset.symbol}`
);
```

## 5. Deposit flow

```tsx
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";

// 1. Approve vault to spend the underlying
// 2. Deposit underlying into the vault
// 3. Receive vault shares

const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
const walletClient = createWalletClient({ account, chain: mainnet, transport });
const vaultWithWallet = getVault("v2", "0xYourVault", 1, publicClient, walletClient);

const depositAmount = await vaultWithWallet.toUnderlyingBigInt("1.0");

// (1) Approve underlying to the vault
const erc20 = await vaultWithWallet.getUnderlyingErc20();
await (await erc20.approve(vaultWithWallet.getAddress(), depositAmount)).wait();

// (2) Deposit
const receipt = await (await vaultWithWallet.deposit(depositAmount)).wait();
console.log("Deposit confirmed:", receipt.transactionHash);
```

## 6. Redeem flow

```tsx
const owner = account.address;
const shareBalance = await vaultWithWallet.balanceOf(owner);

if (shareBalance > 0n) {
  const preview = await vaultWithWallet.previewConversion(shareBalance);
  const details = await vaultWithWallet.getVaultDetails();

  console.log(
    `${await vaultWithWallet.applyDecimals(shareBalance)} ${details.vaultAsset.symbol} ≈ ` +
    `${await vaultWithWallet.toUnderlyingDecimals(preview.underlyingReceivingRaw)} ${details.underlying.symbol}`
  );

  const receipt = await (await vaultWithWallet.redeem(shareBalance)).wait();
  console.log("Redeemed:", receipt.transactionHash);
}
```

## 7. Transfer [ctAssets](/glossary/#ct-asset)

Shares (ctAssets) behave like [ERC20](/glossary/#erc-20) tokens and can be transferred.

```tsx
const recipient = "0xRecipient...";
const tenShares = await vaultWithWallet.toBigInt("10.0");
await (await vaultWithWallet.transfer(recipient, tenShares)).wait();
```

## 8. Move shares with allowance

Grant another address permission to spend your shares.

```tsx
const spender = "0xSpender...";
const owner = account.address;
const recipient = "0xRecipient...";
const allowance = await vaultWithWallet.toBigInt("5.0");

// Owner approves spender
await (await vaultWithWallet.approve(spender, allowance)).wait();

// Spender calls transferFrom (as the connected account)
await (await vaultWithWallet.transferFrom(owner, recipient, allowance)).wait();
```

## 9. End-to-end example

```tsx
// 1 underlying deposit, then redeem

const oneUnderlying = await vaultWithWallet.toUnderlyingBigInt("1.0");

// Preview deposit
const pvDeposit = await vaultWithWallet.previewConversion(oneUnderlying);
console.log("Expected shares:", await vaultWithWallet.applyDecimals(pvDeposit.vaultTokensReceivingRaw));

// Approve and deposit
const erc20 = await vaultWithWallet.getUnderlyingErc20();
await (await erc20.approve(vaultWithWallet.getAddress(), oneUnderlying)).wait();
await (await vaultWithWallet.deposit(oneUnderlying)).wait();

// Redeem
const owner = account.address;
const shares = await vaultWithWallet.balanceOf(owner);
await (await vaultWithWallet.redeem(shares)).wait();
```
