"use client";
import { Kbd } from "@patchui/react";

export function KbdDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-label-12 text-gray-800">Modifiers (auto-swaps on Windows/Linux)</p>
        <div className="flex flex-wrap items-center gap-2">
          <Kbd meta />
          <Kbd shift />
          <Kbd alt />
          <Kbd ctrl />
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Combination</p>
        <div className="flex flex-wrap items-center gap-2 text-copy-14 text-gray-1000">
          <Kbd meta>K</Kbd>
          <span>opens the command menu</span>
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Inline (sm)</p>
        <p className="text-copy-14 text-gray-900">
          Press <Kbd size="sm" ctrl shift>P</Kbd> to open the menu, or{" "}
          <Kbd size="sm">Esc</Kbd> to close it.
        </p>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Common keys</p>
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

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Interactive (renders as button, hover/focus)</p>
        <div className="flex flex-wrap items-center gap-2">
          <Kbd size="sm" onClick={() => alert("Cleared")}>Esc</Kbd>
        </div>
      </div>
    </div>
  );
}
