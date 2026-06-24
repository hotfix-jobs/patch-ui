"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { Spinner } from "./spinner";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing, controlSize, colorTransition } from "../recipes";

export const buttonVariants = cva(
  `relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap font-medium tracking-[-0.005em] rounded-[var(--radius-patch-sm)] disabled:pointer-events-none disabled:opacity-50 pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 [&_svg]:pointer-events-none [&_svg]:shrink-0 transition-transform duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)] active:scale-[0.97] ${focusRing} ${colorTransition}`,
  {
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
    variants: {
      size: {
        sm: controlSize.sm,
        md: controlSize.md,
        lg: controlSize.lg,
      },
      variant: {
        primary:
          "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border-none hover:bg-[var(--btn-primary-hover)] active:bg-[var(--btn-primary-active)]",
        // Subtle-fill button: no border, soft fill. Distinct from the bordered
        // 'outline' variant.
        secondary:
          "bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border-none hover:bg-[var(--btn-secondary-hover)] active:bg-[var(--btn-secondary-active)]",
        // Hairline-bordered button with a subtle neutral hover fill.
        outline:
          "bg-transparent text-[var(--patch-text)] border-[0.5px] border-[var(--patch-border)] hover:bg-[var(--patch-accent)]",
        ghost:
          "bg-transparent text-[var(--patch-text)] border-none hover:bg-[var(--patch-surface-hover)] active:bg-[var(--patch-surface-active)]",
        danger:
          "bg-[var(--btn-danger-bg)] text-[var(--btn-danger-text)] border-[0.5px] border-[var(--btn-danger-border)] hover:bg-[var(--btn-danger-hover)] active:bg-[var(--btn-danger-active)]",
        // Inline text action with an animated draw-underline on hover.
        link: "bg-transparent text-[var(--patch-text)] border-none rounded-none px-0 h-auto relative pb-0.5 before:content-[''] before:absolute before:inset-x-0 before:bottom-[2px] before:h-[0.5px] before:bg-[var(--patch-text)] before:scale-x-[0.3] before:origin-left before:transition-[scale] before:duration-[var(--duration-patch-spring)] before:ease-[var(--ease-patch-out)] hover:before:scale-x-100",
        // Uppercase utility CTA (marketing/utility).
        uppercase:
          "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border-none rounded-none uppercase tracking-[-0.01em] text-[length:var(--text-patch-micro)] hover:bg-[var(--btn-primary-hover)]",
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

export function Button({
  className,
  variant,
  size,
  icon,
  iconPosition = "left",
  loading,
  disabled,
  render,
  children,
  ...props
}: ButtonProps): React.ReactElement {
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
    render ? undefined : "button";

  const isIconOnly = icon != null && !children;

  const iconOnlySizeClasses = isIconOnly
    ? size === "sm"
      ? "w-7 px-0"
      : size === "lg"
        ? "w-11 px-0"
        : "w-9 px-0"
    : "";

  const content = loading ? (
    <Spinner size="sm" />
  ) : (
    <>
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </>
  );

  const defaultProps = {
    className: cn(buttonVariants({ className: cn(iconOnlySizeClasses, className), size, variant })),
    "data-slot": "button",
    type: typeValue,
    disabled: disabled || loading,
    children: content,
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}
