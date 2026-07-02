"use client";

import { useState } from "react";
import { MiddleTruncate, Slider } from "@patchui/react";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-label-12 font-medium text-gray-800">{children}</p>;
}

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
              value="packages/react/src/components/middle-truncate/really-long-example-file-name.tsx"
              tail={12}
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
              tail={8}
              className="font-mono text-copy-14 text-gray-1000"
            />
          </Row>
          <Row label="Commit hash">
            <MiddleTruncate
              value="9a3b7cf2e8d4051f6c72a018de4b93bd0e9c17d9"
              tail={6}
              className="font-mono text-copy-14 text-gray-1000"
            />
          </Row>
          <Row label="File path">
            <MiddleTruncate
              value="apps/docs/src/app/docs/components/middle-truncate/page.mdx"
              tail={12}
              className="font-mono text-copy-14 text-gray-1000"
            />
          </Row>
          <Row label="Branch">
            <MiddleTruncate
              value="feature/2026-q1/auth-refresh-token-rotation-hardening"
              tail={10}
              className="font-mono text-copy-14 text-gray-1000"
            />
          </Row>
          <Row label="URL">
            <MiddleTruncate
              value="https://example.com/careers/engineering/senior-react-engineer-remote"
              tail={16}
              className="text-copy-14 text-gray-1000"
            />
          </Row>
        </div>
      </div>

      {/* Short values pass through unchanged */}
      <div>
        <SectionLabel>Short values render unchanged</SectionLabel>
        <div className="flex flex-col gap-1 text-copy-14 text-gray-1000">
          <MiddleTruncate value="short" tail={6} />
          <MiddleTruncate value="acme" tail={6} />
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
