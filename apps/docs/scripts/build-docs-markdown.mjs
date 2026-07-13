import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { toMarkdown } from "mdast-util-to-markdown";
import { gfmToMarkdown } from "mdast-util-gfm";
import { unified } from "unified";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = join(SCRIPT_DIR, "..", "src", "app", "docs");
const DOCS_APP_ROOT = join(SCRIPT_DIR, "..");
const PUBLIC_ROOT = join(SCRIPT_DIR, "..", "public", "docs");
const COMPONENT_DIRECTORY = JSON.parse(
  readFileSync(join(SCRIPT_DIR, "..", "src", "lib", "component-directory.json"), "utf8"),
);

function findPages(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return findPages(path);
    return entry === "page.mdx" ? [path] : [];
  });
}

function staticValue(node, bindings) {
  if (!node) return undefined;
  if (node.type === "Literal") return node.value;
  if (node.type === "Identifier") return bindings.get(node.name);
  if (node.type === "TemplateLiteral" && node.expressions.length === 0) {
    return node.quasis[0]?.value.cooked ?? "";
  }
  if (node.type === "ArrayExpression") {
    return node.elements.map((element) => staticValue(element, bindings));
  }
  if (node.type === "ObjectExpression") {
    return Object.fromEntries(
      node.properties.flatMap((property) => {
        if (property.type !== "Property" || property.computed) return [];
        const key = property.key.name ?? property.key.value;
        return [[key, staticValue(property.value, bindings)]];
      }),
    );
  }
  return undefined;
}

function expressionFromProgram(program) {
  return program?.body?.[0]?.type === "ExpressionStatement"
    ? program.body[0].expression
    : undefined;
}

function attribute(node, name, bindings) {
  const item = node.attributes?.find((candidate) => candidate.name === name);
  if (!item) return undefined;
  if (typeof item.value === "string") return item.value;
  return staticValue(expressionFromProgram(item.value?.data?.estree), bindings);
}

function collectBindings(tree) {
  const bindings = new Map();
  for (const node of tree.children) {
    if (node.type !== "mdxjsEsm") continue;
    for (const statement of node.data?.estree?.body ?? []) {
      const declaration = statement.type === "ExportNamedDeclaration"
        ? statement.declaration
        : statement;
      if (declaration?.type !== "VariableDeclaration") continue;
      for (const item of declaration.declarations) {
        if (item.id.type !== "Identifier") continue;
        bindings.set(item.id.name, staticValue(item.init, bindings));
      }
    }
  }
  return bindings;
}

const text = (value) => ({ type: "text", value: String(value ?? "") });
const cell = (value) => ({ type: "tableCell", children: [text(value ?? "-")] });

function propsTable(node, bindings) {
  const props = attribute(node, "props", bindings);
  if (!Array.isArray(props)) return [];
  return [{
    type: "table",
    align: [null, null, null, null],
    children: [
      { type: "tableRow", children: [cell("Prop"), cell("Type"), cell("Default"), cell("Description")] },
      ...props.map((prop) => ({
        type: "tableRow",
        children: [
          cell(prop.name),
          cell(prop.type),
          cell(prop.default ?? "-"),
          cell(prop.description),
        ],
      })),
    ],
  }];
}

function transformNode(node, bindings) {
  if (node.type === "mdxjsEsm") return [];
  if (node.type !== "mdxJsxFlowElement") return [node];

  if (node.name === "Install") {
    const name = attribute(node, "name", bindings);
    return name ? [{ type: "code", lang: "bash", value: `npx shadcn add @patchui/${name}` }] : [];
  }
  if (node.name === "PageHeader") {
    const title = attribute(node, "title", bindings);
    const description = attribute(node, "description", bindings);
    return [
      ...(title ? [{ type: "heading", depth: 1, children: [text(title)] }] : []),
      ...(description ? [{ type: "paragraph", children: [text(description)] }] : []),
    ];
  }
  if (node.name === "Usage" || node.name === "SourceCode") {
    const code = attribute(node, "code", bindings);
    return code ? [{ type: "code", lang: attribute(node, "language", bindings) ?? "tsx", value: code }] : [];
  }
  if (node.name === "ComponentPreview") {
    const sourcePath = attribute(node, "sourcePath", bindings);
    const code = sourcePath
      ? readFileSync(join(DOCS_APP_ROOT, sourcePath), "utf8")
      : attribute(node, "code", bindings);
    return code ? [{ type: "code", lang: attribute(node, "language", bindings) ?? "tsx", value: code }] : [];
  }
  if (node.name === "PropsTable") return propsTable(node, bindings);
  if (node.name === "ComponentDirectory") {
    return COMPONENT_DIRECTORY.flatMap((group) => [
      { type: "heading", depth: 2, children: [text(group.title)] },
      {
        type: "list",
        ordered: false,
        children: group.items.map(([title, slug, description]) => ({
          type: "listItem",
          children: [{
            type: "paragraph",
            children: [
              { type: "link", url: `/docs/components/${slug}`, children: [text(title)] },
              text(`: ${description}`),
            ],
          }],
        })),
      },
    ]);
  }
  if (node.name === "Callout") {
    return [{
      type: "blockquote",
      children: node.children.flatMap((child) => transformNode(child, bindings)),
    }];
  }
  if (node.name === "div") return [];
  return node.children.flatMap((child) => transformNode(child, bindings));
}

function buildPage(file) {
  const raw = readFileSync(file, "utf8");
  const tree = unified().use(remarkParse).use(remarkMdx).parse(raw);
  const bindings = collectBindings(tree);
  const outputTree = {
    type: "root",
    children: tree.children.flatMap((node) => transformNode(node, bindings)),
  };
  const markdown = toMarkdown(outputTree, { extensions: [gfmToMarkdown()] });
  const route = relative(DOCS_ROOT, dirname(file)).replaceAll("\\", "/");
  const output = route
    ? join(PUBLIC_ROOT, `${route}.md`)
    : join(SCRIPT_DIR, "..", "public", "docs.md");
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, markdown);
  return { route: route ? `/docs/${route}.md` : "/docs.md", markdown };
}

const pages = findPages(DOCS_ROOT).map(buildPage);
const index = [
  "# Patch UI documentation",
  "",
  ...pages.map(({ route }) => `- ${route}`),
  "",
].join("\n");
writeFileSync(join(SCRIPT_DIR, "..", "public", "llms.txt"), index);
writeFileSync(
  join(SCRIPT_DIR, "..", "public", "llms-full.txt"),
  pages.map(({ route, markdown }) => `Source: ${route}\n\n${markdown}`).join("\n\n---\n\n"),
);
console.log(`[markdown] generated ${pages.length} pages, llms.txt, and llms-full.txt`);
