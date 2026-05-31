"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { mergeProps } from "@base-ui/react/merge-props";
import type * as React from "react";
import { cn } from "../utils";
import { colorTransition } from "../recipes";

export type TextareaProps = React.ComponentProps<"textarea"> & {
  unstyled?: boolean;
};

export function Textarea({
  className,
  rows,
  unstyled = false,
  ...props
}: TextareaProps): React.ReactElement {
  return (
    <span
      className={
        cn(
          !unstyled &&
            cn(
              "relative inline-flex w-full rounded-[var(--radius-patch-sm)] bg-[var(--input-bg)] text-[length:var(--text-patch-control)] text-patch-text border-[0.5px] border-[var(--input-border)] has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-[var(--patch-focus-ring)] has-focus-visible:outline-offset-[var(--patch-focus-ring-offset)] has-focus-visible:border-[var(--input-border-focus)] has-disabled:opacity-50",
              colorTransition,
            ),
          className,
        ) || undefined
      }
      data-slot="textarea-control"
    >
      <FieldPrimitive.Control
        render={(defaultProps: React.ComponentProps<"textarea">) => (
          <textarea
            className="field-sizing-content min-h-[5rem] w-full rounded-[inherit] bg-transparent px-3 py-2 text-[length:var(--text-patch-control)] outline-none placeholder:text-patch-text-tertiary"
            data-slot="textarea"
            rows={rows}
            {...mergeProps(defaultProps, props)}
          />
        )}
      />
    </span>
  );
}

export { FieldPrimitive };
