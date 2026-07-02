"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { Spinner } from "./spinner";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing, disabled, colorTransition } from "../recipes";

export const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center whitespace-nowrap",
    "cursor-pointer",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11",
    focusRing,
    colorTransition,
    disabled,
  ].join(" "),
  {
    defaultVariants: { size: "md", variant: "primary", shape: "square" },
    variants: {
      size: {
        tiny: "h-6 px-2 gap-1 text-button-12",
        sm: "h-8 px-3 gap-1.5 text-button-12",
        md: "h-10 px-4 gap-2 text-button-14",
        lg: "h-12 px-6 gap-2 text-button-16",
      },
      variant: {
        primary:
          "bg-gray-1000 text-background-100 hover:bg-gray-900 active:bg-gray-800",
        secondary:
          "bg-background-100 text-gray-1000 border border-gray-alpha-400 hover:bg-gray-alpha-100 active:bg-gray-alpha-200",
        tertiary:
          "bg-transparent text-gray-1000 hover:bg-gray-alpha-100 active:bg-gray-alpha-200",
        warning:
          "bg-amber-700 text-white hover:bg-amber-800 active:bg-amber-900",
        error:
          "bg-red-700 text-white hover:bg-red-800 active:bg-red-900",
      },
      shape: {
        square: "rounded-[var(--radius-6)]",
        circle: "rounded-full",
        rounded: "rounded-[var(--radius-12)]",
      },
    },
  },
);

export interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  /** Corner shape. `square` (6px) is default; `circle` for icon-only, `rounded` (12px) for marketing. */
  shape?: VariantProps<typeof buttonVariants>["shape"];
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
}

const iconOnlyWidth: Record<NonNullable<ButtonProps["size"]>, string> = {
  tiny: "w-6 px-0",
  sm: "w-8 px-0",
  md: "w-10 px-0",
  lg: "w-12 px-0",
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

  if (process.env.NODE_ENV !== "production" && isIconOnly && !props["aria-label"]) {
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
    className: cn(buttonVariants({ size: effectiveSize, variant, shape }), iconOnly, className),
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
