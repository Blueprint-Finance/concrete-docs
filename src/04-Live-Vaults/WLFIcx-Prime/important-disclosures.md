---
title: "Important Disclosures"
description: "Concrete WLFIcx Prime vault documentation for important disclosures, including custodial asset risks, collateral and liquidation considerations, and user safeguards."
sidebar_label: "Important Disclosures"
---

Please read these important disclosures carefully before participating in the Concrete WLFIcx Prime vault.

## Lack of Regulatory Protections

THE PROVISIONS OF THE SECURITIES INVESTOR PROTECTION ACT OF 1970 ("SIPA"), THE FEDERAL DEPOSIT INSURANCE CORPORATION ("FDIC"), OR SIMILAR REGULATORY PROTECTIONS MAY NOT PROTECT YOUR FUNDS WHILE DELEGATED TO CONCRETE. In the event of Concrete's insolvency or default, the assets held in the vault's strategies may constitute the primary or sole source of recovery for your funds.

## Restricted Access

The Concrete WLFIcx Prime vault is a permissioned vault. Deposits are restricted to approved addresses through an on-chain allowlist, and the vault is not open to the general public. If your address is not approved, deposit transactions revert.

## Loss of Control

When you deposit WLFIcx into the vault, you transfer operational control over those assets to Concrete while retaining beneficial ownership through vault shares. Concrete has sole discretion to select strategies, determine allocations, and manage all positions. The vault charges no management fee and no performance fee.

## Custodial Asset Risk

The vault's base asset is WLFIcx (World Liberty Financial Custodial Asset), a token that represents WLFI held in third-party custody. The value and redeemability of WLFIcx depend on the custodian holding the backing collateral and on the merchant honoring mint and redeem requests. If the custodian freezes, delays, or loses the backing collateral, or the merchant fails to honor redemptions, WLFIcx may trade below its intended value or become unredeemable. Concrete does not control the issuance, backing, or redemption of WLFIcx.

## Collateral Volatility and Liquidation Risks

The value of WLFIcx tracks WLFI, a volatile asset. Vault strategies may borrow stablecoins against WLFI-linked collateral to generate yield. If the collateral value falls relative to borrowed amounts, lenders may liquidate positions, potentially resulting in loss of collateral. The system relies on accurate price feeds; oracle failures or divergences could trigger unwarranted liquidations. Losses affecting one portion of the vault could impact all depositors proportionally.

## Yield Rates Not Guaranteed

Concrete cannot and does not guarantee that any target yield rates can be achieved or maintained. Returns depend on strategy performance, borrowing costs, and market conditions, and Concrete reserves the right to adjust, refresh, or discontinue offered rates at any time. You may withdraw your funds if dissatisfied with offered rates, subject to applicable procedures.

## Valuation and [NAV](/glossary/#nav) Reporting

The vault's NAV (Net Asset Value) is updated through periodic accounting rather than continuous on-chain pricing. Reported share values may lag the actual value of the underlying positions. As a safeguard, the vault may automatically pause operations when a reported valuation change exceeds a configured threshold; during a pause, deposits and withdrawals are temporarily unavailable until the valuation is verified.

## Smart Contract Risks

Smart contracts may contain vulnerabilities or exploits that could result in loss of funds. The vault relies on contract-level access controls, pause mechanisms, and periodic accounting to mitigate these risks but cannot eliminate them. Recovery of funds lost to a smart contract exploit may be delayed, partial, or impossible.

## Liquidity and Withdrawal Risks

Withdrawals are processed through the vault's Withdrawal Queue rather than settled instantly. Unwinding strategy positions, repaying borrowed amounts, and transferring custodied assets take time. If withdrawal requests exceed available liquidity, requests roll forward to subsequent Epochs and settlement may take materially longer than the estimated withdrawal time. Withdrawals may be further delayed in extreme circumstances including custodian or merchant failures, smart contract issues, or a pause of vault operations.

## Tax Implications

Yield earned on deposited funds may be characterized differently from other income types for tax purposes, potentially treated as ordinary income, interest income, or lending income depending on your jurisdiction. Concrete may be required to report your yield income to tax authorities. Withholding taxes may apply depending on your tax status and jurisdiction. Concrete is not required to compensate you for any adverse tax treatment. You should consult a qualified tax advisor before participating.

## Conflicts of Interest

Concrete's selection of strategies and counterparties may be influenced by relationships with protocols, partners, or strategic considerations rather than solely obtaining the best available terms for depositors. Concrete may transact with affiliates or related parties and may use operational proceeds for corporate purposes that may compete with depositor interests.

## Regulatory and Liability Limitations

The program is subject to limited regulatory oversight and evolving regulations that could require program termination, impose new restrictions, affect tax treatment, or impact enforceability of rights. No regulatory authority has reviewed or endorsed the program. To the maximum extent permitted by law, Concrete's liability is limited to the value of assets held in the vault's strategies, subject to priority claims in any insolvency. Concrete is not liable for custodian or merchant failures, market fluctuations, inability to achieve target returns, third-party failures, regulatory changes, or force majeure events. Concrete's total liability to any depositor is capped at the deposit amount plus accrued yield, less applicable fees and losses.

## Acknowledgments and Governing Provisions

By depositing funds into the Concrete WLFIcx Prime vault, you acknowledge that you have read and understand these disclosures and the risks described herein, including lack of regulatory protections, custodial asset and collateral risks, valuation and liquidity considerations, no guaranteed yields, smart contract risks, tax implications, conflicts of interest, and termination rights. Any disputes shall be resolved through binding arbitration per applicable agreements. In the event of any conflict between this disclosure and executed agreements, the executed agreements shall govern.

:::warning
THESE DISCLOSURES ARE PROVIDED FOR INFORMATIONAL PURPOSES ONLY AND DO NOT CONSTITUTE INVESTMENT, LEGAL, TAX, OR FINANCIAL ADVICE. CONSULT QUALIFIED ADVISORS BEFORE PARTICIPATING AND FOR ADVICE AS TO LEGAL, TAX AND ECONOMIC IMPLICATIONS. CONCRETE MAKES “FORWARD-LOOKING STATEMENTS,” WHICH DESCRIBE FUTURE EXPECTATIONS, PLANS, RESULTS OR STRATEGIES AND CAN OFTEN BE IDENTIFIED BY THE USE OF TERMINOLOGY SUCH AS “MAY,” “WILL,” “EXPECT,” “PLAN,” OR SIMILAR TERMINOLOGY. THESE STATEMENTS ARE BASED UPON CONCRETE’S CURRENT EXPECTATIONS, ASSUMPTIONS AND ESTIMATES, AND ARE NOT GUARANTEES. ACTUAL RESULTS MAY DIFFER MATERIALLY FROM THOSE CONTEMPLATED IN THESE STATEMENTS DUE TO A VARIETY OF RISKS AND UNCERTAINTIES. THIS DOCUMENT DOES NOT CONSTITUTE AN OFFER OR INVITATION OR SOLICITATION OF ANY OFFER TO SELL, PURCHASE, DELEGATE OR LOAN ANY SECURITIES AND IS NOT INTENDED, AND DOES NOT, CREATE A BINDING OR ENFORCEABLE AGREEMENT ON THE PART OF THE COMPANY
:::
