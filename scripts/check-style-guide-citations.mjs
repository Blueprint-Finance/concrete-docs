// Verifies that every corpus path cited in STYLE-AND-TERMINOLOGY.md exists in
// the repo tree. The glossary's `_Source:_` lines (and the inline
// "Note: `src/...`" citation) point AI tooling at the pages each term is drawn
// from; when a restructure renames or deletes a page without updating the
// guide, downstream consumers copy the dead paths verbatim (this happened
// after CONC-3738). This check fails CI with the list of dead citations.
//
// Usage (from repo root):
//   node scripts/check-style-guide-citations.mjs
//
// Scope: every backtick-quoted token starting with `src/`. That covers all
// `_Source:_` citations (including ones wrapped across lines, since each path
// is a single backticked token) and the inline Note citation, while ignoring
// cross-repo references like the concrete-app FE glossary path.
//
// The pure extractor (`citedPaths`) is exported for unit tests in
// scripts/check-style-guide-citations.test.mjs. Importing this module has no
// side effects; the filesystem check only runs when executed directly.

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = new URL('..', import.meta.url).pathname;
export const GUIDE = 'STYLE-AND-TERMINOLOGY.md';

// Extract every backtick-quoted `src/...` path token, deduplicated, in order
// of first appearance. A trailing `/` (directory citation) is preserved;
// existsSync handles directories the same as files.
export function citedPaths(text) {
  const out = [];
  const seen = new Set();
  const re = /`(src\/[^`]*)`/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (!seen.has(m[1])) {
      seen.add(m[1]);
      out.push(m[1]);
    }
  }
  return out;
}

function main() {
  const text = readFileSync(join(ROOT, GUIDE), 'utf8');
  const cited = citedPaths(text);
  const missing = cited.filter((p) => !existsSync(join(ROOT, p)));

  if (missing.length > 0) {
    console.error(
      `${GUIDE} cites ${missing.length} path(s) that do not exist in the repo:`,
    );
    for (const p of missing) console.error(`  - ${p}`);
    console.error(
      '\nEach _Source:_ citation must point at a live file. If the page moved,' +
        '\nrepoint the citation at its current location (`git log --follow -- <old-path>`' +
        '\nshows where it went). If the page was deleted, cite the closest live' +
        '\nsuccessor covering the same concept.',
    );
    process.exit(1);
  }
  console.log(`${GUIDE}: all ${cited.length} cited paths exist.`);
}

// Run the check only when executed directly, not when imported by tests.
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main();
}
