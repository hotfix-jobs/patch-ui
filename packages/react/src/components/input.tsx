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
    "rounded-[var(--radius-patch-sm)] border border-[var(--input-border)] bg-patch-surface " +
    "hover:border border-[var(--patch-border-hover)] " +
    "has-focus-visible:border border-[var(--patch-border-active)] " +
    "has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-[var(--patch-focus-ring)] has-focus-visible:outline-offset-[var(--patch-focus-ring-offset)]",
  ghost:
    "rounded-[var(--radius-patch-sm)] bg-transparent border-none " +
    "has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-[var(--patch-focus-ring)] has-focus-visible:outline-offset-[var(--patch-focus-ring-offset)]",
  underline:
    "rounded-none bg-transparent border-b border-[var(--input-border)] " +
    "hover:border-b border-[var(--patch-border-hover)] " +
    "has-focus-visible:border-b border-[var(--patch-border-active)]",
};

const INVALID_BY_VARIANT: Record<InputVariant, string> = {
  outlined:
    "!border-[var(--patch-error)] has-focus-visible:!border-[var(--patch-error)] has-focus-visible:!outline-[var(--patch-error)]",
  ghost:
    "has-focus-visible:!outline-[var(--patch-error)]",
  underline:
    "!border-b border-[var(--patch-error)] has-focus-visible:!border-b border-[var(--patch-error)]",
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
    "h-10 w-full min-w-0 rounded-[inherit] border-none bg-transparent px-3.5 text-[length:var(--text-patch-control)] tracking-[-0.005em] shadow-none outline-none ring-0 placeholder:text-[var(--input-placeholder)] focus:outline-none focus:ring-0",
    icon && "ps-0",
    prefix && "ps-0",
    (suffix || showClear || trailingSpinner) && "pe-0",
    size === "sm" && "h-8 text-[length:var(--text-patch-mini)]",
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
            "text-[length:var(--text-patch-control)] text-patch-text",
            "transition-[color,background-color,box-shadow,outline-color] duration-[var(--duration-patch-normal)] ease-[var(--ease-patch-out)]",
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
        <span className="flex shrink-0 items-center ps-3 pe-1.5 text-patch-text-tertiary [&_svg]:size-4">
          {icon}
        </span>
      )}
      {prefix && (
        <span className="flex shrink-0 items-center ps-3 text-patch-text-tertiary text-sm">
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
            "size-6 me-1.5 rounded-[var(--radius-patch-xs)]",
            "text-patch-text-tertiary",
            "transition-colors duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)]",
            "hover:bg-patch-surface-hover hover:text-patch-text",
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
          className="flex shrink-0 items-center pe-3 text-patch-text-tertiary"
          data-slot="input-loading"
        >
          {trailingSpinner}
        </span>
      )}
      {suffix && !trailingSpinner && (
        <span className="flex shrink-0 items-center pe-3 ps-2 ml-2 my-2 text-patch-text-tertiary text-[length:var(--text-patch-micro)] tracking-[-0.01em] border-l border-[var(--input-border)]">
          {suffix}
        </span>
      )}
    </span>
  );
}

export { InputPrimitive };
