---
title: "Decimals & Conversion Helpers"
description: "Concrete Earn V2 SDK documentation for decimals & Conversion Helpers, with implementation guidance for production-grade integrations."
sidebar_label: "Decimals & Conversion Helpers"
---

Working with raw `BigInt` values is error-prone.

The following helpers cache vault decimals internally and handle conversions consistently:

| Conversion | Helper |
| --- | --- |
| Shares to human-readable | `vault.applyDecimals(bigint)` |
| Human to shares `BigInt` | `vault.toBigInt("1.0")` |
| Underlying to human-readable | `vault.toUnderlyingDecimals(bigint)` |
| Human to underlying `BigInt` | `vault.toUnderlyingBigInt("1.0")` |
