"use client";

import { useCallback, useRef, useState } from "react";

import { Check, Copy } from "@phosphor-icons/react/dist/ssr";
export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = command;
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
  }, [command]);

  return (
    <div
      className="group/install relative my-6 flex items-center gap-2 overflow-x-auto rounded-[var(--radius-8)] bg-fill-1 ps-4 pe-11 py-2.5 font-mono text-small text-ink"
      data-slot="install"
    >
      <span className="shrink-0 text-ink-muted">$</span>
      <span className="whitespace-nowrap">{command}</span>
      <button
        type="button"
        onClick={handleCopy}
        className={`absolute end-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-[var(--radius-8)] outline-none transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-layer-hover hover:text-ink active:bg-layer-hover focus-visible:shadow-[inset_0_-2px_0_var(--focus-ring-color)] ${copied ? "text-success" : "text-ink-muted"}`}
        aria-label={copied ? "Copied" : "Copy command"}
        data-slot="install-copy"
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

/** Per-component install command. Usage in MDX: <Install name="button" /> */
export function Install({ name }: { name: string }) {
  return <CopyCommand command={`npx shadcn@latest add @patchui/${name}`} />;
}
