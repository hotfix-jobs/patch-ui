"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { Spinner } from "./spinner";
import type * as React from "react";
import { cn } from "../utils";
import { disabled, colorTransition, iconMuted, iconMutedSolid, popupTriggerOpen, selectionFocus } from "../recipes";
export const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center whitespace-nowrap",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    // Extend tap target to 44px on coarse pointers without changing visual size.
    "pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11",
    // Keyboard focus mirrors hover per variant (no outside ring).
    "outline-none",
    colorTransition,
    disabled,
  ].join(" "),
  {
    defaultVariants: { size: "md", variant: "primary", shape: "rounded" },
    variants: {
      size: {
        sm: "h-6 px-2.5 gap-1.5 text-mini font-medium",
        md: "h-8 px-3.5 gap-2 text-small font-medium",
        lg: "h-10 px-4 gap-2 text-regular font-medium",
      },
      shape: {
        rounded: "rounded-[var(--radius-8)]",
        pill: "rounded-full",
      },
      variant: {
        primary:
          "bg-primary text-on-primary hover:bg-primary-hover focus-visible:bg-primary-hover focus-visible:shadow-[inset_0_-2px_0_var(--on-primary)] data-[popup-open]:bg-primary-hover active:bg-primary-active",
        secondary:
          cn("bg-fill-1 text-ink hover:bg-fill-2 focus-visible:bg-fill-2 active:bg-layer-hover", popupTriggerOpen, selectionFocus),
        soft:
          cn("bg-primary-soft text-on-primary-soft hover:bg-primary-soft-hover focus-visible:bg-primary-soft-hover data-[popup-open]:bg-primary-soft-hover active:bg-primary-soft-active", selectionFocus),
        tertiary:
          cn("bg-transparent text-ink hover:bg-layer-hover focus-visible:bg-layer-hover active:bg-layer-hover", popupTriggerOpen, selectionFocus),
        warning:
          "bg-warning text-warning-fg hover:bg-warning-hover focus-visible:bg-warning-hover focus-visible:shadow-[inset_0_-2px_0_var(--warning-fg)] data-[popup-open]:bg-warning-hover active:bg-warning-active",
        destructive:
          "bg-error text-error-fg hover:bg-error-hover focus-visible:bg-error-hover focus-visible:shadow-[inset_0_-2px_0_var(--error-fg)] data-[popup-open]:bg-error-hover active:bg-error-active",
      },
    },
  },
);

export interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  shape?: VariantProps<typeof buttonVariants>["shape"];
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
}

const iconOnlyWidth: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "w-6 px-0",
  md: "w-8 px-0",
  lg: "w-10 px-0",
};

export function Button({
  className,
  variant,
  size,
  shape,
  icon,
  iconPosition = "left",
  loading,
  disabled: isDisabled,
  render,
  children,
  ...props
}: ButtonProps): React.ReactElement {
  const effectiveSize: NonNullable<ButtonProps["size"]> = size ?? "md";
  const isIconOnly = icon != null && !children;
  const iconOnly = isIconOnly ? iconOnlyWidth[effectiveSize] : "";
  const iconOnlyRecipe = isIconOnly
    ? variant === "secondary" || variant === "tertiary"
      ? iconMuted
      : iconMutedSolid
    : "";

  if (typeof process !== "undefined" && process.env?.NODE_ENV !== "production" && isIconOnly && !props["aria-label"]) {
    console.warn(
      "[Button] Icon-only buttons must have an `aria-label` describing the action.",
    );
  }

  const content = loading ? (
    <Spinner size="sm" />
  ) : (
    <>
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </>
  );

  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
    render ? undefined : "button";

  const defaultProps = {
    className: cn(
      buttonVariants({ size: effectiveSize, variant, shape }),
      iconOnly,
      iconOnlyRecipe,
      className,
    ),
    "data-slot": "button",
    type: typeValue,
    disabled: isDisabled || loading,
    children: content,
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}
