"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
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

  // Internal state for uncontrolled mode. Lazy initializer reads from storage
  // / system preference once at mount, so the first render already reflects
  // the persisted choice (no flash + no setState-in-effect).
  const [internalTheme, setInternalTheme] = useState<ResolvedTheme>(() => {
    if (typeof window === "undefined") return "light";
    if (storageKey !== false) {
      const stored = localStorage.getItem(storageKey);
      if (stored === "light" || stored === "dark") return stored;
    }
    return getSystemTheme();
  });

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
  const reduceMotion = useReducedMotion();

  const sizeClasses = {
    sm: "h-7 w-7 [&_svg]:size-3.5",
    md: "h-8 w-8 [&_svg]:size-4",
    lg: "h-9 w-9 [&_svg]:size-5",
  };

  const spring = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 300, damping: 22, mass: 0.6 };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-[var(--radius-6)] text-gray-900 hover:bg-gray-200 hover:text-gray-1000 transition-transform duration-[var(--duration-state)] ease-[var(--ease-standard)] active:scale-95",
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
      ) : (
        // Default sync mode: AnimatePresence renders both icons during
        // transition (old still in DOM until its exit completes). Absolute
        // positioning stacks them in the same spot so the exit + enter
        // animations crossfade — no blank frame between the two icons.
        <AnimatePresence initial={false}>
          {isDark ? (
            <motion.svg
              key="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute"
              initial={
                reduceMotion ? false : { rotate: -90, scale: 0, opacity: 0 }
              }
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={
                reduceMotion ? undefined : { rotate: 90, scale: 0, opacity: 0 }
              }
              transition={spring}
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
            </motion.svg>
          ) : (
            <motion.svg
              key="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute"
              initial={
                reduceMotion ? false : { rotate: 90, scale: 0, opacity: 0 }
              }
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={
                reduceMotion ? undefined : { rotate: -90, scale: 0, opacity: 0 }
              }
              transition={spring}
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </motion.svg>
          )}
        </AnimatePresence>
      )}
    </button>
  );
}
