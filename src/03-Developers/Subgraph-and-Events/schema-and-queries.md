---
title: "Schema & Queries"
description: "Schema and query documentation for the Earn V2 subgraph, covering factory and vault entities, async extensions, user positions, strategies, daily aggregations, and example GraphQL queries."
sidebar_label: "Schema & Queries"
---

# Schema & Queries

This page is for integrators and analytics developers querying the Earn V2 Subgraph. It documents the GraphQL entities exposed by the subgraph, how they relate to one another, and includes example queries against the most common access patterns. Each chain is a separate subgraph deployment and data is not aggregated across chains.

The subgraph uses The Graph's factory-pattern templates: `ConcreteFactory` is the root data source and each deployed vault is tracked through a `ConcreteVault` template instance created when the factory emits `Deployed` or `VaultRegistered`.

:::info
Exactly one `ConcreteFactory` exists per chain. The subgraph is built once per supported chain (Ethereum mainnet, Arbitrum One, Stable), and each deployment indexes that chain's single factory address declared in `networks.json`.
:::

## Factory

Each factory stores the entity below. Only `id` and `vaultCount` are commonly queried; `roleMembers` is a reverse-derived list used for access-control introspection.

```graphql
type Factory @entity(immutable: false) {
  id: Bytes!
  vaultCount: Int!
  roleMembers: [RoleMember!]! @derivedFrom(field: "factory")
}
```

## Vault

The core `Vault` entity covers both standard and async implementations. Async fields are populated only on async vaults; standard vaults leave them at their initial values.

```graphql
type Vault @entity(immutable: false) {
  id: Bytes!
  factory: Factory!

  allocateModule: Bytes!
  name: String!
  symbol: String!
  decimals: BigInt!
  isAsync: Boolean!
  imported: Boolean!

  underlyingAsset: Token!

  totalSupply: BigDecimal!
  cachedTotalAssets: BigDecimal!
  sharePrice: BigDecimal!

  totalManagementFeeAccrued: BigDecimal!
  totalPerformanceFeeAccrued: BigDecimal!
  totalHistoricalDeposits: BigDecimal!
  totalHistoricalWithdrawals: BigDecimal!

  createdAtBlockNumber: BigInt!
  createdAtBlockTimestamp: BigInt!
  createdAtTransactionHash: Bytes!
  strategies: [Strategy!]! @derivedFrom(field: "vault")

  # Async vaults only
  isQueueActive: Boolean!
  currentEpoch: BigInt!
  latestProcessedEpoch: BigInt!
  pastEpochUnclaimedAssets: BigDecimal!
  processingEpochRequestedShares: BigDecimal!
  currentEpochRequestedShares: BigDecimal!
  nextEpochRequestedShares: BigDecimal!

  withdrawalQueue: [WithdrawalQueue!]! @derivedFrom(field: "vault")
  epochs: [Epoch!]! @derivedFrom(field: "vault")
}
```

Tracked events: `Deposit`, `Withdraw`, `YieldAccrued`, `ManagementFeeAccrued`, `PerformanceFeeAccrued`. Full event-to-entity mapping is in the [Event Reference](./event-reference-and-use-cases.md).

## WithdrawalQueue

Tracks pending requests per user per epoch. Created on `QueuedWithdrawal`, updated on `RequestClaimed` (sets `isClaimed = true`) and `RequestMovedToNextEpoch`, and removed from the store on `RequestCancelled`. `PriorityWithdrawalClaimed` also writes here: it drains the user's open rows in the active epoch (oldest first), writing a separate claimed-snapshot row when a row is partially consumed. Mutable because handlers update `isClaimed`, `shares`, `sharesRaw`, `movedFromEpoch`, and the `last*` cursor fields after creation.

```graphql
type WithdrawalQueue @entity(immutable: false) {
  id: Bytes!
  vault: Vault!
  account: Account!
  receiver: Bytes!
  epochID: BigInt!
  epoch: Epoch!
  shares: BigDecimal!
  sharesRaw: BigInt!
  isClaimed: Boolean!
  movedFromEpoch: BigInt
  lastBlockNumber: BigInt!
  lastBlockTimestamp: BigInt!
  lastTransactionHash: Bytes!
  lastTransactionLogIndex: BigInt!
}
```

Tracked events: `EpochProcessed`, `QueuedWithdrawal`, `RequestCancelled`, `RequestClaimed`, `RequestMovedToNextEpoch`, `PriorityWithdrawalClaimed`.

## PriorityWithdrawalClaimed

Immutable per-claim record of a priority (fast-track) withdrawal on an async vault. An off-chain executor holding the `PRIORITY_WITHDRAWAL_EXECUTOR` role on `ConcreteAsyncVaultImpl` calls `claimPriorityWithdrawal` to fulfil part of a user's queued shares in the active epoch ahead of the normal epoch-processing flow. The user receives `netAssets = grossAssets - unwindCost` immediately; `unwindCost` is bounded by the vault's `unwindCostCapBP` (basis points) and is debited from the strategy's reported allocation via `IAsyncAccounting.adjustTotalAssets`, so the next yield accrual reconciles the strategy's tracked value.

```graphql
type PriorityWithdrawalClaimed @entity(immutable: true) {
  id: Bytes!
  vault: Vault!
  user: Bytes!
  shares: BigDecimal!
  grossAssets: BigDecimal!
  unwindCost: BigDecimal!
  netAssets: BigDecimal!
  epochID: BigInt!
  blockNumber: BigInt!
  blockTimestamp: BigInt!
  transactionHash: Bytes!
}
```

`shares` is the amount of queued shares burned for this claim. `grossAssets` is the assets that those shares would have been worth at the current exchange rate; `netAssets` is what actually reaches the user after `unwindCost`. `epochID` is the active epoch the claim was drawn from.

## Registered vaults

Vaults can be imported into the Factory registry even when deployed elsewhere. Once registered, the factory begins managing and updating their data.

:::info
Historical data before registration is not available. To recover it, deploy a temporary subgraph for that vault and import values on registration.
:::

## User positions

User positions are represented through the `Account` and `SharesBalance` entities. Both list fields on `Account` are reverse-derived from the foreign-key field on the child entity.

```graphql
type Account @entity(immutable: false) {
  id: Bytes!
  sharesBalances: [SharesBalance!]! @derivedFrom(field: "account")
  withdrawalQueue: [WithdrawalQueue!]! @derivedFrom(field: "account")
}

type SharesBalance @entity(immutable: false) {
  id: Bytes!
  vault: Vault!
  account: Account!
  amount: BigDecimal!
  lastActivityTimestamp: BigInt!
}
```

:::info
`lastActivityTimestamp` updates on `Deposit` and `Withdraw` only. Receiving transferred shares via `Transfer` does not update this field.
:::

## Strategy

Each strategy attached to a vault is tracked as its own entity. `vault` is nullable because a strategy can exist before it is added to a vault (created by the chain-wide `Initialized` listener) and after it is removed (`handleStrategyRemoved` sets `vault = null`); the alternative `0x000…000` sentinel broke GraphQL queries on `strategy.vault.id` for orphan strategies.

```graphql
type Strategy @entity(immutable: false) {
  id: Bytes!
  vault: Vault
  strategyType: Int!
  allocatedValue: BigDecimal!
  roleMembers: [RoleMember!]! @derivedFrom(field: "strategy")
}
```

`allocatedValue` is updated by `StrategyYieldAccrued`, `AllocateFunds`, `DeallocateFunds`, `StrategyWithdraw`, and `AdjustTotalAssets` (multisig strategies).

## Aggregations

The subgraph builds daily aggregations from internal `@entity(timeseries: true)` rows emitted by the vault handlers. See [Timeseries sources for daily aggregations](./event-reference-and-use-cases.md#timeseries-sources-for-daily-aggregations) for the mapping of source rows to aggregations.

### NewUserStats (per vault)

Counts unique `(vault, account)` first appearances per day.

```graphql
type NewUserStats @aggregation(intervals: ["day"], source: "NewUser") {
  id: Int8!
  timestamp: Timestamp!
  vault: Bytes!
  count: Int8! @aggregate(fn: "count")
  countCum: Int8! @aggregate(fn: "count", cumulative: true)
}
```

A new user is counted the first time a `(vault, account)` pair appears in any indexed event: the first `Deposit` or `Withdraw` for that owner, or the first `Transfer` involving that account as sender or receiver (excluding mint and burn legs).

### NewUserGlobalStats (across all vaults)

Counts unique addresses across the entire protocol per day. There is no `vault` field; the aggregation is intentionally global.

```graphql
type NewUserGlobalStats
  @aggregation(intervals: ["day"], source: "NewUserGlobal") {
  id: Int8!
  timestamp: Timestamp!
  count: Int8! @aggregate(fn: "count")
  countCum: Int8! @aggregate(fn: "count", cumulative: true)
}
```

A new global user is counted on the first `Account` creation for an address. Triggering handlers are `handleDeposit`, `handleWithdraw`, `handleTransfer` (either side), `handleQueuedWithdrawal` (receiver, on a new queue entry), and `handleRequestMovedToNextEpoch` (user).

### VaultStats

Daily vault balance snapshots, sampled by aggregating with `fn: "last"` on each day's final `VaultBalanceUpdated` row.

```graphql
type VaultStats
  @aggregation(intervals: ["day"], source: "VaultBalanceUpdated") {
  id: Int8!
  timestamp: Timestamp!
  vault: Bytes!
  totalSupply: BigDecimal! @aggregate(fn: "last", arg: "totalSupply")
  cachedTotalAssets: BigDecimal!
    @aggregate(fn: "last", arg: "cachedTotalAssets")
  sharePrice: BigDecimal! @aggregate(fn: "last", arg: "sharePrice")
}
```

### VaultFeesStats

Daily and cumulative totals for management and performance fees, summed from the `VaultFeesAccrued` rows the fee handlers emit.

```graphql
type VaultFeesStats
  @aggregation(intervals: ["day"], source: "VaultFeesAccrued") {
  id: Int8!
  timestamp: Timestamp!
  vault: Bytes!
  managementFeeAccrued: BigDecimal!
    @aggregate(fn: "sum", arg: "managementFeeAccrued")
  managementFeeAccruedCum: BigDecimal!
    @aggregate(fn: "sum", arg: "managementFeeAccrued", cumulative: true)
  performanceFeeAccrued: BigDecimal!
    @aggregate(fn: "sum", arg: "performanceFeeAccrued")
  performanceFeeAccruedCum: BigDecimal!
    @aggregate(fn: "sum", arg: "performanceFeeAccrued", cumulative: true)
}
```

## Example queries

The Graph auto-generates plural lowercase query roots from each entity type (`Factory` → `factories`, `Vault` → `vaults`, `WithdrawalQueue` → `withdrawalQueues`), and a singular lowercase root for each aggregation (`VaultStats` → `vaultStats`).

### List vaults for a factory

The `Factory` entity has no reverse-derived `vaults` field, so query the top-level `vaults` root and filter by `factory`.

```graphql
{
  factories {
    id
    vaultCount
  }
  vaults(where: { factory: "0x..." }) {
    id
    name
    sharePrice
    totalSupply
  }
}
```

### Query daily vault stats

`VaultStats.vault` is a `Bytes!` address scalar, not a `Vault` reference. Resolve the vault name via a separate `vaults(where: { id: $address })` lookup if needed.

```graphql
{
  vaultStats(interval: day, first: 30) {
    timestamp
    vault
    totalSupply
    sharePrice
  }
}
```

### Pending withdrawal queue for a vault

```graphql
{
  withdrawalQueues(where: { vault: "0x123..." }) {
    account {
      id
    }
    epochID
    shares
    isClaimed
  }
}
```
