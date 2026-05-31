"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

// ─── Types ──────────────────────────────────────────────────────────────

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

// ─── Utilities ──────────────────────────────────────────────────────────

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === "system" ? getSystemTheme() : theme;
}

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

// ─── ThemeToggle ────────────────────────────────────────────────────────

export interface ThemeToggleProps
  extends Omit<React.ComponentProps<"button">, "children"> {
  /** Controlled theme value. */
  theme?: Theme;
  /** Called when the theme changes. */
  onThemeChange?: (theme: ResolvedTheme) => void;
  /** localStorage key for persisting the theme. Set to `false` to disable. */
  storageKey?: string | false;
  /** Whether to apply the `.dark` class to `<html>`. Defaults to true. */
  applyClass?: boolean;
  /** Size of the toggle button. */
  size?: "sm" | "md" | "lg";
}

export function ThemeToggle({
  className,
  theme: controlledTheme,
  onThemeChange,
  storageKey = "patch-ui-theme",
  applyClass = true,
  size = "md",
  ...props
}: ThemeToggleProps): React.ReactElement {
  const mounted = useMounted();

  // Internal state for uncontrolled mode
  const [internalTheme, setInternalTheme] = useState<ResolvedTheme>("light");

  // Initialize from storage or system preference
  useEffect(() => {
    if (controlledTheme !== undefined) return;
    let initial: ResolvedTheme = getSystemTheme();
    if (storageKey !== false && typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey);
      if (stored === "light" || stored === "dark") {
        initial = stored;
      }
    }
    setInternalTheme(initial);
  }, [controlledTheme, storageKey]);

  const resolved: ResolvedTheme =
    controlledTheme !== undefined
      ? resolveTheme(controlledTheme)
      : internalTheme;

  // Apply .dark class
  useEffect(() => {
    if (!applyClass || !mounted) return;
    document.documentElement.classList.toggle("dark", resolved === "dark");
  }, [resolved, applyClass, mounted]);

  const toggle = useCallback(() => {
    const next: ResolvedTheme = resolved === "light" ? "dark" : "light";
    if (controlledTheme === undefined) {
      setInternalTheme(next);
      if (storageKey !== false) {
        localStorage.setItem(storageKey, next);
      }
    }
    onThemeChange?.(next);
  }, [resolved, controlledTheme, onThemeChange, storageKey]);

  const isDark = resolved === "dark";

  const sizeClasses = {
    sm: "h-7 w-7 [&_svg]:size-3.5",
    md: "h-8 w-8 [&_svg]:size-4",
    lg: "h-9 w-9 [&_svg]:size-5",
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-patch-sm)] text-patch-text-secondary hover:bg-patch-surface-hover hover:text-patch-text",
        colorTransition,
        focusRing,
        sizeClasses[size],
        className,
      )}
      data-slot="theme-toggle"
      data-theme={mounted ? resolved : undefined}
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} mode`
          : "Toggle theme"
      }
      {...props}
    >
      {!mounted ? (
        <span className="size-4" />
      ) : isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-[var(--duration-patch-spring)] ease-[var(--ease-patch-out)]"
          style={{ animation: "patch-theme-icon-in 0.3s ease-out" }}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-[var(--duration-patch-spring)] ease-[var(--ease-patch-out)]"
          style={{ animation: "patch-theme-icon-in 0.3s ease-out" }}
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}
