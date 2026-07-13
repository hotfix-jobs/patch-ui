function textContent(node) {
  if (node.type === "text") return node.value;
  return (node.children ?? []).map(textContent).join("");
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function rehypeHeadingIds() {
  return (tree) => {
    const counts = new Map();

    function visit(node) {
      if (
        node.type === "element" &&
        ["h1", "h2", "h3", "h4"].includes(node.tagName)
      ) {
        const base = String(node.properties?.id ?? slugify(textContent(node)));
        const count = counts.get(base) ?? 0;
        counts.set(base, count + 1);
        node.properties ??= {};
        node.properties.id = count === 0 ? base : `${base}-${count}`;
      }
      for (const child of node.children ?? []) visit(child);
    }

    visit(tree);
  };
}
