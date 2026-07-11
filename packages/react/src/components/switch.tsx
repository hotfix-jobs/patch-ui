"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps extends SwitchPrimitive.Root.Props {
  /** Size preset. */
  size?: SwitchSize;
  /** Icons rendered inside the thumb, per state. */
  icon?: {
    checked?: React.ReactNode;
    unchecked?: React.ReactNode;
  };
}

const trackBySize: Record<SwitchSize, string> = {
  sm: "h-4 w-7",
  md: "h-5 w-9",
  lg: "h-6 w-11",
};

const thumbBySize: Record<SwitchSize, string> = {
  sm: "size-3 data-checked:translate-x-3",
  md: "size-[18px] data-checked:translate-x-4",
  lg: "size-5 data-checked:translate-x-5",
};

const iconSizeBySize: Record<SwitchSize, string> = {
  sm: "[&_svg]:size-2",
  md: "[&_svg]:size-3",
  lg: "[&_svg]:size-3.5",
};

export function Switch({
  className,
  size = "md",
  icon,
  ...props
}: SwitchProps): React.ReactElement {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "group inline-flex shrink-0 cursor-pointer items-center rounded-full p-px",
        "data-unchecked:bg-fill-2 data-unchecked:hover:bg-hairline-strong data-disabled:cursor-not-allowed data-disabled:opacity-50",
        "data-checked:bg-ink data-checked:hover:bg-ink",
        trackBySize[size],
        colorTransition,
        focusRing,
        className,
      )}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "relative pointer-events-none rounded-full shadow-[var(--shadow-card)]",
          "transition-[translate,background-color,color] duration-[var(--duration-state)] ease-[var(--ease-standard)]",
          "bg-base dark:data-unchecked:bg-ink-tertiary",
          "[&_svg]:text-ink dark:data-unchecked:[&_svg]:text-base",
          "data-unchecked:translate-x-0",
          iconSizeBySize[size],
          thumbBySize[size],
        )}
        data-slot="switch-thumb"
      >
        {icon?.unchecked && (
          <span className="absolute inset-0 flex items-center justify-center group-data-checked:hidden">
            {icon.unchecked}
          </span>
        )}
        {icon?.checked && (
          <span className="absolute inset-0 hidden items-center justify-center group-data-checked:flex">
            {icon.checked}
          </span>
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

export { SwitchPrimitive };
