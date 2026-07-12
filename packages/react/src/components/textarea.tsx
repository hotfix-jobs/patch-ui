"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { mergeProps } from "@base-ui/react/merge-props";
import type * as React from "react";
import { cn } from "../utils";

export type TextareaSize = "sm" | "md" | "lg";
export type TextareaVariant = "default" | "unstyled";

export type TextareaProps = React.ComponentProps<"textarea"> & {
  size?: TextareaSize;
  variant?: TextareaVariant;
};

const paddingBySize: Record<TextareaSize, string> = {
  sm: "px-2.5 py-1.5 text-small",
  md: "px-3 py-2 text-small",
  lg: "px-3.5 py-2.5 text-regular",
};

export function Textarea({
  className,
  rows,
  size = "md",
  variant = "default",
  ...props
}: TextareaProps): React.ReactElement {
  const unstyled = variant === "unstyled";

  return (
    <span
      className={cn(
        "relative inline-flex w-full text-ink",
        !unstyled && "rounded-[var(--radius-8)]",
        !unstyled && [
          "bg-fill-1 hover:bg-fill-2",
          "outline-none has-focus-visible:[outline-style:solid] has-focus-visible:outline-[length:var(--focus-ring-width)] has-focus-visible:outline-[var(--focus-ring-color)] has-focus-visible:outline-offset-0",
          "transition-[color,background-color,outline-color] duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        ],
        "has-disabled:opacity-50 has-disabled:cursor-not-allowed",
        "group-data-[invalid]/field:[outline-style:solid] group-data-[invalid]/field:outline-[length:1px] group-data-[invalid]/field:outline-error",
        "has-[[aria-invalid=true]]:[outline-style:solid] has-[[aria-invalid=true]]:outline-[length:1px] has-[[aria-invalid=true]]:outline-error",
        className,
      )}
      data-slot="textarea-control"
    >
      <FieldPrimitive.Control
        render={(defaultProps: React.ComponentProps<"textarea">) => (
          <textarea
            className={cn(
              "field-sizing-content min-h-24 w-full rounded-[inherit] bg-transparent outline-none resize-y",
              "placeholder:text-ink-subtle",
              paddingBySize[size],
            )}
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
