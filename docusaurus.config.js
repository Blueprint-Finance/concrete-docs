// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

require('dotenv').config();

const vercelEnv = process.env.VERCEL_ENV;
const isProd = vercelEnv === "production";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Concrete Docs',
  tagline: 'Institutional-grade on-chain yield infrastructure documentation',
  favicon: 'img/logo.png',
  customFields: {
    metacrmApiKey: process.env.METACRM_API_KEY,
  },
  clientModules: [
    ...(process.env.METACRM_API_KEY ? [require.resolve('./src/metaCRMWidget.js')] : []),
  ],

  // Set the production url of your site here
  url: 'https://docs.concrete.xyz',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: true, // Ensure static hosting serves deep links (Vercel-friendly)

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Blueprint-Finance', // Usually your GitHub org/user name.
  projectName: 'Blueprint-Finance', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  // The glossary uses inline HTML anchors (`<a id>`) so each term can be
  // deep-linked without forcing one heading per term. Docusaurus's
  // broken-anchor checker only sees heading-generated anchors, so we tell
  // it to ignore otherwise-fine inline anchors here.
  onBrokenAnchors: 'ignore',
  noIndex: !isProd,  // Prevent non-production from being indexed

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: './src', // or './pages' if you use a different folder
          routeBasePath: '/', // Serve docs at the root
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Blueprint-Finance/concrete-docs/tree/main',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Blueprint-Finance/concrete-docs/tree/main',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'datetime',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/search', '/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/concrete-mark.png',
      metadata: [
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Concrete Docs' },
        { name: 'twitter:description', content: 'Official Concrete documentation for on-chain yield infrastructure, Earn V2, SDK integrations, vault operations, and risk disclosures.' },
        { name: 'twitter:image', content: 'https://docs.concrete.xyz/img/concrete-mark.png' },
        { name: 'twitter:site', content: '@ConcreteXYZ' },
        { property: 'og:title', content: 'Concrete Docs' },
        { property: 'og:description', content: 'Official Concrete documentation for on-chain yield infrastructure, Earn V2, SDK integrations, vault operations, and risk disclosures.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://docs.concrete.xyz/' },
        { property: 'og:site_name', content: 'Concrete Docs' },
        { property: 'og:image', content: 'https://docs.concrete.xyz/img/concrete-mark.png' },
      ],
      navbar: {
        logo: {
          alt: 'Concrete Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: "doc",
            docId: "Overview/welcome",
            position: "left",
            label: "Docs"
          },
          /*{
              type: "doc",
              docId: "support",
              position: "right",
              label: "Support"
          },*/
          /* {
              type: 'docSidebar',
              sidebarId: 'tutorialSidebar',
              position: 'left',
              label: 'Tutorial',
            },
            {to: '/blog', label: 'Blog', position: 'left'},
            {
              href: 'https://github.com/facebook/docusaurus',
              label: 'GitHub',
              position: 'right',
            },*/
        ],
      },
      footer: {
        style: 'dark',
        /*links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],*/
      },

      algolia: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: 'concrete',
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          { from: '/Vaults/morphL2-vault-deprecation-guide', to: '/Completed-Campaigns/overview' },
          { from: '/Vaults/Bera/vault-deprecation-guide', to: '/Completed-Campaigns/overview' },
          { from: '/Vaults/Bera/berabaddies-earn-deprecation-guide', to: '/Completed-Campaigns/overview' },
          { from: '/Vaults/Corn/vault-deprecation-guide', to: '/Completed-Campaigns/overview' },
          { from: '/Vaults/Morph/vault-deprecation-guide', to: '/Completed-Campaigns/overview' },
          { from: '/Vaults/deprecation-guide', to: '/Completed-Campaigns/overview' },

          // CONC-3738 IA restructure
          { from: '/Earn-V2/overview', to: '/Overview/yield-vaults-and-erc-4626-standard' },
          { from: '/Earn-V2/Smart-Contracts/architecture', to: '/Developers/architecture-core-concepts' },
          { from: '/Earn-V2/SDK/overview', to: '/Developers/SDK/overview' },
          { from: '/Earn-V2/SDK/setup-configuration', to: '/Developers/SDK/setup-configuration' },
          { from: '/Earn-V2/SDK/quick-start', to: '/Developers/SDK/quick-start' },
          { from: '/Earn-V2/SDK/decimals-and-conversion-helpers', to: '/Developers/SDK/decimals-and-conversion-helpers' },
          { from: '/Earn-V2/SDK/examples', to: '/Developers/SDK/examples' },
          { from: '/Earn-V2/SDK/troubleshooting-and-error-handling', to: '/Developers/SDK/troubleshooting-and-error-handling' },
          { from: '/Earn-V2/SDK/read-methods/applyDecimals', to: '/Developers/SDK/read-methods/applyDecimals' },
          { from: '/Earn-V2/SDK/read-methods/balanceOf', to: '/Developers/SDK/read-methods/balanceOf' },
          { from: '/Earn-V2/SDK/read-methods/decimals', to: '/Developers/SDK/read-methods/decimals' },
          { from: '/Earn-V2/SDK/read-methods/getAddress', to: '/Developers/SDK/read-methods/getAddress' },
          { from: '/Earn-V2/SDK/read-methods/getAPYDetails', to: '/Developers/SDK/read-methods/getAPYDetails' },
          { from: '/Earn-V2/SDK/read-methods/getAllWithdrawQueueRequests', to: '/Developers/SDK/read-methods/getAllWithdrawQueueRequests' },
          { from: '/Earn-V2/SDK/read-methods/getUnderlyingDecimals', to: '/Developers/SDK/read-methods/getUnderlyingDecimals' },
          { from: '/Earn-V2/SDK/read-methods/getVaultDetails', to: '/Developers/SDK/read-methods/getVaultDetails' },
          { from: '/Earn-V2/SDK/read-methods/previewConversion', to: '/Developers/SDK/read-methods/previewConversion' },
          { from: '/Earn-V2/SDK/read-methods/symbol', to: '/Developers/SDK/read-methods/symbol' },
          { from: '/Earn-V2/SDK/read-methods/toUnderlyingDecimals', to: '/Developers/SDK/read-methods/toUnderlyingDecimals' },
          { from: '/Earn-V2/SDK/read-methods/totalAssets', to: '/Developers/SDK/read-methods/totalAssets' },
          { from: '/Earn-V2/SDK/write-methods/approve', to: '/Developers/SDK/write-methods/approve' },
          { from: '/Earn-V2/SDK/write-methods/deposit', to: '/Developers/SDK/write-methods/deposit' },
          { from: '/Earn-V2/SDK/write-methods/redeem', to: '/Developers/SDK/write-methods/redeem' },
          { from: '/Earn-V2/SDK/write-methods/transfer', to: '/Developers/SDK/write-methods/transfer' },
          { from: '/Earn-V2/SDK/write-methods/transferFrom', to: '/Developers/SDK/write-methods/transferFrom' },
          { from: '/Earn-V2/Subgraph-and-Events/schema-and-queries', to: '/Developers/Subgraph-and-Events/schema-and-queries' },
          { from: '/Earn-V2/Subgraph-and-Events/event-reference-and-use-cases', to: '/Developers/Subgraph-and-Events/event-reference-and-use-cases' },

          { from: '/Earn/deposit-into-vaults', to: '/Using-Concrete-Vaults/deposit' },
          { from: '/Earn/ct-assets', to: '/Using-Concrete-Vaults/concrete-vault-shares' },
          { from: '/Earn/pre-deposit-vaults', to: '/pre-deposit-campaigns' },
          { from: '/Earn/how-earn-vaults-maximize-risk-adjusted-yields', to: '/Overview/yield-vaults-and-erc-4626-standard' },

          { from: '/Vaults/yield-vaults', to: '/Overview/yield-vaults-and-erc-4626-standard' },
          { from: '/Vaults/yield-strategies', to: '/Overview/yield-vaults-and-erc-4626-standard' },
          { from: '/Vaults/completed-campaigns', to: '/Completed-Campaigns/overview' },
          { from: '/Vaults/how-withdrawals-work', to: '/Using-Concrete-Vaults/withdraw' },
          { from: '/Vaults/bridging-with-enso', to: '/Using-Concrete-Vaults/bridging-and-depositing-with-enso' },

          { from: '/Vaults/Bera/wbera', to: '/Completed-Campaigns/overview' },
          { from: '/Vaults/Bera/request-address-change', to: '/support' },
          { from: '/Vaults/Bera/pre-deposit-vaults-deprecation-guide', to: '/Completed-Campaigns/overview' },
          { from: '/Vaults/Bera/boyco-depositors-claim', to: '/Completed-Campaigns/overview' },
          { from: '/Vaults/Bera/claim-and-transfer', to: '/Completed-Campaigns/overview' },
          { from: '/Vaults/Bera/claim-rewards', to: '/Completed-Campaigns/overview' },
          { from: '/Vaults/Bera/how-to-withdraw', to: '/Completed-Campaigns/overview' },
          { from: '/Vaults/Bera/unclaimed-rewards', to: '/Completed-Campaigns/overview' },

          { from: '/Vaults/Stable/stable-vaults', to: '/Completed-Campaigns/overview' },
          { from: '/Vaults/Stable/claim', to: '/Completed-Campaigns/overview' },

          { from: '/Vaults/Corn/overview', to: '/Completed-Campaigns/overview' },
          { from: '/Vaults/Morph/overview', to: '/Completed-Campaigns/overview' },
          { from: '/Vaults/Tac/vault-deprecation-guide', to: '/Completed-Campaigns/overview' },

          { from: '/Vaults/WBTC/wbtc-vault-migration-to-earn-v2', to: '/Live-Vaults/' },
          { from: '/Vaults/DeFi-USDT/how-withdrawals-are-processed', to: '/Live-Vaults/' },
          { from: '/Vaults/DeFi-USDT/important-disclosures', to: '/important-disclosures' },

          { from: '/fees', to: '/Using-Concrete-Vaults/fees' },
          { from: '/rewards', to: '/Using-Concrete-Vaults/concrete-points' },
          { from: '/restrictions', to: '/restricted-jurisdictions' },
          { from: '/risks', to: '/risks-and-safety' },
          { from: '/Using-Concrete-Vaults/restricted-jurisdictions', to: '/restricted-jurisdictions' },
          { from: '/Using-Concrete-Vaults/risks-and-safety', to: '/risks-and-safety' },
          { from: '/Audits/overview', to: '/Audits' },
          { from: '/Audits/restricted-jurisdictions', to: '/restricted-jurisdictions' },
          { from: '/Audits/risks-and-safety', to: '/risks-and-safety' },

          // CONC-4293 Important Disclosures promoted to a standalone article
          { from: '/Live-Vaults/DeFi-USDT/important-disclosures', to: '/important-disclosures' },

          // CONC-4294 pre-TGE navigation restructure
          { from: '/Live-Vaults/wbtc-vault', to: '/Live-Vaults/' },
          { from: '/Live-Vaults/DeFi-USDT/how-withdrawals-are-processed', to: '/Live-Vaults/' },
          { from: '/Completed-Campaigns/bera', to: '/Completed-Campaigns/overview' },
          { from: '/Completed-Campaigns/stable', to: '/Completed-Campaigns/overview' },
          { from: '/Completed-Campaigns/corn', to: '/Completed-Campaigns/overview' },
          { from: '/Completed-Campaigns/morph', to: '/Completed-Campaigns/overview' },
          { from: '/Completed-Campaigns/tac', to: '/Completed-Campaigns/overview' },
          { from: '/Completed-Campaigns/pre-deposit-campaigns', to: '/pre-deposit-campaigns' },
        ],
      },
    ],
  ],
};

export default config;
