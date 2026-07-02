import { test } from 'node:test';
import assert from 'node:assert/strict';
import { citedPaths } from './check-style-guide-citations.mjs';

test('extracts a path from a single-line Source citation', () => {
  const text =
    '- **vault** - a product. _Source: `src/01-Overview/welcome.md`._';
  assert.deepEqual(citedPaths(text), ['src/01-Overview/welcome.md']);
});

test('extracts paths from a citation wrapped across lines', () => {
  const text =
    '- **async vault** - settles through the queue. _Source:\n' +
    '  `src/03-Developers/architecture-core-concepts.md`._';
  assert.deepEqual(citedPaths(text), [
    'src/03-Developers/architecture-core-concepts.md',
  ]);
});

test('extracts both paths from a two-path citation', () => {
  const text =
    '_Source: `src/01-Overview/welcome.md`, `src/02-Using-Concrete-Vaults/withdraw.md`._';
  assert.deepEqual(citedPaths(text), [
    'src/01-Overview/welcome.md',
    'src/02-Using-Concrete-Vaults/withdraw.md',
  ]);
});

test('extracts the inline Note citation', () => {
  const text =
    '_Source: `src/01-Overview/welcome.md`. Note: `src/03-Developers/architecture-core-concepts.md` currently uses the unhyphenated form._';
  assert.deepEqual(citedPaths(text), [
    'src/01-Overview/welcome.md',
    'src/03-Developers/architecture-core-concepts.md',
  ]);
});

test('preserves a trailing slash on directory citations', () => {
  const text = '_Source: `src/05-Completed-Campaigns/`._';
  assert.deepEqual(citedPaths(text), ['src/05-Completed-Campaigns/']);
});

test('deduplicates repeated citations', () => {
  const text =
    '_Source: `src/02-Using-Concrete-Vaults/fees.md`._\n' +
    '_Source: `src/02-Using-Concrete-Vaults/fees.md`._';
  assert.deepEqual(citedPaths(text), ['src/02-Using-Concrete-Vaults/fees.md']);
});

test('ignores backticked tokens that are not src/ paths', () => {
  const text =
    'Drawn from the FE glossary (`docs/business/_meta/glossary.md` in the concrete-app repo). ' +
    'See `scripts/link-glossary-terms.mjs` and `/glossary/#anchor` and `yarn test`.';
  assert.deepEqual(citedPaths(text), []);
});

test('ignores non-backticked src/ mentions in prose', () => {
  const text = 'The corpus lives under src/ and is walked recursively.';
  assert.deepEqual(citedPaths(text), []);
});
