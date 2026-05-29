# Concrete Documentation Style and Terminology Guide

Canonical authority for content on **docs.concrete.xyz**. Any writer or AI tool
producing documentation for Concrete, including documentation imported from
other repositories (Front End, Backend, Smart Contracts), conforms to the
naming and voice rules here. A reader moving between an existing article and a
new one should notice no shift in voice, depth, or terminology.

This guide is grounded in two sources:

1. The team's **Concrete Documentation Style Guidelines** (the canonical voice
   and structure reference, authored for docs.concrete.xyz).
2. The existing **docs.concrete.xyz corpus** under `src/`, the primary
   reference for the correct, user-first names for each feature. Every glossary
   entry cites the source page it is drawn from.

This guide states the **target standard**, not a snapshot of the corpus as it
stands today. The corpus is being actively improved: a shift to a professional,
non-promotional tone, and the removal of promissory and future-feature content
that was never shipped or has been shelved. Where the corpus conflicts with
this guide, this guide wins.

**How to use this file.** Part 1 is the style guide (voice, structure,
formatting, article patterns). Part 2 is the canonical glossary (the correct
term for every concept). Part 3 is the technical → canonical translation map:
when raw or third-party material uses a more technical word, look it up here to
find the term Concrete docs use.

> **Deviation from the canonical source, recorded deliberately.** The source
> guide prescribes an em dash for bolded bullet labels. Concrete's house
> standard forbids the em dash character (`—`) everywhere, including prose,
> because it reads as AI cadence. This guide therefore uses an en dash (`–`)
> or a colon as the bullet-label separator. This is the only intentional
> departure from the source.

> **Platform note.** These conventions target **Docusaurus** (the engine
> behind docs.concrete.xyz today): a body H1 per article, `:::` admonitions,
> and Docusaurus front-matter. A repository publishing the same content through
> Mintlify translates the markup (front-matter title instead of body H1,
> `<Note>` instead of `:::note`); the voice and terminology rules do not change.

---

# Part 1 - Style Guide

## 1. Voice and Tone

### 1.1 Professional, not promotional

Concrete docs read like a senior engineer explaining a system to a competent
peer who has not used it yet. State what a feature does and how it works. Do not
sell it, and do not assert its quality.

- Describe behavior, not virtue. Avoid value-claim adjectives ("transparent", "secure", "scalable", "institutional-grade", "best-in-class") unless you immediately back the claim with a specific, verifiable fact.
- No hype, no superlatives, no growth-marketing cadence.

- **Do:** "Earn V2 separates high-impact changes from daily operations through role-based access control."
- **Do not (promotional):** "Earn V2 transforms DeFi into fully automated, transparent, secure, and scalable yield infrastructure."
- **Do not (vague or hedged):** "Earn V2 might help some users in certain situations."

### 1.2 Second person for users, third person for the system

Use "you" and "your" for what the reader does, sees, or controls. Use
"Concrete", "the vault", "the protocol", or "the system" for how the platform
behaves. Do not use "we" or "our" in technical articles. The only exceptions
are the Support, Audits, and policy/disclosure pages, which speak as the
Concrete team.

- **Do:** "You deposit USDC into a vault. The vault mints ERC-20 shares representing your proportional ownership."
- **Do not:** "We will mint shares for you when you deposit."

### 1.3 Present tense, active voice

Default to present tense and active voice. Passive voice is acceptable only for
on-chain events where the actor is the contract itself.

- **Do:** "The Allocator moves capital between strategies."
- **Acceptable passive:** "Fees are minted as vault shares to the fee recipient."
- **Do not:** "Capital will be moved by the Allocator."

### 1.4 Unbuilt and future features

Document only functionality that is shipped and live. Do not describe planned,
partial, abandoned, or aspirational features as if they exist, and do not
promise future work.

- Default to omission. If a feature is not live, leave it out.
- The only exception is a genuinely committed, dated roadmap item the team has approved for public mention. Mark it as upcoming and state the expected timing. When in doubt, omit.
- Remove existing promissory and "in the future" content as pages are revised.
- Describe deployed features as fact. Reserve "may", "might", and "could" for real, warranted uncertainty, not for unshipped features.

## 2. Audience Model

Concrete docs serve three readers. Every article is written for at least one,
and states or implies which at the top.

| Audience | What they need | Depth |
|---|---|---|
| **Liquidity providers / end users** | How to deposit, withdraw, earn yield, understand fees and risks. Minimal jargon, real asset names (ETH, USDC). | Conceptual plus step-by-step |
| **Integrators / developers** | SDK methods, contract interfaces, function signatures, deployment parameters, event schemas, subgraph queries. | Reference plus code samples |
| **Operators / curators** | Role permissions, vault configuration, strategy management, factory deployment, upgrade paths, fee splitting. | Architectural plus operational |

If an article serves multiple audiences, layer the content: conceptual
overview first, then operational detail, then code-level reference.

## 3. Article Structure

### 3.1 Standard skeleton

```
# Title (H1)

One-paragraph summary: what this page covers and why it matters. No more than 3 sentences.

## Section (H2)

Body text explaining the concept or feature.

### Subsection (H3) – only when genuinely needed

#### Sub-subsection (H4) – rare; deep reference pages like Architecture
```

### 3.2 Opening paragraph

The first paragraph below the H1 does two things: (a) names the specific
Concrete feature or concept, and (b) states what the reader will learn or be
able to do. Keep it to one to three sentences. Examples:

- "Concrete Earn routes vault deposits across DeFi strategies based on quantitatively assessed risk-adjusted return. This page explains how deposits, yield, and withdrawals work."
- "The Withdrawal Queue settles redemptions in scheduled batches. This page explains how to request a withdrawal and when your funds become available."

### 3.3 Heading hierarchy

- **H1** – page title, one per page, a descriptive noun phrase.
- **H2** – major sections, one per distinct topic or workflow step.
- **H3** – subsections within an H2 when there are two or more sub-topics.
- **H4** – rare, mainly in smart contract reference docs for numbered items.

Never skip a level (no H1 directly to H3).

### 3.4 Length calibration

These are upper guides, not quotas. There is no minimum length. A page is finished when it serves its audience (Section 2), explains before it specifies (Section 4.1), and includes at least one example, whether that takes 300 words or 800. Do not pad to reach a number; conciseness is preferred. The figures below flag pages long enough to consider splitting, not pages that are short.

| Article type | Length guide | Example |
|---|---|---|
| Overview / welcome | up to 800 words | Welcome, Our Solution |
| How-it-works / conceptual | up to 1,200 words | How It Works |
| User guide / walkthrough | up to 1,000 words | User Journey, Deposit into Vaults |
| Smart contract reference | up to 5,000 words | Architecture |
| SDK reference method | up to 600 words per method | SDK Read/Write Methods |
| Vault-specific | up to 800 words | Stable Vaults, WBTC Migration |
| Policy / disclosure | up to 500 words | Fees, Risks, Restrictions |

## 4. Technical Content Rules

### 4.1 Explain before you specify

For every technical concept, follow this order:

1. **What it is** – one plain-language sentence.
2. **Why it matters** – one sentence connecting it to the reader's goal (yield, security, control).
3. **How it works** – the technical detail.

### 4.2 Code blocks

Use fenced code blocks with a language identifier for all function signatures,
struct definitions, event declarations, and SDK snippets. Use Solidity for
contract interfaces and TypeScript or JavaScript for SDK examples.

```solidity
function deposit(uint256 assets, address receiver) external returns (uint256 shares);
```

- Include only the signature or a minimal working example. Do not pad with boilerplate.
- Add a prose sentence before or after each code block explaining what it does.
- Describe important parameters in a sentence or a small table after the block.
- Never put explanatory comments longer than one line inside the code block.

### 4.3 Solidity and contract documentation

When documenting a contract function: (1) state the signature in a code block,
(2) describe the arguments in prose, or a table if there are four or more,
(3) state the emitted event in a separate code block, (4) note access control
in plain language. For pages with many guarded functions (such as
Architecture), use a function-to-event table.

### 4.4 SDK documentation

SDK articles open with a summary table mapping user action to SDK method to
result, then a conceptual paragraph explaining the mental model, then a
step-by-step code flow with numbered steps.

### 4.5 Numbers, units, and formatting

- Spell out numbers one through nine in prose; use digits for 10 and above.
- Always use digits with a unit: "1 ETH", "100 USDC", "1.5% annualized".
- Write the asset, not a currency symbol: "10,000 USDC", not "$10,000". Use "$10 million" only for fiat references.
- Basis points: write "basis points" on first use, then "bps".
- Asset tickers are uppercase: USDC, ETH, WBTC, frxUSD.
- Contract names and role names are bold on first mention per section, plain text thereafter.
- Function names are inline code: `deposit()`, `accrueYield()`.
- Percentages as `20%`, `0.65%`, `7% APY`.
- Do not use the em dash (`—`). Rewrite with periods, commas, or restructured clauses. See the deviation note at the top.

## 5. Formatting and Markdown Conventions

### 5.1 Tables

Use tables for feature comparisons (Earn V1 vs V2), function-to-event mappings,
fee schedules, and SDK method summaries. Use a bold header row and keep each
cell to one sentence or a short phrase.

### 5.2 Bullet lists

Use bullets for enumerating three or more parallel items and for "key upgrades"
or "what's new" summaries. Begin each bullet with a bolded label, then an en
dash, then the explanation. Keep bullets to one or two sentences. Do not nest
deeper than two levels.

- **Granular role controls** – vault operators delegate permissions across distinct roles.

### 5.3 Numbered lists

Use numbered lists only for sequential steps (workflows, deployment processes,
example scenarios). If order does not matter, use bullets.

### 5.4 Admonitions

Use Docusaurus admonition syntax, sparingly. Limit to one per major section.

- `:::tip` – positive, actionable advice.
- `:::info` – contextual notes (including `:::info[Example]` for worked examples).
- `:::warning` – risk or caution notices.
- `:::danger` – security-critical information only.

### 5.5 Links

- Link to other docs.concrete.xyz pages by relative path.
- Link to external protocols by name on first mention, using the official URL.
- Link to the Concrete app (`app.concrete.xyz`) when referencing a user action.
- Never use "click here". Use descriptive text: "visit the Earn page".

## 6. Content Patterns by Article Type

### 6.1 Conceptual / overview

H1 feature name; opening paragraph with a one-sentence definition plus a
one-sentence value proposition; H2 sections covering what it does, what is new
(for an upgrade), key components (table or bullets), and how the pieces fit.
Avoid implementation details, function signatures, or SDK code; link to the
reference pages instead.

### 6.2 How-to / user guide

Action-oriented H1 ("Deposit into Vaults", "How Withdrawals Work"); opening
paragraph stating what the user accomplishes; prerequisites if any; numbered
steps with one action each; an example scenario with concrete numbers ("If
Alice submits her request before Monday, June 3 at 12:00 PM UTC..."); edge
cases at the end. Tone is warmer and more guiding; use "you" heavily and
anticipate questions.

### 6.3 Smart contract reference

H1 component name; opening paragraph summarizing the component's role; a table
of contents for long pages; numbered top-level sections with H2; within each,
architecture notes, then signatures, then parameter descriptions, then events,
then access control. Every function signature and every emitted event is in a
code block; access control is stated for every function.

### 6.4 SDK reference

H1 method or concept name; one-sentence opening; summary table (user action to
SDK method to result); a mental-model paragraph; a numbered code flow; a link
to the Concrete app for users who want to try the flow manually first.

### 6.5 Policy / disclosure

H1 topic name; one-sentence opening with the key message; for fees, a table
with Fee Type, Amount, Denomination, Description; for risks, an H2 per risk
category with "when it is more likely" and "how Concrete mitigates" sections;
for audits, a structured list of firms and phases. This is the one article type
where "we" is acceptable, because the platform is making disclosures.

### 6.6 Vault-specific

H1 vault name; opening paragraph naming what the vault accepts, its network,
and what makes it distinct; supported assets; rewards and points; timeline
(deposits open, claim, withdrawals, queue); step-by-step deposit instructions;
an admonition with key reminders.

## 7. Handling Deeply Technical Source Material

When transforming a raw contract, spec, or whitepaper section:

1. **Identify the audience.** "Developers integrating the SDK" means a reference article (6.4); "users choosing a vault" means a vault-specific article (6.6). This sets the depth.
2. **Extract the "so what".** For every technical fact, derive the user-facing implication. "The vault uses a cached `totalAssets` updated via `_accrueYield()` before any user operation" becomes "Before any deposit or withdrawal, the vault refreshes its total asset value, so share prices always reflect the latest yield."
3. **Layer the depth.** Start at the highest abstraction and go deeper section by section (concept, then sub-concept, then code block, then prose detail).
4. **Preserve precision.** Do not simplify away correctness. If a function reverts under a condition, say so. If an ERC standard is followed except in one place, note the exception. The corpus does this: the Concrete V2 vaults follow ERC-4626 in all but one place, the reporting of `totalAssets`.
5. **Add an example scenario.** End a technical section with a concrete scenario using real asset names and plausible numbers.

## 8. What to Avoid

- **Promotional language.** No marketing superlatives ("revolutionary", "groundbreaking", "game-changing", "seamless", "effortless", "next-gen") and no unbacked value claims ("transparent", "secure", "scalable", "institutional-grade") stated as virtues rather than facts.
- **Unnecessary acronym introduction.** Do not define an acronym used only once. Define on first use only if used twice or more.
- **Walls of text.** No paragraph longer than five sentences. Break with sub-headings, tables, or code blocks.
- **Redundant sections.** Do not repeat the same information across Overview, How It Works, and a vault-specific page. Each page adds new information or serves a different audience. Cross-link instead of duplicating.
- **Promissory and future content.** Do not document unbuilt, partial, or abandoned features, and do not promise future work. Describe shipped features as fact. See Section 1.4.
- **Unexplained jargon.** On first use of a DeFi-specific term (ERC-4626, NAV, Epoch, impermanent loss), provide a brief inline definition.
- **Em dashes.** See Section 4.5.

## 9. Metadata and SEO

Every page has Docusaurus front-matter with:

- `title` – matches the H1.
- `description` – one sentence following the pattern "[Topic] documentation for [feature], covering [aspect 1], [aspect 2], and [aspect 3]."
- `sidebar_label` and `sidebar_position` – as needed for navigation.

## 10. Pre-Publish Checklist

- [ ] H1 is a clear, descriptive title (not a question, not a verb phrase).
- [ ] Opening paragraph defines the topic and states what the reader will learn.
- [ ] Audience is clear and depth matches.
- [ ] All Concrete-specific terms match Part 2 and Part 3 of this guide.
- [ ] Every function signature is in a fenced code block with the correct language tag.
- [ ] Every code block has a prose sentence before or after it.
- [ ] Tables for parallel comparisons; bullets for enumerations; numbered lists for sequential steps only.
- [ ] No promissory or future-feature content; only shipped functionality is documented.
- [ ] At least one concrete example or scenario is included.
- [ ] No paragraph exceeds five sentences.
- [ ] No promotional language (superlatives or unbacked value claims) and no em dashes.
- [ ] Internal links use relative paths; external links use official URLs.
- [ ] `description` follows the metadata pattern.
- [ ] Page does not exceed the length guide for its article type; if it does, split or trim it. There is no minimum length, so do not pad a short page.

---

# Part 2 - Canonical Glossary

The correct term for every concept, drawn from the corpus. Each entry gives the
definition, capitalization, register (whether it leads in headers and feature
names, or is a body-level mechanism term), and the synonyms to avoid. "Avoid"
items feed the translation map in Part 3.

### Products and brand

- **Concrete** – the protocol and platform. Capitalized. _Source: `src/01-Overview/welcome.md`._
- **Concrete Protocol** – the formal protocol name, used where the legal or
  platform entity is meant. _Source: `src/restrictions.md`._
- **Concrete Earn** – the automated yield-vault product. Capitalized. Leads in
  headers. _Source: `src/02-Earn/deposit-into-vaults.md`._
- **Earn V1 / Earn V2** – product generations. Capital "V". "Earn V2" is the
  current automated system; "Earn V1" is the legacy generation. Avoid lowercase
  "Earn v2". _Source: `src/06-Earn-V2/overview.md`._
- **Concrete Enterprise** – the partner offering for deploying custom vaults.
  _Source: `src/06-Earn-V2/SDK/quick-start.md`._
- **Concrete Points** – the incentive points distributed to users. Capitalized.
  _Source: `src/rewards.md`, `src/05-Vaults/02-Corn/overview.md`._
- **Portfolio** – the in-app tab where a user tracks positions and withdrawal
  status. Capitalized when naming the tab. _Source: `src/05-Vaults/how-withdrawals-work.md`._

### Vault mechanics

- **vault** – a smart-contract product into which a user deposits a base asset
  and receives shares. Lowercase noun. Avoid "pool", "fund", or "contract" when
  referring to a vault. _Source: `src/01-Overview/welcome.md`._
- **shares / vault shares** – the ERC-20 tokens representing proportional
  ownership of a vault. Avoid "tokens" (generically) or "receipts". _Source:
  `src/01-Overview/welcome.md`._
- **ctAssets** – Concrete's vault shares, formatted as "ct" plus the asset
  symbol (ctUSDC, ctETH). Use the "ct" prefix. Avoid "cTokens" except when
  specifically discussing Earn V1 naming. _Source: `src/02-Earn/ct-assets.md`._
- **base asset / underlying asset** – the token a vault accepts on deposit and
  pays out on withdrawal (USDC, ETH, WBTC). Avoid "deposit token" or "input
  token". _Source: `src/01-Overview/welcome.md`, `src/05-Vaults/yield-vaults.md`._
- **ERC-4626** – the tokenized-vault standard. Always hyphenated. Avoid
  "ERC4626". _Source: `src/01-Overview/welcome.md`. Note: `src/06-Earn-V2/Smart-Contracts/architecture.md` currently uses the unhyphenated form; the hyphenated form is canonical._
- **ERC-20** – the token standard. Always hyphenated.
- **exchange rate / share price** – the conversion ratio between shares and the
  underlying asset; moves with yield. _Source: `src/02-Earn/ct-assets.md`._
- **NAV (Net Asset Value)** – the total value of a vault, updated daily in
  Earn V2. Expand on first use per page. _Source: `src/05-Vaults/07-DeFi-USDT/important-disclosures.md`._
- **strategy / yield strategies** – the smart contracts that deploy capital to
  earn yield (lending on Aave, liquidity on Pendle, and similar). Avoid
  "protocol adapter" or "yield module". _Source: `src/05-Vaults/how-withdrawals-work.md`, `src/02-Earn/how-earn-vaults-maximize-risk-adjusted-yields.md`._
- **allocation / rebalance** – moving capital between strategies. _Source:
  `src/02-Earn/how-earn-vaults-maximize-risk-adjusted-yields.md`._
- **money market** – a lending protocol (Aave, Compound, Morpho) where vault
  strategies deploy capital. _Source: `src/05-Vaults/07-DeFi-USDT/important-disclosures.md`._
- **Quantitative Framework** – Concrete's forecasting and allocation engine for
  risk-adjusted decisions; its signals inform target strategy weights. Capitalized.
  _Source: `src/01-Overview/welcome.md`, `src/02-Earn/how-earn-vaults-maximize-risk-adjusted-yields.md`._
- **Subgraph** – the on-chain indexing service for analytics and events.
  Capitalized as the component; lowercase acceptable in generic prose. _Source:
  `src/06-Earn-V2/Subgraph-and-Events/event-reference-and-use-cases.md`, `src/fees.md`._
- **Hook** – custom logic triggered at specific vault operations; managed by the
  Hook Manager. _Source: `src/06-Earn-V2/overview.md`._
- **Fee Splitter** – the contract that routes fees between recipients with a
  configurable share. _Source: `src/06-Earn-V2/overview.md`._
- **pre-deposit vault** – a vault that accepts deposits on one chain before
  launching on another; withdrawals are disabled until users claim their shares
  on the destination chain. _Source: `src/05-Vaults/01-Bera/pre-deposit-vaults-deprecation-guide.md`._

### Withdrawals

- **Withdrawal Queue** – the asynchronous redemption process that batches
  requests for predictable, fair processing. Title Case as the feature/process
  name (it leads in headers and UX); "the queue" lowercase when descriptive.
  This is the user-facing name for the system; "Epoch" is its underlying
  mechanism. _Source: `src/05-Vaults/how-withdrawals-work.md`._
- **async vault / asynchronous mode** – a vault that settles withdrawals through
  the queue rather than instantly. Avoid "queued vault". _Source:
  `src/06-Earn-V2/overview.md`, `src/06-Earn-V2/Smart-Contracts/architecture.md`._
- **instant withdrawal / standard mode** – atomic, same-transaction redemption,
  available for vaults configured in standard mode. _Source: `src/06-Earn-V2/overview.md`._
- **Epoch** – a vault's withdrawal accounting period; requests are processed per
  Epoch on the vault's configured cadence. Title Case as a canonical defined
  term: it is the mechanism that drives the Withdrawal Queue, and Title Case
  makes it scannable when the queue's behaviour is being described. Avoid
  "batch", "round", or "cycle" as synonyms for Epoch. _Source: `src/02-Using-Concrete-Vaults/withdraw.md`, `src/03-Developers/architecture-core-concepts.md`._
- **cutoff** – the deadline within an Epoch after which a request rolls into the
  next Epoch. Lowercase. The corpus uses "cutoff" directly; there is no
  friendlier alias, so "cutoff" is canonical. _Source: `src/02-Using-Concrete-Vaults/withdraw.md`._
- **withdrawal cap** – the per-Epoch limit on total redemptions, expressed as a
  percentage of vault TVL. _Source: `src/02-Using-Concrete-Vaults/withdraw.md`._
- **roll forward / request rollover** – when requests exceed the cap, the
  remainder rolls forward to subsequent Epochs, processed FIFO. This is the
  canonical phrasing for what some sources call "overflow". _Source:
  `src/02-Using-Concrete-Vaults/withdraw.md`, `src/03-Developers/architecture-core-concepts.md`._
- **place in the queue** – a request's position in FIFO settlement order. The
  corpus phrases this as "your place in the queue"; "queue position" is an
  acceptable noun form. _Source: `src/05-Vaults/how-withdrawals-work.md`._
- **estimated withdrawal time** – the user-facing estimate of when funds become
  claimable, shown in the app. _Source: `src/05-Vaults/how-withdrawals-work.md`._
- **status labels: Queued, Processing, Available** – the withdrawal states shown
  in the Portfolio tab. _Source: `src/05-Vaults/how-withdrawals-work.md`._
- **FIFO (First In, First Out)** – the order in which queued requests are
  processed across Epochs. _Source: `src/02-Using-Concrete-Vaults/withdraw.md`._
- **redemption** – a withdrawal, used as a synonym in formal prose. _Source:
  `src/05-Vaults/how-withdrawals-work.md`._

### Yield

- **yield** – the returns generated by a vault's strategies. _Source: corpus-wide._
- **risk-adjusted yield / risk-adjusted return** – yield optimized for the
  risk and return profile rather than headline APY. _Source: `src/01-Overview/welcome.md`, `src/02-Earn/how-earn-vaults-maximize-risk-adjusted-yields.md`._
- **yield accrual / accrued yield** – the accumulation of returns over time.
  _Source: `src/05-Vaults/yield-vaults.md`, `src/02-Earn/balance-accrual.md`._
- **APY** – annual percentage yield; "notional APY" where the vault reports a
  notional figure in the base asset. _Source: `src/fees.md`, `src/05-Vaults/yield-vaults.md`._
- **TVL (Total Value Locked)** – the aggregate value held across vaults.
  _Source: `src/05-Vaults/how-withdrawals-work.md`._
- **DeFi** – capitalized exactly. Avoid "Defi" or "defi". _Source: corpus-wide._
- **on-chain** – hyphenated. Avoid "onchain" or "on chain". _Source: corpus-wide._

### Roles

On-chain roles are capitalized. The generic person who runs a vault is a
lowercase "curator".

- **Vault Owner** – controls upgrades for a vault. _Source: `src/06-Earn-V2/Smart-Contracts/architecture.md`._
- **Vault Manager** – updates parameters, limits, and fees. Avoid "admin" or unqualified "manager". _Source: `src/01-Overview/welcome.md`._
- **Strategy Manager** – adds or removes strategies. _Source: `src/01-Overview/welcome.md`._
- **Hook Manager** – manages hooks. _Source: `src/01-Overview/welcome.md`._
- **Allocator** – moves capital between strategies and processes withdrawals. Capitalized. Avoid lowercase "allocator" or "fund mover". _Source: `src/01-Overview/welcome.md`._
- **Withdrawal Manager** – handles epoch processing and claims on async vaults. _Source: `src/01-Overview/welcome.md`._
- **Pauser** – allows the incident response team to pause the vault independently of operational roles. _Source: `src/06-Earn-V2/overview.md`._
- **curator** – the entity managing a vault's strategy and configuration. Lowercase; descriptive, not a formal on-chain role name. _Source: `src/05-Vaults/how-withdrawals-work.md`._

### Fees and rewards

- **management fee** – an annualized charge on vault AUM, paid by minting shares. Capped at 10%; standard configuration around 1.5%. Lowercase. _Source: `src/fees.md`._
- **performance fee** – a charge on net positive yield, paid by minting shares. Capped at 100% of net positive yield. Lowercase. _Source: `src/fees.md`._
- **no deposit, withdrawal, or maintenance fees** – Concrete Earn charges none of these. _Source: `src/fees.md`._
- **BGT (Berachain Governance Token)** – earned in some Berachain vaults. _Source: `src/05-Vaults/01-Bera/`._

### Assets and chains

- Asset tickers are uppercase: USDC, USDT, ETH, BTC, WBTC, frxUSD, WBERA.
- Chain and vault names are capitalized: Berachain (Bera), Corn, Morph, Tac, Stable, WBTC, Concrete DeFi USDT.

---

# Part 3 - Technical to Canonical Translation Map

When source material reaches for a more technical or invented word, replace it
with the canonical term. The rule follows from the glossary: **the user-facing
name leads in headers and feature labels; canonical mechanism terms (Epoch is
Title Case, cutoff stays lowercase) carry meaning wherever they appear.** Where
a technical term has no friendly equivalent, that term is itself canonical and
is kept.

Every "Use instead" that *replaces* a term resolves to a Part 2 glossary
entry. Rows marked "Keep" retain a term that is already acceptable and may not
need a separate glossary entry.

### Seeded from the canonical source's terminology table

| If the source says | Use instead | Rule |
|---|---|---|
| pool, fund, contract (for a vault) | **vault** | Replace |
| tokens (generically), receipts | **shares / vault shares** | Replace |
| cTokens | **ctAssets** | Replace (cTokens only when discussing Earn V1 naming) |
| deposit token, input token | **base asset / underlying asset** | Replace |
| protocol adapter, yield module | **strategy** | Replace |
| allocator (lowercase), fund mover | **Allocator** | Replace and capitalize |
| admin, manager (unqualified) | **Vault Manager** | Replace |
| batch, round, cycle (for the period) | **Epoch** | Replace and capitalize |
| queued vault | **async vault** | Replace |
| ERC4626 | **ERC-4626** | Hyphenate |
| onchain, on chain | **on-chain** | Hyphenate |
| Defi, defi | **DeFi** | Fix case |
| net value, total value | **NAV (Net Asset Value)** | Replace |

### Feature-name standardization (the "Epoch Lifecycle" class)

| If the source says | Use instead | Rule |
|---|---|---|
| "Epoch Lifecycle" (as a feature or section title) | **Withdrawal Queue** (or "How Withdrawals Work" for a how-to title) | Replace the feature name; keep "Epoch" in the body |
| "epoch" (lowercase in body prose) | **Epoch** | Capitalize. It is a canonical defined term |
| epoch lifecycle (as a body phrase) | the Epoch's lifecycle: start, cutoff, processing | Rephrase; capitalize "Epoch" as a defined term |

### Front End vocabulary collisions

Drawn from the FE business glossary (`docs/business/_meta/glossary.md` in the
concrete-app repo). Left column is the FE's term; right column is the
docs.concrete.xyz canonical.

| FE / technical term | Use instead | Notes |
|---|---|---|
| share token | **shares** or **ctAssets** | "share token" is not used in the corpus |
| payout (noun) | **processing** / "made available for claiming" / "funds arrive" | The corpus does not use "payout" as a noun; describe the event |
| withdrawal window | **estimated withdrawal time** | The corpus phrase shown in-app |
| cap (bare) | **withdrawal cap** | Qualify it |
| overflow | **roll forward to subsequent epochs** / **request rollover** | The corpus phrasing; "overflow" is not used |
| queue place | **place in the queue** / **queue position** | The corpus phrases it as "your place in the queue" |
| RC (release-candidate) withdrawal config | "an upcoming change to the withdrawal schedule" | Internal term; describe the user-facing effect, do not surface "RC" |
| isolated environment | _(internal only)_ | Deployment concept; not a public user-facing term |
| vault group | _(navigation only)_ | A CMS grouping; avoid presenting it as a product concept in public docs |
| permissioned vault | **permissioned vault** (allowlist-gated) | Keep. The corpus uses "permissionless" and "role-based permissions" for other concepts; describe the user-facing state as "restricted-access" |
| pre-deposit vault | **pre-deposit vault** | Keep; grounded in the corpus (see Part 2) |
| bridge ETA / withdrawal ETA | "estimated bridge date" / "estimated withdrawal date" | Spell out; reserve ETA for where space is tight |

### A note on corpus drift

The corpus is being actively improved and is not yet consistent with this
guide. This guide is the target; existing pages are corrected as they are
touched. The main drift to fix:

- **Promotional tone.** Several pages assert virtues ("transparent, secure, and scalable", "institutional standard") or use hype words ("seamlessly" in the Borrow overview). Rewrite to describe behavior. See Section 1.1.
- **Promissory and future content.** Pages and sections for unshipped or shelved features, including the Borrow and Protect sections, are being removed. Do not treat them as canonical. See Section 1.4.
- **"batch" for "epoch".** Several user-facing pages use "batch" where "epoch" is canonical. "Funds are released in batches" (the grouping) is acceptable; "the next batch" meaning the next epoch is not.
- **"ERC4626"** (unhyphenated) appears in the Architecture page; "ERC-4626" is canonical.
- **"Earn v2"** (lowercase v) appears in one audit heading; "Earn V2" is canonical.

New and imported content follows this guide from the start.
