"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import type * as React from "react";
import { cn } from "../utils";
import { Spinner } from "./spinner";

export type InputSize = "sm" | "md" | "lg";

export type InputProps = Omit<
  InputPrimitive.Props & React.RefAttributes<HTMLInputElement>,
  "size"
> & {
  size?: InputSize;
  icon?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /** Visual error state. Sets `aria-invalid` and switches border/focus to the error token. */
  invalid?: boolean;
  /** Disables the input and renders a spinner in the trailing slot. */
  loading?: boolean;
  /**
   * When provided AND the input has a non-empty value, renders a trailing
   * × clear button that calls this handler.
   */
  onClear?: () => void;
};

const heightBySize: Record<InputSize, string> = {
  sm: "h-8 text-label-12",
  md: "h-10 text-copy-14",
  lg: "h-12 text-copy-16",
};

export function Input({
  className,
  size = "md",
  icon,
  prefix,
  suffix,
  invalid,
  loading,
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

  const inputClassName = cn(
    "w-full min-w-0 border-none bg-transparent px-3.5 shadow-none outline-none ring-0",
    "placeholder:text-gray-700 focus:outline-none focus:ring-0",
    heightBySize[size],
    (icon || prefix) && "ps-0",
    (suffix || showClear || trailingSpinner) && "pe-0",
    props.type === "search" &&
      "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
  );

  return (
    <span
      className={cn(
        "relative inline-flex w-full items-center rounded-[var(--radius-6)]",
        "bg-background-100 border border-gray-alpha-400 text-gray-1000",
        "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        "hover:border-gray-alpha-500",
        "has-focus-visible:border-gray-alpha-600 has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-[var(--focus-ring-color)] has-focus-visible:outline-offset-[var(--focus-ring-offset)]",
        "has-disabled:opacity-50 has-disabled:cursor-not-allowed",
        invalid && "!border-[var(--error)] has-focus-visible:!border-[var(--error)] has-focus-visible:!outline-[var(--error)]",
        className,
      )}
      data-slot="input-control"
    >
      {icon && (
        <span className="flex shrink-0 items-center ps-3 pe-1.5 text-gray-800 [&_svg]:size-4">
          {icon}
        </span>
      )}
      {prefix && (
        <span className="flex shrink-0 items-center ps-3 text-gray-800 text-label-13">
          {prefix}
        </span>
      )}
      <InputPrimitive
        className={inputClassName}
        data-slot="input"
        disabled={isDisabled}
        value={value}
        aria-invalid={invalid || undefined}
        {...props}
      />
      {showClear && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Clear input"
          onClick={onClear}
          data-slot="input-clear"
          className={cn(
            "flex shrink-0 items-center justify-center size-6 me-1.5 rounded-[var(--radius-6)]",
            "text-gray-800 hover:bg-gray-200 hover:text-gray-1000",
            "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
          )}
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
        <span className="flex shrink-0 items-center pe-3 text-gray-800" data-slot="input-loading">
          {trailingSpinner}
        </span>
      )}
      {suffix && !trailingSpinner && (
        <span className="flex shrink-0 items-center pe-3 ps-2 my-2 border-l border-gray-alpha-400 text-gray-800 text-label-12">
          {suffix}
        </span>
      )}
    </span>
  );
}

export { InputPrimitive };
