"use client";

import { useEffect, useState } from "react";
import { Progress, SectionLabel } from "@patchui/react";
import { CheckCircle, FileText, HardDrives } from "@phosphor-icons/react";
export function ProgressDemo() {
  const [upload, setUpload] = useState(20);
  useEffect(() => {
    const id = setInterval(() => {
      setUpload((v) => (v >= 100 ? 0 : v + 7));
    }, 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex max-w-md flex-col gap-10">
      <div className="space-y-3">
        <SectionLabel>File upload</SectionLabel>
        <div className="flex flex-col gap-2 rounded-[var(--radius-6)] border border-hairline p-3">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-ink-muted" aria-hidden />
            <span className="flex-1 text-body-13 text-ink">
              resume-final.pdf
            </span>
            <span className="tabular-nums text-caption-12 text-ink-muted">
              {upload}%
            </span>
          </div>
          <Progress value={upload} size="sm" />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Onboarding step</SectionLabel>
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="text-button-14 text-ink">Set up your workspace</span>
            <span className="tabular-nums text-caption-12 text-ink-muted">
              Step 2 of 4
            </span>
          </div>
          <Progress value={2} max={4} size="sm" />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Storage quota</SectionLabel>
        <div className="flex flex-col gap-2 rounded-[var(--radius-6)] border border-hairline p-3">
          <div className="flex items-center gap-2">
            <HardDrives className="size-4 text-ink-muted" aria-hidden />
            <span className="flex-1 text-body-13 text-ink">Storage</span>
            <span className="tabular-nums text-caption-12 text-ink-muted">
              12.4 GB of 20 GB
            </span>
          </div>
          <Progress value={12.4} max={20} size="sm" />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Status variants</SectionLabel>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <span className="text-body-13 text-ink">Sync complete</span>
              <span className="tabular-nums text-caption-12 text-ink-muted">
                100%
              </span>
            </div>
            <Progress value={100} variant="success" size="sm" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <span className="text-body-13 text-ink">
                Approaching rate limit
              </span>
              <span className="tabular-nums text-caption-12 text-ink-muted">
                80%
              </span>
            </div>
            <Progress value={80} variant="warning" size="sm" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <span className="text-body-13 text-ink">Quota exceeded</span>
              <span className="tabular-nums text-caption-12 text-ink-muted">
                108%
              </span>
            </div>
            <Progress value={100} variant="error" size="sm" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Indeterminate</SectionLabel>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="size-4 text-ink-muted" aria-hidden />
            <span className="flex-1 text-body-13 text-ink">
              Preparing your export…
            </span>
          </div>
          <Progress value={null} size="sm" />
        </div>
      </div>
    </div>
  );
}
