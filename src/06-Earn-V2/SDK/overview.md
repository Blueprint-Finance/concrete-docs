---
title: "Overview"
description: "Overview"
sidebar_label: "Overview"
---

Concrete Vaults are [ERC-4626](https://eips.ethereum.org/EIPS/eip-4626)-compliant smart contracts that wrap underlying ERC20 assets (e.g., WBTC, USDC) into vault shares (ctAssets).

Developers can think of each vault as a **yield wrapper** — deposits are deployed into yield strategies (money markets, liquidity provision, restaking, etc.).

From an integration perspective, this means a user’s deposit always results in ERC20 shares (ctAssets) that represent their claim on the vault’s underlying and accrued yield.

## Usage

Whether you’re using vanilla JS/TS, React hooks, or Wagmi integration, you interact with the same underlying vault abstraction.

The Concrete SDK provides:

- **Query vault details** — decimals, symbols, total assets, balances.
- **Approvals** — approve the vault to spend the underlying ERC20.
- **Deposits & redemptions** — mint and redeem shares.
- **Preview conversions** — estimate output before sending a transaction.
- **Multi-chain support** — works on Ethereum, Arbitrum, Berachain, Katana, Corn, Morph.

| **User Action** | **SDK Method** | **Result** |
| --- | --- | --- |
| Get vault details | `vault.getVaultDetails()` | Metadata: symbols, decimals, ERC20 instances |
| Check underlying balance | `details.underlying.erc20.balanceOf(address)` | User’s token balance |
| Approve deposit | `details.underlying.erc20.approve(vaultAddr, amount)` | Allow vault to spend |
| Preview conversion | `vault.previewConversion(amount)` | Estimate shares minted / tokens redeemed |
| Deposit | `vault.deposit(amount)` | underlying consumed, shares minted |
| Check share balance | `vault.balanceOf(address)` | User’s ctAsset balance |
| Redeem shares | `vault.redeem(amount)` | Shares burned, underlying returned |

## Vault = ERC20 + underlying ERC20

Every vault exposes two ERC20 layers (while still being ERC-4626 compliant):

1. **Vault Shares (ctAssets)**
    - The vault itself extends ERC20.
    - You can call `balanceOf`, `approve`, `transfer`, etc. on the shares.
2. **underlying ERC20**
    - Exposed via `vault.getUnderlyingErc20()`.
    - Full ERC20 instance: `approve`, `balanceOf`, `transfer`, etc.

## Example Flow:

User → approves underlying ERC20 → vault consumes underlying → mints ctAssets (shares) → user can redeem later.

Before writing code, it often helps to build a mental model of the flow by trying it out directly in the Concrete app:

- [Earn page](https://app.concrete.xyz/earn) — deposit into a live vault, see shares minted.
- [Earn docs](https://docs.concrete.xyz/Earn/deposit-into-vaults) — walkthrough of how vault deposits work at the user level.

Then, when you come back to the SDK, you’ll see the exact same steps expressed in code.

1. **Check underlying balance**

```tsx
const details = await vault.getVaultDetails();
const balance = await details.underlying.erc20.balanceOf(user);
console.log("USDC balance:", balance.toString());

```

1. **Approve vault to spend underlying**

```tsx
await details.underlying.erc20.approve(vault.getAddress(), amount);
```

1. **Optionally preview deposit**

```tsx
const decimals = await vault.getUnderlyingDecimals();
const preview = await vault.previewConversion(1n * 10n ** BigInt(decimals));
console.log("Vault tokens (preview):", preview.vaultTokensReciving.toString());
```

1. **Deposit into vault**

```tsx
const tx = await vault.deposit(amount);
await tx.wait();
```

1. **Receive ctAssets (vault shares)**

```tsx
const shareBal = await vault.balanceOf(user);
console.log("Vault shares:", shareBal.toString());
```

1. **Redeem back into underlying**

```tsx
const redeemTx = await vault.redeem(shareBal);
await redeemTx.wait();
```
