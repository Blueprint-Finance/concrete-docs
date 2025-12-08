---
title: "Claiming Vault Shares and Rewards"
description: "Claiming Vault Shares and Rewards"
sidebar_label: "How to Claim"
---

If you deposited into the **Stable Pre-Deposit Campaign**, your vault shares are now ready to be claimed on the Stable Network.

This help article walks you through the full process — including how to handle situations where your wallet **does not exist on the Stable network** (e.g., multisigs, contract wallets).

## Summary

- All users must claim their vault shares — this moves your ctStableUSDT or ctStablefrxUSD to the Stable Network using the [Earn app](https://app.concrete.xyz/) or [stable.concrete.xyz](http://stable.concrete.xyz).
- Your rewards will not be delivered in this flow. Rewards will be claimable separately [via Merkl](https://app.merkl.xyz/users/).
- Withdrawals will open on December 13th.

**Important - Possible Funds Lost:**
You must control the same Ethereum address on the Stable Network before claiming. Some multisig users have encountered issues because their Safe or contract wallet does not exist as the same address on Stable. If you do *not* control the same address on Stable, transfer your **ctStableUSDT** or **ctStablefrxUSD** to an EOA where you *do* control the same address on Stable before you claim.

## Multisigs & Contract Wallets

Concrete does not restrict which wallet types can claim. However, users must ensure they control the same address on the Stable Network before claiming.

If you are unsure whether your multisig or contract wallet is supported on Stable, you can:

- Transfer your **ctStableUSDT** or **ctStablefrxUSD** vault shares to any EOA you control on Ethereum (regular ERC-20 transfer)
- Then claim using that EOA (which uses the same address on Stable)
- This ensures your vault shares are delivered correctly.

## How to Claim Your Vault Shares

### **1. Start claiming**

Go to [**https://stable.concrete.xyz**](https://stable.concrete.xyz/) and connect the wallet holding your **ctStableUSDT** or **ctStablefrxUSD** shares.

**Or** Go to [**https://app.concrete.xyz**](https://app.concrete.xyz/) → Earn, and connect the same wallet. If you are eligible, you will see a banner: “Tokens ready to claim.” Click **Claim**.

### 2. Review Your Claim

A modal will display:

- The number of vault shares you can claim
- The address on the Stable Network that will receive the vault shares

Click **Claim**.

### 3. Confirm

Before processing begins, you will see a **Confirm** step. Review the information and click **Confirm** to start the claim.

### 4. Claiming State

After clicking Claim, you will see a status screen (the process will take ~10 minutes):

**“Claiming tokens. ETA 10 mins. See progress.”**

**Notes:**

- The claim is processed entirely through the Concrete app (you do not interact with LayerZero directly)
- The progress link allows you to **view** the underlying LayerZero transaction

### 5. Claim Complete

When your claim finishes, you will see:

**“Tokens claimed. See transaction.”**

Click **View** to open your vault page on the Stable Network, where your claimed CT[asset] shares will be visible.

### 6. After Claiming

Your vault shares will appear on the Stable Network. You can view them on the [Stable vault page](https://app.concrete.xyz/vault/stable/usdt) in the Earn app (which is configured for the Stable Network).

### 7. Withdrawal

Users will be able to enter the withdrawal queue starting December 13th.

## Troubleshooting

### Claim Timing

- Claim initiation is instant on Ethereum
- Cross-chain delivery typically takes ~10 minutes
- Vault shares always arrive at the same address on Stable. Rewards will be claimed separately [via Merkl](https://app.merkl.xyz/users/).

### The claim is pending for a long time

Cross-chain delivery can take up to 10 minutes depending on network conditions.

Do not refresh the page and Keep the app open until completion.

### I claimed but don’t see vault shares on Stable

The safest way to view your claimed balance is to:

1. Connect your wallet
2. Go to the **Portfolio** section of the Earn page **or** Visit [**https://stable.concrete.xyz**](https://stable.concrete.xyz/), connect your wallet, and select the vault on Stable to view your balance

# Need Help?

Please refer to the main documentation's [support section](https://docs.concrete.xyz/support/).
