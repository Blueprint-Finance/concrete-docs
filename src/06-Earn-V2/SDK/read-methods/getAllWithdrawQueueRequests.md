---
title: "getAllWithdrawQueueRequests(owner)"
description: "getAllWithdrawQueueRequests(owner)"
sidebar_label: "getAllWithdrawQueueRequests(owner)"
---

Fetches **all withdrawal-queue requests** for a given `owner` address, and returns an array of request objects. Each request includes status metadata and two executable actions:

* `cancel()` — cancels the request (when `cancelable: true`)
* `claim()` — claims the withdrawal (when `claimable: true`)

The returned `cancel()` / `claim()` functions are **write actions** and therefore require a signer.

## Signature

```ts
getAllWithdrawQueueRequests(owner: Address): Promise<
  {
    recipient: `0x${string}`;
    epoch: number;
    epochState: "inactive" | "active" | "processing" | "processed";
    claimable: boolean;
    cancelable: boolean;
    cancel: () => Promise<ContractTransactionResponse>;
    claim: () => Promise<ContractTransactionResponse>;
    amount: bigint;
    version: 2;
    vaultAddress: string;
    chainId: number;
  }[]
>;
```

## Returns

An array of withdrawal-queue requests:

* `recipient` — where the underlying will be sent when claimed
* `epoch` — epoch index for the request
* `epochState` — current epoch status (`inactive | active | processing | processed`)
* `claimable` — whether `claim()` can be called right now
* `cancelable` — whether `cancel()` can be called right now
* `amount` — requested amount (in **vault share units** unless your implementation states otherwise)
* `version` — always `2` for these requests
* `vaultAddress`, `chainId` — identifies the vault/network
* `cancel()` / `claim()` — callable functions that send transactions

## Parameters

* `owner` (**Address**, required)
  The wallet address whose withdrawal requests you want to load.

## Example

```ts
import { getVault } from "@concrete-xyz/sdk";
import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL!);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const vault = getVault("0xYourVault", "Ethereum", provider, signer);

  const owner = await signer.getAddress();
  const requests = await vault.getAllWithdrawQueueRequests(owner);

  // Render list
  for (const r of requests) {
    console.log({
      recipient: r.recipient,
      epoch: r.epoch,
      epochState: r.epochState,
      amount: r.amount.toString(),
      claimable: r.claimable,
      cancelable: r.cancelable,
      vaultAddress: r.vaultAddress,
      chainId: r.chainId,
      version: r.version,
    });
  }

  // Claim the first claimable request (if any)
  const firstClaimable = requests.find((r) => r.claimable);
  if (firstClaimable) {
    console.log("Claiming request in epoch", firstClaimable.epoch);
    const tx = await firstClaimable.claim();
    const receipt = await tx.wait();
    console.log("Claim confirmed:", receipt?.hash ?? receipt?.transactionHash);
    return;
  }

  // Otherwise, cancel the first cancelable request (if any)
  const firstCancelable = requests.find((r) => r.cancelable);
  if (firstCancelable) {
    console.log("Canceling request in epoch", firstCancelable.epoch);
    const tx = await firstCancelable.cancel();
    const receipt = await tx.wait();
    console.log("Cancel confirmed:", receipt?.hash ?? receipt?.transactionHash);
    return;
  }

  console.log("No claimable or cancelable requests found.");
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
```
