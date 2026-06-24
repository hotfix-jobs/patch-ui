"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useState,
} from "react";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing } from "../recipes";

/**
 * SegmentedToggle - compact segmented radio control with a sliding active
 * background that uses motion's `layoutId` to physically animate between
 * positions. Use for view-mode toggles (grid/list), sort direction, density,
 * or any small set of mutually-exclusive options.
 *
 * Usage:
 *   <SegmentedToggle value={view} onValueChange={setView} aria-label="View">
 *     <SegmentedToggleItem value="grid" aria-label="Grid view"><Grid /></SegmentedToggleItem>
 *     <SegmentedToggleItem value="list" aria-label="List view"><List /></SegmentedToggleItem>
 *   </SegmentedToggle>
 */

type SegmentedSize = "sm" | "md";

type SegmentedContextValue = {
  value: string;
  setValue: (value: string) => void;
  size: SegmentedSize;
  baseId: string;
};

const SegmentedContext = createContext<SegmentedContextValue | null>(null);

function useSegmentedContext(): SegmentedContextValue {
  const ctx = useContext(SegmentedContext);
  if (!ctx)
    throw new Error(
      "SegmentedToggleItem must be used inside <SegmentedToggle>",
    );
  return ctx;
}

export interface SegmentedToggleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: SegmentedSize;
}

export function SegmentedToggle({
  value: controlledValue,
  defaultValue,
  onValueChange,
  size = "md",
  className,
  children,
  ...props
}: SegmentedToggleProps): React.ReactElement {
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? "");
  const value = controlledValue ?? uncontrolled;
  const setValue = useCallback(
    (next: string) => {
      if (controlledValue === undefined) setUncontrolled(next);
      onValueChange?.(next);
    },
    [controlledValue, onValueChange],
  );

  const baseId = useId();

  return (
    <SegmentedContext.Provider value={{ value, setValue, size, baseId }}>
      <div
        role="radiogroup"
        data-slot="segmented-toggle"
        data-size={size}
        className={cn(
          "inline-flex items-center rounded-[var(--radius-patch-sm)] border-[0.5px] border-[var(--patch-border)] p-0.5",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SegmentedContext.Provider>
  );
}

export interface SegmentedToggleItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
}

export function SegmentedToggleItem({
  value,
  className,
  children,
  disabled,
  onKeyDown,
  ...props
}: SegmentedToggleItemProps): React.ReactElement {
  const {
    value: activeValue,
    setValue,
    size,
    baseId,
  } = useSegmentedContext();
  const reduceMotion = useReducedMotion();
  const isActive = activeValue === value;

  // Arrow / Home / End navigation across siblings — uses DOM query
  // rather than ref tracking so it works regardless of how items are
  // composed (Fragment / conditional render).
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;

    const group = e.currentTarget.closest('[role="radiogroup"]');
    if (!group) return;
    const items = Array.from(
      group.querySelectorAll<HTMLButtonElement>(
        '[role="radio"]:not([disabled])',
      ),
    );
    const current = items.indexOf(e.currentTarget);
    if (current === -1) return;

    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      next = (current + 1) % items.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = (current - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;

    if (next >= 0) {
      e.preventDefault();
      const target = items[next];
      target.focus();
      target.click();
    }
  };

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isActive}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      data-slot="segmented-toggle-item"
      data-active={isActive ? "" : undefined}
      onClick={() => setValue(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative inline-flex items-center justify-center font-medium tracking-[-0.005em] text-[length:var(--text-patch-control)] transition-colors disabled:pointer-events-none disabled:opacity-50",
        // Inactive: muted text, hover brightens. Active: inverted text;
        // background comes from the sliding indicator behind.
        "text-patch-text-secondary hover:text-patch-text data-[active]:text-patch-bg",
        // Size scales padding for both icon-only and text items.
        size === "sm" && "h-6 min-w-6 rounded-[var(--radius-patch-xs)] px-1.5 gap-1.5 [&_svg]:size-3.5",
        size === "md" && "h-7 min-w-7 rounded-[var(--radius-patch-xs)] px-2 gap-2 [&_svg]:size-4",
        focusRing,
        className,
      )}
      {...props}
    >
      {isActive && (
        <motion.div
          layoutId={`segmented-active-${baseId}`}
          data-slot="segmented-toggle-indicator"
          className="absolute inset-0 -z-10 rounded-[var(--radius-patch-xs)] bg-patch-text"
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  mass: 0.5,
                }
          }
        />
      )}
      {children}
    </button>
  );
}
