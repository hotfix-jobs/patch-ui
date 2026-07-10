"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { mergeProps } from "@base-ui/react/merge-props";
import type * as React from "react";
import { cn } from "../utils";

export type TextareaSize = "sm" | "md" | "lg";

export type TextareaProps = React.ComponentProps<"textarea"> & {
  size?: TextareaSize;
  /** Visual error state or inline error message. */
  error?: boolean | string;
  /** Renders a `<label>` above the textarea. Requires `id`. */
  label?: string;
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
  error,
  label,
  id,
  ...props
}: TextareaProps): React.ReactElement {
  const hasErrorMessage = typeof error === "string" && error.length > 0;
  const hasError = Boolean(error);
  const errorId = id ? `${id}-error` : undefined;

  const control = (
    <span
      className={cn(
        "relative inline-flex w-full rounded-[var(--radius-8)]",
        "bg-layer-1 border border-hairline text-ink",
        "transition-[color,background-color,border-color,box-shadow] duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        "hover:border-hairline-strong",
        "has-focus-visible:border-primary has-focus-visible:shadow-[var(--focus-halo)]",
        "has-disabled:opacity-50 has-disabled:cursor-not-allowed",
        hasError && "!border-error",
        !label && !hasErrorMessage && className,
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
            aria-invalid={hasError || undefined}
            aria-describedby={hasErrorMessage ? errorId : props["aria-describedby"]}
            {...mergeProps(defaultProps, props, id ? { id } : {})}
          />
        )}
      />
    </span>
  );

  if (!label && !hasErrorMessage) return control;

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)} data-slot="textarea-field">
      {label && (
        <label
          htmlFor={id}
          className="text-small font-medium text-ink"
          data-slot="textarea-label"
        >
          {label}
        </label>
      )}
      {control}
      {hasErrorMessage && (
        <p
          id={errorId}
          role="alert"
          className="text-mini text-error"
          data-slot="textarea-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export { FieldPrimitive };
