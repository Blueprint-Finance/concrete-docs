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
      label: 'Earn',
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
               'Vaults/Bera/berabaddies-earn-deprecation-guide',
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
             label: 'Corn',
             items: [
               'Vaults/Corn/overview',
               'Vaults/Corn/vault-deprecation-guide',
             ],
           },
           {
             type: 'category',
             label: 'Morph',
             items: [
               'Vaults/Morph/overview',
               'Vaults/Morph/vault-deprecation-guide',
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
    'fees',
    'rewards',
    'restrictions',
    'risks',
    'audits',
    'support',
  ],
};

export default sidebars;
