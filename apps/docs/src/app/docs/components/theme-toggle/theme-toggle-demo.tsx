"use client";

import { useState } from "react";
import { ThemeToggle, type ResolvedTheme } from "@patchui/react";

export function ThemeToggleDemo() {
  const [controlledTheme, setControlledTheme] = useState<ResolvedTheme>("light");

  return (
    <div className="flex flex-col gap-8">
      {/* Default (uncontrolled) */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Default
        </p>
        <p className="mb-3 text-sm text-patch-text-secondary">
          Click to toggle the site theme. Persists to localStorage.
        </p>
        <ThemeToggle />
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Sizes
        </p>
        <div className="flex items-center gap-3">
          <ThemeToggle size="sm" storageKey={false} applyClass={false} />
          <ThemeToggle size="md" storageKey={false} applyClass={false} />
          <ThemeToggle size="lg" storageKey={false} applyClass={false} />
        </div>
      </div>

      {/* Controlled */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Controlled
        </p>
        <div className="flex items-center gap-3">
          <ThemeToggle
            theme={controlledTheme}
            onThemeChange={setControlledTheme}
            storageKey={false}
            applyClass={false}
          />
          <span className="text-sm text-patch-text-secondary">
            Current: <strong className="text-patch-text">{controlledTheme}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
