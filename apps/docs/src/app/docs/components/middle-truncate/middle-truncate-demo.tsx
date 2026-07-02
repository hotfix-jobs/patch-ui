"use client";

import { useState } from "react";
import { MiddleTruncate, Slider } from "@patchui/react";
import { SectionLabel } from "@/components/demo/section-label";

export function MiddleTruncateDemo() {
  const [width, setWidth] = useState(360);

  return (
    <div className="flex flex-col gap-8">
      {/* Resizable preview */}
      <div>
        <SectionLabel>Interactive width</SectionLabel>
        <div className="flex flex-col gap-3">
          <div className="max-w-sm">
            <Slider
              value={width}
              onValueChange={(v) =>
                setWidth(Array.isArray(v) ? v[0] : (v as number))
              }
              min={120}
              max={640}
              step={1}
              aria-label="Container width"
            />
          </div>
          <span className="text-label-13 text-gray-800 tabular-nums">
            {width}px
          </span>
          <div
            className="rounded-[var(--radius-6)] border border-gray-alpha-400 bg-background-200 p-3"
            style={{ width }}
          >
            <MiddleTruncate
              value="apps/docs/src/app/docs/blocks/app-header/index.tsx"
              className="text-copy-14 font-mono text-gray-1000"
            />
          </div>
        </div>
      </div>

      {/* Common patterns */}
      <div>
        <SectionLabel>Common patterns</SectionLabel>
        <div className="flex max-w-md flex-col gap-3">
          <Row label="Deploy ID">
            <MiddleTruncate
              value="dpl_2XfHqvW9NbGkLm3pTZ7Yz4vJc8Bh1Rd6P9Ab"
             
              className="font-mono text-copy-14 text-gray-1000"
            />
          </Row>
          <Row label="Commit hash">
            <MiddleTruncate
              value="9a3b7cf2e8d4051f6c72a018de4b93bd0e9c17d9"
             
              className="font-mono text-copy-14 text-gray-1000"
            />
          </Row>
          <Row label="File path">
            <MiddleTruncate
              value="apps/docs/src/app/docs/components/middle-truncate/page.mdx"
             
              className="font-mono text-copy-14 text-gray-1000"
            />
          </Row>
          <Row label="Branch">
            <MiddleTruncate
              value="feature/2026-q1/auth-refresh-token-rotation-hardening"
             
              className="font-mono text-copy-14 text-gray-1000"
            />
          </Row>
          <Row label="URL">
            <MiddleTruncate
              value="https://example.com/careers/engineering/senior-react-engineer-remote"
             
              className="text-copy-14 text-gray-1000"
            />
          </Row>
        </div>
      </div>

      {/* Short values pass through unchanged */}
      <div>
        <SectionLabel>Short values render unchanged</SectionLabel>
        <div className="flex flex-col gap-1 text-copy-14 text-gray-1000">
          <MiddleTruncate value="short" />
          <MiddleTruncate value="acme" />
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="w-24 shrink-0 text-label-13 text-gray-800">{label}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
