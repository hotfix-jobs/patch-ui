"use client";

import type * as React from "react";
import { forwardRef } from "react";
import { cn } from "../utils";

import { CaretDown } from "@phosphor-icons/react/dist/ssr";
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
  sm: "h-6 text-body-13",
  md: "h-8 text-body-14",
  lg: "h-10 text-body-16",
};

const leadingPad: Record<SelectSize, string> = {
  sm: "ps-3",
  md: "ps-3",
  lg: "ps-3.5",
};

const chevronPadBySize: Record<SelectSize, string> = {
  sm: "pe-7",
  md: "pe-8",
  lg: "pe-9",
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
        "pointer-events-none inline-flex shrink-0 items-center text-ink-muted",
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
  const right = size === "sm" ? "right-2" : size === "lg" ? "right-3" : "right-2.5";
  return (
    <CaretDown
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-1/2 size-3.5 -translate-y-1/2 text-ink-muted",
        right,
      )}
    />
  );
}

/** Native `<select>` wrapped in styled chrome. For rich options with icons or search, use Combobox. */
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

  const { onChange: userOnChange, ...rest } = props;

  // OS picker often leaves the browser in :focus-visible after selection, sticking the focus border.
  // Blurring on change resets it; Tab-through order is unaffected.
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    userOnChange?.(e);
    if (!e.defaultPrevented) e.currentTarget.blur();
  };

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
      aria-describedby={hasErrorMessage ? errorId : rest["aria-describedby"]}
      onChange={handleChange}
      {...rest}
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
        "relative inline-flex w-full items-center overflow-hidden text-ink rounded-[var(--radius-6)]",
        "bg-surface-elevated border border-hairline",
        "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        "hover:border-hairline-strong",
        "has-focus-visible:border-primary",
        "has-disabled:opacity-50 has-disabled:cursor-not-allowed",
        hasError && "!border-error",
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
    <div className={cn("flex flex-col gap-2 w-full", className)} data-slot="select-field">
      {label && (
        <label
          htmlFor={id}
          className="text-button-14 text-ink"
          data-slot="select-label"
        >
          {label}
          {required && <span className="ms-0.5 text-error">*</span>}
        </label>
      )}
      {control}
      {hasErrorMessage && (
        <p
          id={errorId}
          role="alert"
          className="text-caption-12 text-error"
          data-slot="select-error"
        >
          {error}
        </p>
      )}
    </div>
  );
});
