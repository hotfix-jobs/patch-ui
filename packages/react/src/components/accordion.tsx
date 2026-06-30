"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing } from "../recipes";

/**
 * Accordion - compound component built on Base UI Accordion.
 *
 * Hairline row separators and a chevron that rotates 180deg on open. Panels
 * animate their height open/close via Base UI's `--accordion-panel-height`
 * CSS variable and render `keepMounted` so collapsed content stays in the
 * DOM (still crawlable, just height:0/overflow-hidden when closed).
 *
 * Usage:
 *   <Accordion defaultValue={["item-0"]}>
 *     <AccordionItem value="item-0">
 *       <AccordionTrigger>Question?</AccordionTrigger>
 *       <AccordionPanel>Answer.</AccordionPanel>
 *     </AccordionItem>
 *   </Accordion>
 */

export const Accordion = AccordionPrimitive.Root;

export type AccordionItemProps = React.ComponentProps<
  typeof AccordionPrimitive.Item
>;
export function AccordionItem({
  className,
  ...props
}: AccordionItemProps): React.ReactElement {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-t border-patch-border last:border-b", className)}
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
          "group flex w-full items-start justify-between gap-3 py-3.5 text-left",
          "text-[length:var(--text-patch-body)] font-medium text-patch-text",
          focusRing,
          className,
        )}
        {...props}
      >
        <span>{children}</span>
        {/* Chevron that rotates 180deg on open. Inline SVG so the shape
            renders independent of Tailwind class generation. */}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-0.5 h-4 w-4 shrink-0 text-patch-text-tertiary transition-transform duration-[var(--duration-patch-normal)] ease-[var(--ease-patch-out)] group-data-[panel-open]:rotate-180"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
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
        "transition-[height] duration-[var(--duration-patch-spring)] ease-[var(--ease-patch-out)]",
        "data-[starting-style]:h-0 data-[ending-style]:h-0",
        className,
      )}
      {...props}
    >
      <div className="pb-3.5 text-[length:var(--text-patch-body)] leading-relaxed text-patch-text-secondary">
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { AccordionPrimitive };
