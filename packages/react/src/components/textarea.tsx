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
    "rounded-[var(--radius-patch-sm)] border-[0.5px] border-[var(--input-border)] bg-[var(--input-bg)] " +
    "hover:border-[var(--patch-border-hover)] " +
    "has-focus-visible:border-[var(--patch-border-active)] " +
    "has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-[var(--patch-focus-ring)] has-focus-visible:outline-offset-[var(--patch-focus-ring-offset)]",
  ghost:
    "rounded-[var(--radius-patch-sm)] bg-transparent border-none " +
    "has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-[var(--patch-focus-ring)] has-focus-visible:outline-offset-[var(--patch-focus-ring-offset)]",
  underline:
    "rounded-none bg-transparent border-x-0 border-t-0 border-b-[0.5px] border-b-[var(--input-border)] " +
    "hover:border-b-[var(--patch-border-hover)] " +
    "has-focus-visible:border-b-[var(--patch-border-active)]",
};

const INVALID_BY_VARIANT: Record<TextareaVariant, string> = {
  outlined:
    "!border-[var(--patch-error)] has-focus-visible:!border-[var(--patch-error)] has-focus-visible:!outline-[var(--patch-error)]",
  ghost: "has-focus-visible:!outline-[var(--patch-error)]",
  underline:
    "!border-b-[var(--patch-error)] has-focus-visible:!border-b-[var(--patch-error)]",
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
            "relative inline-flex w-full text-[length:var(--text-patch-control)] text-patch-text",
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
            className="field-sizing-content min-h-[5rem] w-full rounded-[inherit] bg-transparent px-3 py-2 text-[length:var(--text-patch-control)] outline-none placeholder:text-patch-text-tertiary"
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
