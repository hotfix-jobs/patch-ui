"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { mergeProps } from "@base-ui/react/merge-props";
import type * as React from "react";
import { cn } from "../utils";

export type TextareaProps = React.ComponentProps<"textarea"> & {
  /** Visual error state. Sets `aria-invalid` and switches border to the error token. */
  invalid?: boolean;
};

export function Textarea({
  className,
  rows,
  invalid,
  ...props
}: TextareaProps): React.ReactElement {
  return (
    <span
      className={cn(
        "relative inline-flex w-full rounded-[var(--radius-6)]",
        "bg-background-100 border border-gray-alpha-400 text-gray-1000",
        "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        "hover:border-gray-alpha-500",
        "has-focus-visible:border-gray-alpha-600 has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-[var(--focus-ring-color)] has-focus-visible:outline-offset-[var(--focus-ring-offset)]",
        "has-disabled:opacity-50 has-disabled:cursor-not-allowed",
        invalid && "!border-[var(--error)] has-focus-visible:!border-[var(--error)] has-focus-visible:!outline-[var(--error)]",
        className,
      )}
      data-slot="textarea-control"
    >
      <FieldPrimitive.Control
        render={(defaultProps: React.ComponentProps<"textarea">) => (
          <textarea
            className="field-sizing-content min-h-[5rem] w-full rounded-[inherit] bg-transparent px-3 py-2 text-copy-14 outline-none placeholder:text-gray-700"
            data-slot="textarea"
            rows={rows}
            aria-invalid={invalid || undefined}
            {...mergeProps(defaultProps, props)}
          />
        )}
      />
    </span>
  );
}

export { FieldPrimitive };
