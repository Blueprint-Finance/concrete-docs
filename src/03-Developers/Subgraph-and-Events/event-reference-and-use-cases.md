---
title: "Event Reference"
description: "Event reference documentation for the Earn V2 subgraph, covering factory events, vault events, async vault events, strategy events, and the timeseries sources behind daily aggregations."
sidebar_label: "Event Reference"
---

# Event Reference

This reference is for integrators and analytics developers consuming the Earn V2 Subgraph. It lists the on-chain events the subgraph indexes, the entities each handler updates, and the subgraph-internal timeseries entities that feed daily aggregations. Use it together with the [Schema & Queries](./schema-and-queries.md) page, which defines the entities referenced here.

## Factory-level events

Emitted by `ConcreteFactory`. Names are the on-chain identifiers as declared in `IConcreteFactory`.

| Event | Entity updated | Description |
| --- | --- | --- |
| `Deployed` | Factory, Vault | New vault instance created by the factory. |
| `Migrated` | Factory | Vault implementation migrated to a newer version. |
| `VaultRegistered` | Factory, Vault | External vault imported into the registry. |
| `ApprovedImplementation` | Factory | Implementation address approved for use. |

## Vault-level events

Emitted by the standard vault implementation (`ConcreteStandardVaultImpl`). `Deposit` and `Withdraw` are inherited from [ERC-4626](/glossary/#erc-4626).

| Event | Entity updated | Description |
| --- | --- | --- |
| `Deposit` | Vault, Account, SharesBalance, DepositorAccount | User deposit; increases vault total supply. |
| `Withdraw` | Vault, Account, SharesBalance | User withdrawal; decreases vault total supply. |
| `YieldAccrued` | Vault | Updates the vault's cached total assets and share price. |
| `ManagementFeeAccrued` | Vault | Adds to `totalManagementFeeAccrued`. |
| `PerformanceFeeAccrued` | Vault | Adds to `totalPerformanceFeeAccrued`. |

## Async vault events

Emitted by `ConcreteAsyncVaultImpl`. The handlers maintain epoch state on the Vault entity and the `WithdrawalQueue` collection.

| Event | Entity updated | Description |
| --- | --- | --- |
| `EpochProcessed` | Vault | New epoch finalized; updates `pastEpochUnclaimedAssets`, `processingEpochRequestedShares`, `latestProcessedEpoch`. |
| `QueuedWithdrawal` | WithdrawalQueue | User creates a pending withdrawal. |
| `RequestCancelled` | WithdrawalQueue | Pending request removed from the queue. |
| `RequestClaimed` | WithdrawalQueue | Existing queue entry marked claimed (`isClaimed = true`). |
| `RequestMovedToNextEpoch` | WithdrawalQueue | Request shifted from one epoch to the next. |
| `PartialEpochRequestProcessed` | Vault, WithdrawalQueue, Epoch, PartialEpochRequestProcessed | An individual user's request is fulfilled from a closed-but-unprocessed epoch (the contract requires `epochID == latestEpochID - 1`). Burns the user's shares and transfers the corresponding assets, drains their open queue rows in that epoch (oldest first, splits if needed) and writes a claimed snapshot row, decreases `Epoch.shares`, `Vault.processingEpochRequestedShares`, and `cachedTotalAssets`, and increases `totalHistoricalWithdrawals` by `assets`. |
| `PriorityWithdrawalClaimed` | Vault, WithdrawalQueue, Epoch, PriorityWithdrawalClaimed | Priority (fast-track) exit fulfilled by an executor against the active epoch. Pays `grossAssets - unwindCost` to the user, drains their open queue rows in that epoch (oldest first, splits if needed) and writes a claimed snapshot row, decreases `Epoch.shares`, `Vault.currentEpochRequestedShares`, and `cachedTotalAssets`, and increases `totalHistoricalWithdrawals` by `netAssets`. |

`PartialEpochRequestProcessed` is gated on-chain by the `WITHDRAWAL_MANAGER` role and lets a single user's queued shares be fulfilled out of the closed epoch ahead of the full `EpochProcessed` cycle.

Priority withdrawals are gated on-chain by the `PRIORITY_WITHDRAWAL_EXECUTOR` role on `ConcreteAsyncVaultImpl`. The `unwindCost` charged on each claim is bounded by the vault's `unwindCostCapBP` (basis points) and is applied against the strategy's reported allocation through `IAsyncAccounting.adjustTotalAssets`, so the next yield accrual reconciles the strategy's tracked value without double counting.

## Strategy events

| Event | Source contract | Entity updated | Description |
| --- | --- | --- | --- |
| `StrategyYieldAccrued` | `ConcreteStandardVaultImpl` (emitted by the vault while accounting for a strategy's yield) | Strategy | Updates `allocatedValue` and writes a `StrategyYieldAccrued` entity carrying yield and loss. |
| `StrategyWithdraw` | `BaseStrategy` | Strategy | Reduces `allocatedValue`. |
| `AllocateFunds` | `BaseStrategy` | Strategy | Increases `allocatedValue`. |
| `DeallocateFunds` | `BaseStrategy` | Strategy | Reduces `allocatedValue`. |
| `AdjustTotalAssets` | `MultisigStrategy` | Strategy | Overwrites `allocatedValue` with the reported total assets. Access gated by `STRATEGY_ADMIN` or `OPERATOR_ROLE`, plus the bound vault via `onlyVault`. |
| `AssetsForwarded` | `MultisigStrategy` | AssetsForwarded | Records that the bound vault forwarded assets to the off-chain multisig holder. Reachable only via `BaseStrategy.allocateFunds` (`onlyVault`). |
| `AssetsRetrieved` | `MultisigStrategy` | AssetsRetrieved | Records that assets were pulled back from the multisig holder. Reachable only via `BaseStrategy.deallocateFunds` or `onWithdraw` (`onlyVault`). |

## Timeseries sources for daily aggregations

The following are not on-chain events. They are subgraph-internal `@entity(timeseries: true)` rows the mappings emit so the daily aggregations in the [Schema & Queries](./schema-and-queries.md) page have a per-row source.

| Timeseries entity | Written by | Feeds aggregation |
| --- | --- | --- |
| `VaultBalanceUpdated` | Vault handlers whenever `totalSupply`, `cachedTotalAssets`, or `sharePrice` change. | `VaultStats` |
| `VaultFeesAccrued` | `ManagementFeeAccrued` and `PerformanceFeeAccrued` handlers. | `VaultFeesStats` |
| `NewUser` | `fetchSharesBalance`, the first time a `(vault, account)` pair appears in any indexed event. | `NewUserStats` |
| `NewUserGlobal` | `fetchAccount`, the first time an address appears anywhere in the protocol. | `NewUserGlobalStats` |
