// Unit tests for the glossary linker. Uses only Node's built-in test runner
// and assert module — no external dependencies.
//
// Run: node --test scripts/

import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  linkText,
  linkFirstInSection,
  splitProtected,
  splitSections,
} from './link-glossary-terms.mjs';

// --- core linking behaviour ---

test('links the first prose occurrence of a term', () => {
  assert.equal(
    linkText('A vault reports its TVL daily.'),
    'A vault reports its [TVL](/glossary/#tvl) daily.',
  );
});

test('links only the first occurrence within a section', () => {
  const out = linkText('TVL rises. Then TVL falls. TVL again.');
  assert.equal(out.match(/\[TVL\]/g).length, 1);
  assert.ok(out.startsWith('[TVL](/glossary/#tvl) rises.'));
});

test('resets the first-occurrence counter at each H2 section', () => {
  const doc = [
    'Intro mentions APY here.',
    '',
    '## Fees',
    '',
    'Fees affect APY too.',
  ].join('\n');
  const out = linkText(doc);
  assert.equal(out.match(/\[APY\]\(\/glossary\/#apy\)/g).length, 2);
});

test('does not reset at H3 (only H2 starts a new section)', () => {
  const doc = ['## Section', '', 'First APY.', '', '### Sub', '', 'Second APY.'].join('\n');
  const out = linkText(doc);
  assert.equal(out.match(/\[APY\]/g).length, 1);
});

// --- idempotency (the bug this fix targets) ---

test('is idempotent: a second pass changes nothing', () => {
  const doc = [
    'The TAC Stone, TAC LevelUSD, and TAC Renzo vaults.',
    '',
    '## Rewards',
    '',
    'TAC rewards are managed externally. Contact the TAC team.',
  ].join('\n');
  const once = linkText(doc);
  const twice = linkText(once);
  assert.equal(twice, once);
});

test('idempotent even when first occurrence sits inside bold/markup', () => {
  const doc = '**TAC Stone**, **TAC LevelUSD**, and TAC Renzo.';
  const once = linkText(doc);
  const twice = linkText(once);
  assert.equal(twice, once);
  // Only one link in the section.
  assert.equal(once.match(/\[TAC\]/g).length, 1);
});

// --- protected regions ---

test('does not link inside fenced code blocks', () => {
  const doc = ['Prose APY.', '', '```', 'const APY = 5;', '```'].join('\n');
  const out = linkText(doc);
  assert.equal(out.match(/\[APY\]/g).length, 1); // only the prose one
  assert.ok(out.includes('const APY = 5;')); // code untouched
});

test('does not link inside inline code', () => {
  assert.equal(linkText('Use `APY` carefully.'), 'Use `APY` carefully.');
});

test('does not link inside an existing markdown link', () => {
  const doc = 'See [the APY page](https://example.com/apy).';
  assert.equal(linkText(doc), doc);
});

test('does not link inside HTML/JSX tags', () => {
  const doc = '<abbr title="APY">rate</abbr>';
  assert.equal(linkText(doc), doc);
});

// --- fence-aware section splitting ---

test('a `## ` line inside a fenced block is not a section boundary', () => {
  const doc = [
    '## Real Section',
    '',
    'First APY mention.',
    '',
    '```bash',
    '## not a heading, just a comment',
    'echo APY',
    '```',
    '',
    'Second APY mention, same section.',
  ].join('\n');
  const out = linkText(doc);
  // The fenced block must be untouched (no link added to `echo APY`).
  assert.ok(out.includes('echo APY\n'));
  assert.ok(!out.includes('echo [APY]'));
  // Because the fence does not start a new section, the post-fence "APY" is a
  // second occurrence in the same section and stays plain: exactly one link.
  assert.equal(out.match(/\[APY\]/g).length, 1);
});

test('splitSections reconstructs the input exactly', () => {
  const doc = '# Title\n\nintro\n\n## A\n\nbody a\n\n## B\n\nbody b\n';
  assert.equal(splitSections(doc).join('\n'), doc);
});

// --- word boundaries ---

test('does not match a term inside a longer token', () => {
  // LBTC must not match inside ctLBTC; ctLBTC has its own entry though, so use
  // a token with no entry of its own to isolate the boundary check.
  assert.equal(linkText('The xLBTCy wrapper.'), 'The xLBTCy wrapper.');
});

test('longer tokens win over shorter substrings (ERC-4626 before ERC-20)', () => {
  const out = linkText('Built on the ERC-4626 standard.');
  assert.ok(out.includes('[ERC-4626](/glossary/#erc-4626)'));
  assert.ok(!out.includes('#erc-20'));
});

test('ctStableUSDT links to its own anchor, not USDT', () => {
  const out = linkText('You receive ctStableUSDT on deposit.');
  assert.ok(out.includes('[ctStableUSDT](/glossary/#ct-stableusdt)'));
});

// --- frontmatter ---

test('does not link inside frontmatter', () => {
  const doc = ['---', 'title: "APY guide"', '---', '', 'Body mentions APY.'].join('\n');
  const out = linkText(doc);
  assert.ok(out.includes('title: "APY guide"')); // frontmatter untouched
  assert.equal(out.match(/\[APY\]/g).length, 1); // only the body
});

// --- helper-level checks ---

test('splitProtected classifies segments', () => {
  const segs = splitProtected('a `b` c');
  assert.deepEqual(
    segs.map((s) => s.kind),
    ['prose', 'skip', 'prose'],
  );
});

test('linkFirstInSection links one term per call', () => {
  const out = linkFirstInSection('APY and APY.');
  assert.equal(out.match(/\[APY\]/g).length, 1);
});

// --- no-op / edge cases ---

test('empty string is returned unchanged', () => {
  assert.equal(linkText(''), '');
});

test('text with no glossary terms is returned unchanged', () => {
  const doc = 'A plain sentence about vaults and yield.';
  assert.equal(linkText(doc), doc);
});
