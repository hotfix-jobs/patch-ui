"use client";

import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@patchui/react";
import { Check, Copy, Warning } from "@phosphor-icons/react/dist/ssr";

export function CopyPage() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const markdownPath = `${pathname.replace(/\/$/, "")}.md`;

  const copyPage = useCallback(async () => {
    try {
      const response = await fetch(markdownPath);
      if (!response.ok) throw new Error(`Unable to load ${markdownPath}`);
      const markdown = await response.text();
      try {
        await navigator.clipboard.writeText(markdown);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = markdown;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setState("copied");
      window.setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("error");
      window.setTimeout(() => setState("idle"), 3000);
    }
  }, [markdownPath]);

  return (
    <div className="flex items-center gap-1" data-slot="copy-page">
      <Button
        variant="tertiary"
        size="sm"
        icon={
          state === "copied" ? (
            <Check aria-hidden />
          ) : state === "error" ? (
            <Warning aria-hidden />
          ) : (
            <Copy aria-hidden />
          )
        }
        onClick={copyPage}
      >
        {state === "copied" ? "Copied page" : state === "error" ? "Copy failed" : "Copy page"}
      </Button>
      <Button
        variant="tertiary"
        size="sm"
        render={<a href={markdownPath} />}
      >
        Markdown
      </Button>
    </div>
  );
}
