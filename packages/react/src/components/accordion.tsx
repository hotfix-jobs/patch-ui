"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import { createContext, useContext } from "react";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing } from "../recipes";

/**
 * Accordion: compound built on Base UI Accordion.
 *
 * Titles are visually-primary heading-14, content sits in copy-14 body
 * type. Set `bordered` on the root to auto-apply the hairline row
 * pattern to every item (Vercel Geist Collapse look). Pass `multiple`
 * to allow more than one item open at once (Vercel's CollapseGroup.multiple).
 *
 * Panels stay mounted for find-in-page compatibility; they collapse via
 * Base UI's `--accordion-panel-height` CSS var with a smooth transition.
 *
 * Usage:
 *   <Accordion bordered defaultValue={["item-1"]}>
 *     <AccordionItem value="item-1">
 *       <AccordionTrigger>How do I get started?</AccordionTrigger>
 *       <AccordionPanel>Install the package…</AccordionPanel>
 *     </AccordionItem>
 *   </Accordion>
 */

type AccordionContextValue = {
  bordered: boolean;
};

const AccordionContext = createContext<AccordionContextValue>({
  bordered: false,
});

export type AccordionProps = React.ComponentProps<typeof AccordionPrimitive.Root> & {
  /** Auto-apply the hairline row pattern to every child item. */
  bordered?: boolean;
};

export function Accordion({
  bordered = false,
  className,
  ...props
}: AccordionProps): React.ReactElement {
  return (
    <AccordionContext.Provider value={{ bordered }}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        data-bordered={bordered ? "" : undefined}
        className={className}
        {...props}
      />
    </AccordionContext.Provider>
  );
}

export type AccordionItemProps = React.ComponentProps<
  typeof AccordionPrimitive.Item
>;

export function AccordionItem({
  className,
  ...props
}: AccordionItemProps): React.ReactElement {
  const { bordered } = useContext(AccordionContext);
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        bordered && "border-t border-gray-alpha-400 last:border-b",
        className,
      )}
      {...props}
    />
  );
}

export type AccordionTriggerProps = React.ComponentProps<
  typeof AccordionPrimitive.Trigger
>;

export function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps): React.ReactElement {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex w-full items-start justify-between gap-3 py-4 text-left",
          "text-heading-14 text-gray-1000",
          focusRing,
          className,
        )}
        {...props}
      >
        <span>{children}</span>
        <ChevronDown
          aria-hidden
          className="mt-0.5 h-4 w-4 shrink-0 text-gray-800 transition-transform duration-[var(--duration-state)] ease-[var(--ease-standard)] group-data-[panel-open]:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export type AccordionPanelProps = React.ComponentProps<
  typeof AccordionPrimitive.Panel
>;

export function AccordionPanel({
  className,
  children,
  ...props
}: AccordionPanelProps): React.ReactElement {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      keepMounted
      className={cn(
        "h-[var(--accordion-panel-height)] overflow-hidden",
        "transition-[height] duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
        "data-[starting-style]:h-0 data-[ending-style]:h-0",
        className,
      )}
      {...props}
    >
      <div className="pb-4 text-copy-14 text-gray-1000">
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { AccordionPrimitive };
