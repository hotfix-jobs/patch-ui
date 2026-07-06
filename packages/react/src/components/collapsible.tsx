"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing } from "../recipes";

/**
 * Single-section reveal. Use for inline "Show more" toggles, filter panels,
 * optional form fields, and any one-off show / hide interaction where the
 * trigger's shape matters more than the group. For a coordinated stack of
 * collapsible sections, reach for `Accordion`.
 *
 *   <Collapsible>
 *     <CollapsibleTrigger render={<Button>Show details</Button>} />
 *     <CollapsibleContent>...</CollapsibleContent>
 *   </Collapsible>
 *
 * The default trigger and content are intentionally neutral: no caret, no
 * padding, no typography opinions. Compose in `render` to plug in a Button,
 * a link-style span, or any other affordance.
 */

export type CollapsibleProps = React.ComponentProps<
  typeof CollapsiblePrimitive.Root
>;

export function Collapsible({
  className,
  ...props
}: CollapsibleProps): React.ReactElement {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      className={className}
      {...props}
    />
  );
}

export type CollapsibleTriggerProps = React.ComponentProps<
  typeof CollapsiblePrimitive.Trigger
>;

export function CollapsibleTrigger({
  className,
  ...props
}: CollapsibleTriggerProps): React.ReactElement {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn("cursor-pointer", focusRing, className)}
      {...props}
    />
  );
}

export type CollapsibleContentProps = React.ComponentProps<
  typeof CollapsiblePrimitive.Panel
>;

export function CollapsibleContent({
  className,
  ...props
}: CollapsibleContentProps): React.ReactElement {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      keepMounted
      className={cn(
        "h-[var(--collapsible-panel-height)] overflow-hidden",
        "transition-[height] duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
        "data-[starting-style]:h-0 data-[ending-style]:h-0",
        className,
      )}
      {...props}
    />
  );
}

export { CollapsiblePrimitive };
