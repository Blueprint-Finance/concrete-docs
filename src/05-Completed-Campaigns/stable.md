---
title: "Stable"
description: "Stable vault documentation covering the Stable Network pre-deposit campaign, deposits, rewards, withdrawals, and claiming vault shares on Stable."
sidebar_label: "Stable"
---

## Stable Vaults

Concrete’s **Stable Vaults** let you deposit **[USDT](/glossary/#usdt)** or **[frxUSD](/glossary/#frxusd)** early to have your funds automatically deployed on the Stable Network from day one.

### The Stable Network

**Stable** is an institutional-grade blockchain built for stablecoins, designed to support efficient yield, liquidity, and settlement at scale.

By participating through Concrete vaults, users provide early liquidity and help bootstrap the ecosystem while earning rewards.

### What Are Stable Vaults?

Stable Vaults are vaults that accept deposits ahead of the Stable Network launch, and they have been earning yield from day one.

After you deposit, you’ll receive **receipt tokens** representing your position.


:::tip
The Stable vault supports USDT and frxUSD. Rewards will be handled via [Merkl](https://app.merkl.xyz/). Concrete points will be additional to the rewards.
:::

### Rewards

- You’ll earn **Concrete Points** during the campaign
- Any rewards are distributed through **Merkl**

:::tip
Check [app.merkl.xyz](https://app.merkl.xyz/) for live reward tracking once the campaign launches
:::

### Timeline

1. **Deposits Open** — Users can deposit to Stable vaults (October 23, 2025).
2. **Claim** —  Users will claim their vault shares to the Stable Network. During this process, you’ll claim your vault shares on Stable, which **burns** your existing vault shares on Ethereum L1 and **mints** the same number of new shares on the Stable Network.
3. **Withdrawals Enabled** — Once bridging completes, users can enter withdrawal queue on December 13th.
4. **7-Day Withdrawal Queue** — After initial unlocks, withdrawals follow a standard queue for smooth liquidity management.

:::tip
Any funds left in the Stable vault after migration will continue to earn yield directly on the Stable Network.
:::

### How to Deposit

1. Navigate to the campaign page [stable.concrete.xyz](https://stable.concrete.xyz/)
2. Click **Connect Wallet** and choose your preferred wallet (e.g., MetaMask)
3. Select **USDT** or **frxUSD**
4. Enter the amount of stablecoins that you want to deposit
5. Approve the vault by providing  wallet permission to spend your stablecoin
6. Confirm the deposit by signing the deposit transaction in your wallet
7. After confirmation, you’ll receive **[ctStableUSDT](/glossary/#ct-stableusdt)** or **[ctStablefrxUSD](/glossary/#ct-stablefrxusd)** representing your deposit.

### After Bridging Complete

- Your balance and vault [TVL](/glossary/#tvl) will become visible
- You can see your deposited position under **My Deposits**

### Withdrawals

Withdrawals occur **on the Stable Network** once bridging is complete.

- Withdrawal queue opens
- Once the queue activates, requests are processed in a **7-day withdrawal queue**
- The app will clearly display withdrawal status (“In Queue”, “Processing”, “Ready to Claim”)
- Once processed, your tokens become **claimable** directly from the Earn app

:::tip
When the campaign ends, any remaining vault balances will continue accruing yield until withdrawn.
:::

## Claiming Vault Shares and Rewards

If you deposited into the **Stable Pre-Deposit Campaign**, your vault shares are now ready to be claimed on the Stable Network.

This help article walks you through the full process — including how to handle situations where your wallet **does not exist on the Stable network** (e.g., multisigs, contract wallets).

### Summary

- All users must claim their vault shares — this moves your [ctStableUSDT](/glossary/#ct-stableusdt) or [ctStablefrxUSD](/glossary/#ct-stablefrxusd) to the Stable Network using the [Earn app](https://app.concrete.xyz/) or [stable.concrete.xyz](http://stable.concrete.xyz).
- Your rewards will not be delivered in this flow. Rewards will be claimable separately [via Merkl](https://app.merkl.xyz/users/).
- Withdrawals open on December 13th. Users can enter the withdrawal queue starting on this date. Withdrawals will be processed during a 7-day withdrawal queue period.

**Important - Possible Funds Lost:**
You must control the same Ethereum address on the Stable Network before claiming. Some multisig users have encountered issues because their Safe or contract wallet does not exist as the same address on Stable. If you do *not* control the same address on Stable, transfer your **ctStableUSDT** or **ctStablefrxUSD** to an [EOA](/glossary/#eoa) where you *do* control the same address on Stable before you claim.

### Multisigs & Contract Wallets

Concrete does not restrict which wallet types can claim. However, users must ensure they control the same address on the Stable Network before claiming.

If you are unsure whether your multisig or contract wallet is supported on Stable, you can:

- Transfer your **ctStableUSDT** or **ctStablefrxUSD** vault shares to any EOA you control on Ethereum (regular [ERC-20](/glossary/#erc-20) transfer)
- Then claim using that EOA (which uses the same address on Stable)
- This ensures your vault shares are delivered correctly.

### How to Claim Your Vault Shares

#### 1. Start claiming

Go to [https://stable.concrete.xyz](https://stable.concrete.xyz/) and connect the wallet holding your **ctStableUSDT** or **ctStablefrxUSD** shares.

**Or** Go to [https://app.concrete.xyz](https://app.concrete.xyz/) → Earn, and connect the same wallet. If you are eligible, you will see a banner: “Tokens ready to claim.” Click **Claim**.

#### 2. Review Your Claim

A modal will display:

- The number of vault shares you can claim
- The address on the Stable Network that will receive the vault shares

Click **Claim**.

#### 3. Confirm

Before processing begins, you will see a **Confirm** step. Review the information and click **Confirm** to start the claim.

#### 4. Claiming State

After clicking Claim, you will see a status screen (the process will take ~10 minutes):

**“Claiming tokens. ETA 10 mins. See progress.”**

**Notes:**

- The claim is processed entirely through the Concrete app (you do not interact with LayerZero directly)
- The progress link allows you to **view** the underlying LayerZero transaction

#### 5. Claim Complete

When your claim finishes, you will see:

**“Tokens claimed. See transaction.”**

Click **View** to open your vault page on the Stable Network, where your claimed CT[asset] shares will be visible.

#### 6. After Claiming

Your vault shares will appear on the Stable Network. You can view them on the [Stable vault page](https://app.concrete.xyz/vault/stable/usdt) in the Earn app (which is configured for the Stable Network).

#### 7. Withdrawal

Users will be able to enter the withdrawal queue **starting December 13th**. The queue is a **7-day withdrawal period**. After a user’s request is processed, they will be able to complete their withdrawal and retrieve funds from the vault.

### Troubleshooting

#### Claim Timing

- Claim initiation is instant on Ethereum
- Cross-chain delivery typically takes ~10 minutes
- Vault shares always arrive at the same address on Stable. Rewards will be claimed separately [via Merkl](https://app.merkl.xyz/users/).

#### The claim is pending for a long time

Cross-chain delivery can take up to 10 minutes depending on network conditions.

Do not refresh the page and Keep the app open until completion.

#### I claimed but don’t see vault shares on Stable

The safest way to view your claimed balance is to:

1. Connect your wallet
2. Go to the **Portfolio** section of the Earn page **or** Visit [https://stable.concrete.xyz](https://stable.concrete.xyz/), connect your wallet, and select the vault on Stable to view your balance

### Need Help?

Please refer to the main documentation's [support section](https://docs.concrete.xyz/support/).
