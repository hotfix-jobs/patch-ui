"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { mergeProps } from "@base-ui/react/merge-props";
import type * as React from "react";
import { cn } from "../utils";
import { colorTransition } from "../recipes";

type TextareaVariant = "outlined" | "ghost" | "underline";

export type TextareaProps = React.ComponentProps<"textarea"> & {
  variant?: TextareaVariant;
  /** Visual error state. Sets aria-invalid and switches border to the error token. */
  invalid?: boolean;
  unstyled?: boolean;
};

const WRAPPER_VARIANT: Record<TextareaVariant, string> = {
  outlined:
    "rounded-[var(--radius-6)] border border-[var(--input-border)] bg-[var(--input-bg)] " +
    "hover:border border-[var(--gray-alpha-500)] " +
    "has-focus-visible:border border-[var(--gray-alpha-600)] " +
    "has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-[var(--focus-ring-color)] has-focus-visible:outline-offset-[var(--focus-ring-offset)]",
  ghost:
    "rounded-[var(--radius-6)] bg-transparent border-none " +
    "has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-[var(--focus-ring-color)] has-focus-visible:outline-offset-[var(--focus-ring-offset)]",
  underline:
    "rounded-none bg-transparent border-b border-[var(--input-border)] " +
    "hover:border-b border-[var(--gray-alpha-500)] " +
    "has-focus-visible:border-b border-[var(--gray-alpha-600)]",
};

const INVALID_BY_VARIANT: Record<TextareaVariant, string> = {
  outlined:
    "!border-[var(--error)] has-focus-visible:!border-[var(--error)] has-focus-visible:!outline-[var(--error)]",
  ghost: "has-focus-visible:!outline-[var(--error)]",
  underline:
    "!border-b border-[var(--error)] has-focus-visible:!border-b border-[var(--error)]",
};

export function Textarea({
  className,
  rows,
  variant = "outlined",
  invalid,
  unstyled = false,
  ...props
}: TextareaProps): React.ReactElement {
  return (
    <span
      className={
        cn(
          !unstyled && [
            "relative inline-flex w-full text-label-13 text-gray-1000",
            "has-disabled:opacity-50",
            WRAPPER_VARIANT[variant],
            invalid && INVALID_BY_VARIANT[variant],
            colorTransition,
          ],
          className,
        ) || undefined
      }
      data-variant={variant}
      data-invalid={invalid || undefined}
      data-slot="textarea-control"
    >
      <FieldPrimitive.Control
        render={(defaultProps: React.ComponentProps<"textarea">) => (
          <textarea
            className="field-sizing-content min-h-[5rem] w-full rounded-[inherit] bg-transparent px-3 py-2 text-label-13 outline-none placeholder:text-gray-800"
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
