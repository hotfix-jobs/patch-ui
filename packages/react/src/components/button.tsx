"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { Spinner } from "./spinner";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing, disabled, colorTransition } from "../recipes";
import { XIcon } from "../internal-icons";

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
    defaultVariants: { size: "md", variant: "primary", shape: "square", shadow: false },
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
          "bg-amber-700 text-white hover:bg-amber-800 active:bg-amber-900 dark:bg-amber-600 dark:hover:bg-amber-700 dark:active:bg-amber-800",
        error:
          "bg-red-700 text-white hover:bg-red-800 active:bg-red-900 dark:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-800",
      },
      shape: {
        square: "rounded-[var(--radius-6)]",
        pill: "rounded-full",
        circle: "rounded-full",
        rounded: "rounded-[var(--radius-12)]",
      },
      shadow: {
        true: "shadow-card",
        false: "",
      },
    },
  },
);

export interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  /** Corner shape. `square` (6px) is default; `circle` for icon-only, `rounded` (12px) for marketing. */
  shape?: VariantProps<typeof buttonVariants>["shape"];
  /** Adds a subtle elevation shadow. Typically paired with `shape="rounded"` on marketing pages. */
  shadow?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
  /**
   * When provided, renders a trailing × sub-button that calls this handler
   * without triggering the parent Button's onClick. Use for dismissible tag
   * pills (repo chips, applied filters), typically with `shape="pill"`.
   */
  onRemove?: () => void;
  /** Accessible label for the × sub-button. */
  removeLabel?: string;
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
  shadow,
  icon,
  iconPosition = "left",
  loading,
  disabled: isDisabled,
  onRemove,
  removeLabel = "Remove",
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
      {onRemove && (
        <span
          role="button"
          tabIndex={0}
          aria-label={removeLabel}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              onRemove();
            }
          }}
          className={cn(
            "-me-1 inline-flex size-4 shrink-0 items-center justify-center rounded-full opacity-70",
            "hover:bg-gray-alpha-300 hover:opacity-100",
            focusRing,
            colorTransition,
          )}
          data-slot="button-remove"
        >
          <XIcon className="size-2.5" />
        </span>
      )}
    </>
  );

  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
    render ? undefined : "button";

  const defaultProps = {
    className: cn(buttonVariants({ size: effectiveSize, variant, shape, shadow }), iconOnly, className),
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
