"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { RemoveScroll } from "react-remove-scroll";
import { createContext, useContext } from "react";
import type * as React from "react";
import { cn } from "../utils";
import {
  mobilePopupBackdrop,
  mobilePopupSurface,
  popupSurface,
} from "../recipes";
import {
  MOBILE_MEDIA_QUERY,
  useMediaQuery,
} from "../hooks/use-media-query";

export type PopoverSide = "top" | "bottom" | "left" | "right";
export type PopoverAlign = "start" | "center" | "end";

const PopoverMobileContext = createContext(false);

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
  modal,
  ...props
}: PopoverProps): React.ReactElement {
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);

  return (
    <PopoverPrimitive.Root
      data-slot="popover"
      modal={isMobile ? true : modal}
      {...props}
    >
      <PopoverMobileContext.Provider value={isMobile}>
        {children}
      </PopoverMobileContext.Provider>
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
  /** Desktop placement. Mobile uses a centered modal surface. */
  side?: PopoverSide;
  /** Desktop alignment. Mobile uses a centered modal surface. */
  align?: PopoverAlign;
  /** Desktop trigger offset. Mobile uses viewport gutters. */
  sideOffset?: number;
  /** Desktop positioning anchor. Defaults to the Popover trigger. */
  anchor?: React.ComponentProps<typeof PopoverPrimitive.Positioner>["anchor"];
  /** Optional desktop arrow pointing at the trigger. */
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
  const isMobile = useContext(PopoverMobileContext);

  if (isMobile) {
    return (
      <PopoverPrimitive.Portal>
        <RemoveScroll>
        <PopoverPrimitive.Backdrop
          data-slot="popover-backdrop"
          className={mobilePopupBackdrop}
        />
        <PopoverPrimitive.Positioner className="contents">
          <PopoverPrimitive.Popup
            data-slot="popover-content"
            data-mobile="true"
            className={cn(
              mobilePopupSurface,
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
            <PopoverPrimitive.Arrow className="fill-[color:var(--layer-1)] stroke-[color:var(--hairline-soft)] stroke-1" />
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
