"use client";

import { Button, Spinner } from "@patchui/react";

const SIZES = ["sm", "md", "lg"] as const;

export function SpinnerDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-mini text-ink-muted">Sizes</p>
        <div className="flex flex-wrap items-center gap-6">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Spinner size={size} />
              <span className="text-mini text-ink-muted">{size}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-mini text-ink-muted">Inside a Button (via `loading`)</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button loading size="sm">Saving</Button>
          <Button loading>Saving</Button>
          <Button loading size="lg" variant="secondary">Saving</Button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-mini text-ink-muted">Inline with text</p>
        <div className="flex items-center gap-2 text-small text-ink-muted">
          <Spinner size="sm" />
          <span>Loading recent activity</span>
        </div>
      </div>
    </div>
  );
}
