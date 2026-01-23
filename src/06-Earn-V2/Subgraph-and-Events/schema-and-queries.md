---
title: "Schema & Queries"
description: "Schema & Queries"
sidebar_label: "Schema & Queries"
---

The Earn V2 subgraph leverages the **Factory pattern** used in Earn V2 smart contracts to track all Vault instances created by this factory.

At factory level, the subgraph tracks top-level information (e.g., total vault count, deployment/migration events), while the main entities capture per-vault and per-strategy state.

:::tip
While all entities and vaults for each chain coexist and can be queried from the same subgraph, it is not possible to aggregate information across chains. Each chain requires a specific subgraph deployment; data is isolated per chain.
:::

## Factory

Although typically one factory exists per chain, the subgraph supports multiple.

Each factory stores:

```graphql
type Factory @entity(immutable: false) {
  id: Bytes!
  vaultCount: Int!
}
```

## Vault (Base Implementation)

The core `Vault` entity tracks all standard vault implementations (both Standard and Async).

```graphql
type Vault @entity(immutable: false) {
  id: Bytes!
  factory: Factory!
  allocateModule: Bytes!
  name: String!
  symbol: String!
  isAsync: Boolean!
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
  strategies: [Strategy]
}
```

**Tracked Events:**

- Deposits
- Withdrawals
- Yield Accrued

## Async Vault Extensions

Async vaults extend the base vault entity with epoch-based fields.

```graphql
type Vault @entity(immutable: false) {
  # Base implementation fields ...
  currentEpoch: BigInt!
  pastEpochUnclaimedAssets: BigDecimal!
  currentEpochRequestedShares: BigDecimal!
  nextEpochRequestedShares: BigDecimal!
}
```

**Tracked Events:**

- Epoch Processed
- Queued Withdrawal
- Request Cancelled
- Request Claimed
- Request Moved To Next Epoch

### WithdrawalQueue Entity

Tracks pending requests per user per epoch.

```graphql
type WithdrawalQueue @entity(immutable: true) {
  id: Bytes!
  vault: Vault!
  account: Account!
  receiver: Bytes!
  epochID: BigInt!
  shares: BigDecimal!
}
```

Created/updated on **Queued Withdrawal**, deleted on **Claimed** or **Cancelled**.

## Registered Vaults

Vaults can be imported into the Factory registry even if deployed elsewhere.

Once registered, the factory begins managing and updating their data.

:::tip
Historical data before registration may not be available.
To recover it, deploy a temporary subgraph for that vault, then import values on registration.
:::

## User Positions

User positions are represented through `Account` and `SharesBalance` entities.

```graphql
type Account @entity(immutable: false) {
  id: Bytes!
  sharesBalances: [SharesBalance]
  withdrawalQueue: [WithdrawalQueue]
}

type SharesBalance @entity(immutable: false) {
  id: Bytes!
  vault: Vault!
  account: Account!
  amount: BigDecimal!
  lastActivityTimestamp: BigInt!
}
```

:::tip
lastActivityTimestamp only updates on deposit or withdraw. Receiving transferred shares does **not** update this field.
:::

## Strategy

Each strategy attached to a vault is tracked as its own entity.

```graphql
type Strategy @entity(immutable: false) {
  id: Bytes!
  vault: Vault!
  strategyType: Int!
  allocatedValue: BigDecimal!
}
```

`allocatedValue` updates with each **StrategyYieldAccrued** event.

## Aggregations

Subgraphs build *time-series* aggregations for daily/hourly data.

### New Users by Vault

```graphql
type NewUserStats @aggregation(intervals: ["day"], source: "NewUser") {
  id: Int8!
  timestamp: Timestamp!
  vault: Vault!
  count: Int8! @aggregate(fn: "count")
  countCum: Int8! @aggregate(fn: "count", cumulative: true)
}
```

A “new user” is counted when they:

- Deposit for the first time in a vault, or
- Receive shares via transfer.

### New Users Global

Tracks new users **across all vaults** in the subgraph.

```graphql
type NewUserStats @aggregation(intervals: ["day"], source: "NewUser") {
  id: Int8!
  timestamp: Timestamp!
  vault: Vault!
  count: Int8! @aggregate(fn: "count")
  countCum: Int8! @aggregate(fn: "count", cumulative: true)
}
```

Triggered on first deposit, first transfer, or first withdrawal receipt across any vault.

### Vault Stats

```graphql
type VaultStats
  @aggregation(intervals: ["day"], source: "VaultBalanceUpdated") {
  id: Int8!
  timestamp: Int!
  vault: Vault!
  totalSupply: BigDecimal! @aggregate(fn: "avg", arg: "totalSupply")
  cachedTotalAssets: BigDecimal! @aggregate(fn: "avg", arg: "cachedTotalAssets")
  sharePrice: BigDecimal! @aggregate(fn: "avg", arg: "sharePrice")
}
```

### Vault Fees Stats

```graphql
type VaultFeesStats
  @aggregation(intervals: ["day"], source: "VaultFeesAccrued") {
  id: Int8!
  timestamp: Int!
  vault: Vault!
  managementFeeAccrued: BigDecimal!
    @aggregate(fn: "avg", arg: "managementFeeAccrued")
  managementFeeAccruedCum: BigDecimal!
    @aggregate(fn: "avg", arg: "managementFeeAccrued", cumulative: true)
  performanceFeeAccrued: BigDecimal!
    @aggregate(fn: "avg", arg: "performanceFeeAccrued")
  performanceFeeAccruedCum: BigDecimal!
    @aggregate(fn: "avg", arg: "performanceFeeAccrued", cumulative: true)
}
```
