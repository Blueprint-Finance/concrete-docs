// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Overview',
      items: [
        'Overview/welcome',
        'Overview/our-solution',
        'Overview/user-journey',
        'Overview/how-it-works',
        'Overview/quantitative-framework',
        'Overview/prerequisites',
        'Overview/quick-start',
      ],
    },

    {
      type: 'category',
      label: 'Earn V2',
      items: [
        'Earn-V2/overview',
        {
          type: 'category',
          label: 'Smart Contracts',
          items: [
            'Earn-V2/Smart-Contracts/architecture',
          ],
        },
        {
          type: 'category',
          label: 'SDK',
          items: [
            'Earn-V2/SDK/overview',
            'Earn-V2/SDK/quick-start',
            'Earn-V2/SDK/setup-configuration',
            {
              type: 'category',
              label: 'Read Methods',
              items: [
                'Earn-V2/SDK/read-methods/balanceOf',
                'Earn-V2/SDK/read-methods/getAddress',
                'Earn-V2/SDK/read-methods/getUnderlyingDecimals',
                'Earn-V2/SDK/read-methods/getVaultDetails',
                'Earn-V2/SDK/read-methods/previewConversion',
                'Earn-V2/SDK/read-methods/totalAssets',
                'Earn-V2/SDK/read-methods/symbol',
                'Earn-V2/SDK/read-methods/decimals',
                'Earn-V2/SDK/read-methods/applyDecimals',
                'Earn-V2/SDK/read-methods/toUnderlyingDecimals',
              ],
            },
            {
              type: 'category',
              label: 'Write Methods',
              items: [
                'Earn-V2/SDK/write-methods/approve',
                'Earn-V2/SDK/write-methods/deposit',
                'Earn-V2/SDK/write-methods/redeem',
                'Earn-V2/SDK/write-methods/transfer',
                'Earn-V2/SDK/write-methods/transferFrom',
              ],
            },
            'Earn-V2/SDK/decimals-and-conversion-helpers',
            'Earn-V2/SDK/examples',
            'Earn-V2/SDK/troubleshooting-and-error-handling',
          ],
        },
        {
          type: 'category',
          label: 'Subgraph & Events',
          items: [
            'Earn-V2/Subgraph-and-Events/schema-and-queries',
            'Earn-V2/Subgraph-and-Events/event-reference-and-use-cases',
          ],
        },
      ],
    },


    {
      type: 'category',
      label: 'Earn V1',
      items: [
        'Earn/deposit-into-vaults',
        'Earn/withdrawing-via-canopy',
        'Earn/ct-assets',
        'Earn/balance-accrual',
        'Earn/how-earn-vaults-maximize-risk-adjusted-yields',
        'Earn/money-market-margin',
      ],
    },


    {
         type: 'category',
         label: 'Vaults',
         items: [
           'Vaults/yield-vaults',
           'Vaults/yield-strategies',
           'Vaults/deprecation-guide',
           'Vaults/how-withdrawals-work',
           'Vaults/bridging-with-enso',
           {
             type: 'category',
             label: 'Bera',
             items: [
               'Vaults/Bera/wbera',
               'Vaults/Bera/pre-deposit-vaults-deprecation-guide',
               'Vaults/Bera/claim-and-transfer',
               'Vaults/Bera/claim-rewards',
               'Vaults/Bera/how-to-withdraw',
               'Vaults/Bera/request-address-change',
               'Vaults/Bera/unclaimed-rewards',
               'Vaults/Bera/boyco-depositors-claim',
             ],
           },
           {
             type: 'category',
             label: 'Stable',
             items: [
              'Vaults/Stable/stable-vaults',
              'Vaults/Stable/pendle-looping-vaults',
              'Vaults/Stable/claim',
             ],
           },
           {
             type: 'category',
             label: 'Corn',
             items: [
               'Vaults/Corn/overview',
             ],
           },
           {
             type: 'category',
             label: 'Morph',
             items: [
               'Vaults/Morph/overview',
             ],
           },

           {
             type: 'category',
             label: 'Tac',
             items: [
               'Vaults/Tac/vault-deprecation-guide',
             ],
           },
         ],
       },


/*
    {
      type: 'category',
      label: 'Borrow',
      items: [
        'Borrow/overview',
        'Borrow/enable-concrete',
        'Borrow/open-loan',
        'Borrow/open-loan-externally',
        'Borrow/close-loan',
      ],
    },
    {
      type: 'category',
      label: 'Protect',
      items: [
        'Protect/overview',
        'Protect/activate-concrete-protect',
      ],
    },
    */
    'fees',
    'rewards',
    'restrictions',
    'risks',
    'audits',
    'support',
  ],
};

export default sidebars;
