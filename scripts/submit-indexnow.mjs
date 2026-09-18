// Submits the docs sitemap to IndexNow so search engines pick up changes
// without waiting for their own crawl schedule.
//
// Usage (from repo root):
//   node scripts/submit-indexnow.mjs
//
// The pure parts (`readKey`, `parseSitemapUrls`) are exported for unit tests
// in scripts/submit-indexnow.test.mjs. Importing this module has no side
// effects; the submission only runs when the file is executed directly.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = new URL('..', import.meta.url).pathname;
const STATIC_DIR = join(ROOT, 'static');
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const BASE_URL = (process.env.BASE_URL || 'https://docs.concrete.xyz').replace(/\/$/, '');

export function readKey(dir) {
  const keyFile = readdirSync(dir).find((name) => /^[a-f0-9]{32}\.txt$/.test(name));
  if (!keyFile) throw new Error('IndexNow key file is missing from static/');

  return readFileSync(join(dir, keyFile), 'utf8').trim();
}

export function parseSitemapUrls(xml) {
  return Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g), ([, url]) => url);
}

async function fetchSitemapUrls() {
  const res = await fetch(`${BASE_URL}/sitemap.xml`, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`);

  const xml = await res.text();
  return parseSitemapUrls(xml);
}

async function main() {
  const key = readKey(STATIC_DIR);
  const urlList = await fetchSitemapUrls();
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(BASE_URL).host, key, urlList }),
    signal: AbortSignal.timeout(10_000),
  });

  console.log(`[indexnow] ${res.status} ${urlList.length} URLs`);
  if (!res.ok) throw new Error(`IndexNow ${res.status}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().catch((error) => {
    console.error('[indexnow]', error);
    process.exit(1);
  });
}
