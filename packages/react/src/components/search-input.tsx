"use client";

import type * as React from "react";
import { useCallback } from "react";
import { Input, type InputProps } from "./input";

import { MagnifyingGlass, X } from "@phosphor-icons/react";
/** SearchInput: search field with prefix icon and trailing clear button. */
export type SearchInputProps = Omit<
  InputProps,
  "prefix" | "suffix" | "type"
> & {
  /** Hide the clear button even when a value is present. */
  hideClear?: boolean;
};

export function SearchInput({
  hideClear,
  onChange,
  value,
  placeholder = "Search",
  ...props
}: SearchInputProps): React.ReactElement {
  const hasValue =
    value != null && value !== "" && (typeof value !== "number" || !Number.isNaN(value));

  const handleClear = useCallback(() => {
    if (onChange) {
      // Synthesize an empty change event so both controlled and uncontrolled work.
      const evt = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as unknown as Parameters<NonNullable<typeof onChange>>[0];
      onChange(evt);
    }
  }, [onChange]);

  const showClear = hasValue && !hideClear;

  return (
    <Input
      type="search"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      prefix={<MagnifyingGlass />}
      suffix={
        showClear ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="inline-flex items-center justify-center rounded-[var(--radius-6)] text-ink-muted hover:text-ink outline-none focus-visible:text-ink transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]"
            data-slot="search-input-clear"
          >
            <X className="size-3.5" />
          </button>
        ) : undefined
      }
      {...props}
    />
  );
}
