---
title: "How to Withdraw"
description: "How to Withdraw"
sidebar_label: "How to Withdraw"
---

If you're ready to exit your position or redeem your rewards, Bera vaults support **secure and scheduled withdrawals**.

When withdrawing your ctAsset:

- Always confirm you control your destination Berachain address, where assets will be sent, before bridging.
- If you do not control the destination Berachain address, use the [Request a change](./request-address-change.md) option to avoid losing access to your assets.

:::tip
Read the article [How Withdrawals Work](../how-withdrawals-work.md).
:::

## Steps to Withdraw

1. Select your Bera vault position from the [Portfolio](https://app.concrete.xyz/portfolio/vaults)
2. If you hold more than one asset in a given vault, select the relevant ct Vault Share
3. Ensure you control the wallet address on Berachain before bridging. If you don’t control the destination address, read the article [requesting a change of Berachain address](./request-address-change.md).
4. Click Bridge to bridge all vault shares to Berachain
5. Review the assets to withdraw
6. Withdraw the assets on Berachain

Once submitted, your request will show as **Queued** and automatically move to **Processing** and then **Available** when the withdrawal queue is complete.

## Withdrawal Statuses

- **Queued**: Your request is in the withdrawal queue
- **Processing**: Backend systems are preparing the withdrawal
- **Available**: Your funds are ready to claim to your wallet

You’ll receive prompts in the interface when your withdrawal is ready.

## Why Multi-Sig Addresses?

Separate multi-sigs provide targeted security for each process (withdrawal vs. migration). Also, users can verify both addresses to ensure their assets are being routed correctly.

During the withdrawal and migration processes, Concrete uses two separate multi-sig addresses to enhance security and transparency:

1. **Withdrawal Multi-Sig (Withdraw Tab):**

When a user initiates a withdrawal, their ct Vault Shares are sent to the Withdrawal Multi-Sig `0xBEaf14E78e81277A5939C294AF72b31d372CAB15`. This multi-sig address acts as a secure holding area for shares before assets are fully processed and released to the user’s wallet.

2. **Migration Multi-Sig (Banner Migration Step):**

In some scenarios, such as vault migrations or strategic updates, users may need to migrate vault shares to new contracts or vaults. During these migrations, assets are temporarily routed to the Migration Multi-Sig`0x04a6916ebF3ECE8AB05B9CA06cECc7B20e1c182B`. This address securely holds the migrated assets until they are redistributed or reassigned to the appropriate vaults or contracts.
