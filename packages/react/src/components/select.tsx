"use client";

import type * as React from "react";
import { forwardRef } from "react";
import { cn } from "../utils";

export type SelectSize = "sm" | "md" | "lg";

export type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size" | "prefix"
> & {
  size?: SelectSize;
  /** Content rendered at the start (icon, unit symbol). */
  prefix?: React.ReactNode;
  /** Content rendered at the end (before the chevron). */
  suffix?: React.ReactNode;
  /** Renders a `<label>` above the select. */
  label?: string;
  /** `id` required when passing a string `label`. */
  id?: string;
  /** Visual error state or inline error message. */
  error?: boolean | string;
  /**
   * Placeholder text shown as a disabled first option when no value / defaultValue is set.
   * Uses native `<option value="">` semantics.
   */
  placeholder?: string;
};

const heightBySize: Record<SelectSize, string> = {
  sm: "h-8 text-label-12",
  md: "h-10 text-copy-14",
  lg: "h-12 text-copy-16",
};

const leadingPad: Record<SelectSize, string> = {
  sm: "ps-3",
  md: "ps-3.5",
  lg: "ps-4",
};

const chevronPadBySize: Record<SelectSize, string> = {
  sm: "pe-8",
  md: "pe-9",
  lg: "pe-10",
};

function Affix({
  side,
  children,
}: {
  side: "start" | "end";
  children: React.ReactNode;
}) {
  const pad = side === "start" ? "ps-3 pe-1.5" : "ps-1.5 pe-1.5";
  return (
    <span
      className={cn(
        "pointer-events-none inline-flex shrink-0 items-center text-gray-800",
        pad,
        "[&_svg]:size-4",
      )}
      data-slot={`select-${side === "start" ? "prefix" : "suffix"}`}
    >
      {children}
    </span>
  );
}

function ChevronIndicator({ size }: { size: SelectSize }) {
  const right = size === "sm" ? "right-2.5" : size === "lg" ? "right-3.5" : "right-3";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-gray-800",
        right,
      )}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/**
 * Select — a native `<select>` wrapped in styled chrome.
 *
 * Uses the OS-native dropdown UI, which behaves correctly on every
 * platform (especially mobile where the native picker is far better
 * than any custom popup). For rich options with icons, descriptions,
 * or search, reach for `Combobox` instead.
 *
 * Children are native `<option>` and `<optgroup>` elements.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    className,
    size = "md",
    prefix,
    suffix,
    label,
    id,
    error,
    placeholder,
    disabled,
    required,
    children,
    value,
    defaultValue,
    ...props
  },
  ref,
) {
  const hasErrorMessage = typeof error === "string" && error.length > 0;
  const hasError = Boolean(error);
  const errorId = id ? `${id}-error` : undefined;

  const isControlled = value !== undefined;
  const resolvedDefault = isControlled
    ? undefined
    : defaultValue !== undefined
      ? defaultValue
      : placeholder
        ? ""
        : undefined;

  const selectElement = (
    <select
      ref={ref}
      id={id}
      className={cn(
        "w-full min-w-0 appearance-none bg-transparent border-none shadow-none outline-none ring-0",
        "focus:outline-none focus:ring-0",
        heightBySize[size],
        prefix ? "ps-0" : leadingPad[size],
        chevronPadBySize[size],
      )}
      data-slot="select"
      disabled={disabled}
      required={required}
      {...(isControlled ? { value } : { defaultValue: resolvedDefault })}
      aria-invalid={hasError || undefined}
      aria-describedby={hasErrorMessage ? errorId : props["aria-describedby"]}
      {...props}
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {children}
    </select>
  );

  const control = (
    <span
      className={cn(
        "relative inline-flex w-full items-center overflow-hidden text-gray-1000 rounded-[var(--radius-6)]",
        "bg-background-100 border border-gray-alpha-400",
        "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        "hover:border-gray-alpha-500",
        "has-focus-visible:border-gray-alpha-600 has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-[var(--focus-ring-color)] has-focus-visible:outline-offset-[var(--focus-ring-offset)]",
        "has-disabled:opacity-50 has-disabled:cursor-not-allowed",
        hasError &&
          "!border-[var(--error)] has-focus-visible:!border-[var(--error)] has-focus-visible:!outline-[var(--error)]",
        !label && !hasErrorMessage && className,
      )}
      data-slot="select-control"
    >
      {prefix && <Affix side="start">{prefix}</Affix>}
      {selectElement}
      {suffix && <Affix side="end">{suffix}</Affix>}
      <ChevronIndicator size={size} />
    </span>
  );

  if (!label && !hasErrorMessage) return control;

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)} data-slot="select-field">
      {label && (
        <label
          htmlFor={id}
          className="text-label-14 text-gray-1000"
          data-slot="select-label"
        >
          {label}
          {required && <span className="ms-0.5 text-[var(--error)]">*</span>}
        </label>
      )}
      {control}
      {hasErrorMessage && (
        <p
          id={errorId}
          role="alert"
          className="text-label-13 text-[var(--error)]"
          data-slot="select-error"
        >
          {error}
        </p>
      )}
    </div>
  );
});
