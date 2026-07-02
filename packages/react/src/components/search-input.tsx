"use client";

import type * as React from "react";
import { useCallback } from "react";
import { Input, type InputProps } from "./input";
import { Kbd } from "./kbd";

/**
 * SearchInput — a scoped search field aligned with Geist. Renders a
 * magnifying-glass prefix, an Esc-hint suffix (when the value is non-empty),
 * and clears the input on Escape. Compose with `value`/`onChange` for
 * controlled use.
 */
export type SearchInputProps = Omit<InputProps, "prefix" | "prefixStyling" | "suffix" | "suffixStyling" | "type"> & {
  /** Hide the Esc hint chip when a value is present. Defaults to false. */
  hideEscHint?: boolean;
};

function SearchIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

export function SearchInput({
  hideEscHint,
  onKeyDown,
  onClear,
  onChange,
  value,
  placeholder = "Search",
  ...props
}: SearchInputProps): React.ReactElement {
  const hasValue =
    value != null && value !== "" && (typeof value !== "number" || !Number.isNaN(value));

  const handleClear = useCallback(() => {
    if (onClear) {
      onClear();
      return;
    }
    if (onChange) {
      // Synthesize an empty change event so uncontrolled+controlled both work.
      const evt = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as unknown as Parameters<NonNullable<typeof onChange>>[0];
      onChange(evt);
    }
  }, [onClear, onChange]);

  const handleKeyDown = useCallback(
    (e: Parameters<NonNullable<typeof onKeyDown>>[0]) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClear();
      }
      onKeyDown?.(e);
    },
    [handleClear, onKeyDown],
  );

  const showEscHint = hasValue && !hideEscHint;

  return (
    <Input
      type="search"
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      prefix={<SearchIcon />}
      prefixStyling={false}
      suffix={showEscHint ? <Kbd size="sm">Esc</Kbd> : undefined}
      suffixStyling={false}
      {...props}
    />
  );
}
