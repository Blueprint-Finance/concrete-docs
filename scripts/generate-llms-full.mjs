import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import yaml from 'js-yaml';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const docsRoot = path.join(repoRoot, 'src');
const staticRoot = path.join(repoRoot, 'static');
const sidebarPath = path.join(repoRoot, 'sidebars.js');
const outputPath = path.join(repoRoot, 'llms-full.txt');
const siteUrl = 'https://docs.concrete.xyz';

function walk(dir, predicate = () => true) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath, predicate);
    return predicate(fullPath) ? [fullPath] : [];
  });
}

function stripNumericPrefix(segment) {
  return segment.replace(/^\d+-/, '');
}

function docIdFromPath(filePath) {
  const relative = path.relative(docsRoot, filePath).replace(/\\/g, '/');
  const withoutExtension = relative.replace(/\.md$/, '');
  return withoutExtension.split('/').map(stripNumericPrefix).join('/');
}

function parseFrontMatter(markdown) {
  if (!markdown.startsWith('---\n')) return { metadata: {}, body: markdown.trim() };

  const end = markdown.indexOf('\n---\n', 4);
  if (end === -1) return { metadata: {}, body: markdown.trim() };

  const raw = markdown.slice(4, end);
  const parsed = yaml.load(raw);
  const metadata = parsed && typeof parsed === 'object' ? parsed : {};
  return { metadata, body: markdown.slice(end + 5).trim() };
}

function routeForDocId(docId) {
  return `${siteUrl}/${docId}/`;
}

function publicStaticUrl(filePath) {
  return `${siteUrl}/${path.relative(staticRoot, filePath).replace(/\\/g, '/')}`;
}

function makeAssetIndex() {
  if (!fs.existsSync(staticRoot)) return '';

  const files = walk(staticRoot)
    .map((filePath) => ({
      path: path.relative(repoRoot, filePath).replace(/\\/g, '/'),
      url: publicStaticUrl(filePath),
      size: fs.statSync(filePath).size,
    }))
    .sort((a, b) => a.path.localeCompare(b.path));

  const grouped = new Map();
  for (const file of files) {
    const extension = path.extname(file.path).slice(1).toLowerCase() || 'unknown';
    if (!grouped.has(extension)) grouped.set(extension, []);
    grouped.get(extension).push(file);
  }
  const lines = [
    '# Static Asset Index',
    '',
    'Binary and media assets are indexed by source path and public URL. Their full binary contents are not embedded.',
    '',
  ];

  for (const [extension, group] of [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`## .${extension} files`, '');
    for (const file of group) {
      lines.push(`- ${file.path} (${file.size} bytes): ${file.url}`);
    }
    lines.push('');
  }

  return lines.join('\n').trim();
}

function normalizeDocBody(body) {
  return body
    .replace(/\]\(\/(?!\/)/g, `](${siteUrl}/`)
    .replace(/src="\/(?!\/)/g, `src="${siteUrl}/`)
    .replace(/href="\/(?!\/)/g, `href="${siteUrl}/`);
}

function collectSidebarDocIds(items, docsById, ids, seen) {
  if (!Array.isArray(items)) return;
  for (const item of items) {
    if (typeof item === 'string') {
      if (!docsById.has(item) || seen.has(item)) continue;
      ids.push(item);
      seen.add(item);
      continue;
    }

    if (!item || typeof item !== 'object') continue;

    if (item.type === 'doc' && typeof item.id === 'string') {
      if (!docsById.has(item.id) || seen.has(item.id)) continue;
      ids.push(item.id);
      seen.add(item.id);
      continue;
    }

    if (Array.isArray(item.items)) {
      collectSidebarDocIds(item.items, docsById, ids, seen);
    }
  }
}

async function readSidebarDocIds(docsById) {
  const sidebarModule = await import(pathToFileURL(sidebarPath).href);
  const sidebars = sidebarModule.default ?? sidebarModule;
  const ids = [];
  const seen = new Set();
  for (const value of Object.values(sidebars)) {
    collectSidebarDocIds(value, docsById, ids, seen);
  }

  return ids;
}

function stringifyMetadataValue(value) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
}

async function main() {
  const markdownFiles = walk(docsRoot, (filePath) => filePath.endsWith('.md'));
  const docsById = new Map();

  for (const filePath of markdownFiles) {
    const markdown = fs.readFileSync(filePath, 'utf8');
    const { metadata, body } = parseFrontMatter(markdown);
    const id = docIdFromPath(filePath);
    const sourcePath = path.relative(repoRoot, filePath).replace(/\\/g, '/');

    if (docsById.has(id)) {
      const existing = docsById.get(id);
      throw new Error(`Duplicate doc id "${id}" for ${existing.sourcePath} and ${sourcePath}`);
    }

    docsById.set(id, {
      id,
      filePath,
      sourcePath,
      metadata,
      body: normalizeDocBody(body),
    });
  }

  const sidebarIds = await readSidebarDocIds(docsById);
  const seen = new Set();
  const orderedDocs = [];

  for (const id of sidebarIds) {
    const doc = docsById.get(id);
    if (!doc) {
      throw new Error(`Sidebar references missing doc: ${id}`);
    }
    orderedDocs.push({ ...doc, inSidebar: true });
    seen.add(id);
  }

  const unlistedDocs = [...docsById.values()]
    .filter((doc) => !seen.has(doc.id))
    .sort((a, b) => a.sourcePath.localeCompare(b.sourcePath))
    .map((doc) => ({ ...doc, inSidebar: false }));

  const allDocs = [...orderedDocs, ...unlistedDocs];
  const toc = allDocs.map((doc, index) => {
    const label = stringifyMetadataValue(doc.metadata.title) || doc.id;
    const marker = doc.inSidebar ? 'sidebar' : 'unlisted';
    return `${index + 1}. ${label} [${marker}] - ${doc.sourcePath}`;
  });

  const sections = allDocs.map((doc, index) => {
    const title = stringifyMetadataValue(doc.metadata.title) || doc.id;
    const description = stringifyMetadataValue(doc.metadata.description);
    return [
      `# Document ${index + 1}: ${title}`,
      '',
      `Source: ${doc.sourcePath}`,
      `Doc ID: ${doc.id}`,
      `Public URL: ${routeForDocId(doc.id)}`,
      `In active sidebar: ${doc.inSidebar ? 'yes' : 'no'}`,
      description ? `Description: ${description}` : null,
      '',
      doc.body,
    ].filter(Boolean).join('\n');
  });

  const generatedAt = new Date().toISOString();
  const output = [
    '# Concrete Docs - LLM Full Context',
    '',
    `Generated: ${generatedAt}`,
    `Source repository: ${path.basename(repoRoot)}`,
    `Canonical docs URL: ${siteUrl}/`,
    '',
    'This file consolidates every Markdown documentation page in `src/**/*.md` for retrieval and LLM ingestion. Active sidebar pages appear first in sidebar order; Markdown pages not present in the active sidebar follow afterward. Static binary/media assets are listed at the end by path and public URL.',
    '',
    '# Table of Contents',
    '',
    toc.join('\n'),
    '',
    sections.join('\n\n---\n\n'),
    '',
    '---',
    '',
    makeAssetIndex(),
    '',
  ].join('\n');

  fs.writeFileSync(outputPath, output, 'utf8');
  console.log(`Wrote ${path.relative(repoRoot, outputPath)} with ${allDocs.length} docs and ${Buffer.byteLength(output)} bytes.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
