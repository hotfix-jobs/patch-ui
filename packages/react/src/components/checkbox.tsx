"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import type * as React from "react";
import { CheckIcon } from "../internal-icons";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

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
        "inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-6)]",
        "bg-transparent border border-gray-alpha-500",
        "data-checked:border-gray-1000 data-checked:bg-gray-1000",
        "data-indeterminate:border-gray-1000 data-indeterminate:bg-gray-1000",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        colorTransition,
        focusRing,
        className,
      )}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="group flex items-center justify-center text-background-100"
        data-slot="checkbox-indicator"
        keepMounted
      >
        <CheckIcon
          className="size-3 group-data-indeterminate:hidden group-data-unchecked:hidden"
          strokeWidth={2.5}
        />
        <svg
          aria-hidden="true"
          className="hidden size-3 group-data-indeterminate:block"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14" />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (children == null) return box;

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 text-copy-14 text-gray-1000",
        !disabled && "cursor-pointer",
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
