---
title: "Important Disclosures"
description: "Concrete RWA USD1 vault documentation for important disclosures, including real-world asset risks, valuation and liquidity considerations, and user safeguards."
sidebar_label: "Important Disclosures"
---

Please read these important disclosures carefully before participating in the Concrete RWA USD1 vault.

## Lack of Regulatory Protections

THE PROVISIONS OF THE SECURITIES INVESTOR PROTECTION ACT OF 1970 ("SIPA"), THE FEDERAL DEPOSIT INSURANCE CORPORATION ("FDIC"), OR SIMILAR REGULATORY PROTECTIONS MAY NOT PROTECT YOUR FUNDS WHILE DELEGATED TO CONCRETE. In the event of Concrete's insolvency or default, the assets held in the vault's strategies may constitute the primary or sole source of recovery for your funds.

## Restricted Access

The Concrete RWA USD1 vault is a permissioned vault. Deposits are restricted to approved addresses through an on-chain allowlist, and the vault is not open to the general public. If your address is not approved, deposit transactions revert.

## Loss of Control and Concrete's Profit Model

When you deposit USD1 into the vault, you transfer operational control over those assets to Concrete while retaining beneficial ownership through vault shares. Concrete has sole discretion to select real-world asset (RWA) opportunities, determine allocations, and manage all positions. Concrete charges a 20% performance fee on net positive yield. The vault charges no management fee.

## Yield Rates Not Guaranteed

Concrete cannot and does not guarantee that any target yield rates can be achieved or maintained. Returns depend on the performance of the underlying RWA opportunities, which are subject to market conditions, issuer performance, and redemption terms outside Concrete's control. Concrete reserves the right to adjust, refresh, or discontinue offered rates at any time based on changes in strategy performance, risk assessments, or market liquidity. You may withdraw your funds if dissatisfied with offered rates, subject to applicable procedures.

## Real-World Asset Risks

The vault deploys USD1 into yield opportunities backed by real-world assets. These assets exist off-chain and introduce risks that on-chain strategies do not: issuer or counterparty credit risk, custodian failure or delay, legal and enforceability risk across jurisdictions, and settlement processes that depend on traditional financial infrastructure. If an issuer, custodian, or other intermediary fails, becomes insolvent, or freezes assets, recovery of funds may be delayed, partial, or impossible.

## Valuation and [NAV](/glossary/#nav) Reporting

The vault's NAV (Net Asset Value) is updated through periodic accounting rather than continuous on-chain pricing. Reported share values may lag the actual value of the underlying positions, and valuations of off-chain assets depend on reporting from issuers and third parties. As a safeguard, the vault may automatically pause operations when a reported valuation change exceeds a configured threshold; during a pause, deposits and withdrawals are temporarily unavailable until the valuation is verified.

## Stablecoin Risk

The vault's base asset is USD1, a stablecoin. Stablecoins may deviate from their intended peg due to reserve shortfalls, issuer insolvency, redemption suspensions, regulatory action, or market stress. A sustained depeg of USD1 would reduce the value of vault deposits and could impair the vault's ability to enter or exit positions at expected prices. Concrete does not control the issuance, backing, or redemption of USD1.

## Smart Contract Risks

Smart contracts may contain vulnerabilities or exploits that could result in loss of funds. The vault relies on contract-level access controls, pause mechanisms, and periodic accounting to mitigate these risks but cannot eliminate them. Recovery of funds lost to a smart contract exploit may be delayed, partial, or impossible.

## Liquidity and Withdrawal Risks

Withdrawals are processed through the vault's Withdrawal Queue rather than settled instantly. Many RWA opportunities carry lock-up periods, notice requirements, or scheduled redemption windows, so unwinding positions to meet withdrawals takes time. If withdrawal requests exceed available liquidity, requests roll forward to subsequent Epochs and settlement may take materially longer than the estimated withdrawal time. Withdrawals may be further delayed in extreme circumstances including issuer or custodian failures, smart contract issues, or a pause of vault operations.

## Tax Implications

Yield earned on deposited funds may be characterized differently from other income types for tax purposes, potentially treated as ordinary income, interest income, or lending income depending on your jurisdiction. Concrete may be required to report your yield income to tax authorities. Withholding taxes may apply depending on your tax status and jurisdiction. Concrete is not required to compensate you for any adverse tax treatment. You should consult a qualified tax advisor before participating.

## Conflicts of Interest

Concrete's economic interest in maximizing performance fees may conflict with your interest in conservative position management. Concrete's selection of RWA opportunities may be influenced by relationships with issuers, partners, or strategic considerations rather than solely obtaining the best available terms for depositors. Concrete may transact with affiliates or related parties and may use operational proceeds for corporate purposes that may compete with depositor interests.

## Regulatory and Liability Limitations

The program is subject to limited regulatory oversight and evolving regulations that could require program termination, impose new restrictions, affect tax treatment, or impact enforceability of rights. No regulatory authority has reviewed or endorsed the program. To the maximum extent permitted by law, Concrete's liability is limited to the value of assets held in the vault's strategies, subject to priority claims in any insolvency. Concrete is not liable for issuer or custodian failures, stablecoin depegs, market fluctuations, inability to achieve target returns, third-party failures, regulatory changes, or force majeure events. Concrete's total liability to any depositor is capped at the deposit amount plus accrued yield, less applicable fees and losses.

## Acknowledgments and Governing Provisions

By depositing funds into the Concrete RWA USD1 vault, you acknowledge that you have read and understand these disclosures and the risks described herein, including lack of regulatory protections, real-world asset and stablecoin risks, valuation and liquidity considerations, no guaranteed yields, smart contract risks, tax implications, Concrete's profit model and conflicts of interest, and termination rights. Any disputes shall be resolved through binding arbitration per applicable agreements. In the event of any conflict between this disclosure and executed agreements, the executed agreements shall govern.

:::warning
THESE DISCLOSURES ARE PROVIDED FOR INFORMATIONAL PURPOSES ONLY AND DO NOT CONSTITUTE INVESTMENT, LEGAL, TAX, OR FINANCIAL ADVICE. CONSULT QUALIFIED ADVISORS BEFORE PARTICIPATING AND FOR ADVICE AS TO LEGAL, TAX AND ECONOMIC IMPLICATIONS. CONCRETE MAKES “FORWARD-LOOKING STATEMENTS,” WHICH DESCRIBE FUTURE EXPECTATIONS, PLANS, RESULTS OR STRATEGIES AND CAN OFTEN BE IDENTIFIED BY THE USE OF TERMINOLOGY SUCH AS “MAY,” “WILL,” “EXPECT,” “PLAN,” OR SIMILAR TERMINOLOGY. THESE STATEMENTS ARE BASED UPON CONCRETE’S CURRENT EXPECTATIONS, ASSUMPTIONS AND ESTIMATES, AND ARE NOT GUARANTEES. ACTUAL RESULTS MAY DIFFER MATERIALLY FROM THOSE CONTEMPLATED IN THESE STATEMENTS DUE TO A VARIETY OF RISKS AND UNCERTAINTIES. THIS DOCUMENT DOES NOT CONSTITUTE AN OFFER OR INVITATION OR SOLICITATION OF ANY OFFER TO SELL, PURCHASE, DELEGATE OR LOAN ANY SECURITIES AND IS NOT INTENDED, AND DOES NOT, CREATE A BINDING OR ENFORCEABLE AGREEMENT ON THE PART OF THE COMPANY
:::
