---
title: "How to Claim Stable Pre-Deposit Rewards"
description: "How to Claim Stable Pre-Deposit Rewards"
sidebar_label: "How to Claim Stable Pre-Deposit Rewards"
---

If you deposited into the **Stable Pre-Deposit Campaign**, your reward tokens are now ready to be claimed.

This help article walks you through the full process — including how to handle situations where your wallet **does not exist on the Stable network** (e.g., multisigs, contract wallets).

## Before You Start — Important Wallet Requirement

To successfully receive your rewards you must **control the same wallet address on the Stable Network**. Your Ethereum wallet must exist *as the same address* on Stable. Most EOAs (MetaMask, Rabby, Ledger-as-EOA) are compatible.

### Multisigs & Contract Wallets

These do not exist as the same address on Stable, and therefore cannot receive rewards directly.

**If this applies to you:**

* Transfer your **ctStableUSDT** or **ctStablefrxUSD** vault shares to any EOA you control on Ethereum (regular ERC-20 transfer)
* Then claim using that EOA (which uses the same address on Stable)
* This ensures your rewards are delivered correctly.

## How to Claim Your Rewards

### 1. Go to the Concrete App

Visit **[https://app.concrete.xyz](https://app.concrete.xyz)** and connect the wallet holding your **ctStableUSDT** or **ctStablefrxUSD** shares.

If you are eligible, you will see a **Claim banner** “Tokens ready to claim.” at the top of the Earn page.

Click **Claim**.

### 2. Review Your Claim

A modal will display:

* The number of reward tokens you can claim
* The wallet that will receive the tokens (must match on Stable).

Click **Claim**.

### 3. Claiming State

After clicking Claim, you will see a status screen (the process will take ~10 minutes):

**“Claiming tokens. ETA 10 mins. See progress.”**

**Notes:**

* The claim is processed entirely through the Concrete app (you do not interact with LayerZero directly)
* The progress link allows you to **view** the underlying LayerZero transaction

### 4. Claim Complete

When your claim finishes, you will see:

**“Tokens claimed. See transaction.”**

Click **View** to open your vault page on the Stable Network, where your claimed CT[asset] shares will be visible.

### 5. After Claiming

You can now:

**Option A — Keep earning yield**

Your vault shares will continue accumulating yield on the Stable Network.

**Option B — Begin withdrawal**

You may exit the vault following the standard Stable withdrawal flow.

## If Your Wallet Is Not Compatible

If the app indicates that your current address **cannot receive rewards**, you can still complete the process:

### Step 1 — Move vault shares to a compatible EOA

Transfer your **ctStableUSDT** or **ctStablefrxUSD** shares to a compatible wallet (regular ERC-20 transfer) such as:

* MetaMask
* Rabby
* Ledger (as EOA)

### Step 2 — Claim again

Once the EOA holds the shares:

* Refresh the Concrete app
* Click **Claim** again
* The app will process the claim and send rewards to your Stable EOA address
* Your rewards will now be delivered successfully.


## Troubleshooting

### Claim Timing

* Claim initiation is instant on Ethereum
* Cross-chain delivery typically takes ~10 minutes
* Rewards always arrive at the same wallet address on Stable

### I connected a Safe or multisig and cannot claim:

The *only requirement* is that you must be able to **control the same address on the Stable Network**.

If you are using a multisig or contract wallet, ensure that:

- The wallet **exists on Stable using the same address**, and
- You **control that address** on the destination chain

If your current wallet setup does *not* meet this requirement, you may need to use an EOA that you fully control on both networks.

Transfer your **ctStableUSDT** or **ctStablefrxUSD** to an EOA and claim again normally.

### The claim is pending for a long time

Cross-chain delivery can take several minutes depending on network conditions.

Do not refresh the page and Keep the app open until completion.

### I claimed but don’t see tokens on Stable

Possible reasons:

* Your wallet UI doesn’t auto-detect Stable assets
* You need to add the token contract manually

To fix:

* Add the reward token contract manually
* Verify using a Stable block explorer

# Need Help?

Please refer to the main documentation's [support section](https://docs.concrete.xyz/support/).
