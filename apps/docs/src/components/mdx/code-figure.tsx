"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useRef, useState } from "react";

/**
 * Wraps rehype-pretty-code's <figure> output with a copy button.
 * The figure already has syntax-highlighted <pre><code> from rehype-pretty-code.
 * We add our copy button on hover and extract code text from the DOM on click.
 */
export function CodeFigure({
  children,
  ...props
}: React.ComponentProps<"figure">) {
  const figureRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    const code =
      figureRef.current?.querySelector("code")?.textContent || "";
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
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div
      ref={figureRef}
      className="group/codeblock relative my-6 min-w-0 overflow-hidden rounded-[var(--radius-12)] border border-hairline"
      data-slot="code-block"
    >
      <figure {...props} className="m-0">
        {children}
      </figure>
      <button
        type="button"
        onClick={handleCopy}
        className={`absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-surface-1 hover:text-ink lg:opacity-0 lg:group-hover/codeblock:opacity-100 ${copied ? "text-success opacity-100" : "text-ink-muted"}`}
        aria-label={copied ? "Copied" : "Copy code"}
        data-slot="code-block-copy"
      >
        {copied ? (
          <Check className="size-3.5" aria-hidden />
        ) : (
          <Copy className="size-3.5" aria-hidden />
        )}
      </button>
    </div>
  );
}
