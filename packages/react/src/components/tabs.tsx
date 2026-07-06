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
import { Tooltip } from "./tooltip";

/** Tabs compound component with underline or pill variants. */

type TabsVariant = "underline" | "pill";
type TabsOrientation = "horizontal" | "vertical";

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
  variant: TabsVariant;
  orientation: TabsOrientation;
  baseId: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs subcomponents must be used inside <Tabs>");
  return ctx;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  orientation?: TabsOrientation;
}

export function Tabs({
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant = "underline",
  orientation = "horizontal",
  className,
  children,
  ...props
}: TabsProps): React.ReactElement {
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
    <TabsContext.Provider
      value={{ value, setValue, variant, orientation, baseId }}
    >
      <div
        data-slot="tabs"
        data-variant={variant}
        data-orientation={orientation}
        className={className}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

/* --------------------------- TabsList --------------------------- */

export type TabsListProps = React.HTMLAttributes<HTMLDivElement>;

export function TabsList({
  className,
  children,
  ...props
}: TabsListProps): React.ReactElement {
  const { variant, orientation } = useTabsContext();

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      data-slot="tabs-list"
      data-orientation={orientation}
      className={cn(
        "relative flex",
        variant === "underline" && [
          orientation === "horizontal"
            ? "items-center gap-6 border-b border-hairline-strong"
            : "flex-col items-stretch gap-4 border-l border-hairline-strong",
        ],
        variant === "pill" && [
          "gap-1",
          orientation === "vertical" && "flex-col items-stretch",
        ],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* --------------------------- TabsTrigger --------------------------- */

export interface TabsTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
  /** Leading node (icon). */
  icon?: React.ReactNode;
  /** Trailing badge; numeric badges hide at 0. */
  badge?: React.ReactNode | number;
  /** Tooltip for a disabled tab explaining the constraint. */
  tooltip?: React.ReactNode;
}

export function TabsTrigger({
  value,
  className,
  children,
  disabled,
  icon,
  badge,
  tooltip,
  onKeyDown,
  ...props
}: TabsTriggerProps): React.ReactElement {
  const {
    value: activeValue,
    setValue,
    variant,
    orientation,
    baseId,
  } = useTabsContext();
  const reduceMotion = useReducedMotion();
  const isActive = activeValue === value;

  const triggerId = `${baseId}-trigger-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;

    const list = e.currentTarget.closest('[role="tablist"]');
    if (!list) return;
    const triggers = Array.from(
      list.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not([disabled])',
      ),
    );
    const current = triggers.indexOf(e.currentTarget);
    if (current === -1) return;

    const isHorizontal = orientation === "horizontal";
    const nextKey = isHorizontal ? "ArrowRight" : "ArrowDown";
    const prevKey = isHorizontal ? "ArrowLeft" : "ArrowUp";

    let next = -1;
    if (e.key === nextKey) next = (current + 1) % triggers.length;
    else if (e.key === prevKey)
      next = (current - 1 + triggers.length) % triggers.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = triggers.length - 1;

    if (next >= 0) {
      e.preventDefault();
      const target = triggers[next];
      target.focus();
      target.click();
    }
  };

  const indicatorTransition = reduceMotion
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: 400,
        damping: 30,
        mass: 0.6,
      };

  const showBadge = badge != null && (typeof badge !== "number" || badge > 0);

  const trigger = (
    <button
      type="button"
      role="tab"
      id={triggerId}
      aria-selected={isActive}
      aria-controls={panelId}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      data-slot="tabs-trigger"
      data-active={isActive ? "" : undefined}
      onClick={() => setValue(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative inline-flex items-center gap-2 text-body-14 transition-colors disabled:pointer-events-none disabled:opacity-50",
        focusRing,
        variant === "underline" &&
          "py-2.5 text-ink-muted hover:text-ink data-[active]:text-ink",
        variant === "pill" && [
          "rounded-full border border-hairline px-3 py-1 text-left text-ink-muted",
          "hover:bg-surface-1 hover:text-ink",
          "data-[active]:bg-surface-elevated data-[active]:text-ink",
        ],
        className,
      )}
      {...props}
    >
      {variant === "underline" && isActive && (
        <motion.div
          layoutId={`tabs-underline-${baseId}`}
          data-slot="tabs-indicator"
          className={cn(
            "absolute bg-ink",
            orientation === "horizontal"
              ? "-bottom-px left-0 right-0 h-[2px]"
              : "top-0 bottom-0 -left-px w-[2px]",
          )}
          transition={indicatorTransition}
        />
      )}
      {icon && (
        <span className="shrink-0 [&_svg]:size-4" data-slot="tabs-trigger-icon">
          {icon}
        </span>
      )}
      {children}
      {showBadge && (
        <span
          data-slot="tabs-trigger-badge"
          className="text-caption-12 tabular-nums text-ink-muted"
        >
          {badge}
        </span>
      )}
    </button>
  );

  if (tooltip) {
    return <Tooltip content={tooltip}>{trigger}</Tooltip>;
  }
  return trigger;
}

/* --------------------------- TabsPanel --------------------------- */

export interface TabsPanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "value"> {
  value: string;
  /** Keep the panel mounted (hidden) when inactive. */
  keepMounted?: boolean;
}

export function TabsPanel({
  value,
  keepMounted = false,
  className,
  children,
  ...props
}: TabsPanelProps): React.ReactElement | null {
  const { value: activeValue, baseId } = useTabsContext();
  const isActive = activeValue === value;
  const triggerId = `${baseId}-trigger-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  if (!isActive && !keepMounted) return null;

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={triggerId}
      hidden={!isActive}
      tabIndex={0}
      data-slot="tabs-panel"
      className={cn("pt-6 focus-visible:outline-none", className)}
      {...props}
    >
      {children}
    </div>
  );
}
