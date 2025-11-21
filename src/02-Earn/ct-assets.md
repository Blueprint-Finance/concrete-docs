---
title: "Concrete Assets"
description: "ct[assets] and Yield-Bearing Tokens"
sidebar_label: "Concrete Assets"
sidebar_position: 1
---

**CT[assets]** are custody-backed, yield-enabled ERC-20 tokens that represent assets held inside a Qualified Custodian (QC) and allow those assets to participate in Concrete’s controlled yield strategies without ever leaving the secure custodial environment.

This article describes high-level flows intended for partners; exact parameters may vary per custodian agreement.

## Why CT[assets] Exist

Qualified custodians secure billions of dollars, but offer limited yield options (staking, basic swaps). Assets inside QCs are typically not allowed to leave, meaning they cannot access DeFi strategies directly.

**CT[assets] solve this problem**:

They allow QC-held assets to participate in curated yield opportunities while remaining fully inside custody. No client funds ever leave the QC. No client needs to interact with DeFi. This unlocks an entirely new category of institutional-grade, custody-native yield.

CT[assets] are not transferable via open markets by design, preserving strict 1:1 reconciliation with the QC environment and preventing any mint/burn discrepancies.

| Aspect | CT-assets | Stablecoins |
| --- | --- | --- |
| Transferability | Restricted (permissioned) | Freely transferable |
| Use case | Custody → Yield → Vault accounting | Payments, trading, liquidity |
| Market price | None | Market-driven |
| Peg stability | Guaranteed by redemption logic | Market-dependent |
| Backing | Verified QC balances | Fiat/cash/treasury reserves |
| Intended users | Institutional depositors | Everyone |

## CT[assets] Today

- CT[assets] are minted 1:1 against real assets held in QC and deposited into a dedicated Concrete vault. The client receives a **vault share token**, which serves as their receipt for both the deposit and all yield earned.
- A CT[asset] cannot be bought or transferred from open markets; it is issued only in response to QC-backed deposits or yield events.CT[assets] flows are intentionally simple and manually supervised.
- The system is designed to evolve toward full automation as we gather operational data from partners.
- Standard DeFi lending apps cannot integrate CT[assets] because liquidation requires a multi-step, multi-day unwind from the QC environment. Since no atomic liquidation is possible, Earn V2 uses bespoke agreements with lenders who explicitly support non-liquidatable collateral.
- The current version mirrors Earn V1 (bespoke, curated), while future versions will incorporate automated accounting + automated rebalancing.

## Why CT[assets] Are Not a Stablecoin

CT-assets (such as USD1.ct, BTC.ct, etc.) may look like on-chain representations of real assets — but they are not stablecoins, and they are not intended to function like one.

They serve a very different purpose.

### Not freely transferable

Unlike stablecoins such as USDC or USDT, CT-assets cannot circulate freely between users.

Transfers are strictly permissioned:

- They can only move between **Concrete-controlled contracts** (Merchant, Vault, Multisig).
- They **cannot** be transferred peer-to-peer.
- They **cannot** be used on DEXes or in general DeFi.

They are a *custody accounting asset*, not a currency.

### They represent custody balances — not open-market liquidity

Stablecoins derive their value from market liquidity and redemption guarantees.

CT[assets] derive their value from:

- The exact asset amount held inside the Qualified Custodian (QC) account
- The strict 1:1 mint/burn rules enforced by the Concrete Merchant
- Operator reconciliation between on-chain and QC balances

They serve as an **on-chain mirror** of what is held in custody — nothing more.

There is no orderbook, no pool, no AMM, no arbitrage activity.

### They cannot “de-peg”

Stablecoins can de-peg because their price floats based on market demand.

CT[assets] do not have a market price at all:

- They cannot be bought or sold.
- They cannot be traded or swapped.
- The *only* way to redeem CT-assets is via the **burn → QC withdrawal** process.

Since redemption always resolves to the underlying balance in custody, the “value” cannot drift.

There is no peg to break.

### Not designed for payments or general use

Stablecoins are meant for:

- trading
- payments
- general liquidity
- cross-platform movement

CT[assets] are meant for:

- routing custody-restricted assets into Concrete’s yield engine
- enabling bespoke, safe borrowing arrangements
- maintaining custody segregation while participating in DeFi
- reflecting assets for institutional reporting

They are an internal component of a custody-backed yield system, not a user-facing asset.

## How CT[assets] Differ from Earn V2 Share Tokens

CT[assets] and Earn V2 vault shares work together but represent different layers:

| Layer | Token | Backed By | Purpose |
| --- | --- | --- | --- |
| **Custody Layer** | **CT[assets]** | Real assets in QC | Collateral used inside Concrete’s structured yield system |
| **Vault Layer** | **ctVaultShares** | CT[assets] inside the Earn V2 vault | Client’s receipt token reflecting deposit + yield |

Clients only hold the **vault share token**. CT[assets] stay behind the scenes.

## How CT[assets] Work

From the client’s perspective, the experience is simple:

1. Deposit assets into a QC account
2. Receive a Concrete vault token to their EVM address
3. Watch the value grow as the vault generates yield

Concrete handles everything else — custody coordination, minting, yield operations, accounting, and on-chain transparency.

### 1. Deposit into Qualified Custody

The client transfers assets (e.g., USD1, BTC, XRP) into a designated QC account.

- Standard flow: funds are co-mingled inside a Concrete-managed QC account.
- Large clients may request a dedicated QC account and receive a uniquely named vault token.

### 2. Minting CT[assets]

Concrete detects new assets inside QC and instructs its on-chain **Merchant** contract to mint CT[assets] **1:1** with the deposited backing asset.

These CT[assets] are custody-backed representations of real assets — similar to WBTC, except minted only by Concrete’s Merchant contract based on verified QC balances.

After minting new CT[assets] for yield, the strategy updates the vault’s accounting.

## 3. Depositing CT[assets] into a Dedicated Vault

Each backing asset (e.g., USD1, BTC, XRP, SUI) receives its own dedicated Earn V2 vault.

- CT[assets] are deposited into this vault
- The vault runs on Earn V2 infrastructure: ERC-4626, UUPS upgrades, EIP-7201 storage, async-enabled

Access is restricted through a whitelist hook, ensuring only approved QC-routed deposits can interact with the vault.

### 4. Client Receives a Vault Token

The vault issues ERC-20 **vault shares** (ct[asset]VaultToken) to the client’s EVM address.

This token represents:

- Their proportional ownership of the vault
- Their deposit
- All future yield

This vault token is what clients see and track — clean, simple, intuitive.

Dedicated QC accounts receive a unique vault share token (e.g., ctUSD1-InstitutionName) while using the same CT[asset] contract underneath.

## How Yield Accrues

Yield is *not* generated through Aave, Compound, or public DeFi markets.

Instead, Concrete works with hand-picked institutional lenders (e.g., Doomite) under custom, non-liquidatable agreements designed specifically for CT[assets].

### Yield generation flow:

1. Vault lends **CT[assets]** to a vetted lender
2. Lender provides **USDC** (or similar stablecoin) to the vault
3. USDC is sent to a yield strategy (e.g., curated external vault)
4. Strategy earns yield
5. Yield USDC returns to QC
6. QC swaps USDC → underlying asset
7. QC balance increases
8. Operator multisig verifies increase
9. Merchant mints new CT[assets] **only representing yield**
10. New CT[assets] are donated to the vault
11. Vault share price increases → client’s receipt token becomes more valuable

Each yield event uses a nonce to ensure accruals cannot be duplicated. Yield is captured **without open-market purchase** of CT[assets].

Yield accrues through an **increasing share price**, just like Earn V2 vaults.

## Loss Handling

If a strategy takes a loss:

- The vault’s share price decreases
- Client vault tokens reflect the lower NAV
- CT[assets] remain 1:1 backed by the QC balance

    (loss is not absorbed by misaligning the backing)


This is identical to normal ERC-4626 vault mechanics with clear, predictable economics.

## Withdrawals

Withdrawals follow the Earn V2 async epoch model to ensure safe unwind of off-chain positions.

### Withdrawal flow:

1. Client calls `redeem()` on their vault shares
2. Withdrawal enters an **epoch queue**
3. Strategy unwinds and repays the lender in USDC
4. Lender returns CT[assets] to the vault
5. Vault returns CT[assets] to Merchant
6. Merchant **burns CT[assets]**
7. Operator multisig releases backed assets from QC
8. Client receives underlying asset from QC
9. Entire cycle takes ≈ **7 days**

Concrete assists clients whose QC setup prohibits direct DeFi interactions.

## Direct Redemption (Non-Vault Holders)

If a partner or strategy holds CT[assets] directly (not via vault shares), they can:

- Send CT[assets] to the Merchant
- Merchant burns them
- QC returns the matched underlying asset

Yield realization is executed at least before every deposit and every withdrawal, ensuring the vault’s share price always reflects the most up-to-date backing.

## Safety, Controls, and Reconciliation

### 1. Roles & Permissions

All critical actions are gated behind a **Concrete operator multisig**, including:

- Minting and burning CT[assets]
- Yield donations
- Vault asset adjustments

Strategies **cannot** mint CT[assets].

### 2. Whitelisted Vault Access

Only approved addresses or QC-initiated flows may:

- Deposit CT[assets]
- Redeem
- Trigger vault updates

### 3. Continuous Reconciliation

QC balances, on-chain CT[assets], and vault totalAssets() are continuously aligned.

High-level invariants:

- **Every CT[asset] is backed 1:1** by QC
- Vault totalAssets == Merchant backing
- QC balance = Merchant total backing – strategy debt ± pending yield

This ensures verifiable, predictable accounting for institutional oversight.

### 4. Trust Model

- CT[assets] are never created unless QC verified
- All actions require op-multisig
- No user funds touch smart contracts unless mirrored 1:1
- No rehypothecation
- No external mint authority
- QC APIs + on-chain state are continuously reconciled
