"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { createContext, useContext } from "react";
import type * as React from "react";
import { cn } from "../utils";
import { selectionFocus } from "../recipes";

/** One primitive for every disclosure pattern.
 *
 *  Pass `openMultiple={false}` for one-open-at-a-time; a single-item
 *  Accordion covers inline "show more" reveals without needing a
 *  separate primitive.
 *
 *  `variant` controls visual language:
 *    - `flush` (default) — borderless, tight, no chrome. Filter panels,
 *      inline "show more" reveals.
 *    - `bordered` — hairline row separators between items. Notion /
 *      settings-style FAQs.
 *    - `card` — each item is its own bordered card with padding. Marketing
 *      FAQs, dashboard collapsible panels.
 *
 *  Panels stay mounted (`keepMounted`) for find-in-page compatibility. */

type AccordionVariant = "flush" | "bordered" | "card";

const AccordionVariantContext = createContext<AccordionVariant>("flush");

export type AccordionProps = React.ComponentProps<typeof AccordionPrimitive.Root> & {
  variant?: AccordionVariant;
};

export function Accordion({
  variant = "flush",
  className,
  ...props
}: AccordionProps): React.ReactElement {
  return (
    <AccordionVariantContext.Provider value={variant}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        data-variant={variant}
        className={cn(
          variant === "card" && "flex flex-col gap-2",
          className,
        )}
        {...props}
      />
    </AccordionVariantContext.Provider>
  );
}

export type AccordionItemProps = React.ComponentProps<
  typeof AccordionPrimitive.Item
>;

export function AccordionItem({
  className,
  ...props
}: AccordionItemProps): React.ReactElement {
  const variant = useContext(AccordionVariantContext);
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        variant === "bordered" &&
          "[&:not(:first-child)]:border-t [&:not(:first-child)]:border-hairline",
        variant === "card" && "rounded-[var(--radius-8)] border border-hairline px-4",
        className,
      )}
      {...props}
    />
  );
}

export type AccordionTriggerProps = React.ComponentProps<
  typeof AccordionPrimitive.Trigger
> & {
  /** Trailing chevron slot. `null` hides the caret; pass any node to
   *  swap it. Defaults to a rotating `<CaretDown />`. */
  caret?: React.ReactNode | null;
};

export function AccordionTrigger({
  className,
  children,
  caret,
  ...props
}: AccordionTriggerProps): React.ReactElement {
  const resolvedCaret =
    caret !== undefined
      ? caret
      : (
        <CaretDown
          aria-hidden
          className="size-4 shrink-0 text-ink-muted transition-transform duration-[var(--duration-state)] ease-[var(--ease-standard)] group-data-[panel-open]:rotate-180 group-data-[panel-open]:text-ink group-hover:text-ink"
        />
      );
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex w-full items-center justify-between gap-3 py-3 text-left",
          "text-small font-medium text-ink-muted",
          "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
          "hover:text-ink data-[panel-open]:text-ink",
          selectionFocus,
          className,
        )}
        {...props}
      >
        <span className="min-w-0 flex-1">{children}</span>
        {resolvedCaret}
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
      {children}
    </AccordionPrimitive.Panel>
  );
}

export { AccordionPrimitive };
