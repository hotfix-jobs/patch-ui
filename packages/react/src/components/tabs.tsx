"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import * as React from "react";
import { cn } from "../utils";
import { focusRing } from "../recipes";

/**
 * Tabs - compound component built on Base UI Tabs.
 *
 * Two visual variants:
 *  - `underline` (default): a single sliding 1.5px underline (Base UI
 *    `Tabs.Indicator`) tracks the active tab. Best for content tabs.
 *  - `pill`: the active tab gets a filled, rounded background. Best for
 *    nav-style tabs; works in both orientations so the same component can
 *    render a vertical sidebar on desktop and a horizontal strip on mobile.
 *
 * Pass `orientation="vertical"` (a Base UI Tabs.Root prop) for vertical layout.
 *
 * Usage:
 *   <Tabs defaultValue="overview">
 *     <TabsList>
 *       <TabsTrigger value="overview">Overview</TabsTrigger>
 *       <TabsTrigger value="settings">Settings</TabsTrigger>
 *     </TabsList>
 *     <TabsPanel value="overview">...</TabsPanel>
 *   </Tabs>
 *
 *   // Nav-style, responsive (vertical on md+, horizontal below):
 *   <Tabs variant="pill" orientation="vertical">...</Tabs>
 */

type TabsVariant = "underline" | "pill";
const TabsVariantContext = React.createContext<TabsVariant>("underline");

export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root> & {
  variant?: TabsVariant;
};

export function Tabs({ variant = "underline", ...props }: TabsProps): React.ReactElement {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.Root data-variant={variant} {...props} />
    </TabsVariantContext.Provider>
  );
}

export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List>;
export function TabsList({
  className,
  children,
  ...props
}: TabsListProps): React.ReactElement {
  const variant = React.useContext(TabsVariantContext);
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "relative flex",
        variant === "underline" && [
          "data-[orientation=horizontal]:items-center data-[orientation=horizontal]:gap-6 data-[orientation=horizontal]:border-b-[0.5px] data-[orientation=horizontal]:border-patch-border",
          "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[orientation=vertical]:gap-4 data-[orientation=vertical]:border-l-[0.5px] data-[orientation=vertical]:border-patch-border",
        ],
        variant === "pill" && [
          "gap-0.5",
          "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
        ],
        className,
      )}
      {...props}
    >
      {children}
      {/* Sliding underline — only for the underline variant. Positioned via
          the CSS variables Base UI sets on the indicator. */}
      {variant === "underline" && (
        <TabsPrimitive.Indicator
          data-slot="tabs-indicator"
          className={cn(
            "absolute bg-patch-text transition-[translate,width,height] duration-[var(--duration-patch-spring)] ease-[var(--ease-patch-out)]",
            "data-[orientation=horizontal]:bottom-[-0.5px] data-[orientation=horizontal]:left-0 data-[orientation=horizontal]:h-[1.5px] data-[orientation=horizontal]:w-[var(--active-tab-width)] data-[orientation=horizontal]:translate-x-[var(--active-tab-left)]",
            "data-[orientation=vertical]:left-[-0.5px] data-[orientation=vertical]:top-0 data-[orientation=vertical]:w-[1.5px] data-[orientation=vertical]:h-[var(--active-tab-height)] data-[orientation=vertical]:translate-y-[var(--active-tab-top)]",
          )}
        />
      )}
    </TabsPrimitive.List>
  );
}

export type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Tab>;
export function TabsTrigger({ className, ...props }: TabsTriggerProps): React.ReactElement {
  const variant = React.useContext(TabsVariantContext);
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative font-medium tracking-[-0.005em] text-[length:var(--text-patch-control)] transition-colors",
        focusRing,
        // base-ui Tabs.Tab applies `data-active` when its value matches.
        variant === "underline" &&
          "py-2 text-patch-text-secondary hover:text-patch-text data-[active]:text-patch-text",
        variant === "pill" && [
          "rounded-[var(--radius-patch-sm)] px-2.5 py-1.5 text-left text-patch-text-secondary",
          "hover:bg-patch-surface-hover hover:text-patch-text",
          "data-[active]:bg-patch-surface-hover data-[active]:text-patch-text",
        ],
        className,
      )}
      {...props}
    />
  );
}

export type TabsPanelProps = React.ComponentProps<typeof TabsPrimitive.Panel>;
export function TabsPanel({ className, ...props }: TabsPanelProps): React.ReactElement {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-panel"
      className={cn("pt-6", className)}
      {...props}
    />
  );
}

export { TabsPrimitive };
