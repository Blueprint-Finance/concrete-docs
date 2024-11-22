---
title: "Overview"
description: "Concrete Protect: Technical Overview"
sidebar_label: "Overview"
sidebar_position: 0
---

**Concrete Protect** is Concrete Protocol's advanced liquidation prevention service, designed for users who require robust protection to avoid liquidation events entirely. Unlike Concrete Lite, which reduces liquidation penalties, Concrete Protect actively prevents liquidations by injecting capital into positions as Loan-to-Value (LTV) ratios approach risk thresholds.

## Key Components

Concrete Protect integrates proactive monitoring and automated credit injection to secure users’ positions in times of market volatility. Here’s a breakdown of its key functionalities:

### Credit Injection

At the heart of Concrete Protect is the **credit injection mechanism**, which prevents liquidation by recalibrating the LTV ratio of a loan when it approaches a critical level. Instead of waiting for the collateral to liquidate, Concrete Protect injects a credit line directly into the loan, reducing the LTV and pulling it back to safe levels.

### Tranche-Based Structure

Concrete Protect operates with a **tranche-based model**. Each tranche represents a line of credit that users purchase in advance, which activates automatically as the LTV nears the liquidation threshold. Users can purchase multiple tranches, which layer additional protective buffers to mitigate liquidation risk. This model provides granular control, allowing users to scale their protection based on the volatility of their collateral or their specific risk management goals.

### 30-Day Policy Cycle

Concrete Protect functions on a **30-day policy term**, with all fees structured upfront for transparency. Upon purchasing a policy, users gain credit protection for the full 30-day term, with predefined costs for each credit injection event. Users can renew or modify their coverage as needed at the end of each cycle.

### Transparent Cost Structure

Concrete Protect employs a fixed cost model, where users pay a single Opening Fee upon policy initiation and incur additional Claim Fees per credit injection. There is no ongoing interest on the injected credit, ensuring that users know their maximum protection cost in advance.

### Automated Management and User Notifications  

Once activated, Concrete Protect autonomously monitors LTV ratios and manages credit injections when necessary. Users receive notifications in their portfolio dashboard whenever a credit tranche is activated. Alerts may also be provided through external channels, like Telegram or Discord, for additional convenience.

## General Workflow

Concrete Protect follows a systematic workflow to ensure that user assets are secured without requiring continuous management from the user. Here’s a step-by-step outline of the technical operations within Concrete Protect:

### 1. LTV Monitoring

Concrete Protocol’s infrastructure continuously tracks the LTV ratio of each position protected by Concrete Protect. This is achieved through real-time asset pricing data, ensuring that any drop in collateral value or increase in debt is immediately detected.

### 2. Automatic Credit Injection

When the LTV nears the preset threshold, Concrete Protect activates the first available tranche, injecting credit into the loan. This injection recalibrates the LTV, providing a buffer against further market declines. The number of tranches purchased defines how many injections are available within a single 30-day policy cycle.

### 3. Sequential Tranche Activation

Each tranche is activated independently, one at a time, as the LTV ratio requires correction. This ensures that only the necessary amount of credit is deployed, preserving the remaining tranches for potential future needs within the same policy period.

### 4. User Notification

Users are notified in their portfolio dashboard each time a tranche is activated. Additional notifications can be enabled through Concrete’s external communication options, providing users with a seamless way to stay informed.

### 5. Post-Protection Procedures

If the market continues to decline after all tranches have been exhausted, Concrete Protect will aim for a controlled exit by closing the position in a way that maximizes the amount of collateral returned. This final exit strategy minimizes user losses and ensures that any remaining assets are returned in the most favorable manner possible.

## Fees

| **Fee Type**         | **Amount**                                           | **Denomination** | **Description**                                                                                                                                                |
|----------------------|------------------------------------------------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Opening Fee          | 0.5% - 0.65% of the promised amount                  | Collateral       | A one-time fee based on the user’s proximity to liquidation (LTV). Higher fees apply to users closer to liquidation, reflecting increased risk. The entire fee goes to the Concrete Treasury. |
| Claim Fee            | BTC: 1.65%, ETH: 2.95% per disbursed credit tranche  | Collateral       | Charged for each credit line disbursement (up to 3 times). 80% of this fee goes to the Earn Vault, rewarding liquidity providers, while 20% goes to the Concrete Treasury. |
| Early Cancellation Fee | 0%                                                  | N/A              | No fee for early cancellation, allowing users to cancel protection without penalty before the policy term ends.                                           |
| Foreclosure Fee      | 3.5% of the foreclosed amount                        | Collateral       | Similar to Concrete Lite, this fee replaces high liquidation penalties with a predictable 3.5% charge. The fee distribution mirrors Concrete Lite: 0.3% to Earn Vault, 3.2% to Concrete Treasury. |

## Ideal Use Cases

Concrete Protect is engineered for users who require proactive asset security and aim to avoid liquidation events under any circumstances. It is especially suited for:

- **High-Risk Positions**: Users with volatile assets that could experience rapid LTV increases benefit from Concrete Protect’s capital injection.
- **Strategic Investors**: Those aiming to maximize the longevity of their positions without actively monitoring market shifts.
- **Institutional and High-Net-Worth Users**: Investors managing larger portfolios that need granular control over liquidation thresholds and cost predictability.

## Concrete Protect vs. Concrete Lite

| **Feature**            | **Concrete Lite**                         | **Concrete Protect**                                              |
|------------------------|-------------------------------------------|-------------------------------------------------------------------|
| **Primary Purpose**    | Mitigate liquidation penalties            | Actively prevent liquidation through LTV management               |
| **Activation**         | Free (default with borrowing)                  | Optional, user-enabled protection policy                          |
| **LTV Management**     | Closes position pre-liquidation           | Injects credit to maintain safe LTV levels                        |
| **User Cost**          | 3.5% foreclosure fee if liquidated        | Opening Fee + Claim Fees per credit injection                     |
| **Policy Term**        | Automatic with borrow                     | 30-day renewable term with tranche-based credit injections        |
