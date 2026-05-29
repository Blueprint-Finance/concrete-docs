---
title: "Glossary"
description: "Definitions for the acronyms, token tickers, and technical terms used across the Concrete documentation."
sidebar_label: "Glossary"
---

# Glossary

This page indexes the acronyms, token tickers, and technical short-forms that show up across the Concrete documentation, for readers (depositors, integrators, and operators) navigating between articles. Each entry has a stable anchor (for example, `#abi`, `#erc-4626`, `#ct-defiusdt`) so other pages can deep-link to a specific term.

## A

### ABI {#abi}

Application Binary Interface. The structured format that defines how clients encode calls to a smart contract and decode its return values.

### AMM {#amm}

Automated Market Maker. A smart contract that prices and settles swaps from on-chain liquidity pools rather than from an order book.

### API {#api}

Application Programming Interface. A defined set of endpoints or functions one program exposes for another to call.

### APR {#apr}

Annual Percentage Rate. An annualized return calculated on a simple (non-compounding) basis.

### APY {#apy}

Annual Percentage Yield. An annualized return that assumes compounding.

### AUM {#aum}

Assets Under Management. The total value of assets a vault or strategy holds and deploys.

## B

### BERA {#bera}

The native token of the Berachain network.

### BGT {#bgt}

Berachain Governance Token. The governance token issued by Berachain.

### BTC {#btc}

Bitcoin. The native asset of the Bitcoin network.

## C

### ctAsset / ctAssets {#ct-asset}

Concrete vault share tokens. ERC-20 tokens minted to depositors that represent their portion of a vault's underlying assets and accrued yield. The full term for any vault share issued by Concrete; per-vault tickers follow the pattern `ct<Underlying>`. See [Concrete Vault Shares](/Using-Concrete-Vaults/concrete-vault-shares/).

### ctBeraLBTC {#ct-beralbtc}

Vault share for the Berachain LBTC vault.

### ctDefiUSDT {#ct-defiusdt}

Vault share for the Concrete DeFi USDT vault.

### ctETH {#ct-eth}

Vault share for an ETH-denominated vault.

### ctLBTC {#ct-lbtc}

Vault share for an LBTC-denominated vault.

### ctStablefrxUSD {#ct-stablefrxusd}

Vault share for the Stable Network frxUSD pre-deposit vault.

### ctStableUSDT {#ct-stableusdt}

Vault share for the Stable Network USDT pre-deposit vault.

### ctWBTC {#ct-wbtc}

Vault share for a WBTC-denominated vault.

## D

### DeFi {#defi}

Decentralized Finance. The class of financial services delivered by smart contracts on public blockchains rather than by intermediated institutions.

## E

### EIP {#eip}

Ethereum Improvement Proposal. A design document proposing a change or addition to the Ethereum protocol or its standards.

### ENA {#ena}

The governance token of the Ethena protocol.

### EOA {#eoa}

Externally Owned Account. A wallet controlled by a private key, in contrast with a smart-contract wallet.

### ERC-20 {#erc-20}

The Ethereum standard for fungible tokens, defined in [EIP-20](https://eips.ethereum.org/EIPS/eip-20).

### ERC-4626 {#erc-4626}

The Ethereum standard for tokenized yield-bearing vaults, defined in [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626). The base standard Concrete vaults implement. See [Yield Vaults and ERC-4626 Standard](/Overview/yield-vaults-and-erc-4626-standard/).

### ETH {#eth}

Ether. The native asset of the Ethereum network.

## F

### FIFO {#fifo}

First In, First Out. The order in which queued withdrawal requests are processed: the earliest submitted request settles first.

### frxUSD {#frxusd}

A USD-pegged stablecoin issued by Frax Finance.

## I

### IL {#il}

Impermanent Loss. The unrealized loss an LP can experience when the prices of tokens in a liquidity pool diverge.

## J

### JS {#js}

JavaScript.

## L

### LBTC {#lbtc}

Lombard BTC. A liquid Bitcoin-backed token issued by Lombard.

### LP {#lp}

Liquidity Provider, or by extension a liquidity-provider position in an AMM pool.

### LTV {#ltv}

Loan-to-Value. The ratio of a loan's outstanding amount to the market value of the collateral backing it.

## M

### MPC {#mpc}

Multi-Party Computation. A cryptographic technique that lets multiple parties jointly authorize signatures without any one party holding the full private key.

## N

### NAV {#nav}

Net Asset Value. The value of a vault's holdings net of liabilities, used to derive share price.

## O

### OFAC {#ofac}

Office of Foreign Assets Control. The U.S. Treasury agency that administers economic sanctions and maintains restricted-jurisdiction lists.

## R

### RPC {#rpc}

Remote Procedure Call. The request/response interface a client uses to read from or send transactions to a blockchain node.

## S

### SDK {#sdk}

Software Development Kit. The Concrete SDK exposes typed methods for reading vault state and submitting deposits, withdrawals, and approvals. See [SDK](/Developers/SDK/overview/).

## T

### TAC {#tac}

TAC Network. The blockchain that hosted the TAC Stone, TAC LevelUSD, and TAC Renzo pre-deposit vaults. See [TAC](/Completed-Campaigns/tac/).

### TS {#ts}

TypeScript.

### TVL {#tvl}

Total Value Locked. The total value of assets a protocol, vault, or strategy holds.

## U

### UI {#ui}

User Interface.

### URL {#url}

Uniform Resource Locator. A web address.

### USD {#usd}

U.S. Dollar.

### USDC {#usdc}

USD Coin. A U.S. dollar-pegged stablecoin issued by Circle.

### USDT {#usdt}

Tether. A U.S. dollar-pegged stablecoin issued by Tether Operations.

### UTC {#utc}

Coordinated Universal Time. The reference time zone used for Epoch schedules and other on-chain timing.

### UUPS {#uups}

Universal Upgradeable Proxy Standard. The upgradeable proxy pattern Concrete vaults use, defined in [EIP-1822](https://eips.ethereum.org/EIPS/eip-1822).

## W

### WBTC {#wbtc}

Wrapped Bitcoin. An ERC-20 token backed 1:1 by BTC custodied off-chain. See [WBTC Vault](/Live-Vaults/wbtc-vault/).

### WETH {#weth}

Wrapped Ether. An ERC-20 representation of ETH used in protocols that expect ERC-20 tokens.
