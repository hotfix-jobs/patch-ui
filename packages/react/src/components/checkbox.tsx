"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

import { Check, Minus } from "@phosphor-icons/react/dist/ssr";
export interface CheckboxProps extends CheckboxPrimitive.Root.Props {
  /** Optional label. When present, the checkbox is wrapped in a `<label>` so clicking the label toggles the box. */
  children?: React.ReactNode;
  /** Additional classes for the outer wrapper (only applies when `children` is provided). */
  wrapperClassName?: string;
}

export function Checkbox({
  className,
  wrapperClassName,
  children,
  disabled,
  ...props
}: CheckboxProps): React.ReactElement {
  const box = (
    <CheckboxPrimitive.Root
      disabled={disabled}
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center rounded-[var(--radius-4)]",
        "bg-fill-2 hover:bg-hairline-strong",
        "data-checked:bg-ink data-checked:hover:bg-ink",
        "data-indeterminate:bg-ink",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        colorTransition,
        focusRing,
        className,
      )}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="group flex items-center justify-center"
        data-slot="checkbox-indicator"
        keepMounted
      >
        {/* Overrides iconMuted descendant selectors from parent rows. */}
        <Check
          className="!text-base size-3 group-data-indeterminate:hidden group-data-unchecked:hidden"
        />
        <Minus
          aria-hidden="true"
          className="!text-base hidden size-3 group-data-indeterminate:block"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (children == null) return box;

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 text-small text-ink",
        disabled && "cursor-not-allowed opacity-50",
        wrapperClassName,
      )}
      data-slot="checkbox-label"
    >
      {box}
      <span>{children}</span>
    </label>
  );
}

export { CheckboxPrimitive };
