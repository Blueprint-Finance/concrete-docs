---
title: "FAQ"
description: "FAQ"
sidebar_label: "FAQ"
---

* [Concrete](#concrete-overview)
* [Earn V2](#earn-v2)
* [CT Assets](#ct-assets)
* [Vaults](#vaults)
* [Fees](#fees)
* [Audits](#audits)
* [Risks](#risks)
* [Withdrawals](#withdrawals)
* [SDK](#sdk)
* [Subgraph](#subgraph)
* [Support](#support)



## Concrete Overview

### What is Concrete?

Concrete is a suite of DeFi infrastructure products that automate yield generation, simplify vault creation, and make institutional-grade yield accessible with minimal user effort. It provides ERC-4626 vaults, automated strategies, custody-backed assets (CT[assets]), and a unified UX across chains.

### What problem does Concrete solve?

DeFi requires managing multiple protocols, securing liquidity, monitoring yield, and managing liquidation risks. Concrete automates these processes, so users receive the best yield without actively rebalancing or monitoring markets.

### Who is Concrete designed for?

* Liquidity providers
* Traders
* Institutional users using custody-backed CT[assets]


### How does Concrete differ from traditional DeFi platforms?

Concrete automates yield discovery, rebalances between protocols, provides multi-chain UX, integrates custody-native assets, and offers operational safety through role controls and automated accounting.


## Earn V2

### What is Earn V2?

Earn V2 is Concrete’s next-generation yield vault architecture with modular strategies, upgradeability, role-based operations, and automated accounting that updates daily.

### How does Earn V2 improve upon Earn V1?

* Automation replaces manual rebalancing
* Granular roles (Allocator, Strategy Manager, Vault Manager)
* Async withdrawals
* Multiple strategy types including multisig strategies
* Safer upgrade paths


### What assets can Earn V2 vaults accept?

Each vault accepts exactly one base asset (e.g., USDC, ETH).

### How does accounting work?

Vaults track `totalAssets` through automated yield accrual. Fees and yield are minted as shares to maintain accurate NAV.

### What roles control a vault?

* Vault Manager
* Strategy Manager
* Hook Manager
* Allocator
* Withdrawal Manager (async vaults)
  Each role has its own admin.

### What fees exist in Earn V2 vaults?

Two fee types:

* Management Fee (AUM-based)
* Performance Fee (on positive yield)
  Both accrue by minting shares.

### How do async withdrawals work?

Withdrawals enter epochs, are processed in batches, lock-in share price per epoch, and allow safe unwinding of strategies.

## Vaults

### What is an ERC-4626 vault?

A standardized tokenized vault where users deposit an asset and receive ERC-20 shares representing ownership of the vault’s pooled assets.

### What does depositing into a Concrete vault give me?

You receive ctAssets (vault shares), which track your proportional ownership and grow in value as the vault earns yield.

### What is the internal flow of a deposit?

Approve → deposit underlying → vault mints shares → strategies generate yield → share price increases.

### Can I transfer vault shares to someone else?

Yes, ctAssets are standard ERC-20 tokens and fully transferable.

### How is yield displayed?

Yield is reflected in:

* increased `totalAssets()`
* increased share price
* optional CT token emissions (depending on product version)

## CT Assets

### What are CT[assets]?

CT[assets] are Concrete’s 1:1 on-chain representations of assets held in a Qualified Custodian (QC).

CT[assets] transform custody-locked capital into productive, yield-earning assets — safely, transparently, and without compromise. They allow custody-held capital to be deployed into structured, fully controlled yield strategies — without ever leaving the custody environment.

CT[assets] are always:

- Fully backed by assets in QC
- Minted and burned only by Concrete
- Deposited into a dedicated Earn V2 vault
- Represented to clients via a receipt token (vault share)

### Why Institutions Use CT[assets]

- Assets never leave custody
- Transparent, on-chain representation
- Clear 1:1 backing
- Curated, controlled yield
- Earn V2 infrastructure (upgradeable, auditable, role-separated)
- Predictable withdrawal timelines
- Zero operational burden for the client

### How does a deposit work?

1. Client sends assets to a Concrete-controlled QC account.
2. Concrete verifies the deposit.
3. Concrete’s Merchant contract mints CT[assets] 1:1 with the QC balance.
4. These CT[assets] are deposited into a dedicated Concrete vault.
5. The client receives the vault share token (e.g., ctUSD1) in their EVM wallet.

The vault share token is the client’s simple, user-facing receipt and represents:

- Their deposit
- Their proportional ownership
- Their accumulated yield

Clients never touch CT[assets] directly.

### Do assets ever leave custody?

No. Assets remain inside the Qualified Custodian throughout the lifecycle:

- Deposit
- Yield updates
- Redemptions
- Withdrawals

Only the on-chain CT[asset] representation moves.

### Why does Concrete use a single QC account?

Most deployments use one unified QC account because:

- It simplifies reconciliation
- It reduces operational overhead
- It maintains strict, consistent backing
- It allows continuous 1:1 verification of CT[asset] supply

Large institutional clients may opt for dedicated, segregated QC accounts if desired.

### How does Concrete ensure 1:1 backing?

Concrete continuously reconciles:

- QC balances
- CT[asset] supply
- Vault total assets
- Strategy positions and yield

This ensures the system maintains a strict 1:1 relationship between:

CT[assets] ↔ assets in QC

All reconciliations are performed by Concrete’s operator multisig plus automated checks.

### What is the client-facing asset?

The vault share token (e.g., ctUSD1) is what clients see and manage.

It accrues yield automatically through an increasing share price, following the standard ERC-4626 vault model.

### What type of vault holds CT[assets]?

Every AssetCT campaign uses a dedicated Earn V2 asynchronous vault with:

- Epoch-based withdrawal scheduling
- Daily NAV updates
- Controlled allocation
- A Whitelist Hook restricting access

Only QC-routed deposits and approved Concrete operators may interact with this vault.

### Can anyone deposit into or withdraw from the CT[asset] vault?

No. Access is strictly controlled.

- The vault uses a whitelist hook
- Only approved actors (Concrete Merchant → vault → QC flow) can interact
- External DeFi users cannot deposit or redeem

This preserves the institutional nature and closed-loop custody environment.

### How is yield generated?

Yield does *not* come from open DeFi markets.

Instead:

- CT[assets] serve as collateral in bespoke, negotiated lending agreements with vetted institutional lenders.
- The vault borrows stablecoins (e.g., USDC) from these lenders.
- Stablecoins are sent to approved yield sources (e.g., a Concrete-run USDC yield vault).
- Yield is realized in USDC.

To reflect yield:

1. Yield USDC is moved back into QC
2. QC converts it to the underlying asset
3. Concrete Operator detects the increase
4. Merchant mints new CT[assets] equal to the yield
5. Vault accounting is updated
6. Client share price increases

Yield is reflected without any open market purchases of CT[assets].

### What happens if a lender or strategy holds CT[assets] directly?

They can send CT[assets] directly to the Concrete Merchant contract for redemption.

The Merchant burns the CT[assets], and Concrete returns the underlying asset from QC through the standard withdrawal pipeline.

### How do withdrawals work?

Withdrawals follow a controlled, auditable, institutional process:

1. Client calls redeem() on their vault shares
2. The withdrawal enters an Earn V2 async epoch
3. Strategies unwind positions
4. Lenders are repaid
5. CT[assets] used as collateral are returned to Concrete
6. Merchant burns the CT[assets]
7. Concrete Operator multisig initiates QC transfer to the client

Typical settlement time: ~7 days, depending on strategy unwind speed and QC processes.

### Why does withdrawal take ~7 days?

Because:

- Strategies need to unwind
- Lenders must return collateral
- Assets must be operationally released inside QC
- Manual approval is required for institutional compliance

This timing is comparable to large custodial wire redemptions or institutional settlement cycles.

### Can clients monitor their position on-chain?

Yes. Clients can view:

- Vault share balance
- Share price
- Total assets
- Pending withdrawals
- Epoch status
- Yield accrual

All accounting is fully on-chain and transparent.

### What happens if a strategy takes a loss?

Losses are expressed via the vault share price, not via CT[asset] supply changes.

CT[assets] remain fully backed, and all investors share gains or losses proportionally via the ERC-4626 model.

### Who can mint or burn CT[assets]?

Only two parties:

1. Concrete Merchant contract (mint/burn executor)
2. Concrete Operator multisig (authorization/permission layer)

Strategies, partners, or external users cannot mint or burn CT[assets] under any circumstances.

### What happens if a client needs a segregated account?

Concrete supports this on request:

- A client can open a dedicated QC account
- Concrete will deploy a unique vault for that account
- Vault share tokens will have a distinct symbol
- All CT[asset] flows remain isolated from the main pool

This is intended for large institutional participants.

### Are CT[assets] tradable?

No.

They are not transferable like normal ERC-20 tokens.

All CT[asset] flows are restricted to maintain:

- 1:1 backing
- Compliance
- Institutional risk controls

The vault share token, however, is a normal ERC-20 share token — but typically not used for secondary markets.

### Do CT[assets] use the same infrastructure as Earn V2?

Yes. CT[asset] vaults are built directly on Earn V2:

- ERC-4626
- EIP-7201 storage layout
- UUPS upgradeability
- Async withdrawal module
- Allocation module
- Whitelist hook
- Strategy accounting
- Share-price-based yield accrual

They *are* Earn V2 vaults, simply configured for a custody-backed workflow.

### What is the role of the Concrete Merchant contract?

The Merchant acts as the trusted on-chain accounting agent:

- Mints CT[assets] when QC balance increases
- Burns CT[assets] when QC balance decreases
- Routes CT[assets] to vaults
- Handles direct redemption
- Ensures all supply changes are recorded on-chain

It is the bridge between the QC ledger and the blockchain ledger.

### What prevents a mismatch between QC balances and CT[asset] supply?

Multiple layers of reconciliation:

- QC → Operator multisig
- Operator → Merchant
- Merchant → Vault
- Vault → On-chain totals

If balances ever diverge:

- Minting halts
- Burning halts
- Withdrawals pause
- Operators investigate before continuing

This ensures backing integrity is never compromised.

### Can CT[assets] be used in DeFi?

No.

They are intentionally not composable due to custodial and regulatory constraints.

However, the vault share tokens (ctUSD1, ctBTC, etc.) follow ERC-20 standards and may be used more broadly in the future.

### Will this expand to more assets?

Yes. Every new backing asset receives:

- A unique CT[asset] contract
- A dedicated Earn V2 vault
- Its own lifecycle management

## Fees

### What fees does Concrete Earn charge?

Only AUM-based fees:

* Standard vaults: 1.5% per year
* Sentora/Lombard vaults: 1.25%
  No deposit, withdrawal, performance, or maintenance fees at the protocol UI layer.

### Are strategy costs or gas fees passed to users?

Gas is paid by users for deposits and withdrawals (standard EVM behavior). Strategy interaction costs are abstracted at the vault level.

## Audits

### Who audited Concrete?

* Halborn
* Code4rena
* Zellic
  Earn V2 modules, strategies, queue mechanisms, and core vault logic all underwent audits.

### Does Concrete perform ongoing monitoring?

Yes — including Hypernative security monitoring and TRES accounting integrations.

### Are audits public?

All audit reports are published for transparency.


## Risks

### What risks exist when using Concrete?

* Smart contract risk
* Impermanent loss (strategy-dependent)
* Slippage during strategy swaps
* Strategy-specific risks (protocol integrations)


### How does Concrete mitigate risks?

* Multiple top-tier audits
* Dynamic strategy allocation
* Slippage protections
* Caps, limits, and safe-guarded accounting


### Which jurisdictions are restricted?

* United States
* OFAC-sanctioned regions (North Korea, Iran, Cuba, Russia, Crimea, South Sudan)


## Withdrawals

### Are withdrawals instant?

Yes for standard (sync) vaults.

Async vaults use epochs for safer execution when liquidity is locked in strategies.

### Why does an async vault have a queue?

To allow proper unwinding of positions, especially in CT[assets] and institutional setups requiring off-chain settlement.

### How long do CT-asset withdrawals take?

Approx. 7 days, due to QC settlement and lender repayments.



## SDK

### How do I deposit using the SDK?

1. Approve underlying
2. Call `vault.deposit(amount)`
3. Receive ctVaultShares


### Does Concrete offer React/Wagmi hooks?

Yes:

* `useVaultDetails`
* `useVaultDeposit`
* `useVaultWithdraw`
* `useVaultBalance`


### Is there a Playground to test the SDK?

Yes — the Concrete SDK Playground in Concrete Build.



## Subgraph

### What does the Earn V2 subgraph track?

* Vault deployments
* Deposits/withdrawals
* Yield accrual
* Fee data
* Strategies & allocations
* Async withdrawal queues


### Are cross-chain aggregations supported?

No — each chain has its own subgraph.


## Support

### How do I contact support?

Email: [support@blueprintfinance.com](mailto:support@blueprintfinance.com)
Discord: Concrete community server


### What information should I include when opening a support ticket?

* Wallet address
* Description of issue
* Screenshots
* Relevant transaction hashes
