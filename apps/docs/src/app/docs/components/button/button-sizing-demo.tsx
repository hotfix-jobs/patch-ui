"use client";

import { Button } from "@patchui/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";

export function ButtonSizingDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button shape="pill">Pill</Button>
      <Button
        variant="secondary"
        shape="pill"
        aria-label="Add item"
        icon={<Plus />}
      />
    </div>
  );
}
