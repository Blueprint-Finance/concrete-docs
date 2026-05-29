---
title: "Overview"
description: "Concrete Earn V2 SDK documentation for concrete Earn V2 SDK Overview, with implementation guidance for production-grade integrations."
sidebar_label: "Overview"
---

Concrete Vaults are [ERC-4626](https://eips.ethereum.org/EIPS/eip-4626)-compliant smart contracts that wrap underlying [ERC20](/glossary/#erc-20) assets (for example [WBTC](/glossary/#wbtc), [USDC](/glossary/#usdc)) into vault shares ([ctAssets](/glossary/#ct-asset)).

Each vault behaves as a yield wrapper: deposits are deployed into yield strategies such as money markets, liquidity provision, or restaking.

From an integration perspective, a user's deposit always results in ERC20 shares (ctAssets) that represent their claim on the vault's underlying and accrued yield.

## Usage

Whether you are using vanilla [JS](/glossary/#js)/[TS](/glossary/#ts), React hooks, or Wagmi integration, you interact with the same underlying vault abstraction.

The Concrete [SDK](/glossary/#sdk) provides:

- **Query vault details**: decimals, symbols, total assets, balances.
- **Approvals**: approve the vault to spend the underlying [ERC20](/glossary/#erc-20).
- **Deposits and redemptions**: mint and redeem shares.
- **Preview conversions**: estimate output before sending a transaction.
- **Multi-chain support**: Ethereum, Arbitrum, Berachain, Katana, Corn, Morph.

| **User action** | **SDK method** | **Result** |
| --- | --- | --- |
| Get vault details | `vault.getVaultDetails()` | Metadata: symbols, decimals, underlying address |
| Check underlying balance | `(await vault.getUnderlyingErc20()).balanceOf(address)` | User's underlying token balance |
| Approve deposit | `(await vault.getUnderlyingErc20()).approve(vaultAddr, amount)` | Allow vault to spend the underlying |
| Preview conversion | `vault.previewConversion(amount)` | Estimate shares minted or tokens redeemed |
| Deposit | `vault.deposit(amount)` | Underlying consumed, shares minted |
| Check share balance | `vault.balanceOf(address)` | User's [ctAsset](/glossary/#ct-asset) balance |
| Redeem shares | `vault.redeem(amount)` | Shares burned, underlying returned |

## Vault = [ERC20](/glossary/#erc-20) + underlying ERC20

Every vault exposes two ERC20 layers while staying [ERC-4626](/glossary/#erc-4626) compliant:

1. **Vault shares ([ctAssets](/glossary/#ct-asset))**
    - The vault itself extends ERC20.
    - You can call `balanceOf`, `approve`, `transfer`, and other ERC20 methods on the shares.
2. **Underlying ERC20**
    - Exposed via `vault.getUnderlyingErc20()`.
    - Full ERC20 instance: `approve`, `balanceOf`, `transfer`.

## Example flow

A user approves the underlying [ERC20](/glossary/#erc-20), the vault consumes the underlying and mints [ctAssets](/glossary/#ct-asset) (shares), and the user can redeem the shares later.

Before writing code, you can build a mental model of the flow by trying it directly in the Concrete app:

- [Earn page](https://app.concrete.xyz/earn): deposit into a live vault and see shares minted.
- [Earn docs](https://docs.concrete.xyz/Using-Concrete-Vaults/deposit/): walkthrough of how vault deposits work at the user level.

The [SDK](/glossary/#sdk) expresses the same steps in code:

1. **Check underlying balance**

```tsx
const erc20 = await vault.getUnderlyingErc20();
const balance = await erc20.balanceOf(user);
console.log("Underlying balance:", balance.toString());
```

2. **Approve vault to spend underlying**

```tsx
const erc20 = await vault.getUnderlyingErc20();
await (await erc20.approve(vault.getAddress(), amount)).wait();
```

3. **Optionally preview deposit**

```tsx
const decimals = await vault.getUnderlyingDecimals();
const preview = await vault.previewConversion(1n * 10n ** BigInt(decimals));
console.log("Vault tokens (preview):", preview.vaultTokensReceiving);
```

4. **Deposit into vault**

```tsx
const tx = await vault.deposit(amount);
await tx.wait();
```

5. **Receive ctAssets (vault shares)**

```tsx
const shareBal = await vault.balanceOf(user);
console.log("Vault shares:", shareBal.toString());
```

6. **Redeem back into underlying**

```tsx
const redeemTx = await vault.redeem(shareBal);
await redeemTx.wait();
```
