"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { Spinner } from "./spinner";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing, controlSize, disabled, colorTransition } from "../recipes";

export const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center whitespace-nowrap",
    "rounded-[var(--radius-6)] cursor-pointer",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11",
    focusRing,
    colorTransition,
    disabled,
  ].join(" "),
  {
    defaultVariants: { size: "md", variant: "primary" },
    variants: {
      size: {
        sm: controlSize.sm,
        md: controlSize.md,
        lg: controlSize.lg,
      },
      variant: {
        primary:
          "bg-gray-1000 text-background-100 hover:bg-gray-900 active:bg-gray-800",
        secondary:
          "bg-background-100 text-gray-1000 border border-gray-alpha-400 hover:bg-gray-alpha-100 active:bg-gray-alpha-200",
        tertiary:
          "bg-transparent text-gray-1000 hover:bg-gray-alpha-100 active:bg-gray-alpha-200",
        error:
          "bg-red-700 text-white hover:bg-red-800 active:bg-red-900",
      },
    },
  },
);

export interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
}

const iconOnlyWidth: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "w-8 px-0",
  md: "w-10 px-0",
  lg: "w-12 px-0",
};

export function Button({
  className,
  variant,
  size,
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
    className: cn(buttonVariants({ size: effectiveSize, variant }), iconOnly, className),
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
