---
title: "Pre-Deposit Vaults Deprecation Guide"
description: "Pre-Deposit Vaults Deprecation Guide"
sidebar_label: "Pre-Deposit Vaults Deprecation Guide"
---

Concrete is deprecating the **Bera Pre-Deposit Vaults,** If you deposited into Bitcoin Bera, Ethena Bera, and Dinero Bera vaults, we recommend redeeming your funds as soon as possible. Withdrawals through the app will close on July 15th, 2025.

On July 16th, withdrawals will still be possible via the new Berachain vaults but will require additional steps. Any remaining assets will be automatically migrated to new Berachain vaults, and users will need to claim their new vault shares manually.

## Summary for Depositors

- Your funds are safe and still withdrawable
- Withdraw or bridge before July 15th, 2025
- Any remaining funds will be migrated to new Bera vaults
- If your deposit was in a Bera vault on Ethereum mainnet, you can still claim rewards after the migration — rewards use a separate service and remain unaffected. If your deposit was in the early Berachain “Boyco” vaults, there were no rewards issued, so nothing is claimable post-migration.

## What’s Changing?

If you deposited into any of the Bera Pre-Deposit vaults, we recommend withdrawing your funds promptly. These vaults are being deprecated and will soon be removed from the app interface. Withdrawing early ensures you retain full control of your assets and helps avoid delays or confusion later.


:::tip
The Bitcoin Bera vault interface is managed by Lombard, not Concrete. While the underlying assets will still be migrated and claimable, the steps may differ slightly. Concrete is not responsible for third-party platforms.
:::

### Affected Bera Pre-Deposit Vaults

1. **Bitcoin Bera** — Deposit: Closed
2. **Ethena Bera** — Deposit: Closed
3. **Dinero Bera** — Deposit: Closed

## Are My Funds Safe?

Yes. Your deposited assets remain secure in smart contracts throughout the transition.

You’ll be able to:

- Withdraw through the app until July 15th, 2025
- Automatic migration into new vaults happens on July 16th
- Claim new vault shares in-app using a simple interface after July 16th, 2025
- Contact support to resolve edge cases (e.g. custodial accounts)

:::tip
Users who requested a new Berachain address will receive migrated funds directly in the confirmed wallets.
:::

## What Should I Do?

**Withdraw now —** you can withdraw your assets until July 15th, 2025**:**

1. Visit the [Concrete App](https://app.concrete.xyz/)
2. Select your relevant **Bera Vault**
3. Navigate to the **Withdraw** tab
4. Click **Withdraw** on any of your vault positions

## Migration & Claim Process

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

## Key Dates

| **Event** | **Date / Timing** |
| --- | --- |
| Final withdrawal batch | **July 16th, 2025**(bridge requests submitted between July 9th at 12PM UTC and July 15th at 7AM UTC will be automatically processed — no user action required) |
| Vaults marked as closed migrated | **After July 16th, 2025** |
| Claim new vault shares UI available | **Starting July 16td, 2025** |


## Need Help?

If you’re not sure whether your vault is affected or need help withdrawing:

- Ask in our [Discord Support Channel](https://discord.gg/concretexyz)
- Or email [support@blueprintfinance.com](mailto:support@blueprintfinance.com)

Our team is happy to walk you through the process.
