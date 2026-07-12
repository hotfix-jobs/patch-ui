"use client";

import { Fragment, type ReactNode, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@patchui/react";
import { ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr";

interface ComponentPreviewClientProps {
  children: ReactNode;
  label?: string;
  code?: string;
  codeView?: ReactNode;
  previewClassName?: string;
  resettable?: boolean;
}

export function ComponentPreviewClient({
  children,
  label,
  code,
  codeView,
  previewClassName,
  resettable,
}: ComponentPreviewClientProps) {
  const [mode, setMode] = useState<"preview" | "code">("preview");
  const [resetKey, setResetKey] = useState(0);

  return (
    <div
      className="my-6 overflow-hidden rounded-[var(--radius-12)] bg-layer-1"
      data-slot="component-preview"
    >
      {code && mode === "code" ? (
        codeView
      ) : (
        <div
          className={`w-full min-w-0 overflow-hidden p-6 ${previewClassName ?? ""}`}
        >
          <Fragment key={resetKey}>{children}</Fragment>
        </div>
      )}
      {(label || code) && (
        <div className="flex min-h-11 items-center gap-2 border-t border-hairline px-3 py-1.5">
          {label && (
            <span className="min-w-0 flex-1 truncate px-1 text-mini font-medium text-ink-muted">
              {label}
            </span>
          )}
          {resettable && mode === "preview" && (
            <button
              type="button"
              onClick={() => setResetKey((key) => key + 1)}
              className="inline-flex size-7 shrink-0 items-center justify-center rounded-[var(--radius-8)] text-ink-muted outline-none transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-layer-hover hover:text-ink focus-visible:bg-layer-hover focus-visible:text-ink"
              aria-label="Reset example"
            >
              <ArrowCounterClockwise className="size-3.5" aria-hidden />
            </button>
          )}
          {code && (
            <ToggleGroup
              value={mode}
              onValueChange={(value) => {
                if (value === "preview" || value === "code") setMode(value);
              }}
              size="sm"
              className="ms-auto shrink-0"
              aria-label="Example view"
            >
              <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
              <ToggleGroupItem value="code">Code</ToggleGroupItem>
            </ToggleGroup>
          )}
        </div>
      )}
    </div>
  );
}
