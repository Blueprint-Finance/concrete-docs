---
title: "Decimals & Conversion Helpers"
description: "helpers cache vault decimals internally (faster) to handle conversions consistently"
sidebar_label: "Decimals & Conversion Helpers"
---

Working with raw `BigInt` values is error-prone.

The following helpers cache vault decimals internally (faster) to handle conversions consistently:

| Conversion | Helper Method |
| --- | --- |
| Shares → human-readable | `vault.applyDecimals(bigint)` |
| Human → shares BigInt | `vault.toBigInt("1.0")` |
| Underlying → human-readable | `vault.toUnderlayingDecimals(bigint)` |
| Human → underlying BigInt | `vault.toUnderlyingBigInt("1.0")` |
