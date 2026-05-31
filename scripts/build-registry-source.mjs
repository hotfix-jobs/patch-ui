// Generates the shadcn-compatible registry source from packages/react/src.
//
// - Rewrites internal relative imports to shadcn alias imports (@/lib/*,
//   @/components/ui/*) so `shadcn add` can re-point them to each consumer's
//   aliases.
// - Emits registry/ (the transformed source) + registry.json (item per
//   component, with npm `dependencies` and `registryDependencies`).
//
// Run: node scripts/build-registry-source.mjs   (then `shadcn build`)

import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  rmSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "packages", "react", "src");
const COMPONENTS = join(SRC, "components");
const OUT = join(ROOT, "registry");

// Cross-registry deps must be full URLs. Bare names ("utils", "tokens") get
// resolved by the shadcn CLI against ITS default registry (ui.shadcn.com) and
// 404. Full URLs resolve directly, regardless of the consumer's namespace key.
const REGISTRY_URL = "https://ui.hotfix.jobs/r";
const toUrl = (name) => `${REGISTRY_URL}/${name}.json`;

const IGNORED_NPM = new Set(["react", "react-dom", "react/jsx-runtime"]);

/** relative import specifier -> { alias, registryDep } */
function mapInternal(spec) {
  if (spec === "../utils") return { alias: "@/lib/utils", dep: "utils" };
  if (spec === "../recipes") return { alias: "@/lib/recipes", dep: "recipes" };
  const m = spec.match(/^\.\/([a-z0-9-]+)$/); // sibling component
  if (m) return { alias: `@/components/ui/${m[1]}`, dep: m[1] };
  return null;
}

function normalizeNpm(spec) {
  return spec.startsWith("@")
    ? spec.split("/").slice(0, 2).join("/")
    : spec.split("/")[0];
}

/** Returns { content (rewritten), dependencies[], registryDependencies[] }. */
function process(raw) {
  const dependencies = new Set();
  const registryDependencies = new Set();
  const content = raw.replace(
    /(from\s+["'])([^"']+)(["'])/g,
    (full, a, spec, b) => {
      if (spec.startsWith(".")) {
        const mapped = mapInternal(spec);
        if (mapped) {
          registryDependencies.add(mapped.dep);
          return `${a}${mapped.alias}${b}`;
        }
        return full;
      }
      if (!IGNORED_NPM.has(spec)) dependencies.add(normalizeNpm(spec));
      return full;
    },
  );
  return {
    content,
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDependencies].sort(),
  };
}

function title(name) {
  return name
    .split("-")
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join(" ");
}

// ---- clean output dir ----
rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, "components", "ui"), { recursive: true });
mkdirSync(join(OUT, "lib"), { recursive: true });

const items = [];

// ---- lib items ----
for (const [file, name] of [
  ["utils.ts", "utils"],
  ["recipes.ts", "recipes"],
]) {
  const { content, dependencies, registryDependencies } = process(
    readFileSync(join(SRC, file), "utf8"),
  );
  writeFileSync(join(OUT, "lib", file), content);
  items.push({
    name,
    type: "registry:lib",
    ...(dependencies.length ? { dependencies } : {}),
    ...(registryDependencies.length
      ? { registryDependencies: registryDependencies.map(toUrl) }
      : {}),
    files: [
      { path: `registry/lib/${file}`, type: "registry:lib", target: `lib/${file}` },
    ],
  });
}

// ---- tokens (shipped as a file the consumer @imports) ----
writeFileSync(join(OUT, "tokens.css"), readFileSync(join(SRC, "theme", "tokens.css"), "utf8"));
items.push({
  name: "tokens",
  type: "registry:file",
  files: [
    { path: "registry/tokens.css", type: "registry:file", target: "styles/patch-tokens.css" },
  ],
});

// ---- ui components ----
for (const filename of readdirSync(COMPONENTS).sort()) {
  if (!filename.endsWith(".tsx")) continue;
  const name = filename.replace(/\.tsx$/, "");
  const { content, dependencies, registryDependencies } = process(
    readFileSync(join(COMPONENTS, filename), "utf8"),
  );
  writeFileSync(join(OUT, "components", "ui", filename), content);
  // every component needs the tokens
  const regDeps = [...new Set([...registryDependencies, "tokens"])].sort();
  items.push({
    name,
    type: "registry:ui",
    title: title(name),
    ...(dependencies.length ? { dependencies } : {}),
    registryDependencies: regDeps.map(toUrl),
    files: [
      {
        path: `registry/components/ui/${filename}`,
        type: "registry:ui",
        target: `components/ui/${filename}`,
      },
    ],
  });
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "patchui",
  homepage: "https://ui.hotfix.jobs",
  items,
};

writeFileSync(join(ROOT, "registry.json"), JSON.stringify(registry, null, 2) + "\n");
console.log(
  `[registry] ${items.length} items -> registry.json (${items.filter((i) => i.type === "registry:ui").length} components)`,
);
