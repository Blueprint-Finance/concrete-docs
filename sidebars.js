// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Overview',
      items: [
        'Overview/welcome',
        'Overview/yield-vaults-and-erc-4626-standard',
      ],
    },

    {
      type: 'category',
      label: 'Using Concrete Vaults',
      items: [
        'Using-Concrete-Vaults/concrete-vault-shares',
        'Using-Concrete-Vaults/deposit',
        'Using-Concrete-Vaults/withdraw',
        'Using-Concrete-Vaults/vault-transparency',
        'Using-Concrete-Vaults/bridging-and-depositing-with-enso',
        'Using-Concrete-Vaults/fees',
        'Using-Concrete-Vaults/concrete-points', 'Using-Concrete-Vaults/zz-public-adapter-smoke-1781715687041',
      ],
    },

    {
      type: 'category',
      label: 'Developers',
      items: [
        'Developers/architecture-core-concepts',
        {
          type: 'category',
          label: 'SDK',
          items: [
            'Developers/SDK/overview',
            'Developers/SDK/setup-configuration',
            {
              type: 'category',
              label: 'Read Methods',
              items: [
                'Developers/SDK/read-methods/balanceOf',
                'Developers/SDK/read-methods/getAddress',
                'Developers/SDK/read-methods/getUnderlyingDecimals',
                'Developers/SDK/read-methods/getVaultDetails',
                'Developers/SDK/read-methods/getVaultTransparencyStats',
                'Developers/SDK/read-methods/getAllWithdrawQueueRequests',
                'Developers/SDK/read-methods/previewConversion',
                'Developers/SDK/read-methods/totalAssets',
                'Developers/SDK/read-methods/symbol',
                'Developers/SDK/read-methods/decimals',
                'Developers/SDK/read-methods/applyDecimals',
                'Developers/SDK/read-methods/toUnderlyingDecimals',
              ],
            },
            {
              type: 'category',
              label: 'Write Methods',
              items: [
                'Developers/SDK/write-methods/approve',
                'Developers/SDK/write-methods/deposit',
                'Developers/SDK/write-methods/redeem',
                'Developers/SDK/write-methods/transfer',
                'Developers/SDK/write-methods/transferFrom',
              ],
            },
            'Developers/SDK/decimals-and-conversion-helpers',
            'Developers/SDK/examples',
            'Developers/SDK/troubleshooting-and-error-handling',
          ],
        },
        {
          type: 'category',
          label: 'Subgraph & Events',
          items: [
            'Developers/Subgraph-and-Events/schema-and-queries',
            'Developers/Subgraph-and-Events/event-reference-and-use-cases',
          ],
        },
      ],
    },

    {
      type: 'category',
      label: 'Live Vaults',
      items: [
        {
          type: 'category',
          label: 'Concrete DeFi USDT',
          items: [
            'Live-Vaults/DeFi-USDT/how-withdrawals-are-processed',
            'Live-Vaults/DeFi-USDT/important-disclosures',
          ],
        },
        'Live-Vaults/wbtc-vault',
      ],
    },

    {
      type: 'category',
      label: 'Completed Campaigns',
      items: [
        'Completed-Campaigns/overview',
        'Completed-Campaigns/bera',
        'Completed-Campaigns/stable',
        'Completed-Campaigns/corn',
        'Completed-Campaigns/morph',
        'Completed-Campaigns/tac',
        'Completed-Campaigns/pre-deposit-campaigns',
      ],
    },

    'Audits',
    'risks-and-safety',
    'restricted-jurisdictions',
    'glossary',
    'support',
  ],
};

export default sidebars;
