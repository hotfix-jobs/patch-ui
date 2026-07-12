"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr";
import { ToggleGroup, ToggleGroupItem } from "@patchui/react";

export function ResponsiveBlockPreviewClient({
  src,
  label,
  codeView,
}: {
  src: string;
  label: string;
  codeView: React.ReactNode;
}) {
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [mode, setMode] = useState<"preview" | "code">("preview");
  const [resetKey, setResetKey] = useState(0);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const [desktopScale, setDesktopScale] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(max-width: 639px)").matches) setViewport("mobile");
  }, []);

  useEffect(() => {
    const container = desktopContainerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(([entry]) => {
      setDesktopScale(Math.min(1, entry.contentRect.width / 1024));
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="my-6 overflow-hidden rounded-[var(--radius-12)] bg-layer-1">
      {mode === "code" ? codeView : (
        <div className="bg-base p-3 sm:p-5">
          {viewport === "desktop" ? (
            <div
              ref={desktopContainerRef}
              className="relative w-full overflow-hidden rounded-[var(--radius-8)]"
              style={{ height: 430 * desktopScale }}
            >
              <iframe
                key={resetKey}
                src={src}
                title={`${label} desktop preview`}
                className="absolute left-0 top-0 h-[430px] w-[1024px] origin-top-left bg-base"
                style={{ transform: `scale(${desktopScale})` }}
              />
            </div>
          ) : (
            <div className="mx-auto w-[390px] max-w-full">
              <iframe
                key={resetKey}
                src={src}
                title={`${label} mobile preview`}
                className="h-[430px] w-full rounded-[var(--radius-8)] bg-base"
              />
            </div>
          )}
        </div>
      )}
      <div className="flex min-h-11 flex-wrap items-center gap-2 border-t border-hairline px-3 py-1.5">
        <span className="min-w-0 flex-1 truncate px-1 text-mini font-medium text-ink-muted">{label}</span>
        {mode === "preview" && (
          <>
            <button
              type="button"
              onClick={() => setResetKey((key) => key + 1)}
              className="inline-flex size-7 items-center justify-center rounded-[var(--radius-8)] text-ink-muted outline-none hover:bg-layer-hover hover:text-ink focus-visible:bg-layer-hover focus-visible:text-ink"
              aria-label="Reset block preview"
            >
              <ArrowCounterClockwise className="size-3.5" aria-hidden />
            </button>
            <ToggleGroup value={viewport} onValueChange={(value) => {
              if (value === "desktop" || value === "mobile") setViewport(value);
            }} size="sm" aria-label="Preview viewport">
              <ToggleGroupItem value="desktop">Desktop</ToggleGroupItem>
              <ToggleGroupItem value="mobile">Mobile</ToggleGroupItem>
            </ToggleGroup>
          </>
        )}
        <ToggleGroup value={mode} onValueChange={(value) => {
          if (value === "preview" || value === "code") setMode(value);
        }} size="sm" aria-label="Block view">
          <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
          <ToggleGroupItem value="code">Code</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
