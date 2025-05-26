---
title: "Confirming and Changing Your Destination Address"
description: "Confirming and Changing Your Destination Address"
sidebar_label: "How to Request Address Change"
---

When withdrawing your ctAsset:

- Always confirm you control your destination Berachain address, where assets will be sent, before bridging.
- If you do not control the destination Berachain address, use the **Request a change** option to avoid losing access to your assets.

## If You Do Not Control The Destination Berachain Address:

### You’ve Already Bridged Your ctAsset

You need to [Sign a message](#1-contact-support) proving ownership of the new Berachain address

### You Haven’t Bridged Your ctAsset Yet

If you don’t control the destination address and you haven’t bridged your ctAssets yet, there’s a simpler path instead of requesting an address change:

Send your ctAsset (ERC-20 token) to a wallet where you **fully control the Berachain address**. This allows you to start the [bridging and withdrawal process](./how-to-withdraw.md) from a wallet you control—without needing to request a destination address change or wait for support. Once the ctAsset is in the right wallet, you can bridge to Berachain and withdraw normally.

This only works **before bridging**. Once assets are bridged, you’ll need to go through requesting the address change.

:::tip
If you choose to send your ctAsset to a new wallet, your rewards may not automatically follow. We will need to manually update reward contracts to reflect your new Berachain address — this can delay your reward access and may require additional support steps.
:::

## How to Request an Address Change

If you’ve lost access to your Berachain address, follow these steps to request a change:

### 1. Sign a Message Using Etherscan

a. Go to [https://etherscan.io/verifiedSignatures#](https://etherscan.io/verifiedSignatures#**) and click on the button **“Sign Message”**:

<img
  src="/img/change-1.png"
  style={{ maxWidth: "800px", width: "100%", height: "auto", display: "block", margin: "0 auto" }}
/>

b. Enter your new Berachain address in the **Message** form field:

<img
  src="/img/change-2.png"
  style={{ maxWidth: "800px", width: "100%", height: "auto", display: "block", margin: "0 auto" }}
/>

c. Sign the message to publish

d. Send the **URL of the published message** to us via [Discord](https://discord.gg/concretexyz) or via [support@blueprintfinance.com](mailto:support@blueprintfinance.com)

### 2. Contact Support

Contact us on [Discord](https://discord.gg/concretexyz) or via [support@blueprintfinance.com](mailto:support@blueprintfinance.com).

Before we can fulfill your request of address change, you need to bridge your ctAsset to the Withdrawal Multi-Sig by completing [Step 1 of the withdrawal flow](./how-to-withdraw#why-multi-sig-addresses).

 <img
   src="/img/bridge-1.png"
   style={{ maxWidth: "800px", width: "100%", height: "auto", display: "block", margin: "0 auto" }}
 />

### 3. We Verify the Signed Message

Once we receive your message URL, we will:

- Verify that the message was signed and published correctly on Etherscan
- Check that it matches the expected wallet and destination address

### 4. Redemption Status Check

Next, we’ll check if the funds for your original wallet address have already been withdrawn or claimed:

- **If funds have been redeemed**: We won’t proceed. Your wallet will be marked as redeemed.
- **If funds have *not* been redeemed**: We’ll proceed to the final step.

### 5. Send Underlying to Newly Assigned Address

Our team will complete the redemption process on your behalf and send the underlying assets to your newly provided Berachain address.

:::tip
This process may take a few days to complete. You will be notified once it's done.
:::

## Where This Applies

You’ll encounter this ownership validation in:

- **Withdraw flows** from vaults using bridging
- **Reward claiming** that bridges rewards to Berachain
- **Vault transfer** steps involving address movement
