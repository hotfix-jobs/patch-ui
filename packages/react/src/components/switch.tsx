"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import type React from "react";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

export function Switch({
  className,
  ...props
}: SwitchPrimitive.Root.Props): React.ReactElement {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full p-px data-checked:bg-gray-1000 data-unchecked:bg-gray-alpha-500 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        colorTransition,
        focusRing,
        className,
      )}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className="pointer-events-none block size-[18px] rounded-full bg-background-100 shadow-[var(--shadow-card)] transition-[translate] duration-[var(--duration-state)] ease-[var(--ease-standard)] data-checked:translate-x-4 data-unchecked:translate-x-0"
        data-slot="switch-thumb"
      />
    </SwitchPrimitive.Root>
  );
}

export { SwitchPrimitive };
