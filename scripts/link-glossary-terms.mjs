// Links the first occurrence of each glossary term per H2 section to its
// anchor on /glossary/. Skips the glossary page itself, frontmatter, fenced
// and inline code, raw HTML/JSX, and text already inside a Markdown link.
//
// Usage (from repo root):
//   node scripts/link-glossary-terms.mjs            apply links in place
//   node scripts/link-glossary-terms.mjs --check    report drift, write
//                                                    nothing, exit 1 if any
//                                                    file would change (CI)
//
// The pure transform (`linkText`) and its helpers are exported for unit tests
// in scripts/link-glossary-terms.test.mjs. Importing this module has no side
// effects; the filesystem walk only runs when the file is executed directly.

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'src');

// term → anchor on /glossary/
export const TERMS = [
  // Order matters: longer / more specific tokens first so e.g. `ctStableUSDT`
  // matches before `USDT`, and `ERC-4626` matches before `ERC-20`.
  ['ctBeraLBTC', 'ct-beralbtc'],
  ['ctDefiUSDT', 'ct-defiusdt'],
  ['ctStablefrxUSD', 'ct-stablefrxusd'],
  ['ctStableUSDT', 'ct-stableusdt'],
  ['ctWBTC', 'ct-wbtc'],
  ['ctLBTC', 'ct-lbtc'],
  ['ctETH', 'ct-eth'],
  ['ctAssets', 'ct-asset'],
  ['ctAsset', 'ct-asset'],
  ['ERC-4626', 'erc-4626'],
  ['ERC-20', 'erc-20'],
  ['ERC20', 'erc-20'],
  ['frxUSD', 'frxusd'],
  ['DeFi', 'defi'],
  ['UUPS', 'uups'],
  ['OFAC', 'ofac'],
  ['FIFO', 'fifo'],
  ['USDC', 'usdc'],
  ['USDT', 'usdt'],
  ['USD1', 'usd1'],
  ['WBTC', 'wbtc'],
  ['WETH', 'weth'],
  ['LBTC', 'lbtc'],
  ['BERA', 'bera'],
  ['BGT', 'bgt'],
  ['ENA', 'ena'],
  ['APR', 'apr'],
  ['APY', 'apy'],
  ['AUM', 'aum'],
  ['ABI', 'abi'],
  ['AMM', 'amm'],
  ['API', 'api'],
  ['EIP', 'eip'],
  ['EOA', 'eoa'],
  ['LTV', 'ltv'],
  ['MPC', 'mpc'],
  ['NAV', 'nav'],
  ['RPC', 'rpc'],
  ['RWA', 'rwa'],
  ['SDK', 'sdk'],
  ['TAC', 'tac'],
  ['TVL', 'tvl'],
  ['UTC', 'utc'],
  ['BTC', 'btc'],
  ['ETH', 'eth'],
  ['USD', 'usd'],
  ['URL', 'url'],
  ['IL', 'il'],
  ['JS', 'js'],
  ['LP', 'lp'],
  ['TS', 'ts'],
  ['UI', 'ui'],
];

// Split text into segments, marking fenced code, inline code, existing
// Markdown links, image references, and raw HTML/JSX tags as `skip` so terms
// inside them are never linked. Everything else is `prose`.
//
// Known limitations (acceptable for this corpus; the --check CI gate will
// surface any real fallout):
//   - A Markdown link whose URL contains a literal `)` (e.g. a Wikipedia
//     "..._(disambiguation)" link) is matched only up to that first `)`, so
//     text after it within the same link is treated as prose. None exist in
//     the docs today.
//   - Text *between* raw HTML tags (e.g. `<div>APY</div>`) is prose and could
//     be linked. Inline HTML attributes are protected; block content is not.
export function splitProtected(text) {
  // Matched alternatives, in priority order:
  //   1. Fenced code blocks (``` ... ```)
  //   2. HTML/JSX tags like <a ...> ... </a> or self-closing <br />
  //   3. Markdown image syntax ![alt](url)
  //   4. Markdown links [text](url) or [text][ref]
  //   5. Inline code (`...`)
  const re = /(```[\s\S]*?```)|(<[^>]+>)|(!\[[^\]]*\]\([^)]*\))|(\[[^\]]*\]\([^)]*\)|\[[^\]]*\]\[[^\]]*\])|(`[^`\n]*`)/g;
  const out = [];
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push({ kind: 'prose', text: text.slice(last, m.index) });
    out.push({ kind: 'skip', text: m[0] });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ kind: 'prose', text: text.slice(last) });
  return out;
}

// Link the first prose occurrence of each term within a single section.
export function linkFirstInSection(section) {
  // Strip frontmatter on the very first section if present.
  let frontmatter = '';
  let body = section;
  if (body.startsWith('---\n')) {
    const end = body.indexOf('\n---\n', 4);
    if (end !== -1) {
      frontmatter = body.slice(0, end + 5);
      body = body.slice(end + 5);
    }
  }

  const segs = splitProtected(body);
  const used = new Set();
  // Pre-seed with terms that already link to the glossary somewhere in this
  // section. Without this the pass is not idempotent: a term linked on a
  // previous run sits inside a protected `[...](...)` segment and is invisible
  // to the loop below, so the next plain occurrence in the same section would
  // get linked too, growing one extra link per run. Seeding keeps the "first
  // occurrence per section" guarantee stable across repeated runs.
  for (const [term, anchor] of TERMS) {
    if (body.includes(`](/glossary/#${anchor})`)) used.add(term);
  }
  for (const seg of segs) {
    if (seg.kind !== 'prose') continue;
    for (const [term, anchor] of TERMS) {
      if (used.has(term)) continue;
      // Word boundary: token chars (\w) or a `-` count as part of the term,
      // so `LBTC` won't match inside `ctLBTC` and `ERC-20` won't match the
      // `20` inside `ERC-20`. Build a regex per term.
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`(?<![\\w-])${escaped}(?![\\w-])`);
      const idx = seg.text.search(re);
      if (idx === -1) continue;
      const before = seg.text.slice(0, idx);
      const after = seg.text.slice(idx + term.length);
      seg.text = `${before}[${term}](/glossary/#${anchor})${after}`;
      used.add(term);
    }
  }
  return frontmatter + segs.map((s) => s.text).join('');
}

// Split a document into H2 sections. A boundary is a line starting with `## `
// (not `### ` or deeper) that is NOT inside a fenced code block. The
// top-of-file region before the first H2 is its own section. Fence-aware so a
// `## ` comment line inside ``` ... ``` is not mistaken for a heading, which
// would split a code block and expose its contents to linking.
// `sections.join('\n')` reconstructs the input exactly.
export function splitSections(text) {
  const lines = text.split('\n');
  const sections = [];
  let current = [];
  let fence = null; // the active fence marker char (` or ~), or null
  for (const line of lines) {
    const open = line.match(/^(```+|~~~+)/);
    if (open) {
      const marker = open[1][0];
      if (fence === null) fence = marker;
      else if (line.startsWith(fence === '`' ? '```' : '~~~')) fence = null;
    } else if (fence === null && /^## [^#]/.test(line) && current.length) {
      sections.push(current.join('\n'));
      current = [];
    }
    current.push(line);
  }
  sections.push(current.join('\n'));
  return sections;
}

// Pure document-level transform: split into H2 sections and link each.
// Returns the rewritten document. Idempotent: linkText(linkText(x)) === linkText(x).
export function linkText(text) {
  if (text.length === 0) return text;
  return splitSections(text).map(linkFirstInSection).join('\n');
}

// Walk src/ recursively for .md and .mdx files.
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (full.endsWith('.md') || full.endsWith('.mdx')) out.push(full);
  }
  return out;
}

function main() {
  const check = process.argv.includes('--check');
  const skip = new Set([join(SRC, 'glossary.md')]);
  let changed = 0;
  let scanned = 0;
  for (const f of walk(SRC)) {
    if (skip.has(f)) continue;
    scanned++;
    const text = readFileSync(f, 'utf8');
    const linked = linkText(text);
    if (linked === text) continue;
    changed++;
    if (!check) writeFileSync(f, linked);
    console.log(check ? 'out of date:' : 'linked:', relative(ROOT, f));
  }

  if (check) {
    if (changed > 0) {
      console.error(
        `\n${changed} file(s) have missing or stale glossary links. ` +
          'Run `node scripts/link-glossary-terms.mjs` and commit the result.',
      );
      process.exit(1);
    }
    console.log(`\nScanned ${scanned} files, all glossary links up to date.`);
  } else {
    console.log(`\nScanned ${scanned} files, modified ${changed}.`);
  }
}

// Run the walk only when executed directly, not when imported by tests.
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main();
}
