---
title: "Fees"
description: "Complete fee reference for Concrete products, including how fees are calculated, applied, and communicated across workflows."
sidebar_label: "Fees"
sidebar_position: 4
---


Concrete Earn applies no deposit, withdrawal, or maintenance fees. Vaults charge a management fee on assets under management and may charge a performance fee on net positive yield. Both are paid through share minting rather than asset transfers — preserving the underlying balance and surfacing the cost transparently in the share price.

## Maximize Returns with a Transparent Fee Structure

Concrete Earn vaults support two configurable fee types, each capped at the protocol level:

- **Management fee**: an annualized charge on vault AUM, accrued continuously and paid by minting shares to the fee recipient. Capped at 10%; current standard configuration is 1.5% for most vaults.
- **Performance fee**: a charge on net positive yield at the time of yield accrual, paid by minting shares to the fee recipient. Capped at 30%. Configured per vault — see individual vault pages for current rates.

Both fees are paid in shares, not in the underlying asset. Existing shareholders are diluted proportionally rather than charged separately, and the cost of fees is reflected directly in the share-to-asset exchange rate.

Fees paid in shares align incentives for both the curator and the shareholders.

**Why Concrete Earn?**

- **Transparent on-chain accounting**: Every fee accrual emits a structured event indexed by Concrete's subgraph. Share-price impact is observable in real time — there are no hidden charges on deposits, withdrawals, or maintenance.
- **Optimized Returns**: Concrete Earn helps you maximize yield through advanced strategies.
- **Full Control and Transparency**: Funds remain accessible without penalty, offering flexibility for liquidity management.

| **Fee Type**        | **Amount** | **Denomination** | **Description**                                                                                               |
|---------------------|------------|------------------|--------------------------------------------------------------------------------------------------------------|
| Deposit Fee         | None       | N/A              | No fees on deposits, enabling liquidity providers to allocate funds without initial cost barriers.            |
| Maintenance Fee     | None       | N/A              | The protocol covers operational expenses, meaning no ongoing charges for liquidity providers.                 |
| Management Fee      | ~ 1.5% (Max possible management fee is 10%) | % of AUM | Time-based, accrued continuously, paid via share minting. |
| Performance Fee     | ~30% (Max possible performance fee is 100%) of net positive yield | % of yield | Charged only when strategies generate net gains; paid via share minting. |
| Withdrawal Fee      | None       | N/A              | Funds can be withdrawn without penalty, providing flexibility and control over invested capital.              |
