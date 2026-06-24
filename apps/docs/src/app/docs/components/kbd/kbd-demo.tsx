"use client";
import { Kbd } from "@patchui/react";

export function KbdDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Default size (md)
        </p>
        <div className="flex items-center gap-2">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
          <span className="text-patch-text-tertiary">opens the command palette</span>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Small (sm) for inline body text
        </p>
        <p className="text-[length:var(--text-patch-control)] text-patch-text-secondary">
          Press <Kbd size="sm">Ctrl</Kbd> + <Kbd size="sm">Shift</Kbd> +{" "}
          <Kbd size="sm">P</Kbd> to open the menu.
        </p>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Common keys
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
          <Kbd>←</Kbd>
          <Kbd>→</Kbd>
          <Kbd>Esc</Kbd>
          <Kbd>Enter</Kbd>
          <Kbd>Tab</Kbd>
        </div>
      </div>
    </div>
  );
}
