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

export interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  arrow?: boolean;
  className?: string;
}

export function Tooltip({
  children,
  content,
  side = "top",
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
            sideOffset={arrow ? sideOffset + 2 : sideOffset}
            className="z-[80]"
          >
            <TooltipPrimitive.Popup
              className={cn(
                "rounded-[var(--radius-6)] bg-[var(--tooltip-bg)] px-2.5 py-1.5 text-label-12 text-[var(--tooltip-text)] shadow-menu transition-[opacity,scale] duration-[var(--duration-state)] ease-[var(--ease-standard)] data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-starting-style:scale-[0.97] data-starting-style:opacity-0",
                className,
              )}
              data-slot="tooltip-content"
            >
              {content}
              {arrow && (
                <TooltipPrimitive.Arrow className="text-[var(--tooltip-bg)] data-[side=top]:-bottom-[5px] data-[side=bottom]:-top-[5px] data-[side=bottom]:rotate-180 data-[side=left]:-right-[5px] data-[side=left]:rotate-90 data-[side=right]:-left-[5px] data-[side=right]:-rotate-90">
                  <svg width="10" height="5" viewBox="0 0 10 5" fill="currentColor">
                    <path d="M0 0L5 5L10 0Z" />
                  </svg>
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
  children,
  arrow,
  ...props
}: TooltipPrimitive.Popup.Props & {
  sideOffset?: number;
  side?: "top" | "bottom" | "left" | "right";
  arrow?: boolean;
}): React.ReactElement {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        side={side}
        sideOffset={arrow ? sideOffset + 2 : sideOffset}
        className="z-[80]"
      >
        <TooltipPrimitive.Popup
          className={cn(
            "rounded-[var(--radius-6)] bg-patch-text px-2.5 py-1.5 text-label-12 text-patch-bg shadow-menu transition-[opacity,scale] duration-[var(--duration-state)] ease-[var(--ease-standard)] data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-starting-style:scale-[0.97] data-starting-style:opacity-0",
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
