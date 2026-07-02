"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import type React from "react";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

export function RadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.Props): React.ReactElement {
  return (
    <RadioGroupPrimitive
      className={cn("flex flex-col gap-2", className)}
      data-slot="radio-group"
      {...props}
    />
  );
}

export function Radio({
  className,
  ...props
}: RadioPrimitive.Root.Props): React.ReactElement {
  return (
    <RadioPrimitive.Root
      className={cn(
        "inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full bg-transparent border border-gray-alpha-500 data-checked:border-patch-text data-disabled:cursor-not-allowed data-disabled:opacity-50",
        colorTransition,
        focusRing,
        className,
      )}
      data-slot="radio"
      {...props}
    >
      <RadioPrimitive.Indicator
        className="flex items-center justify-center"
        data-slot="radio-indicator"
      >
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-patch-text"
        />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

export { RadioPrimitive, RadioGroupPrimitive };
