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

- Use the canonical term for every Concrete feature. Lead with the user-facing name (for example "Withdrawal Queue") in headers; keep precise mechanism terms (for example "epoch", "cutoff") in body prose.
- Do not use the em dash character (`—`). Use an en dash or rephrase.
- Conventions target Docusaurus: a body H1 per article, `:::` admonitions, and Docusaurus front-matter.

Ignore any `.mintlify/voice-and-tone.md`; it is a deprecated, mis-targeted draft
that `STYLE-AND-TERMINOLOGY.md` supersedes.
