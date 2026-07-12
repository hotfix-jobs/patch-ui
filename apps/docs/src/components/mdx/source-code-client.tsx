"use client";

import { useCallback, useState } from "react";
import { Button, Card, cn } from "@patchui/react";
import { Check, Copy } from "@phosphor-icons/react/dist/ssr";

interface SourceCodeClientProps {
  code: string;
  highlightedCode: string;
  filename?: string;
  className?: string;
  embedded?: boolean;
}

export function SourceCodeClient({
  code,
  highlightedCode,
  filename,
  className,
  embedded = false,
}: SourceCodeClientProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const content = (
    <>
      {filename && (
        <div className="flex min-h-10 items-center gap-2 border-b border-hairline px-3 py-1">
          <span className="min-w-0 flex-1 truncate px-1 font-mono text-mini text-ink-muted">
            {filename}
          </span>
          <Button
            variant="tertiary"
            size="sm"
            icon={copied ? <Check aria-hidden /> : <Copy aria-hidden />}
            onClick={copyCode}
            aria-label={copied ? "Code copied" : "Copy code"}
          >
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      )}
      {!filename && (
        <Button
          variant="tertiary"
          size="sm"
          icon={copied ? <Check aria-hidden /> : <Copy aria-hidden />}
          onClick={copyCode}
          className="absolute end-3 top-3 z-10"
          aria-label={copied ? "Code copied" : "Copy code"}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      )}
      <div
        className={cn(
          "component-preview-code max-h-96 min-h-24 overflow-auto p-4 font-mono text-small text-ink",
          !filename && "pe-24",
        )}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </>
  );

  if (embedded) {
    return (
      <div className={cn("relative overflow-hidden bg-base", className)} data-slot="source-code">
        {content}
      </div>
    );
  }

  return (
    <Card
      variant="outlined"
      className={cn("relative my-6 overflow-hidden bg-base", className)}
      data-slot="source-code"
    >
      {content}
    </Card>
  );
}
