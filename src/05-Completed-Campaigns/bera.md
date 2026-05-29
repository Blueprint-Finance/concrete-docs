---
title: "Bera"
description: "Documentation for the Bera completed campaigns: pre-deposit vault deprecation, claiming rewards, transferring vault shares, withdrawals, and unclaimed-reward handling."
sidebar_label: "Bera"
---

## Pre-Deposit Vaults Deprecation

Concrete is deprecating the **Bera Pre-Deposit Vaults,** If you deposited into Bitcoin Bera, Ethena Bera, and Dinero Bera vaults, we recommend redeeming your funds as soon as possible. Withdrawals through the app will close on July 15th, 2025.

On July 16th, withdrawals will still be possible via the new Berachain vaults but will require additional steps. Any remaining assets will be automatically migrated to new Berachain vaults, and users will need to claim their new vault shares manually.

### Summary for Depositors

- Your funds are safe and still withdrawable
- Withdraw or bridge before July 15th, 2025
- Any remaining funds will be migrated to new Bera vaults
- If your deposit was in a Bera vault on Ethereum mainnet, you can still claim rewards after the migration — rewards use a separate service and remain unaffected. If your deposit was in the early Berachain “Boyco” vaults, there were no rewards issued, so nothing is claimable post-migration.

### What’s Changing?

If you deposited into any of the Bera Pre-Deposit vaults, we recommend withdrawing your funds promptly. These vaults are being deprecated and will soon be removed from the app interface. Withdrawing early ensures you retain full control of your assets and helps avoid delays or confusion later.


:::tip
The Bitcoin Bera vault interface is managed by Lombard, not Concrete. While the underlying assets will still be migrated and claimable, the steps may differ slightly. Concrete is not responsible for third-party platforms.
:::

#### Affected Bera Pre-Deposit Vaults

1. **Bitcoin Bera** — Deposit: Closed
2. **Ethena Bera** — Deposit: Closed
3. **Dinero Bera** — Deposit: Closed

### Are My Funds Safe?

Yes. Your deposited assets remain secure in smart contracts throughout the transition.

You’ll be able to:

- Withdraw through the app until July 15th, 2025
- Automatic migration into new vaults happens on July 16th
- Claim new vault shares in-app using a simple interface after July 16th, 2025
- Contact support to resolve edge cases (e.g. custodial accounts)

:::tip
Users who requested a new Berachain address will receive migrated funds directly in the confirmed wallets.
:::

### What Should I Do?

**Withdraw now —** you can withdraw your assets until July 15th, 2025**:**

1. Visit the [Concrete App](https://app.concrete.xyz/)
2. Select your relevant **Bera Vault**
3. Navigate to the **Withdraw** tab
4. Click **Withdraw** on any of your vault positions

### Migration & Claim Process

If you haven’t withdrawn by **July 15**, Concrete will automatically migrate your underlying assets to the new equivalent vault (e.g. `LBTC → LBTC`, `USDe → USDe`).

You can **claim your new vault assets** directly in the app:

1. Go to the **Portfolio** tab
2. Find your ctAssets (they now show a $0 balance because your underlying asset has been migrated to a new vault)
3. Click on the asset (you’ll see a success message confirming the migration)
4. If you had deposits in multiple vaults, a dropdown selector will let you choose which asset to claim
5. Use the **"Claim"** button to mint your new ctAssets
6. New shares will appear in your portfolio immediately

**What’s New in the Claim Flow?**

- Users with multiple migrated assets can select which to claim using a dropdown menu
- Claims use the same wallet interaction pattern as standard reward claims
- This ensures transparency — users see exactly what they're claiming, before confirming

### Key Dates

| **Event** | **Date / Timing** |
| --- | --- |
| Final withdrawal batch | **July 16th, 2025** (bridge requests submitted between July 9th at 12PM UTC and July 15th at 7AM UTC will be automatically processed — no user action required) |
| Vaults marked as closed migrated | **After July 16th, 2025** |
| Claim new vault shares UI available | **After July 16th, 2025** |


### Need Help?

If you’re not sure whether your vault is affected or need help withdrawing:

- Ask in our [Discord Support Channel](https://discord.gg/concretexyz)
- Or email [support@blueprintfinance.com](mailto:support@blueprintfinance.com)

Our team is happy to walk you through the process.

## Boyco Depositors: How to Claim

If you deposited into a Concrete vault through Boyco, your rewards and positions are now available directly on the **Boyco app**.

### Where to Claim

Claiming your vault position is a **two-step process**:

1. **Navigate to the Boyco Claim Portal:**

   * Go to [Boyco Claim Portal](https://berachain.royco.org/portfolio)
   * Connect your wallet.

2. **Claim Your Position on Concrete:**

   * Proceed to the [Concrete Boyco Vault Claim Page](https://app.concrete.xyz/vault/berachain/boyco/0xf0d94806e6E5cB54336ED0f8De459659718F149C).
   * This is where you can claim your vault position and withdraw any eligible rewards.

### Why Claim Happens on Boyco

Boyco acts as a front-end layer for Concrete vaults. If your original deposit was routed through Boyco, then **your rewards are only visible through Boyco’s interface**, not directly on Concrete.

### Important Notes

- Use the same wallet that made the original deposit.
- If you're unsure whether you used Boyco, try connecting your wallet on both platforms. If your vault position appears on Boyco, you should continue managing it there.
- Withdraw queue may apply before withdrawal (up to 72 hours).
- You’ll still earn Concrete Points and partner rewards just like other vault depositors.

## How to Claim and Transfer

Bera vaults offer an option to **claim your rewards** and transfer your underlying tokens to a new Bera vault, so you can continue to earn an attractive yield plus Bera Governance Token emissions (BGT). All new vaults will have withdrawals open from May 16 onwards.

- To take advantage of this Claim and Transfer, connect your wallet and you will see a banner which informs you of a destination vault based on your deposited tokens.
- Rewards claiming will happen instantly
- Transferring the underlying enters into a 72 hour queue
- Choose **“Claim and Transfer”** in the UI to begin this process

For long-term stakers, transferring is a powerful way to boost returns while minimizing effort.

### 72-Hour Transfer Queue

Just like withdrawals, transferring in Bera vaults is subject to a **72-hour transfer queue**.

When you submit a transfer request:

- Your rewards are queued for transferring
- After **72 hours**, they are automatically deposited into the vault
- You do **not** need to take additional action

This ensures smooth batch processing and supports backend syncing across chains.

### How to Use the Claim and Transfer Function

1. Go to the [Concrete Core app](https://app.concrete.xyz/)
2. Connect your wallet. If you have the relevant vault shares for Bera chain, you will see a banner which reads “Claim Rewards and Keep Earning”
3. Click **Claim and Transfer**
4. Review your rewards to claim
5. Click **Claim and Proceed**
6. Approve the transaction in your wallet
7. Review your vault shares to transfer to the new vault
8. Click Transfer Vault Shares
9. Approve the transaction in your wallet
10. Once confirmed, your request enters the **transfer queue** and will execute after 72 hours.

:::tip
If you have multiple Bera vault shares, all your claimable rewards will be claimed in one transaction.
:::

## How to Claim Rewards


If you deposited into a **Bera Vault**, your rewards are now ready to be **claimed.** This guide walks you through the full process—from reviewing your eligible rewards to confirming the claim and bridging them in a single transaction.

There are two ways to Claim your Rewards. You can :

1. [Claim your Rewards and Transfer](#how-to-claim-and-transfer) your underlying asset to a new vault to keep earning yield and Bera Governance Tokens (BGT)
2. Claim your Rewards on the vault page

### Step-by-Step: Claim Rewards

#### 1. Go to either Claim and Transfer, or the Yield tab on a vault page

Click Claim.

#### 2. Review your rewards

Review the list of rewards owed, reward type (points or tokens) and the details on how to claim. See full list below.

#### 3. Claim all rewards

Clicking claim will claim all rewards in one transaction. If you hold multiple Bera vault shares, claiming rewards will claim for all vault shares in your wallet.

### Claim Deadline

You must claim your rewards within **3 months** of the unlock date.
After that, **unclaimed rewards may be reallocated** to other protocol incentives.

🔗 [What happens if I don’t claim](#unclaimed-rewards)

### What Rewards are available to claim?

**Bitcoin Bera vaults - LBTC, WBTC depositors**

| **Rewarding entity** | **Tokens or Points** | **URL**  | **Details** |
| --- | --- | --- | --- |
| Berachain | BERA tokens | [https://app.concrete.xyz](https://app.concrete.xyz/) | Claim on Concrete Core app |
| Lombard | Lux Points | - | Points have been earned through Concrete. Distribution will happen at a later date. |
| Babylon | BABY tokens | - | Lombard to distribute $BABY |
| Concrete | Concrete Points | [concrete.xyz](http://concrete.xyz/) | Points have been earned through Concrete. |
| Kodiak | xKDK tokens | - | Airdrop by Kodiak May 6 |
| Dolomite | veDOLO tokens | https://app.dolomite.io/boyco | Dolomite to distribute May 7 |

**Ethena Bera vaults - USDe, sUSDe depositors**

| **Rewarding entity** | **Tokens or Points** | **URL** | **Details** |
| --- | --- | --- | --- |
| Ethena USDe | ENA tokens | https://app.liquifi.finance/ | Claim ENA on Liquifi |
| Ethena sUSDe | ENA tokens | https://app.liquifi.finance/ | Claim ENA on Liquifi |
| Concrete | Concrete Points | [concrete.xyz](http://concrete.xyz/) | Points have been earned through Concrete. |
| Berachain | BERA tokens | [https://app.concrete.xyz](https://app.concrete.xyz/) | Claim on Concrete Core app |
| Kodiak | xKDK tokens | - | Airdrop by Kodiak May 6 |
| Dolomite | veDOLO tokens | https://app.dolomite.io/boyco | Dolomite to distribute May 7 |
| Beraborrow | POLLEN tokens | [https://app.concrete.xyz](https://app.concrete.xyz/) | Claim on Concrete Core app |

**Dinero Bera vaults - ETH depositors**

| **Entity** | **Tokens or Points** | **Where to claim** | **Details** |
| --- | --- | --- | --- |
| Concrete | Concrete Points | [concrete.xyz](http://concrete.xyz/) | Points have been earned through Concrete. |
| Berachain | BERA tokens | [https://app.concrete.xyz](https://app.concrete.xyz/) | Claim on Concrete Core app |
| Kodiak | xKDK tokens | - | Airdrop by Kodiak May 6 |
| Dolomite | veDOLO tokens | https://app.dolomite.io/boyco | Dolomite to distribute May 7 |
| Beraborrow | POLLEN tokens | [https://app.concrete.xyz](https://app.concrete.xyz/) | Claim on Concrete Core app |
| Dinero | DINERO tokens | [https://app.concrete.xyz](https://app.concrete.xyz/) | Partner to distribute May 9, claim through Concrete Core app |

Pendle depositors - expect rewards by May 18 latest via the [Pendle dashboard](https://app.pendle.finance/trade/dashboard/overview/positions?timeframe=allTime).

## How to Withdraw

If you're ready to exit your position or redeem your rewards, Bera vaults support **secure and scheduled withdrawals**.

When withdrawing your ctAsset:

- Always confirm you control your destination Berachain address, where assets will be sent, before bridging.
- If you do not control the destination Berachain address, contact [Support](/support/) to avoid losing access to your assets.

:::tip
Read the article [How Withdrawals Work](/Using-Concrete-Vaults/withdraw/).
:::

### Steps to Withdraw

1. Select your Bera vault position from the [Portfolio](https://app.concrete.xyz/portfolio/vaults)
2. If you hold more than one asset in a given vault, select the relevant ct Vault Share
3. Ensure you control the wallet address on Berachain before bridging. If you don’t control the destination address, contact [Support](/support/) for assistance.
4. Click Bridge to bridge all vault shares to Berachain
5. Review the assets to withdraw
6. Withdraw the assets on Berachain

Once submitted, your request will show as **Queued** and automatically move to **Processing** and then **Available** when the withdrawal queue is complete.

### Withdrawal Statuses

- **Queued**: Your request is in the withdrawal queue
- **Processing**: Backend systems are preparing the withdrawal
- **Available**: Your funds are ready to claim to your wallet

You’ll receive prompts in the interface when your withdrawal is ready.

### Why Multi-Sig Addresses?

Separate multi-sigs provide targeted security for each process (withdrawal vs. migration). Also, users can verify both addresses to ensure their assets are being routed correctly.

During the withdrawal and migration processes, Concrete uses two separate multi-sig addresses to enhance security and transparency:

1. **Withdrawal Multi-Sig (Withdraw Tab):**

When a user initiates a withdrawal, their ct Vault Shares are sent to the Withdrawal Multi-Sig `0xBEaf14E78e81277A5939C294AF72b31d372CAB15`. This multi-sig address acts as a secure holding area for shares before assets are fully processed and released to the user’s wallet.

2. **Migration Multi-Sig (Banner Migration Step):**

In some scenarios, such as vault migrations or strategic updates, users may need to migrate vault shares to new contracts or vaults. During these migrations, assets are temporarily routed to the Migration Multi-Sig`0x04a6916ebF3ECE8AB05B9CA06cECc7B20e1c182B`. This address securely holds the migrated assets until they are redistributed or reassigned to the appropriate vaults or contracts.

## Unclaimed Rewards

If you participated in the Bera vault and are eligible for rewards, you can claim them via the Concrete Core UI within 3 months of the unlock date.

### Claim Window

- You have **3 months** from **May 6th** to claim your rewards and funds
- All unclaimed rewards or funds will be kept safe
- We will create an alternative way for depositors to get their unclaimed rewards or funds before we disable the Withdrawals and Claims in our UI

### Why This Matters

Unclaimed tokens sitting idle create administrative overhead. To maintain fairness and vault efficiency, Concrete sets a clear deadline for claims.

:::tip
Claiming is quick and only requires a signature from your connected wallet.
:::

🔗 [How to Claim Rewards](#how-to-claim-rewards)
