"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import type React from "react";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

export function Checkbox({
  className,
  ...props
}: CheckboxPrimitive.Root.Props): React.ReactElement {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-patch-xs)] border-[0.5px] border-patch-border bg-transparent dark:border-patch-border-active data-checked:border-patch-text data-checked:bg-patch-text data-indeterminate:border-patch-text data-indeterminate:bg-patch-text data-disabled:cursor-not-allowed data-disabled:opacity-50",
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
        <svg
          aria-hidden="true"
          className="size-3 group-data-indeterminate:hidden group-data-unchecked:hidden"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
        </svg>
        <svg
          aria-hidden="true"
          className="hidden size-3 group-data-indeterminate:block"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 12h14" />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { CheckboxPrimitive };
