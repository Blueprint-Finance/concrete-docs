---
title: "applyDecimals(amount)"
description: "Read-method reference for applyDecimals(amount) in the Concrete Earn V2 SDK, including expected inputs, outputs, and usage context."
sidebar_label: "applyDecimals(amount)"
---

Converts a raw `BigInt` amount into a human-readable decimal-adjusted value using the vault's share decimals. Use it to display vault share balances and to convert share amounts into a display-friendly format.

## Parameters

- `amount: bigint`: raw token amount in base units.

## Returns

- `Promise<number>`: numeric value with decimals applied.

## Example

```tsx
const rawShares = BigInt("1000000000000000000"); // 1 ctAsset in base units
const display = await vault.applyDecimals(rawShares);
console.log("Formatted vault shares:", display);
```

## Example response

```json
1.0
```

---

<!-- Added by Roadmap Docs Autopilot from approved review (run 27774904469). Non-destructive append; a docs maintainer integrates this section during PR review. -->

**Why:** The pack's signature is `applyDecimals(amount: anyNumber, precision?: number): Promise<number>`, but the Parameters section lists only `amount: bigint` and omits the new optional `precision` parameter added in this PR.

**Suggested fix:**

Add a second parameter bullet: `- \`precision?: number\`: optional number of decimal places to round the result to. When omitted, the full decimal-adjusted value is returned.` Also broaden the amount type to `number | string | bigint`.
