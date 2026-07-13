"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { Form as FormPrimitive } from "@base-ui/react/form";
import type * as React from "react";
import { cn } from "../utils";

/** Field wraps a label + control + description + error stack. */
export function Field({
  className,
  ...props
}: FieldPrimitive.Root.Props): React.ReactElement {
  return (
    <FieldPrimitive.Root
      className={cn("group/field flex flex-col items-start gap-2", className)}
      data-slot="field"
      {...props}
    />
  );
}

export interface FieldLabelProps extends FieldPrimitive.Label.Props {
  /** Renders a small red asterisk after the label. */
  required?: boolean;
  /** Renders "(optional)" in tertiary text after the label. */
  optional?: boolean;
}

export function FieldLabel({
  className,
  children,
  required,
  optional,
  ...props
}: FieldLabelProps): React.ReactElement {
  return (
    <FieldPrimitive.Label
      className={cn(
        "inline-flex items-center gap-1.5 text-small font-medium text-ink",
        className,
      )}
      data-slot="field-label"
      {...props}
    >
      {children}
      {required && (
        <span
          aria-hidden="true"
          className="text-mini leading-none text-error"
          data-slot="field-required"
        >
          *
        </span>
      )}
      {optional && !required && (
        <span
          aria-hidden="true"
          className="text-mini text-ink-muted"
          data-slot="field-optional"
        >
          (optional)
        </span>
      )}
    </FieldPrimitive.Label>
  );
}

export function FieldItem({
  className,
  ...props
}: FieldPrimitive.Item.Props): React.ReactElement {
  return (
    <FieldPrimitive.Item
      className={cn("flex", className)}
      data-slot="field-item"
      {...props}
    />
  );
}

export function FieldDescription({
  className,
  ...props
}: FieldPrimitive.Description.Props): React.ReactElement {
  return (
    <FieldPrimitive.Description
      className={cn("text-mini text-ink-subtle", className)}
      data-slot="field-description"
      {...props}
    />
  );
}

/** Error message shown when the field is invalid. */
export function FieldError({
  className,
  ...props
}: FieldPrimitive.Error.Props): React.ReactElement {
  return (
    <FieldPrimitive.Error
      className={cn(
        "inline-flex items-center gap-1.5 text-mini text-error before:content-[''] before:size-[5px] before:rounded-full before:bg-error",
        className,
      )}
      data-slot="field-error"
      render={
        <span className="[animation:patch-field-error-in_var(--duration-state)_var(--ease-standard)]" />
      }
      {...props}
    />
  );
}

export const FieldControl: typeof FieldPrimitive.Control =
  FieldPrimitive.Control;
export const FieldValidity: typeof FieldPrimitive.Validity =
  FieldPrimitive.Validity;

export function Form({
  className,
  ...props
}: FormPrimitive.Props): React.ReactElement {
  return (
    <FormPrimitive
      className={cn("flex w-full flex-col gap-4", className)}
      data-slot="form"
      {...props}
    />
  );
}

export { FieldPrimitive, FormPrimitive };
