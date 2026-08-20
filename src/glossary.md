---
title: "Glossary"
description: "Definitions for the acronyms, token tickers, and technical terms used across the Concrete documentation."
sidebar_label: "Glossary"
---

# Glossary

This page indexes the acronyms, token tickers, and technical short-forms that show up across the Concrete documentation, for readers (depositors, integrators, and operators) navigating between articles. Each entry has a stable anchor (for example, `#abi`, `#erc-4626`, `#ct-defiusdt`) so other pages can deep-link to a specific term.

## A

<a id="abi"></a>**ABI** – Application Binary Interface. The structured format that defines how clients encode calls to a smart contract and decode its return values.

<a id="amm"></a>**AMM** – Automated Market Maker. A smart contract that prices and settles swaps from on-chain liquidity pools rather than from an order book.

<a id="api"></a>**API** – Application Programming Interface. A defined set of endpoints or functions one program exposes for another to call.

<a id="apr"></a>**APR** – Annual Percentage Rate. An annualized return calculated on a simple (non-compounding) basis.

<a id="apy"></a>**APY** – Annual Percentage Yield. An annualized return that assumes compounding.

<a id="aum"></a>**AUM** – Assets Under Management. The total value of assets a vault or strategy holds and deploys.

## B

<a id="bera"></a>**BERA** – The native token of the Berachain network.

<a id="bgt"></a>**BGT** – Berachain Governance Token. The governance token issued by Berachain.

<a id="btc"></a>**BTC** – Bitcoin. The native asset of the Bitcoin network.

## C

<a id="ct-asset"></a>**ctAsset / ctAssets** – Concrete vault share tokens. ERC-20 tokens minted to depositors that represent their portion of a vault's underlying assets and accrued yield. The full term for any vault share issued by Concrete; per-vault tickers follow the pattern `ct<Underlying>`. See [Concrete Vault Shares](/Using-Concrete-Vaults/concrete-vault-shares/).

<a id="ct-beralbtc"></a>**ctBeraLBTC** – Vault share for the Berachain LBTC vault.

<a id="ct-defiusdt"></a>**ctDefiUSDT** – Vault share for the Concrete DeFi USDT vault.

<a id="ct-eth"></a>**ctETH** – Vault share for an ETH-denominated vault.

<a id="ct-lbtc"></a>**ctLBTC** – Vault share for an LBTC-denominated vault.

<a id="ct-stablefrxusd"></a>**ctStablefrxUSD** – Vault share for the Stable Network frxUSD pre-deposit vault.

<a id="ct-stableusdt"></a>**ctStableUSDT** – Vault share for the Stable Network USDT pre-deposit vault.

<a id="ct-wbtc"></a>**ctWBTC** – Vault share for a WBTC-denominated vault.

## D

<a id="defi"></a>**DeFi** – Decentralized Finance. The class of financial services delivered by smart contracts on public blockchains rather than by intermediated institutions.

## E

<a id="eip"></a>**EIP** – Ethereum Improvement Proposal. A design document proposing a change or addition to the Ethereum protocol or its standards.

<a id="ena"></a>**ENA** – The governance token of the Ethena protocol.

<a id="eoa"></a>**EOA** – Externally Owned Account. A wallet controlled by a private key, in contrast with a smart-contract wallet.

<a id="erc-20"></a>**ERC-20** – The Ethereum standard for fungible tokens, defined in [EIP-20](https://eips.ethereum.org/EIPS/eip-20).

<a id="erc-4626"></a>**ERC-4626** – The Ethereum standard for tokenized yield-bearing vaults, defined in [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626). The base standard Concrete vaults implement. See [Yield Vaults and ERC-4626 Standard](/Overview/yield-vaults-and-erc-4626-standard/).

<a id="eth"></a>**ETH** – Ether. The native asset of the Ethereum network.

## F

<a id="fifo"></a>**FIFO** – First In, First Out. The order in which queued withdrawal requests are processed: the earliest submitted request settles first.

<a id="frxusd"></a>**frxUSD** – A USD-pegged stablecoin issued by Frax Finance.

## I

<a id="il"></a>**IL** – Impermanent Loss. The unrealized loss an LP can experience when the prices of tokens in a liquidity pool diverge.

## J

<a id="js"></a>**JS** – JavaScript.

## L

<a id="lbtc"></a>**LBTC** – Lombard BTC. A liquid Bitcoin-backed token issued by Lombard.

<a id="lp"></a>**LP** – Liquidity Provider, or by extension a liquidity-provider position in an AMM pool.

<a id="ltv"></a>**LTV** – Loan-to-Value. The ratio of a loan's outstanding amount to the market value of the collateral backing it.

## M

<a id="mpc"></a>**MPC** – Multi-Party Computation. A cryptographic technique that lets multiple parties jointly authorize signatures without any one party holding the full private key.

## N

<a id="nav"></a>**NAV** – Net Asset Value. The value of a vault's holdings net of liabilities, used to derive share price.

## O

<a id="ofac"></a>**OFAC** – Office of Foreign Assets Control. The U.S. Treasury agency that administers economic sanctions and maintains restricted-jurisdiction lists.

## R

<a id="rpc"></a>**RPC** – Remote Procedure Call. The request/response interface a client uses to read from or send transactions to a blockchain node.

<a id="rwa"></a>**RWA** – Real-World Asset. A tokenized on-chain representation of an off-chain asset, such as a treasury bill or another traditional financial instrument.

## S

<a id="sdk"></a>**SDK** – Software Development Kit. The Concrete SDK exposes typed methods for reading vault state and submitting deposits, withdrawals, and approvals. See [SDK](/Developers/SDK/overview/).

## T

<a id="tac"></a>**TAC** – TAC Network. The blockchain that hosted the TAC Stone, TAC LevelUSD, and TAC Renzo pre-deposit vaults. See [Completed Campaigns](/completed-campaigns/).

<a id="ts"></a>**TS** – TypeScript.

<a id="tvl"></a>**TVL** – Total Value Locked. The total value of assets a protocol, vault, or strategy holds.

## U

<a id="ui"></a>**UI** – User Interface.

<a id="url"></a>**URL** – Uniform Resource Locator. A web address.

<a id="usd"></a>**USD** – U.S. Dollar.

<a id="usd1"></a>**USD1** – A U.S. dollar-pegged stablecoin issued by World Liberty Financial.

<a id="usdc"></a>**USDC** – USD Coin. A U.S. dollar-pegged stablecoin issued by Circle.

<a id="usdt"></a>**USDT** – Tether. A U.S. dollar-pegged stablecoin issued by Tether Operations.

<a id="utc"></a>**UTC** – Coordinated Universal Time. The reference time zone used for Epoch schedules and other on-chain timing.

<a id="uups"></a>**UUPS** – Universal Upgradeable Proxy Standard. The upgradeable proxy pattern Concrete vaults use, defined in [EIP-1822](https://eips.ethereum.org/EIPS/eip-1822).

## W

<a id="wbtc"></a>**WBTC** – Wrapped Bitcoin. An ERC-20 token backed 1:1 by BTC custodied off-chain. See [Live Vaults](/Live-Vaults/).

<a id="weth"></a>**WETH** – Wrapped Ether. An ERC-20 representation of ETH used in protocols that expect ERC-20 tokens.
