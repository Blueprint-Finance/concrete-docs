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
        'Earn/yield-vaults',
        'Earn/yield-strategies',
        'Earn/balance-accrual',
        'Earn/how-earn-vaults-maximize-risk-adjusted-yields',
        'Earn/money-market-margin',
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
    'audits',
    'support',
  ],
};

export default sidebars;
