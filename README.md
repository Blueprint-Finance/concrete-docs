# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Environment Variables

```
METACRM_API_KEY=<MetaCRM widget API key>
```

This key enables the MetaCRM widget. Without it, the widget script is skipped.

### Glossary links

Acronyms, token tickers, and technical short-forms are defined once in
`src/glossary.md` and linked from their first occurrence per H2 section across
the docs. The linking is done by a deterministic script, not by hand, so it
stays consistent as content changes.

```
$ yarn glossary:links     # apply/update links in place
$ yarn glossary:check     # report drift, write nothing, non-zero exit if stale
$ yarn test               # run the linker's unit tests (node:test, no deps)
```

Typical flow after editing or adding an article:

1. Run `yarn glossary:links` and commit the result.
2. CI (`.github/workflows/glossary-links.yml`) runs `yarn test` and
   `yarn glossary:check` on every PR touching `src/`, the glossary, or the
   script, and fails if any first-occurrence link is missing or stale.

When you introduce a new term, add it to `src/glossary.md` with a stable anchor
and add the `[term, anchor]` pair to the map in
`scripts/link-glossary-terms.mjs` (longest tokens first, so e.g. `ctStableUSDT`
resolves before `USDT`). The rule itself is specified in
`STYLE-AND-TERMINOLOGY.md` §5.6.

