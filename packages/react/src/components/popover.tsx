"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import type * as React from "react";
import { cn } from "../utils";
import { popupSurface } from "../recipes";

export type PopoverSide = "top" | "bottom" | "left" | "right";
export type PopoverAlign = "start" | "center" | "end";

export interface PopoverProps
  extends Omit<
    React.ComponentProps<typeof PopoverPrimitive.Root>,
    "children"
  > {
  children: React.ReactNode;
}

/** Floating panel anchored to a trigger. Use for notification lists,
 *  filter panels, mini-forms, and any arbitrary content that Menu /
 *  Tooltip / Modal don't fit. */
export function Popover({
  children,
  ...props
}: PopoverProps): React.ReactElement {
  return (
    <PopoverPrimitive.Root data-slot="popover" {...props}>
      {children}
    </PopoverPrimitive.Root>
  );
}

export type PopoverTriggerProps = React.ComponentProps<
  typeof PopoverPrimitive.Trigger
>;

export function PopoverTrigger(
  props: PopoverTriggerProps,
): React.ReactElement {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

export interface PopoverContentProps
  extends Omit<
    React.ComponentProps<typeof PopoverPrimitive.Popup>,
    "children"
  > {
  side?: PopoverSide;
  align?: PopoverAlign;
  sideOffset?: number;
  /** Optional arrow pointing at the trigger. */
  arrow?: boolean;
  children?: React.ReactNode;
}

export function PopoverContent({
  side = "bottom",
  align = "center",
  sideOffset = 6,
  arrow,
  className,
  children,
  ...props
}: PopoverContentProps): React.ReactElement {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-[70]"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            popupSurface,
            "min-w-[220px] transition-[opacity,scale] duration-[var(--duration-state)] ease-[var(--ease-standard)]",
            "data-starting-style:scale-[0.97] data-starting-style:opacity-0",
            "data-ending-style:scale-[0.97] data-ending-style:opacity-0",
            className,
          )}
          {...props}
        >
          {arrow && (
            <PopoverPrimitive.Arrow className="fill-[color:var(--layer-1)] stroke-[color:var(--hairline)] stroke-1" />
          )}
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

export type PopoverCloseProps = React.ComponentProps<
  typeof PopoverPrimitive.Close
>;

/** Dismisses the popover on click. Wrap a Button via `render`. */
export function PopoverClose(props: PopoverCloseProps): React.ReactElement {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}

export { PopoverPrimitive };
