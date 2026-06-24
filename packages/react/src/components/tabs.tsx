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
 * Tabs - custom-built compound component.
 *
 * Two visual variants:
 *  - `underline` (default): a 1.5px bar tracks the active tab.
 *  - `pill`: a rounded `--menu-item-hover` background fills the active tab.
 *
 * The indicator (underline OR pill) uses motion's `layoutId` so it physically
 * slides between active tabs with spring physics, not CSS transitions. Each
 * Tabs instance gets a unique `layoutId` namespace so multiple Tabs on a
 * page don't share indicators.
 *
 * Both orientations supported via `orientation`. Keyboard navigation
 * (Arrow keys / Home / End) handled inline.
 */

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

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

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
            ? "items-center gap-6 border-b-[0.5px] border-patch-border"
            : "flex-col items-stretch gap-4 border-l-[0.5px] border-patch-border",
        ],
        variant === "pill" && [
          "gap-0.5",
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
}

export function TabsTrigger({
  value,
  className,
  children,
  disabled,
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

  return (
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
        "relative font-medium tracking-[-0.005em] text-[length:var(--text-patch-control)] transition-colors disabled:pointer-events-none disabled:opacity-50",
        focusRing,
        variant === "underline" &&
          "py-2 text-patch-text-secondary hover:text-patch-text data-[active]:text-patch-text",
        variant === "pill" && [
          "z-10 rounded-[var(--radius-patch-sm)] px-2.5 py-1.5 text-left text-patch-text-secondary",
          "hover:text-patch-text data-[active]:text-patch-text",
        ],
        className,
      )}
      {...props}
    >
      {/* Active-tab indicator. layoutId makes motion animate the bar/pill
          between tab positions when the active tab changes. */}
      {variant === "pill" && isActive && (
        <motion.div
          layoutId={`tabs-pill-${baseId}`}
          data-slot="tabs-indicator"
          className="absolute inset-0 -z-10 rounded-[var(--radius-patch-sm)] bg-[var(--menu-item-hover)]"
          transition={indicatorTransition}
        />
      )}
      {variant === "underline" && isActive && (
        <motion.div
          layoutId={`tabs-underline-${baseId}`}
          data-slot="tabs-indicator"
          className={cn(
            "absolute bg-patch-text",
            orientation === "horizontal"
              ? "bottom-[-0.5px] left-0 right-0 h-[1.5px]"
              : "top-0 bottom-0 left-[-0.5px] w-[1.5px]",
          )}
          transition={indicatorTransition}
        />
      )}
      {children}
    </button>
  );
}

/* --------------------------- TabsPanel --------------------------- */

export interface TabsPanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "value"> {
  value: string;
  /**
   * When true, the panel stays mounted while not active (hidden via
   * `hidden` attribute). Use for panels with heavy content that you
   * don't want to remount each switch.
   */
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
