"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import type * as React from "react";
import { cn } from "../utils";
import { Spinner } from "./spinner";

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "default" | "unstyled";

export type InputProps = Omit<
  InputPrimitive.Props & React.RefAttributes<HTMLInputElement>,
  "size" | "prefix"
> & {
  size?: InputSize;
  /**
   * Visual variant of the input container.
   * - `default` (unset): bordered, rounded, hover + focus outline.
   * - `unstyled`: no border, no rounded, no hover, no focus outline.
   *   Use when embedding an Input inside a surface that owns its
   *   own container styling (panels, table cells, composite fields).
   */
  variant?: InputVariant;
  /** Content rendered at the start (icon, unit symbol, or text like `https://`). */
  prefix?: React.ReactNode;
  /** Content rendered at the end (icon, unit label, or text like `.com`). */
  suffix?: React.ReactNode;
  /** Renders a `<label>` above the input. */
  label?: string;
  /** `id` required when passing a string `label`. */
  id?: string;
  /** Visual error state or inline error message. */
  error?: boolean | string;
  /** Disables the input and renders a spinner in the trailing slot. */
  loading?: boolean;
  /** Renders a full-radius (pill-shaped) input. */
  rounded?: boolean;
};

// Heights per DESIGN.md: sm=24, md=32, lg=40. Text drops to body-13 at
// sm so the label fits comfortably inside 24px; md and lg carry body-14
// and body-16 respectively.
const heightBySize: Record<InputSize, string> = {
  sm: "h-6 text-small",
  md: "h-8 text-small",
  lg: "h-10 text-regular",
};

// Padding ramps stored as literal ps-/pe- strings so Tailwind's JIT
// picks them up in source (a computed `"px-2.5".replace(...)` would
// yield `ps-2.5` at runtime but the class rule would never get emitted).
// Padding scales with height. sm/md/lg heights are 24/32/40, so 8/12/14
// keeps roughly the same padding-to-height ratio (~33-37%) across sizes.
const startPadBySize: Record<InputSize, string> = {
  sm: "ps-3",
  md: "ps-3",
  lg: "ps-3.5",
};

const endPadBySize: Record<InputSize, string> = {
  sm: "pe-3",
  md: "pe-3",
  lg: "pe-3.5",
};

/** Inline affix. No background, no border, no hover -- just a muted
 *  glyph or short label rendered inline with the input text. When a
 *  prefix or suffix is present, it takes over the leading / trailing
 *  padding on that side so nothing double-pads. */
function Affix({
  side,
  children,
}: {
  side: "start" | "end";
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center text-ink-muted",
        side === "start" ? "ps-3 pe-1.5" : "ps-1.5 pe-3",
        "[&_svg]:size-4",
      )}
      data-slot={`input-${side === "start" ? "prefix" : "suffix"}`}
    >
      {children}
    </span>
  );
}

export function Input({
  className,
  size = "md",
  variant = "default",
  prefix,
  suffix,
  label,
  id,
  error,
  loading,
  rounded,
  disabled,
  value,
  ...props
}: InputProps): React.ReactElement {
  const isDisabled = disabled || loading;
  const trailingSpinner = loading ? <Spinner size="sm" /> : null;
  const hasErrorMessage = typeof error === "string" && error.length > 0;
  const hasError = Boolean(error);
  const unstyled = variant === "unstyled";
  const shape = unstyled ? "" : rounded ? "rounded-full" : "rounded-[var(--radius-8)]";
  const errorId = id ? `${id}-error` : undefined;

  const hasTrailing = Boolean(suffix) || Boolean(trailingSpinner);

  const inputElement = (
    <InputPrimitive
      id={id}
      className={cn(
        "w-full min-w-0 bg-transparent border-none shadow-none outline-none ring-0",
        "placeholder:text-ink-subtle focus:outline-none focus:ring-0",
        heightBySize[size],
        // Prefix owns the leading padding on that side; otherwise the
        // input carries its own padding.
        prefix ? "ps-0" : startPadBySize[size],
        // Suffix / spinner owns the trailing padding on that side.
        hasTrailing ? "pe-0" : endPadBySize[size],
        props.type === "search" &&
          "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
      )}
      data-slot="input"
      disabled={isDisabled}
      value={value}
      aria-invalid={hasError || undefined}
      aria-describedby={hasErrorMessage ? errorId : props["aria-describedby"]}
      {...props}
    />
  );

  const control = (
    <span
      className={cn(
        "relative inline-flex w-full items-center overflow-hidden text-ink",
        shape,
        !unstyled && [
          "bg-layer-1 border border-hairline",
          "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
          "hover:border-hairline-strong",
          // Focus lifts the border to --primary. No outside ring: the
          // component's own edge does the work. Solid ink by default
          // and brand-colored automatically when a consumer overrides
          // --primary.
          "has-focus-visible:border-primary",
        ],
        "has-disabled:opacity-50 has-disabled:cursor-not-allowed",
        // Error state: the border stays solid error even at rest so
        // the field reads as invalid before the user focuses it back.
        hasError && "!border-error",
        !label && !hasErrorMessage && className,
      )}
      data-slot="input-control"
    >
      {prefix && <Affix side="start">{prefix}</Affix>}
      {inputElement}
      {trailingSpinner && (
        <span className="flex shrink-0 items-center pe-3 text-ink-muted" data-slot="input-loading">
          {trailingSpinner}
        </span>
      )}
      {suffix && !trailingSpinner && <Affix side="end">{suffix}</Affix>}
    </span>
  );

  // Basic control-only path when no label and no error message
  if (!label && !hasErrorMessage) return control;

  // Fieldset-style path when label or error message is present.
  // Label uses button-14 for the weight-500 form-label recipe; error
  // uses caption-12 in error per DESIGN.md field spec.
  return (
    <div className={cn("flex flex-col gap-2 w-full", className)} data-slot="input-field">
      {label && (
        <label
          htmlFor={id}
          className="text-small font-medium text-ink"
          data-slot="input-label"
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
          data-slot="input-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export { InputPrimitive };
