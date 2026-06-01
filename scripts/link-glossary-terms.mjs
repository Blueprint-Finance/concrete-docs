// One-off helper for the glossary PR. Walks all docs and links the
// first occurrence of each glossary term per H2 section to its anchor
// on /glossary/. Skips the glossary page itself, frontmatter, fenced
// and inline code, and text already inside a Markdown link.
//
// Run from repo root: node scripts/link-glossary-terms.mjs

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'src');

// term → anchor on /glossary/
const TERMS = [
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

// Walk src/ recursively for .md and .mdx files
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

// Split text into segments preserving fenced code, inline code, and
// existing Markdown links / image references / raw HTML tags so we can
// replace ONLY in plain prose.
function splitProtected(text) {
  // Pattern matches, in order of priority, things we must skip:
  //   1. Fenced code blocks (``` ... ```)
  //   2. HTML/JSX tags like <a ...> ... </a> or self-closing <br />
  //   3. Markdown image syntax ![alt](url)
  //   4. Markdown links [text](url) or [text][ref]
  //   5. Inline code (`...`)
  // Anything not matched is plain prose, which is what we want to edit.
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

function linkFirstInSection(section) {
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

// Split a doc into sections at `## ` headers (top-of-file region before
// the first H2 counts as one section).
function processFile(path) {
  const text = readFileSync(path, 'utf8');
  if (text.length === 0) return false;

  // Match boundaries at start-of-line `## ` (not `### ` or deeper).
  const parts = text.split(/(?=^## [^#])/m);
  const linked = parts.map(linkFirstInSection).join('');
  if (linked === text) return false;
  writeFileSync(path, linked);
  return true;
}

const SKIP = new Set([join(SRC, 'glossary.md')]);
let changed = 0;
let scanned = 0;
for (const f of walk(SRC)) {
  if (SKIP.has(f)) continue;
  scanned++;
  if (processFile(f)) {
    changed++;
    console.log('linked:', relative(ROOT, f));
  }
}
console.log(`\nScanned ${scanned} files, modified ${changed}.`);
