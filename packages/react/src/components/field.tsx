"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { Form as FormPrimitive } from "@base-ui/react/form";
import { motion, useReducedMotion } from "motion/react";
import type * as React from "react";
import { cn } from "../utils";

export function Field({
  className,
  ...props
}: FieldPrimitive.Root.Props): React.ReactElement {
  return (
    <FieldPrimitive.Root
      className={cn("flex flex-col items-start gap-2", className)}
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
        "inline-flex items-center gap-1.5 text-[length:var(--text-patch-control)] font-medium text-patch-text-secondary",
        className,
      )}
      data-slot="field-label"
      {...props}
    >
      {children}
      {required && (
        <span
          aria-hidden="true"
          className="text-[var(--patch-error)] text-[length:var(--text-patch-mini)] leading-none"
          data-slot="field-required"
        >
          *
        </span>
      )}
      {optional && !required && (
        <span
          aria-hidden="true"
          className="text-patch-text-tertiary text-[length:var(--text-patch-mini)] font-normal"
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
      className={cn(
        "text-patch-text-secondary text-[length:var(--text-patch-mini)] leading-[1.5] tracking-[-0.005em]",
        className,
      )}
      data-slot="field-description"
      {...props}
    />
  );
}

/**
 * Renders an error message when the field is invalid. Base UI controls
 * mount/unmount via validity state; motion adds a subtle opacity + slight
 * slide on appearance so the message doesn't snap in.
 */
export function FieldError({
  className,
  ...props
}: FieldPrimitive.Error.Props): React.ReactElement {
  const reduceMotion = useReducedMotion();
  return (
    <FieldPrimitive.Error
      className={cn(
        "inline-flex items-center gap-1.5 text-[length:var(--text-patch-mini)] leading-[1.5] tracking-[-0.005em] text-[var(--patch-error)] before:content-[''] before:size-[5px] before:rounded-full before:bg-[var(--patch-error)]",
        className,
      )}
      data-slot="field-error"
      render={
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.15, ease: [0.16, 1, 0.3, 1] }
          }
        />
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
