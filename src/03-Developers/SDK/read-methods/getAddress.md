---
title: "getAddress()"
description: "Read-method reference for getAddress() in the Concrete Earn V2 SDK, including expected inputs, outputs, and usage context."
sidebar_label: "getAddress()"
---

Returns the **onchain address** of the vault contract.

## Parameters

- *None*

## Returns

- `string` — the vault contract address.

## Example

```tsx
const vaultAddr = vault.getAddress();
console.log("Vault contract address:", vaultAddr);
```

## Example Response

```json
"0x15cE9bE6609db102b70D68ca75a39c555bEa5Fac"
```
