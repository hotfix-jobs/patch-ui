"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import type * as React from "react";
import { Button } from "./button";
import { cn } from "../utils";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

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
          <motion.span
            key="sun"
            className="absolute inset-0 flex items-center justify-center"
            initial={
              reduceMotion ? false : { rotate: -90, scale: 0, opacity: 0 }
            }
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={
              reduceMotion ? undefined : { rotate: 90, scale: 0, opacity: 0 }
            }
            transition={spring}
          >
            <Sun className="size-full" aria-hidden />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            className="absolute inset-0 flex items-center justify-center"
            initial={
              reduceMotion ? false : { rotate: 90, scale: 0, opacity: 0 }
            }
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={
              reduceMotion ? undefined : { rotate: -90, scale: 0, opacity: 0 }
            }
            transition={spring}
          >
            <Moon className="size-full" aria-hidden />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export interface ThemeToggleProps
  extends Omit<React.ComponentProps<"button">, "children"> {
  theme?: Theme;
  onThemeChange?: (theme: ResolvedTheme) => void;
  /** localStorage key for persisting the theme. Set to `false` to disable. */
  storageKey?: string | false;
  /** Whether to apply the `.dark` class to `<html>`. */
  applyClass?: boolean;
  size?: "sm" | "md" | "lg";
}

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

  // Lazy initializer reads persisted / system theme at mount so first render reflects it (no flash).
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
      size={size}
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
