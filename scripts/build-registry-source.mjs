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
  existsSync,
  statSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "packages", "react", "src");
const COMPONENTS = join(SRC, "components");
const BLOCKS = join(SRC, "blocks");
const OUT = join(ROOT, "registry");

// Cross-registry deps must be full URLs. Bare names ("utils", "tokens") get
// resolved by the shadcn CLI against ITS default registry (ui.shadcn.com) and
// 404. Full URLs resolve directly, regardless of the consumer's namespace key.
const REGISTRY_URL = "https://ui.hotfix.jobs/r";
const toUrl = (name) => `${REGISTRY_URL}/${name}.json`;

const IGNORED_NPM = new Set(["react", "react-dom", "react/jsx-runtime"]);

/** UI components live at packages/react/src/components/<name>.tsx and import
 *  with one `..` up to the package root (../utils, ../recipes) or stay in
 *  the components dir (./<sibling>). */
function mapInternalUi(spec) {
  if (spec === "../utils") return { alias: "@/lib/utils", dep: "utils" };
  if (spec === "../recipes") return { alias: "@/lib/recipes", dep: "recipes" };
  if (spec === "../internal-icons") return { alias: "@/lib/internal-icons", dep: "internal-icons" };
  const m = spec.match(/^\.\/([a-z0-9-]+)$/); // sibling ui component
  if (m) return { alias: `@/components/ui/${m[1]}`, dep: m[1] };
  return null;
}

/** Block files live at packages/react/src/blocks/<block>/[<subdir>/]<file>.tsx
 *  Two extra `..` to reach the package root vs UI files:
 *  - ../../utils, ../../recipes        -> lib
 *  - ../../components/<x>              -> existing ui primitive
 *  - ./<sibling>                       -> same-block sibling file
 *  - ../<sibling>                      -> parent dir within block
 *  Sibling resolutions don't add a cross-registry dep (same block, gets
 *  installed together). */
function mapInternalBlock(spec, blockName) {
  if (spec === "../../utils") return { alias: "@/lib/utils", dep: "utils" };
  if (spec === "../../recipes") return { alias: "@/lib/recipes", dep: "recipes" };
  if (spec === "../../internal-icons") return { alias: "@/lib/internal-icons", dep: "internal-icons" };
  const ui = spec.match(/^\.\.\/\.\.\/components\/([a-z0-9-]+)$/);
  if (ui) return { alias: `@/components/ui/${ui[1]}`, dep: ui[1] };
  const sib = spec.match(/^\.\/([a-z0-9-]+)$/);
  if (sib) return { alias: `@/components/blocks/${blockName}/${sib[1]}`, dep: null };
  return null;
}

function normalizeNpm(spec) {
  return spec.startsWith("@")
    ? spec.split("/").slice(0, 2).join("/")
    : spec.split("/")[0];
}

/** Returns { content (rewritten), dependencies[], registryDependencies[] }.
 *  `mapper` is mapInternalUi or a block-bound closure. */
function process(raw, mapper) {
  const dependencies = new Set();
  const registryDependencies = new Set();
  const content = raw.replace(
    /(from\s+["'])([^"']+)(["'])/g,
    (full, a, spec, b) => {
      if (spec.startsWith(".")) {
        const mapped = mapper(spec);
        if (mapped) {
          if (mapped.dep) registryDependencies.add(mapped.dep);
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
  ["internal-icons.tsx", "internal-icons"],
]) {
  const { content, dependencies, registryDependencies } = process(
    readFileSync(join(SRC, file), "utf8"),
    mapInternalUi,
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
    { path: "registry/tokens.css", type: "registry:file", target: "styles/patch-ui-tokens.css" },
  ],
});

// ---- ui components ----
for (const filename of readdirSync(COMPONENTS).sort()) {
  if (!filename.endsWith(".tsx")) continue;
  const name = filename.replace(/\.tsx$/, "");
  const { content, dependencies, registryDependencies } = process(
    readFileSync(join(COMPONENTS, filename), "utf8"),
    mapInternalUi,
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

// ---- blocks ----
// Folder-shaped multi-file components. Each `packages/react/src/blocks/<name>/`
// subdir becomes one `registry:block` registry item. All `.tsx` files inside
// (any depth) emit as `registry:component` files targeted under
// `components/blocks/<name>/` in the consumer app, preserving the subdir
// structure so block-internal sibling imports keep working post-install.
if (existsSync(BLOCKS)) {
  mkdirSync(join(OUT, "blocks"), { recursive: true });
  for (const blockName of readdirSync(BLOCKS).sort()) {
    const blockDir = join(BLOCKS, blockName);
    if (!statSync(blockDir).isDirectory()) continue;

    const blockFiles = [];
    const blockDeps = new Set();
    const blockRegDeps = new Set();
    const mapper = (spec) => mapInternalBlock(spec, blockName);

    const walk = (dir, relPath = "") => {
      for (const entry of readdirSync(dir).sort()) {
        const full = join(dir, entry);
        const rel = relPath ? `${relPath}/${entry}` : entry;
        if (statSync(full).isDirectory()) {
          walk(full, rel);
          continue;
        }
        if (!entry.endsWith(".tsx")) continue;
        const { content, dependencies, registryDependencies } = process(
          readFileSync(full, "utf8"),
          mapper,
        );
        dependencies.forEach((d) => blockDeps.add(d));
        registryDependencies.forEach((d) => blockRegDeps.add(d));
        const outPath = join(OUT, "blocks", blockName, rel);
        mkdirSync(dirname(outPath), { recursive: true });
        writeFileSync(outPath, content);
        blockFiles.push({
          path: `registry/blocks/${blockName}/${rel}`,
          type: "registry:component",
          target: `components/blocks/${blockName}/${rel}`,
        });
      }
    };
    walk(blockDir);
    if (!blockFiles.length) continue;

    const regDeps = [...new Set([...blockRegDeps, "tokens"])].sort();
    items.push({
      name: blockName,
      type: "registry:block",
      title: title(blockName),
      ...(blockDeps.size ? { dependencies: [...blockDeps].sort() } : {}),
      registryDependencies: regDeps.map(toUrl),
      files: blockFiles,
    });
  }
}

// ---- meta "all" item ----
// Installs every UI component and block in one command:
//   npx shadcn add @patchui/all
// The CLI walks registryDependencies transitively, so consumers get every
// component plus utils, recipes, internal-icons, and tokens automatically.
const allRegDeps = items
  .filter((i) => i.type === "registry:ui" || i.type === "registry:block")
  .map((i) => i.name)
  .sort();
items.push({
  name: "all",
  type: "registry:lib",
  title: "All Patch UI components",
  description:
    "Meta item that installs every Patch UI component and block. Chains through registryDependencies.",
  registryDependencies: allRegDeps.map(toUrl),
  files: [],
});

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "patchui",
  homepage: "https://ui.hotfix.jobs",
  items,
};

writeFileSync(join(ROOT, "registry.json"), JSON.stringify(registry, null, 2) + "\n");
const uiCount = items.filter((i) => i.type === "registry:ui").length;
const blockCount = items.filter((i) => i.type === "registry:block").length;
console.log(
  `[registry] ${items.length} items -> registry.json (${uiCount} components, ${blockCount} blocks)`,
);
