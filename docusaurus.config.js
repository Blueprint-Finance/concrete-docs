// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

require('dotenv').config();

const vercelEnv = process.env.VERCEL_ENV;
const isProd = vercelEnv === "production";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Concrete Docs',
  tagline: 'DeFi protocol',
  favicon: 'img/logo.png',

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
                    { name: 'twitter:description', content: 'DeFi protocol' },
                    { name: 'twitter:image', content: 'https://docs.concrete.xyz/img/concrete-mark.png' },
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
          {
            from: '/Vaults/morphL2-vault-deprecation-guide',
            to: '/Vaults/deprecation-guide',
          },
          {
            from: '/Vaults/Bera/vault-deprecation-guide',
            to: '/Vaults/deprecation-guide',
          },
          {
            from: '/Vaults/Bera/berabaddies-earn-deprecation-guide',
            to: '/Vaults/deprecation-guide',
          },
          {
            from: '/Vaults/Corn/vault-deprecation-guide',
            to: '/Vaults/deprecation-guide',
          },
          {
            from: '/Vaults/Morph/vault-deprecation-guide',
            to: '/Vaults/deprecation-guide',
          },
        ],
      },
    ],
  ],
};

export default config;
