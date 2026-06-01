---
title: "Yield Vaults and ERC-4626 Standard"
description: "Concrete vault documentation for yield vaults, covering ERC-4626 shares, how yield accrues, the three vault implementations, and deposit limits."
sidebar_label: "Yield Vaults and ERC-4626 Standard"
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

Where the yield comes from depends on the specific vault's strategy, which is managed by the curator operating the vault. The protocol itself does not prescribe a yield source.

### Vault Implementations

Concrete offers three ERC-4626 vault implementations, each suited to a different operational pattern. All three share a common base: full ERC-4626 compliance, multi-strategy support, fee management, hooks, and role-based access control.

- **Atomic Vault** – The base implementation; deposits and withdrawals execute in a single transaction. It suits vaults where strategy liquidity is always available on-chain and can be unwound atomically.
- **Queued Withdrawal Vault** – Adds an epoch-based withdrawal queue to the Atomic vault, where requests are collected during an epoch, processed at a scheduled point that locks a share price and reserves assets, then claimed by users. Toggled on or off by the Vault Manager, it is the most common production configuration and suits strategies with off-chain custody.
- **Pre-deposit (Cross Chain) Vault** – Extends the Atomic vault for cross-chain launches: users deposit on a source chain, the vault locks, assets bridge to a target chain, and users claim shares there via LayerZero messaging. This phase-specific type is typically succeeded by a Queued Withdrawal Vault on the target chain after launch.

Because they share this base, the Queued Withdrawal and Pre-deposit vaults retain every capability of the Atomic vault.

### Limits to Be Aware Of

Each vault can enforce:
- A maximum total deposit cap for the vault.
- Minimum and maximum amounts per deposit and per withdrawal.
- Optional per-user deposit caps.

If the vault is full or your amount is outside the configured range, the transaction will not go through.
