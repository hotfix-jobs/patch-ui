"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { createContext, useContext } from "react";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing } from "../recipes";
import { Tooltip } from "./tooltip";

/** Folder-tabs: active tab has a rounded top with hairline top+sides,
 *  and pulls -1px below the container line so its fill covers the line
 *  under it (the classic "manila folder" merge with the panel). */

type TabsOrientation = "horizontal" | "vertical";

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
  orientation?: TabsOrientation;
}

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  className,
  children,
  ...props
}: TabsProps): React.ReactElement {
  return (
    <TabsOrientationContext.Provider value={orientation}>
      <TabsPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={
          onValueChange ? (next) => onValueChange(String(next)) : undefined
        }
        orientation={orientation}
        data-slot="tabs"
        className={cn(
          orientation === "vertical" && "flex gap-0",
          className,
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsOrientationContext.Provider>
  );
}

/* --------------------------------- List --------------------------------- */

export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List>;

export function TabsList({
  className,
  children,
  ...props
}: TabsListProps): React.ReactElement {
  const orientation = useContext(TabsOrientationContext);

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-orientation={orientation}
      className={cn(
        "relative flex",
        orientation === "horizontal"
          ? "items-end gap-1 border-b border-hairline"
          : "flex-col items-stretch gap-1 border-r border-hairline",
        className,
      )}
      {...props}
    >
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
  const orientation = useContext(TabsOrientationContext);
  const showBadge = badge != null && (typeof badge !== "number" || badge > 0);

  const trigger = (
    <TabsPrimitive.Tab
      value={value}
      disabled={disabled}
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex items-center gap-2 text-small transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] disabled:pointer-events-none disabled:opacity-50",
        focusRing,
        "px-4 py-2.5 text-ink-muted hover:text-ink",
        // Reserved transparent border keeps the tab the same size in
        // active vs. inactive so nothing shifts on selection.
        "border border-transparent",
        orientation === "horizontal"
          ? [
              "rounded-t-[var(--radius-6)] -mb-px",
              "data-[active]:border-hairline data-[active]:border-b-transparent",
              "data-[active]:bg-base data-[active]:text-ink data-[active]:font-medium",
            ]
          : [
              "rounded-l-[var(--radius-6)] -mr-px",
              "data-[active]:border-hairline data-[active]:border-r-transparent",
              "data-[active]:bg-base data-[active]:text-ink data-[active]:font-medium",
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
          className="text-mini tabular-nums text-ink-muted"
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
  const orientation = useContext(TabsOrientationContext);
  return (
    <TabsPrimitive.Panel
      value={value}
      keepMounted={keepMounted}
      data-slot="tabs-panel"
      className={cn(
        orientation === "horizontal" ? "pt-6" : "pl-6 flex-1 min-w-0",
        "focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Panel>
  );
}

export { TabsPrimitive };
