"use client";

import { useState } from "react";
import { ThemeToggle, type ResolvedTheme } from "@patchui/react";

export function ThemeToggleDemo() {
  const [controlledTheme, setControlledTheme] = useState<ResolvedTheme>("light");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-mini font-medium text-ink-muted">
          Default
        </p>
        <p className="mb-3 text-small text-ink">
          Click to toggle the site theme. Persists to localStorage.
        </p>
        <ThemeToggle />
      </div>

      <div>
        <p className="mb-3 text-mini font-medium text-ink-muted">
          Sizes
        </p>
        <div className="flex items-center gap-3">
          <ThemeToggle size="sm" storageKey={false} applyClass={false} />
          <ThemeToggle size="md" storageKey={false} applyClass={false} />
          <ThemeToggle size="lg" storageKey={false} applyClass={false} />
        </div>
      </div>

      <div>
        <p className="mb-3 text-mini font-medium text-ink-muted">
          Controlled
        </p>
        <div className="flex items-center gap-3">
          <ThemeToggle
            theme={controlledTheme}
            onThemeChange={setControlledTheme}
            storageKey={false}
            applyClass={false}
          />
          <span className="text-small text-ink">
            Current: <strong className="text-ink">{controlledTheme}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
