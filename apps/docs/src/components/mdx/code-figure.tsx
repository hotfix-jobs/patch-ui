"use client";

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
      className="group/codeblock relative my-6 min-w-0 overflow-hidden rounded-[6px] ring-1 ring-gray-alpha-400"
      data-slot="code-block"
    >
      <figure {...props} className="m-0">
        {children}
      </figure>
      <button
        type="button"
        onClick={handleCopy}
        className={`absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-[4px] text-gray-800 transition-all hover:bg-gray-200 hover:text-gray-1000 lg:opacity-0 lg:group-hover/codeblock:opacity-100 ${copied ? "!text-success !opacity-100" : ""}`}
        aria-label={copied ? "Copied" : "Copy code"}
        data-slot="code-block-copy"
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        )}
      </button>
    </div>
  );
}
