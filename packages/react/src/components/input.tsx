"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import type * as React from "react";
import { cn } from "../utils";
import { Spinner } from "./spinner";
import { XIcon } from "../internal-icons";

export type InputSize = "sm" | "md" | "lg";

export type InputProps = Omit<
  InputPrimitive.Props & React.RefAttributes<HTMLInputElement>,
  "size" | "prefix"
> & {
  size?: InputSize;
  /** Content rendered at the start (icon, unit symbol, or text like `https://`). */
  prefix?: React.ReactNode;
  /** Content rendered at the end (icon, unit label, or text like `.com`). */
  suffix?: React.ReactNode;
  /** Wraps prefix in a styled container (bg + separator). Default true. */
  prefixStyling?: boolean;
  /** Wraps suffix in a styled container (bg + separator). Default true. */
  suffixStyling?: boolean;
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
  /** When set with a non-empty value, renders a trailing × that clears the input. */
  onClear?: () => void;
};

const heightBySize: Record<InputSize, string> = {
  sm: "h-8 text-label-12",
  md: "h-10 text-copy-14",
  lg: "h-12 text-copy-16",
};

const leadingPad: Record<InputSize, string> = {
  sm: "ps-3",
  md: "ps-3.5",
  lg: "ps-4",
};

const trailingPad: Record<InputSize, string> = {
  sm: "pe-3",
  md: "pe-3.5",
  lg: "pe-4",
};

/** Styled affix wrapper — own bg + border on the input-facing side, stretched to input height. */
function StyledAffix({
  side,
  children,
  size,
}: {
  side: "start" | "end";
  children: React.ReactNode;
  size: InputSize;
}) {
  const border = side === "start" ? "border-r" : "border-l";
  const pad = size === "sm" ? "px-2.5" : size === "lg" ? "px-3.5" : "px-3";
  return (
    <span
      className={cn(
        "self-stretch inline-flex shrink-0 items-center bg-gray-100 border-gray-alpha-400 text-gray-800",
        border,
        pad,
        "[&_svg]:size-4",
      )}
      data-slot={`input-${side === "start" ? "prefix" : "suffix"}`}
    >
      {children}
    </span>
  );
}

/** Unstyled affix — floats inside the input area with just padding. */
function UnstyledAffix({
  side,
  children,
}: {
  side: "start" | "end";
  children: React.ReactNode;
}) {
  const pad = side === "start" ? "ps-3 pe-1.5" : "ps-1.5 pe-3";
  return (
    <span
      className={cn("inline-flex shrink-0 items-center text-gray-800", pad, "[&_svg]:size-4")}
      data-slot={`input-${side === "start" ? "prefix" : "suffix"}`}
    >
      {children}
    </span>
  );
}

export function Input({
  className,
  size = "md",
  prefix,
  suffix,
  prefixStyling = true,
  suffixStyling = true,
  label,
  id,
  error,
  loading,
  rounded,
  onClear,
  disabled,
  value,
  ...props
}: InputProps): React.ReactElement {
  const isDisabled = disabled || loading;
  const hasValue =
    value != null && value !== "" && (typeof value !== "number" || !Number.isNaN(value));
  const showClear = onClear != null && hasValue && !isDisabled;
  const trailingSpinner = loading ? <Spinner size="sm" /> : null;
  const hasErrorMessage = typeof error === "string" && error.length > 0;
  const hasError = Boolean(error);
  const shape = rounded ? "rounded-full" : "rounded-[var(--radius-6)]";
  const errorId = id ? `${id}-error` : undefined;

  const hasTrailing = Boolean(suffix) || showClear || Boolean(trailingSpinner);

  const inputElement = (
    <InputPrimitive
      id={id}
      className={cn(
        "w-full min-w-0 bg-transparent border-none shadow-none outline-none ring-0",
        "placeholder:text-gray-700 focus:outline-none focus:ring-0",
        heightBySize[size],
        // Leading padding: apply unless an unstyled prefix is handling it
        (!prefix || prefixStyling) ? leadingPad[size] : "ps-0",
        // Trailing padding: apply unless an unstyled suffix / clear / spinner sits there
        (!hasTrailing || (suffix && suffixStyling)) ? trailingPad[size] : "pe-0",
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
        "relative inline-flex w-full items-center overflow-hidden text-gray-1000",
        shape,
        "bg-background-100 border border-gray-alpha-400",
        "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        "hover:border-gray-alpha-500",
        "has-focus-visible:border-gray-alpha-600 has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-[var(--focus-ring-color)] has-focus-visible:outline-offset-[var(--focus-ring-offset)]",
        "has-disabled:opacity-50 has-disabled:cursor-not-allowed",
        hasError &&
          "!border-[var(--error)] has-focus-visible:!border-[var(--error)] has-focus-visible:!outline-[var(--error)]",
        !label && !hasErrorMessage && className,
      )}
      data-slot="input-control"
    >
      {prefix &&
        (prefixStyling ? (
          <StyledAffix side="start" size={size}>{prefix}</StyledAffix>
        ) : (
          <UnstyledAffix side="start">{prefix}</UnstyledAffix>
        ))}
      {inputElement}
      {showClear && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Clear input"
          onClick={onClear}
          data-slot="input-clear"
          className={cn(
            "flex shrink-0 items-center justify-center size-6 me-1.5 rounded-full",
            "text-gray-800 hover:bg-gray-alpha-200 hover:text-gray-1000",
            "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
          )}
        >
          <XIcon className="size-3" />
        </button>
      )}
      {trailingSpinner && (
        <span className="flex shrink-0 items-center pe-3 text-gray-800" data-slot="input-loading">
          {trailingSpinner}
        </span>
      )}
      {suffix &&
        !trailingSpinner &&
        (suffixStyling ? (
          <StyledAffix side="end" size={size}>{suffix}</StyledAffix>
        ) : (
          <UnstyledAffix side="end">{suffix}</UnstyledAffix>
        ))}
    </span>
  );

  // Basic control-only path when no label and no error message
  if (!label && !hasErrorMessage) return control;

  // Fieldset-style path when label or error message is present
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)} data-slot="input-field">
      {label && (
        <label
          htmlFor={id}
          className="text-label-14 text-gray-1000"
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
          className="text-label-13 text-[var(--error)]"
          data-slot="input-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export { InputPrimitive };
