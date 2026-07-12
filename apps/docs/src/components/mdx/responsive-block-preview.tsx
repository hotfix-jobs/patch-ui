import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { codeToHtml } from "shiki";
import { ResponsiveBlockPreviewClient } from "./responsive-block-preview-client";
import { SourceCodeClient } from "./source-code-client";

export async function ResponsiveBlockPreview({
  slug,
  label,
  sourcePath,
}: {
  slug: string;
  label: string;
  sourcePath: string;
}) {
  const source = await readFile(
    resolve(process.cwd(), "src", "app", "docs", "blocks", sourcePath),
    "utf8",
  );
  const highlightedCode = await codeToHtml(source, {
    lang: "tsx",
    themes: { light: "github-light", dark: "github-dark" },
  });

  return (
    <ResponsiveBlockPreviewClient
      src={`/preview/${slug}`}
      label={label}
      codeView={<SourceCodeClient code={source} highlightedCode={highlightedCode} embedded />}
    />
  );
}
