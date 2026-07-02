"use client";
import { Kbd } from "@patchui/react";

export function KbdDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Default size (md)
        </p>
        <div className="flex items-center gap-2">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
          <span className="text-gray-800">opens the command palette</span>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Small (sm) for inline body text
        </p>
        <p className="text-label-13 text-gray-900">
          Press <Kbd size="sm">Ctrl</Kbd> + <Kbd size="sm">Shift</Kbd> +{" "}
          <Kbd size="sm">P</Kbd> to open the menu.
        </p>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
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
