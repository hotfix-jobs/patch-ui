import { codeToHtml } from "shiki";

import { SourceCodeClient } from "./source-code-client";

interface SourceCodeProps {
  code: string;
  filename?: string;
  language?: string;
  className?: string;
}

export async function SourceCode({
  code,
  filename,
  language = "tsx",
  className,
}: SourceCodeProps) {
  const highlightedCode = await codeToHtml(code, {
    lang: language,
    themes: { light: "github-light", dark: "github-dark" },
  });

  return (
    <SourceCodeClient
      code={code}
      highlightedCode={highlightedCode}
      filename={filename}
      className={className}
    />
  );
}
