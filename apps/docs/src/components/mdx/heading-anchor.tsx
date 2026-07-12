"use client";

import { useCallback, useRef, useState } from "react";
import { Check, LinkSimple } from "@phosphor-icons/react/dist/ssr";

export function HeadingAnchor({ id, label }: { id: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyLink = useCallback(async () => {
    const url = new URL(window.location.href);
    url.hash = id;
    window.history.replaceState(null, "", url);
    await navigator.clipboard.writeText(url.toString());
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  }, [id]);

  return (
    <button
      type="button"
      onClick={copyLink}
      className="inline-flex size-7 shrink-0 items-center justify-center rounded-[var(--radius-8)] text-ink-muted opacity-0 outline-none transition-[opacity,color,background-color] duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-layer-hover hover:text-ink focus-visible:bg-layer-hover focus-visible:text-ink focus-visible:opacity-100 group-hover/heading:opacity-100"
      aria-label={copied ? `Copied link to ${label}` : `Copy link to ${label}`}
    >
      {copied ? <Check className="size-3.5 text-success" aria-hidden /> : <LinkSimple className="size-3.5" aria-hidden />}
    </button>
  );
}
