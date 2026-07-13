"use client";

import { Badge } from "@patchui/react";
import { Shield } from "@phosphor-icons/react/dist/ssr";

export function BadgeVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="solid">Solid</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="outlined">Outlined</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="lg">Large</Badge>
      <Badge shape="pill" icon={<Shield />}>
        Verified
      </Badge>
    </div>
  );
}
