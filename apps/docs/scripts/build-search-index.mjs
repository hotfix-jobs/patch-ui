// Build-time search index generator.
// Walks the docs MDX pages, extracts a title + plain-text content for each,
// and writes a static JSON index consumed by the client (MiniSearch).
//
// Run via the `predev` / `prebuild` npm scripts.

import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = join(__dirname, "..", "src", "app", "docs");
const APP_ROOT = join(__dirname, "..", "src", "app");
const OUT = join(__dirname, "..", "public", "search-index.json");

/** Recursively collect every page.mdx under the docs tree. */
function findPages(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...findPages(full));
    } else if (entry === "page.mdx") {
      out.push(full);
    }
  }
  return out;
}

/** filesystem path -> route href (e.g. .../app/docs/components/button/page.mdx -> /docs/components/button) */
function toHref(file) {
  let rel = file.slice(APP_ROOT.length).replace(/\\/g, "/");
  rel = rel.replace(/\/page\.mdx$/, "");
  return rel || "/";
}

/** Extract a searchable title + content blob from raw MDX. */
function extract(raw) {
  // Title = first H1.
  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : "";

  let s = raw.replace(/^import .*$/gm, "");

  // Capture human text living inside JSX props (prop descriptions, callout
  // titles, preview labels) before we strip tags/braces.
  const captured = [];
  for (const m of s.matchAll(/(?:description|title|label):\s*["'`]([^"'`]+)["'`]/g)) {
    captured.push(m[1]);
  }
  for (const m of s.matchAll(/(?:title|label|placeholder)=["']([^"']+)["']/g)) {
    captured.push(m[1]);
  }

  s = s.replace(/```[\s\S]*?```/g, " "); // fenced code
  s = s.replace(/`[^`]*`/g, " "); // inline code
  s = s.replace(/\{[\s\S]*?\}/g, " "); // JSX expressions / prop arrays
  s = s.replace(/<[^>]+>/g, " "); // JSX/HTML tags
  s = s.replace(/[#*_>|\-]/g, " "); // markdown punctuation
  s = s.replace(/\s+/g, " ").trim();

  const content = [s, captured.join(" ")].filter(Boolean).join(" ").trim();
  return { title, content };
}

const pages = findPages(DOCS_ROOT);
const index = [];
for (const file of pages) {
  const raw = readFileSync(file, "utf8");
  const { title, content } = extract(raw);
  const href = toHref(file);
  if (!title) continue;
  index.push({ id: href, title, href, content });
}

// The docs root (/docs) is a page.tsx (Introduction), not MDX — add it manually.
index.unshift({
  id: "/docs",
  title: "Introduction",
  href: "/docs",
  content:
    "Patch UI introduction overview getting started React component library Base UI Tailwind CSS design tokens.",
});

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(index));
console.log(`[search] indexed ${index.length} pages -> ${OUT.replace(process.cwd(), ".")}`);
