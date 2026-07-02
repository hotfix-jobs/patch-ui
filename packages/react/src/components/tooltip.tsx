"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { useMemo } from "react";
import type * as React from "react";
import { cn } from "../utils";

export function TooltipProvider({
  delay = 100,
  closeDelay = 0,
  timeout = 400,
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
  /** Render a small triangle anchor. Defaults on. */
  arrow?: boolean;
  className?: string;
}

export function Tooltip({
  children,
  content,
  side = "top",
  align = "center",
  sideOffset = 4,
  arrow = true,
  className,
}: TooltipProps): React.ReactElement {
  const handle = useMemo(() => TooltipPrimitive.createHandle(), []);

  return (
    <>
      <TooltipPrimitive.Trigger handle={handle} render={children} />
      <TooltipPrimitive.Root handle={handle}>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Positioner
            side={side}
            align={align}
            sideOffset={arrow ? sideOffset + 2 : sideOffset}
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
              {arrow && (
                <TooltipPrimitive.Arrow className="group flex items-center justify-center">
                  <div className="size-2 rotate-45 bg-gray-1000 group-data-[side=top]:-translate-y-1/2 group-data-[side=bottom]:translate-y-1/2 group-data-[side=left]:-translate-x-1/2 group-data-[side=right]:translate-x-1/2" />
                </TooltipPrimitive.Arrow>
              )}
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
  arrow = true,
  ...props
}: TooltipPrimitive.Popup.Props & {
  sideOffset?: number;
  side?: TooltipSide;
  align?: TooltipAlign;
  arrow?: boolean;
}): React.ReactElement {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={arrow ? sideOffset + 2 : sideOffset}
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
          {arrow && (
            <TooltipPrimitive.Arrow className="text-gray-1000 data-[side=top]:-bottom-[5px] data-[side=bottom]:-top-[5px] data-[side=bottom]:rotate-180 data-[side=left]:-right-[5px] data-[side=left]:rotate-90 data-[side=right]:-left-[5px] data-[side=right]:-rotate-90">
              <svg width="10" height="5" viewBox="0 0 10 5" fill="currentColor">
                <path d="M0 0L5 5L10 0Z" />
              </svg>
            </TooltipPrimitive.Arrow>
          )}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}
