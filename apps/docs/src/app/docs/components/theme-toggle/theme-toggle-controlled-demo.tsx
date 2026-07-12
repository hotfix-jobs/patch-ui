"use client";

import { useState } from "react";
import { ThemeToggle, type ResolvedTheme } from "@patchui/react";

export function ThemeToggleControlledDemo() {
  const [theme, setTheme] = useState<ResolvedTheme>("light");

  return (
    <div className="flex items-center gap-3">
      <ThemeToggle
        theme={theme}
        onThemeChange={setTheme}
        storageKey={false}
        applyClass={false}
      />
      <span className="text-small text-ink-muted">Current theme: {theme}</span>
    </div>
  );
}
