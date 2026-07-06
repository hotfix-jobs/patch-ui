"use client";

import { useEffect, useState } from "react";
import { Button, Skeleton } from "@patchui/react";
import { SectionLabel } from "@patchui/react";

export function SkeletonDemo() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Text lines</SectionLabel>
        <div className="flex flex-col gap-2">
          <Skeleton height={16} width="100%" />
          <Skeleton height={16} width="80%" />
          <Skeleton height={16} width="60%" />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Shapes</SectionLabel>
        <div className="flex items-center gap-4">
          <Skeleton shape="pill" width={40} height={40} />
          <Skeleton shape="rounded" width={80} height={32} />
          <Skeleton shape="squared" width={80} height={32} />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Card layout</SectionLabel>
        <div className="flex items-start gap-4">
          <Skeleton shape="pill" width={40} height={40} />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton height={16} width="33%" />
            <Skeleton height={16} width="100%" />
            <Skeleton height={16} width="66%" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Load / reveal (show prop)</SectionLabel>
        <div className="flex items-start gap-4">
          <Skeleton show={loading} shape="pill" width={48} height={48}>
            <div className="flex size-12 items-center justify-center rounded-full bg-ink text-canvas text-button-14">
              A
            </div>
          </Skeleton>
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton show={loading} height={20} width="30%">
              <p className="text-button-14 text-ink">Ada Lovelace</p>
            </Skeleton>
            <Skeleton show={loading} height={16} width="55%">
              <p className="text-body-14 text-ink-muted">Programmer, first algorithm</p>
            </Skeleton>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="mt-4"
          onClick={() => setLoading((v) => !v)}
        >
          {loading ? "Reveal" : "Reset"}
        </Button>
      </div>

      <div className="space-y-3">
        <SectionLabel>Static (animated=false)</SectionLabel>
        <div className="flex flex-col gap-2">
          <Skeleton animated={false} height={16} width="100%" />
          <Skeleton animated={false} height={16} width="70%" />
        </div>
      </div>
    </div>
  );
}
