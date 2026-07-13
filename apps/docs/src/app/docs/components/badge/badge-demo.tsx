"use client";

import { Badge } from "@patchui/react";
export function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Default</Badge>
      <Badge color="success">Active</Badge>
      <Badge color="warning">Pending</Badge>
      <Badge color="error">Failed</Badge>
    </div>
  );
}
