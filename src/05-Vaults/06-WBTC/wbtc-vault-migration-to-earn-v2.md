# WBTC Vault Migration to Earn V2

The WBTC Vault is being upgraded from **Earn V1** to **Earn V2** as part of Concrete’s continued evolution toward institutional-grade vault infrastructure.

This migration brings the WBTC Vault in line with the standardized Earn V2 architecture, enabling improved automation, enhanced accounting, and long-term scalability.

Only the vault implementation is being upgraded to the Earn V2 framework. Strategy custody arrangements and operational policies remain intact unless otherwise communicated.

## Migration Summary

- The WBTC vault is migrating from Earn V1 to Earn V2.
- If you take no action, your underlying WBTC will continue earning yield.
- After migration, you will not see your Earn V1 shares in the app. Instead, you will see the ability to claim the equivalent amount of Earn V2 shares.
- You must complete the claim transaction to restore your visible balance in the app.

## What Is Changing

The WBTC deposited in the **ctWBTC Earn V1 vault** (contract address `0xacce65B9dB4810125adDEa9797BaAaaaD2B73788`) is being migrated to a new Earn V2 **ctWBTC** vault contract (`0xF72bD5A56dE97840F1fdd3641B556126c10aA1c4`).

What changes is the vault implementation and the share token contract representing your position. Your underlying WBTC assets remain fully accounted for.

## Why We Are Migrating

Earn V2 introduces a more advanced and modular vault framework designed for secure, automated, and scalable operations.

The upgrade enables:

- Automated accounting and daily NAV synchronization
- Standardized ERC-4626 share mechanics
- Improved liquidity management architecture
- Modular strategy integrations
- Long-term upgrade flexibility

## Migration Method: Pull-Based Share Claim

New Earn V2 shares will be distributed using a pull-based claim process.

This means:

- Shares are not automatically pushed to user wallets
- Users must manually claim their new V2 shares
- Distribution accuracy is verified before shares are minted

## What You Will See in the App

After deployment of the Earn V2 vault:

When visiting:

- https://wbtc.concrete.xyz/
- https://app.concrete.xyz/earn

and connecting your wallet, you may initially see:

- No visible balance
- No share tokens displayed
- A prompt to **Claim New Shares**

This is expected, because the vault contract has changed, V1 share tokens will not automatically appear in the V2 interface.

## How to Claim Your Earn V2 Shares

1. Connect your wallet
2. Navigate to the [WBTC Vault page](https://www.notion.so/30d66ba1a4f9802c8ca4f6a25dd2bbb3?pvs=21)
3. Click **Claim Shares** (claiming requires a standard gas transaction)
4. Confirm the claim transaction in your wallet.

### What to Expect in Your Wallet

The claim transaction performs a migration of your position (you will see a single transaction that executes this migration process):

- Your Earn V1 vault shares will be burned.
- An equivalent amount of Earn V2 vault shares will be issued to your wallet.

Once confirmed:

- Your Earn V2 vault shares will appear in your wallet.
- Your portfolio balance will display normally.
- You may withdraw or manage your position as usual.

## Do I Need to Withdraw or Re-Deposit?

No. Claiming your new Earn V2 shares is sufficient.

You do not need to:

- Withdraw WBTC
- Bridge assets
- Manually re-deposit

## Asset Safety & Strategy Continuity

The migration preserves:

- Full underlying asset accounting
- Existing strategy exposure
- Vault-level accounting logic

## Support

https://docs.concrete.xyz/support/
