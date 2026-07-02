"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { useMemo } from "react";
import type * as React from "react";
import { cn } from "../utils";

export function TooltipProvider({
  delay = 150,
  closeDelay = 0,
  timeout = 500,
  children,
}: {
  delay?: number;
  closeDelay?: number;
  timeout?: number;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <TooltipPrimitive.Provider delay={delay} closeDelay={closeDelay} timeout={timeout}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

export type TooltipSide = "top" | "bottom" | "left" | "right";
export type TooltipAlign = "start" | "center" | "end";

export interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  /** Which side of the trigger the tooltip appears on. */
  side?: TooltipSide;
  /** Alignment along the trigger's axis. `start` = top/left edge, `end` = bottom/right edge. */
  align?: TooltipAlign;
  /** Pixel offset from the trigger. */
  sideOffset?: number;
  /** Milliseconds to wait before opening. Small default so sweeping mouse motion doesn't flicker tooltips open. */
  delay?: number;
  /** Milliseconds to wait before closing. */
  closeDelay?: number;
  className?: string;
}

export function Tooltip({
  children,
  content,
  side = "top",
  align = "center",
  sideOffset = 4,
  delay = 150,
  closeDelay = 0,
  className,
}: TooltipProps): React.ReactElement {
  const handle = useMemo(() => TooltipPrimitive.createHandle(), []);

  return (
    <>
      <TooltipPrimitive.Trigger handle={handle} render={children} />
      <TooltipPrimitive.Root handle={handle} delay={delay} closeDelay={closeDelay}>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Positioner
            side={side}
            align={align}
            sideOffset={sideOffset}
            className="z-[80]"
          >
            <TooltipPrimitive.Popup
              className={cn(
                "rounded-[var(--radius-6)] bg-gray-1000 px-2.5 py-1.5 text-label-12 text-background-100 shadow-menu transition-[opacity,scale] duration-[var(--duration-state)] ease-[var(--ease-standard)] data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-starting-style:scale-[0.97] data-starting-style:opacity-0",
                className,
              )}
              data-slot="tooltip-content"
            >
              {content}
            </TooltipPrimitive.Popup>
          </TooltipPrimitive.Positioner>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </>
  );
}

// Sub-components for advanced handle-based usage
export const TooltipRoot: typeof TooltipPrimitive.Root = TooltipPrimitive.Root;
export const TooltipTrigger: typeof TooltipPrimitive.Trigger = TooltipPrimitive.Trigger;
export const TooltipCreateHandle: typeof TooltipPrimitive.createHandle = TooltipPrimitive.createHandle;

export function TooltipContent({
  className,
  sideOffset = 4,
  side = "top",
  align = "center",
  children,
  ...props
}: TooltipPrimitive.Popup.Props & {
  sideOffset?: number;
  side?: TooltipSide;
  align?: TooltipAlign;
}): React.ReactElement {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-[80]"
      >
        <TooltipPrimitive.Popup
          className={cn(
            "rounded-[var(--radius-6)] bg-gray-1000 px-2.5 py-1.5 text-label-12 text-background-100 shadow-menu transition-[opacity,scale] duration-[var(--duration-state)] ease-[var(--ease-standard)] data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-starting-style:scale-[0.97] data-starting-style:opacity-0",
            className,
          )}
          data-slot="tooltip-content"
          {...props}
        >
          {children}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}
