---
title: "Request Address Change"
description: "Confirming and Changing Your Destination Address"
sidebar_label: "How to Request Address Change"
---

When withdrawing your ctAsset:

- Always confirm you control your destination Berachain address, where assets will be sent, before bridging.
- If you do not control the destination Berachain address, use the **Request a change** option to avoid losing access to your assets.

## If You Do Not Control The Destination Berachain Address

There are two paths depending on whether you’ve already bridged your ctAssets:

### Option A: You’ve Already Bridged Your ctAsset

You need to [Sign a message](#1-sign-a-message-using-etherscan), using the same wallet you held your ct Asset with, proving ownership of the new Berachain address and complete the address change request as explained in the steps below.

### Option B: You Haven’t Bridged Your ctAsset Yet

We strongly recommend proceeding with the [standard bridge flow](./how-to-withdraw.md#steps-to-withdraw) which bridges your ctAsset to the Berachain Withdrawal Multi-Sig. This allows us to process your redemption request securely and ensures that rewards and underlying assets are routed correctly.

After bridging, you can [request a destination address change](#how-to-request-an-address-change) (if needed).

:::tip
Technically, it's possible to send your ctAsset (ERC-20) to a different wallet you control — however, we **do not recommend** this option as your rewards may not follow and may require additional support steps.
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

c. Sign the message to publish **using the same wallet you held your ct Asset with**

d. Send the **URL of the published message** to us via [Discord](https://discord.gg/concretexyz) or via [support@blueprintfinance.com](mailto:support@blueprintfinance.com)

### 2. Contact Support

Contact us on [Discord](https://discord.gg/concretexyz) or via [support@blueprintfinance.com](mailto:support@blueprintfinance.com).

Before we can fulfill your request of address change, you need to bridge your ctAsset to the Withdrawal Multi-Sig by completing [Step 1 of the withdrawal flow](./how-to-withdraw.md#why-multi-sig-addresses).

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
