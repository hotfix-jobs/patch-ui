"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import type React from "react";
import { CheckIcon } from "../internal-icons";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

export function Checkbox({
  className,
  ...props
}: CheckboxPrimitive.Root.Props): React.ReactElement {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-patch-xs)] bg-transparent border border-patch-border-hover data-checked:border-patch-text data-checked:bg-patch-text data-indeterminate:border-patch-text data-indeterminate:bg-patch-text data-disabled:cursor-not-allowed data-disabled:opacity-50",
        colorTransition,
        focusRing,
        className,
      )}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="group flex items-center justify-center text-patch-bg"
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
}

export { CheckboxPrimitive };
