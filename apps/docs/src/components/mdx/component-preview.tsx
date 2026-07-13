import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { codeToHtml } from "shiki";

import { ComponentPreviewClient } from "./component-preview-client";
import { SourceCodeClient } from "./source-code-client";

interface ComponentPreviewProps {
  children: React.ReactNode;
  label?: string;
  code?: string;
  sourcePath?: string;
  filename?: string;
  language?: string;
  previewClassName?: string;
  resettable?: boolean;
}

export async function ComponentPreview({
  children,
  label,
  code,
  sourcePath,
  filename,
  language = "tsx",
  previewClassName,
  resettable,
}: ComponentPreviewProps) {
  const docsSourcePath = sourcePath?.replace(/^src\/app\/docs\//, "");
  const source = docsSourcePath
    ? await readFile(
        join(process.cwd(), "src", "app", "docs", docsSourcePath),
        "utf8",
      )
    : code;
  const highlightedCode = source
    ? await codeToHtml(source, {
        lang: language,
        themes: { light: "github-light", dark: "github-dark" },
      })
    : undefined;

  return (
    <ComponentPreviewClient
      label={label}
      code={source}
      previewClassName={previewClassName}
      resettable={resettable}
      codeView={
        source && highlightedCode ? (
          <SourceCodeClient
            code={source}
            highlightedCode={highlightedCode}
            filename={filename}
            embedded
          />
        ) : undefined
      }
    >
      {children}
    </ComponentPreviewClient>
  );
}
