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
  sm: "px-3 py-1.5 text-label-12",
  md: "px-3 py-2 text-copy-14",
  lg: "px-3.5 py-2.5 text-copy-16",
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
        "relative inline-flex w-full rounded-[var(--radius-6)]",
        "bg-background-200 border border-gray-alpha-400 text-gray-1000",
        "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        "hover:border-gray-alpha-500",
        "has-focus-visible:border-gray-alpha-600 has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-[var(--focus-ring-color)] has-focus-visible:outline-offset-[var(--focus-ring-offset)]",
        "has-disabled:opacity-50 has-disabled:cursor-not-allowed",
        hasError &&
          "!border-[var(--error)] has-focus-visible:!border-[var(--error)] has-focus-visible:!outline-[var(--error)]",
        !label && !hasErrorMessage && className,
      )}
      data-slot="textarea-control"
    >
      <FieldPrimitive.Control
        render={(defaultProps: React.ComponentProps<"textarea">) => (
          <textarea
            id={id}
            className={cn(
              "field-sizing-content min-h-[5rem] w-full rounded-[inherit] bg-transparent outline-none",
              "placeholder:text-gray-700",
              paddingBySize[size],
            )}
            data-slot="textarea"
            rows={rows}
            aria-invalid={hasError || undefined}
            aria-describedby={hasErrorMessage ? errorId : props["aria-describedby"]}
            {...mergeProps(defaultProps, props)}
          />
        )}
      />
    </span>
  );

  if (!label && !hasErrorMessage) return control;

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)} data-slot="textarea-field">
      {label && (
        <label
          htmlFor={id}
          className="text-label-14 text-gray-1000"
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
          className="text-label-13 text-[var(--error)]"
          data-slot="textarea-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export { FieldPrimitive };
