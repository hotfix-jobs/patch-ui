"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { Spinner } from "./spinner";
import type * as React from "react";
import { cn } from "../utils";
import { disabled, colorTransition, focusRing, iconMuted, iconMutedSolid } from "../recipes";
import { X } from "@phosphor-icons/react/dist/ssr";
export const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center whitespace-nowrap",
    "cursor-pointer",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    // Extend tap target to 44px on coarse pointers without changing visual size.
    "pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11",
    // Keyboard focus mirrors hover per variant (no outside ring).
    "outline-none",
    colorTransition,
    disabled,
  ].join(" "),
  {
    defaultVariants: { size: "md", variant: "primary", shape: "square", shadow: false },
    variants: {
      size: {
        sm: "h-6 px-2.5 gap-1.5 text-mini font-medium",
        md: "h-8 px-3.5 gap-2 text-small font-medium",
        lg: "h-10 px-4 gap-2 text-regular font-medium",
      },
      variant: {
        primary:
          "bg-primary text-on-primary hover:bg-primary-hover focus-visible:bg-primary-hover active:bg-primary-active " +
          iconMutedSolid,
        secondary:
          "bg-layer-1 text-ink border border-hairline hover:bg-layer-2 focus-visible:bg-layer-2 active:bg-layer-selected " +
          iconMuted,
        tertiary:
          "bg-transparent text-ink hover:bg-layer-hover focus-visible:bg-layer-hover active:bg-layer-selected " +
          iconMuted,
        warning:
          "bg-warning text-warning-fg hover:bg-warning-hover focus-visible:bg-warning-hover active:bg-warning-active " +
          iconMutedSolid,
        destructive:
          "bg-error text-error-fg hover:bg-error-hover focus-visible:bg-error-hover active:bg-error-active " +
          iconMutedSolid,
      },
      shape: {
        square: "rounded-[var(--radius-6)]",
        pill: "rounded-full",
        circle: "rounded-full",
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
  shape?: VariantProps<typeof buttonVariants>["shape"];
  shadow?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
  /** Renders a trailing × sub-button; fires without triggering the parent onClick. */
  onRemove?: () => void;
  removeLabel?: string;
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
  const isIconOnly = (icon != null && !children) || shape === "circle";
  const iconOnly = isIconOnly ? iconOnlyWidth[effectiveSize] : "";

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
      {onRemove && (
        <span
          role="button"
          tabIndex={0}
          aria-label={removeLabel}
          // Stop mousedown so a parent trigger (Base UI opens on mousedown by
          // default) doesn't fire when the user clicks the X; onClick alone
          // runs too late.
          onMouseDown={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
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
            "hover:bg-layer-hover hover:opacity-100",
            focusRing,
            colorTransition,
          )}
          data-slot="button-remove"
        >
          <X className="size-2.5" />
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
