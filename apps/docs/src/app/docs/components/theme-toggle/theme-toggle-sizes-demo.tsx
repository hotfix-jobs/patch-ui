"use client";

import { ThemeToggle } from "@patchui/react";

export function ThemeToggleSizesDemo() {
  return (
    <div className="flex items-center gap-3">
      <ThemeToggle theme="light" size="sm" storageKey={false} applyClass={false} />
      <ThemeToggle theme="light" size="md" storageKey={false} applyClass={false} />
      <ThemeToggle theme="light" size="lg" storageKey={false} applyClass={false} />
    </div>
  );
}
