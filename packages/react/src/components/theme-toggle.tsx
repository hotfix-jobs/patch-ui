"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import type * as React from "react";
import { Button } from "./button";
import { cn } from "../utils";

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

/**
 * Sun/moon crossfade icon. Wrapped in a positioned container so both
 * icons stack in the same spot during AnimatePresence transitions,
 * rotating + scaling in and out from opposite directions.
 */
function ThemeIcon({
  isDark,
  mounted,
  className,
}: {
  isDark: boolean;
  mounted: boolean;
  className?: string;
}): React.ReactElement {
  const reduceMotion = useReducedMotion();
  const spring = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 300, damping: 22, mass: 0.6 };

  if (!mounted) {
    return <span className={cn("inline-block", className)} />;
  }

  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden",
        className,
      )}
    >
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
            className="absolute h-full w-full"
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
            className="absolute h-full w-full"
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
    </span>
  );
}

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
  /** Size of the toggle. Maps to Button sizes: sm→tiny, md→sm, lg→md. */
  size?: "sm" | "md" | "lg";
}

// Theme-toggle size vocabulary predates the Button primitive; map to
// Button's ladder to preserve the on-screen dimensions consumers expect.
const buttonSizeBySize: Record<
  NonNullable<ThemeToggleProps["size"]>,
  "tiny" | "sm" | "md"
> = {
  sm: "tiny",
  md: "sm",
  lg: "md",
};

const iconSizeBySize: Record<NonNullable<ThemeToggleProps["size"]>, string> = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
};

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

  return (
    <Button
      variant="tertiary"
      size={buttonSizeBySize[size]}
      shape="circle"
      onClick={toggle}
      className={cn("overflow-hidden", className)}
      data-slot="theme-toggle"
      data-theme={mounted ? resolved : undefined}
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} mode`
          : "Toggle theme"
      }
      icon={
        <ThemeIcon
          isDark={isDark}
          mounted={mounted}
          className={iconSizeBySize[size]}
        />
      }
      {...props}
    />
  );
}
