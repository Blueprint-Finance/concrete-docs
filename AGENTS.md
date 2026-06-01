# AGENTS.md

Guidance for AI agents and tools working in this repository.

## What this repo is

Concrete's public documentation site, published at `docs.concrete.xyz` and built
with Docusaurus. Documentation content lives in `src/`, navigation in
`sidebars.js`, and build configuration in `docusaurus.config.js`.

## Writing or editing documentation

All documentation content follows the repository's canonical style and
terminology authority:

**[STYLE-AND-TERMINOLOGY.md](./STYLE-AND-TERMINOLOGY.md)**

It defines:

- **Part 1, Style guide:** voice and tone, article structure, formatting, and per-article-type patterns.
- **Part 2, Canonical glossary:** the correct name for every Concrete feature and concept, each with a source reference.
- **Part 3, Translation map:** technical-to-canonical term substitutions for aligning imported or third-party wording.

Key rules to apply on every page:

- Use the canonical term for every Concrete feature. Lead with the user-facing name (for example "Withdrawal Queue") in headers; keep canonical mechanism terms (for example "Epoch" Title Case, "cutoff" lowercase) consistent in body prose.
- Do not use the em dash character (`—`). Use an en dash or rephrase.
- Conventions target Docusaurus: a body H1 per article, `:::` admonitions, and Docusaurus front-matter.
- **Glossary linking.** Every acronym, token ticker, or short-form defined in [`src/glossary.md`](./src/glossary.md) gets linked on its first occurrence per H2 section to `/glossary/#<anchor>`. Skip code, JSX, existing links, and the glossary page itself. Helper: `node scripts/link-glossary-terms.mjs`. Full rule and example in `STYLE-AND-TERMINOLOGY.md` §5.6.
- **Adding new terms.** When a new term enters the corpus that fits the glossary's scope (acronyms, token tickers, technical short-forms), add it to `src/glossary.md` with a stable anchor, then add the term-to-anchor pair to `scripts/link-glossary-terms.mjs` in length-descending order (so longer tokens like `ctStableUSDT` resolve before `USDT`).

Ignore any `.mintlify/voice-and-tone.md`; it is a deprecated, mis-targeted draft
that `STYLE-AND-TERMINOLOGY.md` supersedes.

## Source-grounded developer articles

The Architecture, Subgraph & Events, and SDK articles are rewritten against
upstream code, not product copy, so they drift when that code changes.
**[SOURCES.md](./SOURCES.md)** records which upstream repository and path backs
each one. Before editing or updating any of those articles, consult it and
re-verify the technical claims against the listed source.
