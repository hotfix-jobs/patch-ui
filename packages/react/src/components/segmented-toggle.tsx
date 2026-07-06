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
import { focusRing, iconMuted } from "../recipes";

/** Compact segmented radio control with a sliding active background. */

type SegmentedSize = "sm" | "md" | "lg";

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
          // isolate contains the active indicator's -z-10 stacking.
          "isolate inline-flex w-fit self-start items-center rounded-[var(--radius-6)] border border-hairline bg-surface-1 p-0.5",
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
        "relative inline-flex items-center justify-center rounded-[var(--radius-6)] transition-colors disabled:pointer-events-none disabled:opacity-50",
        "text-ink-muted hover:text-ink data-[active]:text-ink",
        "[&:not([data-active])]:hover:bg-surface-elevated-hover",
        iconMuted,
        size === "sm" && "h-6 min-w-6 px-1.5 gap-1.5 text-caption-12 [&_svg]:size-3.5",
        size === "md" && "h-7 min-w-7 px-2 gap-2 text-body-13 [&_svg]:size-4",
        size === "lg" && "h-9 min-w-9 px-3 gap-2 text-body-14 [&_svg]:size-4",
        focusRing,
        className,
      )}
      {...props}
    >
      {isActive && (
        <motion.div
          layoutId={`segmented-active-${baseId}`}
          data-slot="segmented-toggle-indicator"
          className="absolute inset-0 -z-10 rounded-[var(--radius-6)] bg-surface-elevated"
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
