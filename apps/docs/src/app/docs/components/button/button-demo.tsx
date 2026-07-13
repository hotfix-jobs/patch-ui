"use client";

import { Button } from "@patchui/react";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}
