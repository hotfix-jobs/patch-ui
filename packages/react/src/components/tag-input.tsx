"use client";

import { forwardRef, useCallback, useRef, useState } from "react";
import type * as React from "react";
import { Badge } from "./badge";
import { cn } from "../utils";
import { focusRing } from "../recipes";

export interface TagInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange"
  > {
  /** Controlled tag list. */
  value?: string[];
  /** Initial tags when uncontrolled. */
  defaultValue?: string[];
  /** Called whenever the tag list changes. */
  onValueChange?: (tags: string[]) => void;
  /**
   * Characters that commit the current input as a tag (in addition to
   * Enter / Tab). Default `[","]` — typing a comma adds the tag.
   */
  commitOn?: string[];
  /** Maximum number of tags allowed. */
  max?: number;
  /**
   * When true, deduplicates tags (case-insensitive). Default true.
   */
  dedupe?: boolean;
  /** Transform a raw input string into the final tag value. Defaults to trim. */
  transform?: (raw: string) => string;
  /**
   * Validate a candidate tag before committing. Return `false` (or a
   * rejection reason) to refuse the tag. Default accepts non-empty.
   */
  validate?: (tag: string, currentTags: string[]) => boolean | string;
  /** Disable interaction. */
  disabled?: boolean;
  /** Read-only — tags render but can't be added or removed. */
  readOnly?: boolean;
  /**
   * Visual variant for the wrapper. Mirrors `Input` variant for visual
   * parity in forms.
   */
  variant?: "outlined" | "ghost" | "underline";
  /** Visual error state. */
  invalid?: boolean;
  /** Wrapper className. */
  className?: string;
  /** Native input className override. */
  inputClassName?: string;
  /** Override Badge variant per tag. */
  tagVariant?: React.ComponentProps<typeof Badge>["variant"];
}

const WRAPPER_VARIANT = {
  outlined:
    "rounded-[var(--radius-6)] border border-[var(--input-border)] bg-background-100 " +
    "hover:border border-[var(--gray-alpha-500)] " +
    "focus-within:border border-[var(--gray-alpha-600)] " +
    "focus-within:outline focus-within:outline-1 focus-within:outline-[var(--focus-ring-color)] focus-within:outline-offset-[var(--focus-ring-offset)]",
  ghost:
    "rounded-[var(--radius-6)] bg-transparent border-none " +
    "focus-within:outline focus-within:outline-1 focus-within:outline-[var(--focus-ring-color)] focus-within:outline-offset-[var(--focus-ring-offset)]",
  underline:
    "rounded-none bg-transparent border-b border-[var(--input-border)] " +
    "hover:border-b border-[var(--gray-alpha-500)] " +
    "focus-within:border-b border-[var(--gray-alpha-600)]",
} as const;

const INVALID_BY_VARIANT = {
  outlined:
    "!border-[var(--error)] focus-within:!border-[var(--error)] focus-within:!outline-[var(--error)]",
  ghost: "focus-within:!outline-[var(--error)]",
  underline:
    "!border-b border-[var(--error)] focus-within:!border-b border-[var(--error)]",
} as const;

const DEFAULT_TRANSFORM = (raw: string) => raw.trim();
const DEFAULT_VALIDATE = (tag: string) => tag.length > 0;

/**
 * TagInput — multi-select via free-text entry. Tags appear inside the
 * input as removable Badges. Enter, Tab, and any `commitOn` character
 * (default comma) commits the current text as a tag. Backspace on an
 * empty input removes the trailing tag.
 *
 * Use for filters, labels, recipients, "tags" or "categories" pickers
 * where the values are open-ended. For closed sets, prefer `Combobox`
 * or a multi-select Menu.
 */
export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  function TagInput(
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      commitOn = [","],
      max,
      dedupe = true,
      transform = DEFAULT_TRANSFORM,
      validate = DEFAULT_VALIDATE,
      disabled,
      readOnly,
      variant = "outlined",
      invalid,
      className,
      inputClassName,
      tagVariant = "default",
      placeholder,
      onKeyDown,
      ...inputProps
    },
    forwardedRef,
  ) {
    const [uncontrolled, setUncontrolled] = useState<string[]>(
      defaultValue ?? [],
    );
    const tags = controlledValue ?? uncontrolled;
    const setTags = useCallback(
      (next: string[]) => {
        if (controlledValue === undefined) setUncontrolled(next);
        onValueChange?.(next);
      },
      [controlledValue, onValueChange],
    );

    const [draft, setDraft] = useState("");
    const innerRef = useRef<HTMLInputElement | null>(null);
    const setRef = (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    };

    const commit = useCallback(
      (raw: string) => {
        const candidate = transform(raw);
        const v = validate(candidate, tags);
        if (v !== true) return;
        if (max != null && tags.length >= max) return;
        if (dedupe) {
          const lower = candidate.toLowerCase();
          if (tags.some((t) => t.toLowerCase() === lower)) {
            setDraft("");
            return;
          }
        }
        setTags([...tags, candidate]);
        setDraft("");
      },
      [transform, validate, tags, max, dedupe, setTags],
    );

    const removeAt = useCallback(
      (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
      },
      [tags, setTags],
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;
      if (readOnly || disabled) return;

      // Enter / Tab commits the current draft.
      if ((e.key === "Enter" || e.key === "Tab") && draft.trim()) {
        e.preventDefault();
        commit(draft);
        return;
      }
      // Backspace on empty input removes the trailing tag.
      if (e.key === "Backspace" && !draft && tags.length > 0) {
        e.preventDefault();
        removeAt(tags.length - 1);
        return;
      }
      // commitOn characters (e.g. comma) commit and swallow the keystroke.
      if (commitOn.includes(e.key) && draft.trim()) {
        e.preventDefault();
        commit(draft);
      }
    };

    return (
      <div
        data-slot="tag-input"
        data-variant={variant}
        data-invalid={invalid || undefined}
        onClick={() => innerRef.current?.focus()}
        className={cn(
          "relative flex w-full flex-wrap items-center gap-1.5 px-2.5 py-1.5 text-label-13 text-gray-1000",
          "transition-[color,background-color,box-shadow,outline-color] duration-[var(--duration-state)] ease-[var(--ease-standard)]",
          "has-disabled:opacity-50 cursor-text",
          WRAPPER_VARIANT[variant],
          invalid && INVALID_BY_VARIANT[variant],
          className,
        )}
      >
        {tags.map((tag, i) => (
          <Badge
            key={`${tag}-${i}`}
            variant={tagVariant}
            size="sm"
            onRemove={readOnly || disabled ? undefined : () => removeAt(i)}
            removeLabel={`Remove ${tag}`}
          >
            {tag}
          </Badge>
        ))}
        <input
          ref={setRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={tags.length === 0 ? placeholder : undefined}
          aria-invalid={invalid || undefined}
          className={cn(
            "min-w-[60px] flex-1 bg-transparent py-0.5 outline-none placeholder:text-[var(--input-placeholder)]",
            focusRing,
            inputClassName,
          )}
          {...inputProps}
        />
      </div>
    );
  },
);
