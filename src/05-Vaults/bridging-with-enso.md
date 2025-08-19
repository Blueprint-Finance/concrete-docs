---
title: "Bridging with Enso"
description: "Bridging with Enso"
sidebar_label: "Bridging with Enso"
---

Concrete now supports bridging directly into vaults from selected assets on Ethereum mainnet and other supported networks — powered by [Enso](https://www.enso.build/).

This feature is only available for vaults whose assets are supported by Enso’s routing. For example, you can bridge into Berachain vaults from USDC or ETH on Ethereum, but not all vaults (e.g. Katana) will support this feature.

**Example:**

- You start with **USDC** or **ETH** on Ethereum mainnet
- Enso **swaps** your asset into the vault’s required token (e.g., USDC → LBTC)
- That token is **bridged** to the destination chain (e.g., Berachain)
- The vault automatically **mints your shares** (e.g., `ctBeraLBTC`) and adds them to your portfolio

## Ensure You Control Your Destination Wallet

When you deposit with Enso, your assets are sent to the **same wallet address** on the destination chain (e.g., Berachain). Make sure you can control this same address on the destination chain so that you’ll be able to withdraw your funds in the future.

## How It Works

1. Select a supported asset from your wallet (on Ethereum mainnet or another supported chain).
2. Select your destination vault, Enso will calculate the optimal route.
3. **Enso route execution**
    - If needed, Enso will swap your asset into the vault’s underlying token
    - The asset is then bridged to the vault’s network
    - Deposited into the vault and converted into vault shares
4. Receive vault shares, your vault shares appear in your portfolio just like a direct deposit.
5. Withdrawals happen directly from the destination chain vault into your wallet. You must control the same wallet address on the destination chain. If you don’t, you won’t be able to withdraw your funds later.

## Why This is Useful

- No need to manually swap or bridge assets first
- Reduces the number of steps (and transactions) needed to enter a vault
- Enso automatically finds a competitive route for swaps and bridges

## Price Impact & Gas Costs

When you bridge into a Concrete vault using Enso, your transaction may include swaps and bridging steps. This can involve the following costs and effects:

### Price Impact

- Enso simulates each route and returns an estimated `priceImpact`, showing how much the trade might shift the market price.
- This accounts for slippage across all swaps and bridge operations in the route.
- Small deposits (e.g., ~$100) may face higher price impact if the trade routes through illiquid pools.
- Large deposits can also experience price impact if the amount exceeds the liquidity available on the preferred route or provider.
- Higher liquidity assets (e.g., USDC, WETH) typically have lower price impact.
- Thinly traded or volatile assets can have higher price impact.
- For cross-chain operations, it’s common to allow **slightly higher slippage** (3–5%) vs. single-chain swaps (0.5–1%).

### Gas Costs

- **Gas Estimation** — Enso returns a `gas` estimate from simulation to help avoid out-of-gas errors.
- **Multi-Chain Gas** — For recursive bridging, LayerZero’s “native drop” feature allows paying all gas fees up front on the origin chain.
- **Standard Blockchain Gas Fees** — Apply on both the source and destination chains, depending on the route.

### Bridge Protocol Fees

- Underlying bridge protocols (e.g., Stargate) may charge **bridge fees**.
- These are shown in the route’s `feeAmount` field and are already included in the final output amount you see before confirming.
- Enso itself does **not** charge an additional protocol fee — only the bridge protocol fees and standard gas apply.

### Key Route Info You’ll See

- `priceImpact` — Expected price impact from simulation
- `gas` — Estimated gas usage for the transaction
- `feeAmount` — Bridge protocol fees included in the route
- `amountOut` — Final output after all fees and slippage

For more technical details and examples, read:

- [Enso Bridging Examples](https://docs.enso.build/pages/build/examples/bridging)
- [Recursive Bridging](https://docs.enso.build/pages/build/examples/recursive-bridging)

## Supported Assets & Vaults

We’re starting with a limited set of supported assets and vaults, and will expand over time.
You can always see the currently available options directly in the app.

## Need Help?

If you run into any issues bridging into a vault:

- Ask in our [Concrete Discord](https://discord.gg/concretexyz)
- Email us at [support@blueprintfinance.com](mailto:support@blueprintfinance.com)

## FAQ

**Q: Can I bridge *out* of a vault using Enso?**
A: Currently, this feature is for bridging **into** vaults. To exit, withdraw from the vault first, then bridge your assets manually if needed.

**Q: Is there a minimum deposit amount?**
A: Yes — the minimum depends on the vault’s underlying asset and the route cost. The app will warn you if your amount is too small to be efficient after fees.

**Q: What happens if my bridging transaction fails?**
A: If the route fails, your starting asset remains in your wallet. You can retry with a different amount or wait for better liquidity.

**Q: Do I need to approve assets before bridging?**
A: Yes — for ERC20 tokens like USDC, you’ll be prompted to approve the token before the first bridge transaction.

**Q: Can I see the exact fees before confirming?**
A: Absolutely — Enso displays estimated price impact, gas cost, and bridge fees before you approve.
