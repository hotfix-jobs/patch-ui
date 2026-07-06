"use client";

import { Badge } from "@patchui/react";
import { Lightning, Shield } from "@phosphor-icons/react";
export function BadgeDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-caption-12 text-ink-muted">Variants (high contrast, default)</p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </div>
      </div>

      <div>
        <p className="mb-3 text-caption-12 text-ink-muted">Variants (low contrast)</p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="default" contrast="low">Default</Badge>
          <Badge variant="success" contrast="low">Success</Badge>
          <Badge variant="warning" contrast="low">Warning</Badge>
          <Badge variant="error" contrast="low">Error</Badge>
        </div>
      </div>

      <div>
        <p className="mb-3 text-caption-12 text-ink-muted">Sizes</p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>

      <div>
        <p className="mb-3 text-caption-12 text-ink-muted">With icon</p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge icon={<Shield />} variant="default">Verified</Badge>
          <Badge icon={<Shield />} variant="default" contrast="low">Verified</Badge>
          <Badge icon={<Lightning />} variant="warning">Beta</Badge>
          <Badge icon={<Lightning />} variant="warning" contrast="low">Beta</Badge>
        </div>
      </div>

      <div>
        <p className="mb-3 text-caption-12 text-ink-muted">Shape</p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge shape="pill">Pill</Badge>
          <Badge shape="rounded">Rounded</Badge>
        </div>
      </div>

    </div>
  );
}
