---
title: "Yield Vaults and ERC-4626 Standard"
description: "Concrete vault documentation for yield Vaults, including strategy behavior, withdrawals, migrations, and operational guidance."
sidebar_label: "Yield Vaults"
sidebar_position: 1
---

A Concrete vault is a smart contract that accepts your deposits and issues you shares in return. Concrete vaults are built on the [ERC-4626 Tokenized Vault Standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-4626/). When you deposit, you receive vault shares (an ERC-20 token, e.g. ctDefiUSDT) that represent your portion of the vault.

## How You Earn Yield

Your share balance does not change over time. Instead, each share becomes worth more (or less) of the underlying asset as the vault's value changes.

In practice:
- You deposit 1,000 USDT → you receive a fixed number of vault shares.
- Over time, the vault's strategy generates yield.
- The exchange rate between your shares and USDT increases.
- When you withdraw, you redeem your shares for more USDT than you put in.

Where the yield comes from depends on the specific vault's strategy, which is managed by the partner operating the vault. The protocol itself does not prescribe a yield source.

### Vault Implementations

Concrete offers three ERC-4626 vault implementations, each suited to a different operational pattern. All three share a common base: full ERC-4626 compliance, multi-strategy support, fee management, hooks, and role-based access control. 

- **Standard (Atomic) Vault** The base implementation. Deposits and withdrawals execute in a single transaction. Suitable for vaults where strategy liquidity is always available on-chain and can be unwound atomically. 
- **Queued Withdrawal Vault** Extends the Standard vault by adding an epoch-based withdrawal queue. Withdrawal requests are collected during an epoch, processed at a scheduled point (which locks a share price and reserves assets), and then claimed by users. The queue can be toggled on or off by a VAULT_MANAGER. This is the most common production configuration, used when the strategy involves off-chain custody (e.g. a MultisigStrategy pointing to a Safe or Fordefi wallet).
- **Pre-deposit (Cross Chain) Vault** Extends the Standard vault for cross-chain launch flows. Users deposit on a source chain, the vault is locked, assets are bridged to a target chain, and users claim shares on the target chain via LayerZero messaging. This is a phase-specific vault type, typically succeeded by an Async vault on the target chain after launch.

All three implementations inherit from a common base, so Async and Predeposit vaults retain all capabilities of the Standard vault.

### Limits to Be Aware Of

Each vault can enforce:
- A maximum total deposit cap for the vault.
- Minimum and maximum amounts per deposit and per withdrawal.
- Optional per-user deposit caps.
If the vault is full or your amount is outside the configured range, the transaction will not go through.
