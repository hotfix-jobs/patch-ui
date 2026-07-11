"use client";

import { Badge } from "@patchui/react";
import { Lightning, Shield } from "@phosphor-icons/react/dist/ssr";
export function BadgeDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-mini text-ink-muted">Solid</p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge color="default" variant="solid">Default</Badge>
          <Badge color="success" variant="solid">Success</Badge>
          <Badge color="warning" variant="solid">Warning</Badge>
          <Badge color="error" variant="solid">Error</Badge>
        </div>
      </div>

      <div>
        <p className="mb-3 text-mini text-ink-muted">Soft (default)</p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge color="default">Default</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="error">Error</Badge>
        </div>
      </div>

      <div>
        <p className="mb-3 text-mini text-ink-muted">Outlined</p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge color="default" variant="outlined">Default</Badge>
          <Badge color="success" variant="outlined">Success</Badge>
          <Badge color="warning" variant="outlined">Warning</Badge>
          <Badge color="error" variant="outlined">Error</Badge>
        </div>
      </div>

      <div>
        <p className="mb-3 text-mini text-ink-muted">Sizes</p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>

      <div>
        <p className="mb-3 text-mini text-ink-muted">Shapes</p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge shape="rounded">Rounded</Badge>
          <Badge shape="pill">Pill</Badge>
          <Badge shape="pill" color="success">Featured</Badge>
        </div>
      </div>

      <div>
        <p className="mb-3 text-mini text-ink-muted">With icon</p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge icon={<Shield />}>Verified</Badge>
          <Badge icon={<Shield />} variant="solid">Verified</Badge>
          <Badge icon={<Lightning />} color="warning">Beta</Badge>
          <Badge icon={<Lightning />} color="warning" variant="outlined">Beta</Badge>
        </div>
      </div>

    </div>
  );
}
