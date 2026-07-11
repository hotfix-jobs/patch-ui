"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { RemoveScroll } from "react-remove-scroll";
import type * as React from "react";
import { cn } from "../utils";
import { popupSurface } from "../recipes";
import {
  MOBILE_MEDIA_QUERY,
  useMediaQuery,
} from "../hooks/use-media-query";

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
  /** Element used to position the popup. Defaults to the Popover trigger. */
  anchor?: React.ComponentProps<typeof PopoverPrimitive.Positioner>["anchor"];
  /** Optional arrow pointing at the trigger. */
  arrow?: boolean;
  children?: React.ReactNode;
}

export function PopoverContent({
  side = "bottom",
  align = "center",
  sideOffset = 6,
  anchor,
  arrow,
  className,
  children,
  ...props
}: PopoverContentProps): React.ReactElement {
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);

  if (isMobile) {
    return (
      <PopoverPrimitive.Portal>
        <RemoveScroll>
        <PopoverPrimitive.Backdrop
          data-slot="popover-backdrop"
          className={cn(
            "fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm",
            "transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
            "data-starting-style:opacity-0 data-ending-style:opacity-0",
          )}
        />
        <PopoverPrimitive.Positioner className="contents">
          <PopoverPrimitive.Popup
            data-slot="popover-content"
            data-mobile="true"
            className={cn(
              // Centered on mobile: fixed at viewport center via
              // top-1/2 / left-1/2 + translate. Full width minus 8px
              // gutters left/right.
              "fixed left-1/2 top-1/2 z-[80] w-[calc(100vw-1rem)] -translate-x-1/2 -translate-y-1/2 flex flex-col overflow-hidden outline-none",
              "rounded-[var(--radius-12)] bg-layer-1 border border-hairline shadow-menu",
              "max-h-[calc(100dvh-2rem)]",
              // Fade + slight upward drift on enter. Starts 8px below
              // final center, animates up.
              "transition-[opacity,translate] duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
              "data-starting-style:opacity-0 data-starting-style:translate-y-[calc(-50%+8px)]",
              "data-ending-style:opacity-0 data-ending-style:translate-y-[calc(-50%+8px)]",
              className,
            )}
            {...props}
          >
            {children}
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
        </RemoveScroll>
      </PopoverPrimitive.Portal>
    );
  }

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        anchor={anchor}
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
