"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { createContext, useContext } from "react";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing } from "../recipes";
import { Tooltip } from "./tooltip";

/** Tabs compound component with underline or pill variants. */

type TabsVariant = "underline" | "pill";
type TabsOrientation = "horizontal" | "vertical";

const TabsVariantContext = createContext<TabsVariant>("underline");
const TabsOrientationContext = createContext<TabsOrientation>("horizontal");

/* ---------------------------------- Root --------------------------------- */

export interface TabsProps
  extends Omit<
    React.ComponentProps<typeof TabsPrimitive.Root>,
    "value" | "defaultValue" | "onValueChange"
  > {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  orientation?: TabsOrientation;
}

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  variant = "underline",
  orientation = "horizontal",
  className,
  children,
  ...props
}: TabsProps): React.ReactElement {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsOrientationContext.Provider value={orientation}>
        <TabsPrimitive.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={
            onValueChange ? (next) => onValueChange(String(next)) : undefined
          }
          orientation={orientation}
          data-slot="tabs"
          data-variant={variant}
          className={className}
          {...props}
        >
          {children}
        </TabsPrimitive.Root>
      </TabsOrientationContext.Provider>
    </TabsVariantContext.Provider>
  );
}

/* --------------------------------- List --------------------------------- */

export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List>;

export function TabsList({
  className,
  children,
  ...props
}: TabsListProps): React.ReactElement {
  const variant = useContext(TabsVariantContext);
  const orientation = useContext(TabsOrientationContext);

  return (
    <TabsPrimitive.List
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
      {variant === "underline" && (
        <TabsPrimitive.Indicator
          data-slot="tabs-indicator"
          className={cn(
            "absolute bg-ink transition-[left,top,width,height] duration-[var(--duration-state)] ease-[var(--ease-standard)]",
            orientation === "horizontal"
              ? "-bottom-px h-[2px] left-[var(--active-tab-left)] w-[var(--active-tab-width)]"
              : "-left-px w-[2px] top-[var(--active-tab-top)] h-[var(--active-tab-height)]",
          )}
        />
      )}
      {children}
    </TabsPrimitive.List>
  );
}

/* -------------------------------- Trigger ------------------------------- */

export interface TabsTriggerProps
  extends Omit<React.ComponentProps<typeof TabsPrimitive.Tab>, "value"> {
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
  ...props
}: TabsTriggerProps): React.ReactElement {
  const variant = useContext(TabsVariantContext);
  const showBadge = badge != null && (typeof badge !== "number" || badge > 0);

  const trigger = (
    <TabsPrimitive.Tab
      value={value}
      disabled={disabled}
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex items-center gap-2 text-body-14 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] disabled:pointer-events-none disabled:opacity-50",
        focusRing,
        variant === "underline" &&
          "py-2.5 text-ink-muted hover:text-ink data-[selected]:text-ink",
        variant === "pill" && [
          "rounded-full border border-hairline px-3 py-1 text-left text-ink-muted",
          "hover:bg-surface-1 hover:text-ink",
          "data-[selected]:bg-surface-elevated data-[selected]:text-ink",
        ],
        className,
      )}
      {...props}
    >
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
    </TabsPrimitive.Tab>
  );

  if (tooltip) {
    return <Tooltip content={tooltip}>{trigger}</Tooltip>;
  }
  return trigger;
}

/* -------------------------------- Panel -------------------------------- */

export interface TabsPanelProps
  extends Omit<React.ComponentProps<typeof TabsPrimitive.Panel>, "value"> {
  value: string;
  /** Keep the panel mounted (hidden) when inactive. */
  keepMounted?: boolean;
}

export function TabsPanel({
  value,
  keepMounted,
  className,
  children,
  ...props
}: TabsPanelProps): React.ReactElement {
  return (
    <TabsPrimitive.Panel
      value={value}
      keepMounted={keepMounted}
      data-slot="tabs-panel"
      className={cn("pt-6 focus-visible:outline-none", className)}
      {...props}
    >
      {children}
    </TabsPrimitive.Panel>
  );
}

export { TabsPrimitive };
