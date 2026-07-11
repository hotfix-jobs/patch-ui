"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import type * as React from "react";
import { cn } from "../utils";
import { selectionFocus, colorTransition } from "../recipes";

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

export interface RadioProps extends RadioPrimitive.Root.Props {
  /** Optional label. When present, the radio is wrapped in a `<label>` so clicking the label selects it. */
  children?: React.ReactNode;
  /** Additional classes for the outer `<label>` (only applies when `children` is provided). */
  wrapperClassName?: string;
}

export function Radio({
  className,
  wrapperClassName,
  children,
  disabled,
  ...props
}: RadioProps): React.ReactElement {
  const dot = (
    <RadioPrimitive.Root
      disabled={disabled}
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center rounded-full",
        "bg-fill-2 hover:bg-hairline-strong",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        colorTransition,
        selectionFocus,
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
          className="!bg-ink size-1.5 rounded-full"
        />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );

  if (children == null) return dot;

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 text-small text-ink",
        disabled && "cursor-not-allowed opacity-50",
        wrapperClassName,
      )}
      data-slot="radio-label"
    >
      {dot}
      <span>{children}</span>
    </label>
  );
}

export { RadioPrimitive, RadioGroupPrimitive };
