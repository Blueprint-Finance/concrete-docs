import React from 'react';

const ORG_ID = 'https://docs.concrete.xyz/#organization';
const WEBSITE_ID = 'https://docs.concrete.xyz/#website';

const ORGANIZATION = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Concrete',
  alternateName: 'Blueprint Finance',
  description:
    'Institutional grade on-chain infrastructure. Generate yield for any asset. On any chain.',
  url: 'https://concrete.xyz',
  parentOrganization: {
    '@type': 'Organization',
    name: 'Blueprint Finance',
    url: 'https://blueprintfinance.com/',
  },
  logo: {
    '@type': 'ImageObject',
    url: 'https://cdn.prod.website-files.com/65c338803ff9f9ad1759ab52/6916f0972e2e8341a219d7cf_conc%20logo.png',
  },
  sameAs: [
    'https://x.com/ConcreteXYZ',
    'https://twitter.com/ConcreteXYZ',
    'https://discord.gg/concretexyz',
    'https://mirror.xyz/concretexyz.eth',
  ],
};

const WEBSITE = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: 'https://docs.concrete.xyz/',
  name: 'Concrete Docs',
  description:
    'Official Concrete documentation for on-chain yield infrastructure, Earn V2, SDK integrations, vault operations, and risk disclosures.',
  inLanguage: 'en',
  publisher: {
    '@id': ORG_ID,
  },
};

function toAbsoluteUrl(siteUrl, path) {
  try {
    return new URL(path, siteUrl).toString();
  } catch {
    return `${siteUrl}${path}`;
  }
}

function normalizePath(pathname) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function toLabel(segment) {
  return decodeURIComponent(segment)
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function createBreadcrumbSchema(permalink, pageTitle, siteUrl) {
  const pathSegments = (permalink || '/')
    .split('/')
    .filter(Boolean);

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: toAbsoluteUrl(siteUrl, '/'),
    },
  ];

  pathSegments.forEach((segment, index) => {
    const partialPath = `/${pathSegments.slice(0, index + 1).join('/')}/`;
    const isLast = index === pathSegments.length - 1;
    items.push({
      '@type': 'ListItem',
      position: items.length + 1,
      name: isLast ? pageTitle : toLabel(segment),
      item: toAbsoluteUrl(siteUrl, partialPath),
    });
  });

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

export function SiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [ORGANIZATION, WEBSITE],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

export function DocJsonLd({metadata}) {
  if (!metadata?.permalink || !metadata?.title) {
    return null;
  }

  const siteUrl = 'https://docs.concrete.xyz';
  const pagePath = normalizePath(metadata.permalink);
  const pageUrl = toAbsoluteUrl(siteUrl, pagePath);
  const pageDescription =
    metadata.description ||
    'Official Concrete documentation for on-chain yield infrastructure and product operations.';
  const breadcrumbSchema = createBreadcrumbSchema(
    pagePath,
    metadata.title,
    siteUrl,
  );

  const webpageSchema = {
    '@type': 'WebPage',
    '@id': pageUrl,
    url: pageUrl,
    name: metadata.title,
    description: pageDescription,
    inLanguage: 'en',
    isPartOf: {
      '@id': WEBSITE_ID,
    },
    about: {
      '@id': ORG_ID,
    },
    breadcrumb: breadcrumbSchema,
  };

  const articleSchema = {
    '@type': 'TechArticle',
    '@id': `${pageUrl}#article`,
    headline: metadata.title,
    description: pageDescription,
    url: pageUrl,
    inLanguage: 'en',
    publisher: {
      '@id': ORG_ID,
    },
    mainEntityOfPage: {
      '@id': pageUrl,
    },
    isPartOf: {
      '@id': WEBSITE_ID,
    },
    articleSection: metadata.title,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [webpageSchema, articleSchema],
        }),
      }}
    />
  );
}
