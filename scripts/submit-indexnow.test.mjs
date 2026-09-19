// Unit tests for the IndexNow submission script. Uses only Node's built-in
// test runner and assert module — no external dependencies, no network.
//
// Run: node --test scripts/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { readKey, parseSitemapUrls } from './submit-indexnow.mjs';

test('parseSitemapUrls extracts multiple loc entries', () => {
  const xml = [
    '<urlset>',
    '<url><loc>https://docs.concrete.xyz/</loc></url>',
    '<url><loc>https://docs.concrete.xyz/glossary/</loc></url>',
    '</urlset>',
  ].join('\n');
  assert.deepEqual(parseSitemapUrls(xml), [
    'https://docs.concrete.xyz/',
    'https://docs.concrete.xyz/glossary/',
  ]);
});

test('parseSitemapUrls returns an empty array for an empty sitemap', () => {
  assert.deepEqual(parseSitemapUrls('<urlset></urlset>'), []);
});

test('readKey finds the key in a temp dir', () => {
  const dir = mkdtempSync(join(tmpdir(), 'indexnow-'));
  try {
    writeFileSync(join(dir, 'abcdef0123456789abcdef0123456789.txt'), 'abcdef0123456789abcdef0123456789');
    assert.equal(readKey(dir), 'abcdef0123456789abcdef0123456789');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('readKey throws when no key file exists', () => {
  const dir = mkdtempSync(join(tmpdir(), 'indexnow-'));
  try {
    assert.throws(() => readKey(dir), /IndexNow key file is missing/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
