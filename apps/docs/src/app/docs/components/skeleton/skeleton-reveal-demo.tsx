"use client";

import { useState } from "react";
import { Avatar, Button, Skeleton } from "@patchui/react";

export function SkeletonRevealDemo() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <div aria-busy={loading || undefined} className="flex items-center gap-3">
        <Skeleton show={loading} shape="pill" width={48} height={48}>
          <Avatar letter="AL" size="lg" />
        </Skeleton>
        <Skeleton show={loading} width={160} height={20}>
          <p className="text-small font-medium text-ink">Ada Lovelace</p>
        </Skeleton>
      </div>
      <Button
        variant="secondary"
        size="sm"
        className="self-start"
        onClick={() => setLoading((value) => !value)}
      >
        {loading ? "Show Content" : "Reset Loading"}
      </Button>
    </div>
  );
}
