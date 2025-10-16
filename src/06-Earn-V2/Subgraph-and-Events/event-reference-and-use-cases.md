---
title: "Schema & Queries"
description: "Schema & Queries"
sidebar_label: "Schema & Queries"
---

This reference lists all key on-chain events tracked by the Earn V2 subgraph and how they update entities.

## Factory-Level Events

| Event | Entity Updated | Description |
| --- | --- | --- |
| **VaultDeployed** | Factory, Vault | New vault instance created by factory |
| **VaultMigrated** | Factory, Vault | Migrated vault from older version |
| **VaultRegistered** | Factory, Vault | External vault imported into registry |
| **ApprovedImplementation** | Factory | Implementation added to upgrade list |

## Vault-Level Events

| Event | Entity Updated | Description |
| --- | --- | --- |
| **Deposit** | Vault, Account, SharesBalance | User deposit; increases vault total supply |
| **Withdraw** | Vault, Account, SharesBalance | User withdrawal; decreases supply |
| **YieldAccrued** | Vault | Reflects updated yield and share price |
| **ManagementFeeAccrued** | Vault | Adds to `totalManagementFeeAccrued` |
| **PerformanceFeeAccrued** | Vault | Adds to `totalPerformanceFeeAccrued` |

## Async Vault Events

| Event | Entity Updated | Description |
| --- | --- | --- |
| **EpochProcessed** | Vault | New epoch finalized |
| **QueuedWithdrawal** | WithdrawalQueue | User creates pending withdrawal |
| **RequestCancelled** | WithdrawalQueue | Request deleted from queue |
| **RequestClaimed** | WithdrawalQueue | Marks claim complete |
| **RequestMovedToNextEpoch** | WithdrawalQueue | Shifts request to next epoch |

## Strategy Events

| Event | Entity Updated | Description |
| --- | --- | --- |
| **StrategyYieldAccrued** | Strategy | Updates `allocatedValue` and yield accounting |
| **StrategyWithdraw** | Strategy | Reduces allocated value |
| **AllocateFunds** | Strategy | Increases allocation; emitted by `AllocateModule` |
| **DeallocateFunds** | Strategy | Moves funds back to vault |
| **AdjustTotalAssets** | Strategy | (Multisig) Adjusts position value manually |
| **AssetsForwarded** | Strategy | (Multisig) Confirms custody movement |
| **AssetsRetrieved** | Strategy | (Multisig) Confirms returned funds |

## Aggregation Event Sources

| Event | Used For | Description |
| --- | --- | --- |
| **VaultBalanceUpdated** | `VaultStats` | Tracks share price and assets over time |
| **VaultFeesAccrued** | `VaultFeesStats` | Aggregates daily fee data |
| **NewUser** | `NewUserStats` | Tracks first-time depositor/receiver actions |

## Typical Query Examples

**Query all vaults for a factory:**

```graphql
{
  factories {
    id
    vaultCount
    vaults {
      id
      name
      sharePrice
      totalSupply
    }
  }
}
```

**Query daily vault stats:**

```graphql
{
  vaultStats(interval: day, first: 30) {
    timestamp
    vault { name }
    totalSupply
    sharePrice
  }
}
```

**Query pending withdrawal queue for a vault:**

```graphql
{
  withdrawalQueues(where: { vault: "0x123..." }) {
    account { id }
    epochID
    shares
  }
}
```
