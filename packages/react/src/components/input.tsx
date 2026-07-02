"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import type * as React from "react";
import { cn } from "../utils";
import { Spinner } from "./spinner";

type InputVariant = "outlined" | "ghost" | "underline";

export type InputProps = Omit<
  InputPrimitive.Props & React.RefAttributes<HTMLInputElement>,
  "size"
> & {
  size?: "sm" | "md" | "lg" | number;
  variant?: InputVariant;
  icon?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /** Visual error state. Sets `aria-invalid` and switches border/focus to error tokens. */
  invalid?: boolean;
  /** Disables the input and renders a spinner in the trailing slot. */
  loading?: boolean;
  /**
   * When provided AND the input has a non-empty value, renders a trailing
   * × clear button that calls this handler. Use for search inputs, filter
   * fields, tag entry — anywhere "wipe my input" is a common action.
   */
  onClear?: () => void;
  unstyled?: boolean;
  nativeInput?: boolean;
};

const WRAPPER_VARIANT: Record<InputVariant, string> = {
  outlined:
    "rounded-[var(--radius-6)] border border-[var(--input-border)] bg-background-100 " +
    "hover:border border-[var(--gray-alpha-500)] " +
    "has-focus-visible:border border-[var(--gray-alpha-600)] " +
    "has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-[var(--focus-ring-color)] has-focus-visible:outline-offset-[var(--focus-ring-offset)]",
  ghost:
    "rounded-[var(--radius-6)] bg-transparent border-none " +
    "has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-[var(--focus-ring-color)] has-focus-visible:outline-offset-[var(--focus-ring-offset)]",
  underline:
    "rounded-none bg-transparent border-b border-[var(--input-border)] " +
    "hover:border-b border-[var(--gray-alpha-500)] " +
    "has-focus-visible:border-b border-[var(--gray-alpha-600)]",
};

const INVALID_BY_VARIANT: Record<InputVariant, string> = {
  outlined:
    "!border-[var(--error)] has-focus-visible:!border-[var(--error)] has-focus-visible:!outline-[var(--error)]",
  ghost:
    "has-focus-visible:!outline-[var(--error)]",
  underline:
    "!border-b border-[var(--error)] has-focus-visible:!border-b border-[var(--error)]",
};

export function Input({
  className,
  size = "md",
  variant = "outlined",
  icon,
  prefix,
  suffix,
  invalid,
  loading,
  onClear,
  unstyled = false,
  nativeInput = false,
  disabled,
  value,
  ...props
}: InputProps): React.ReactElement {
  const isDisabled = disabled || loading;
  const hasValue =
    value != null && value !== "" && (typeof value !== "number" || !Number.isNaN(value));
  const showClear = onClear != null && hasValue && !isDisabled;
  const trailingSpinner = loading ? <Spinner size="sm" /> : null;

  const inputClassName = cn(
    "h-10 w-full min-w-0 rounded-[inherit] border-none bg-transparent px-3.5 text-label-13 tracking-[-0.005em] shadow-none outline-none ring-0 placeholder:text-[var(--input-placeholder)] focus:outline-none focus:ring-0",
    icon && "ps-0",
    prefix && "ps-0",
    (suffix || showClear || trailingSpinner) && "pe-0",
    size === "sm" && "h-8 text-label-12",
    size === "lg" && "h-11",
    props.type === "search" &&
      "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
  );

  const inputEl = nativeInput ? (
    <input
      className={inputClassName}
      data-slot="input"
      size={typeof size === "number" ? size : undefined}
      disabled={isDisabled}
      value={value}
      aria-invalid={invalid || undefined}
      {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
    />
  ) : (
    <InputPrimitive
      className={inputClassName}
      data-slot="input"
      size={typeof size === "number" ? size : undefined}
      disabled={isDisabled}
      value={value}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );

  return (
    <span
      className={
        cn(
          !unstyled && [
            "relative inline-flex w-full items-center",
            "text-label-13 text-gray-1000",
            "transition-[color,background-color,box-shadow,outline-color] duration-[var(--duration-state)] ease-[var(--ease-standard)]",
            "has-disabled:opacity-50",
            WRAPPER_VARIANT[variant],
            invalid && INVALID_BY_VARIANT[variant],
          ],
          className,
        ) || undefined
      }
      data-size={size}
      data-variant={variant}
      data-invalid={invalid || undefined}
      data-loading={loading || undefined}
      data-slot="input-control"
    >
      {icon && (
        <span className="flex shrink-0 items-center ps-3 pe-1.5 text-gray-800 [&_svg]:size-4">
          {icon}
        </span>
      )}
      {prefix && (
        <span className="flex shrink-0 items-center ps-3 text-gray-800 text-sm">
          {prefix}
        </span>
      )}
      {inputEl}
      {showClear && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Clear input"
          onClick={onClear}
          className={cn(
            "flex shrink-0 items-center justify-center",
            "size-6 me-1.5 rounded-[var(--radius-6)]",
            "text-gray-800",
            "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
            "hover:bg-gray-200 hover:text-gray-1000",
          )}
          data-slot="input-clear"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
      {trailingSpinner && (
        <span
          className="flex shrink-0 items-center pe-3 text-gray-800"
          data-slot="input-loading"
        >
          {trailingSpinner}
        </span>
      )}
      {suffix && !trailingSpinner && (
        <span className="flex shrink-0 items-center pe-3 ps-2 ml-2 my-2 text-gray-800 text-label-12 tracking-[-0.01em] border-l border-[var(--input-border)]">
          {suffix}
        </span>
      )}
    </span>
  );
}

export { InputPrimitive };
