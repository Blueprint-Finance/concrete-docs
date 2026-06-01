# SOURCES.md

Source-of-truth provenance for the source-grounded developer articles in this
repo. Some articles are rewritten directly against upstream code (Solidity
contracts, the TypeScript SDK, the subgraph schema) rather than from product
copy. When that upstream code changes, these docs can drift. This file records
which upstream repository and path backs each such article so a future update
can go straight to the source instead of rediscovering it.

Only articles with a real upstream code dependency are listed. User-facing
guides (deposit, withdraw, fees, campaign pages, etc.) are not source-grounded
this way and are governed by `STYLE-AND-TERMINOLOGY.md` instead.

## Upstream repositories

| Key | Repository | Notes |
|---|---|---|
| `earn-v2-core` | `https://github.com/Blueprint-Finance/earn-v2-core` | Earn V2 Solidity contracts. Org casing is `Blueprint-Finance`. Contracts under `src/` (`factory/`, `implementation/`, `module/`, `periphery/`, `interface/`, `common/`, `lib/`). |
| `Concrete-app` | `https://github.com/Blueprint-Finance/Concrete-app` | Front end. Also hosts the published SDK package `@concrete-xyz/sdk` under `sdk/`. |
| `cb_subgraphs` | `Blueprint-Finance/cb_subgraphs` (subgraph `concrete-earn-v2`) | The Earn V2 subgraph (schema + handlers). Named in PR #118; not cloned locally at authoring time, so verify the exact org/repo/path on first use. |

All three are private Blueprint-Finance repos. Cloning requires the appropriate
GitHub access.

## Article-to-source map

### Architecture: Core Concepts

- **Doc:** `src/03-Developers/architecture-core-concepts.md`
- **Primary source:** `earn-v2-core`
- **Where to look:**
  - `src/factory/` — `ConcreteFactory`, vault deployment, registry, approved
    implementations.
  - `src/implementation/` — vault implementations (standard / atomic, async,
    pre-deposit / bridged).
  - `src/module/` — `AllocateModule`, swap modules, and other periphery modules.
  - `src/interface/` — `IConcreteFactory` and other ABIs; canonical on-chain
    event and function names come from here.
  - `src/common/`, `src/lib/` — shared types, storage libs, the UUPS upgrade
    pattern, role definitions.
- **History:** PR #116 (CONC-3669), "Rewrite of the SC Architecture article".
- **Update cue:** new vault implementation, factory change, role/permission
  change, or upgrade-pattern change in `earn-v2-core`.

### Subgraph & Events

- **Docs:**
  - `src/03-Developers/Subgraph-and-Events/schema-and-queries.md`
  - `src/03-Developers/Subgraph-and-Events/event-reference-and-use-cases.md`
- **Primary sources:** `cb_subgraphs` (subgraph `concrete-earn-v2`) for the
  GraphQL schema, entities, `@derivedFrom` relations, and aggregation/timeseries
  definitions; `earn-v2-core` for the canonical on-chain event names and their
  emitting contracts.
- **Where to look:**
  - `cb_subgraphs/concrete-earn-v2`: `schema.graphql` (entities, field
    nullability, `@entity(immutable:)`, aggregations) and the mapping handlers
    (which entities each event writes).
  - `earn-v2-core/src/`: the contracts that declare the events the handlers
    index (e.g. factory `Deployed`/`Migrated`, `BaseStrategy.AllocateFunds`,
    `AllocateModule.AllocatedFunds`, multisig-strategy events).
- **History:** PR #118 (CONC-3733), "align Subgraph & Events pages with subgraph
  source". Its description lists the exact event/entity corrections and is a good
  worked example of the kind of drift to check for.
- **Update cue:** schema change, new/renamed event, changed `@derivedFrom`
  relation, or aggregation change. On-chain event names always win over the
  subgraph's display labels.

### SDK

- **Docs:** `src/03-Developers/SDK/` (overview, quick-start, setup-configuration,
  decimals-and-conversion-helpers, examples, troubleshooting-and-error-handling,
  `read-methods/*`, `write-methods/*`).
- **Primary source:** `Concrete-app`, package `@concrete-xyz/sdk` under `sdk/`.
- **Where to look:**
  - `sdk/index.ts` — public entry point and exported surface.
  - `sdk/vault/` — `getVault`, `getVaultDetails` (`AnyVaultDetails` shape),
    `getApyDetails`, conversion helpers, read/write methods. Method signatures,
    return types, and property names are canonical here.
  - `sdk/react/`, `sdk/recipes/` — the React/Wagmi hooks (`useVaultDeposit`,
    `useVaultWithdraw`, `useVaultUserBalance`, etc.) and their option defaults.
  - `sdk/types/` — generated GraphQL types.
- **History:** PR #119 (CONC-3734), "correct SDK reference docs against source".
  Its description enumerates the specific signature/return-shape/property-name
  corrections and is the reference for what tends to drift (fabricated members,
  misspelled properties, wrong defaults, network-name vs chainId).
- **Update cue:** any change to an exported method signature, return type,
  property name, hook option, or default in `@concrete-xyz/sdk`.

## How to refresh one of these articles

1. Clone or pull the upstream repo(s) for the article (see the table above).
2. Re-verify each technical claim against the listed paths. The original PR
   description for that article lists the specific claims that were corrected and
   is a good checklist of failure modes.
3. Apply the repo style rules from `STYLE-AND-TERMINOLOGY.md`.
4. Optionally run `/doc-review` (the doc-review skill) on the article. Its
   `clone_trust_patterns` / source-mapper automation overlaps with this file;
   keep the two consistent if you change repo locations.
