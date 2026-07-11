"use client";

import { CaretDown, Check } from "@phosphor-icons/react/dist/ssr";
import { useId, useMemo, useRef, useState } from "react";
import type * as React from "react";
import { cn } from "../../utils";
import { iconMuted, itemGroupLabel, itemRow } from "../../recipes";
import { Button, type ButtonProps } from "../../components/button";
import { Input } from "../../components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/popover";
import { Scroller } from "../../components/scroller";
import { Spinner } from "../../components/spinner";

export type FilterToolbarOverflow = "scroll" | "wrap";
export type FilterToolbarCountVisibility = "always" | "responsive";

export interface FilterToolbarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: React.ReactNode;
  /** Horizontal rail by default; wrap is useful on spacious directory pages. */
  overflow?: FilterToolbarOverflow;
  /** Number of active filters. Controls visibility of the clear action. */
  activeCount?: number;
  onClearAll?: () => void;
  clearLabel?: string;
  /** Preformatted result count or other quiet metadata. */
  count?: React.ReactNode;
  /** Responsive hides count below the sm breakpoint. */
  countVisibility?: FilterToolbarCountVisibility;
  /** Pinned controls such as sorting or view selection. */
  trailing?: React.ReactNode;
  ariaLabel?: string;
  filtersClassName?: string;
  trailingClassName?: string;
}

/** Responsive filter rail with clear, count, and pinned trailing actions. */
export function FilterToolbar({
  children,
  overflow = "scroll",
  activeCount = 0,
  onClearAll,
  clearLabel = "Clear all",
  count,
  countVisibility = "responsive",
  trailing,
  ariaLabel = "Filters",
  className,
  filtersClassName,
  trailingClassName,
  ...props
}: FilterToolbarProps): React.ReactElement {
  const clearAction =
    activeCount > 0 && onClearAll ? (
      <div className="shrink-0">
        <Button
          variant="tertiary"
          size="md"
          className="text-ink-muted"
          onClick={onClearAll}
        >
          {clearLabel}
        </Button>
      </div>
    ) : null;

  return (
    <div
      data-slot="filter-toolbar"
      data-overflow={overflow}
      className={cn(
        "flex w-full min-w-0 items-center gap-2",
        className,
      )}
      {...props}
    >
      <div
        data-slot="filter-toolbar-filters"
        className="min-w-0 flex-1"
      >
        {overflow === "scroll" ? (
          <Scroller
            overflow="x"
            ariaLabel={ariaLabel}
            childrenContainerClassName={cn(
              "items-center gap-1 pe-1 [&>*]:shrink-0",
              filtersClassName,
            )}
          >
            {children}
            {clearAction}
          </Scroller>
        ) : (
          <div
            role="group"
            aria-label={ariaLabel}
            className={cn(
              "flex flex-wrap items-center gap-1",
              filtersClassName,
            )}
          >
            {children}
            {clearAction}
          </div>
        )}
      </div>

      {(count != null || trailing != null) && (
        <div
          data-slot="filter-toolbar-trailing"
          className={cn(
            "flex shrink-0 items-center gap-2 sm:gap-3",
            trailingClassName,
          )}
        >
          {count != null && (
            <span
              aria-live="polite"
              aria-atomic="true"
              className={cn(
                "whitespace-nowrap text-mini font-medium tabular-nums text-ink-muted",
                countVisibility === "responsive" && "hidden sm:inline",
              )}
            >
              {count}
            </span>
          )}
          {trailing}
        </div>
      )}
    </div>
  );
}

export interface FilterToolbarTriggerProps
  extends Omit<
    ButtonProps,
    "children" | "icon" | "variant" | "size" | "value"
  > {
  label: string;
  value?: React.ReactNode;
  active?: boolean;
  icon?: React.ReactNode;
}

/** Standard filter trigger with a persistent category label and active summary. */
export function FilterToolbarTrigger({
  label,
  value,
  active: activeProp,
  icon,
  className,
  ...props
}: FilterToolbarTriggerProps): React.ReactElement {
  const active = activeProp ?? value != null;

  return (
    <Button
      variant="secondary"
      size="md"
      icon={icon}
      data-active={active || undefined}
      className={cn(
        "group",
        active &&
          "bg-fill-2 hover:bg-fill-2 focus-visible:bg-fill-2 data-[popup-open]:bg-fill-2",
        className,
      )}
      {...props}
    >
      <span className="whitespace-nowrap">
        {label}
        {active && value != null && (
          <>
            <span className="text-ink-muted">: </span>
            {value}
          </>
        )}
      </span>
      <CaretDown
        aria-hidden
        className="size-3.5 transition-transform duration-[var(--duration-state)] ease-[var(--ease-standard)] group-data-[popup-open]:rotate-180"
      />
    </Button>
  );
}

export interface FilterToolbarPickerOption {
  id: string;
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
}

export interface FilterToolbarPickerSection {
  id: string;
  label?: React.ReactNode;
  options: FilterToolbarPickerOption[];
}

export interface FilterToolbarPickerProps {
  label: string;
  icon?: React.ReactNode;
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  query: string;
  onQueryChange: (query: string) => void;
  sections: FilterToolbarPickerSection[];
  placeholder?: string;
  summary?: React.ReactNode;
  loading?: boolean;
  emptyContent?: React.ReactNode;
  clearLabel?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  contentClassName?: string;
}

/** Searchable multi-select filter contained inside a toolbar Popover. */
export function FilterToolbarPicker({
  label,
  icon,
  selected,
  onSelectionChange,
  query,
  onQueryChange,
  sections,
  placeholder = `Search ${label.toLowerCase()}`,
  summary,
  loading = false,
  emptyContent = "No matches found.",
  clearLabel = `Clear ${label.toLowerCase()}`,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  contentClassName,
}: FilterToolbarPickerProps): React.ReactElement {
  const generatedId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState(-1);
  const activeIndexRef = useRef(-1);
  const open = controlledOpen ?? uncontrolledOpen;
  const options = useMemo(
    () => sections.flatMap((section) => section.options),
    [sections],
  );
  const sectionOffsets = useMemo(
    () =>
      sections.map((_, sectionIndex) =>
        sections
          .slice(0, sectionIndex)
          .reduce(
            (total, section) => total + section.options.length,
            0,
          ),
      ),
    [sections],
  );
  const listboxId = `${generatedId}-listbox`;

  const updateActiveIndex = (index: number) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  const resolvedSummary =
    summary ??
    (selected.length === 1
      ? options.find((option) => option.value === selected[0])?.label
      : selected.length > 1
        ? String(selected.length)
        : undefined);

  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
    if (!next) {
      updateActiveIndex(-1);
      onQueryChange("");
    }
  };

  const toggleOption = (option: FilterToolbarPickerOption) => {
    if (option.disabled) return;
    const next = selected.includes(option.value)
      ? selected.filter((value) => value !== option.value)
      : [...selected, option.value];
    onSelectionChange(next);
  };

  const moveActive = (direction: 1 | -1) => {
    if (options.length === 0) return;
    let next = activeIndexRef.current;
    for (let attempts = 0; attempts < options.length; attempts += 1) {
      next = (next + direction + options.length) % options.length;
      if (!options[next]?.disabled) {
        updateActiveIndex(next);
        return;
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(event.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (event.key === "Enter" && activeIndexRef.current >= 0) {
      event.preventDefault();
      const option = options[activeIndexRef.current];
      if (option) toggleOption(option);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  const hasOptions = options.length > 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <FilterToolbarTrigger
            label={label}
            value={resolvedSummary}
            active={selected.length > 0}
            icon={icon}
            className={className}
          />
        }
      />
      <PopoverContent
        align="start"
        sideOffset={8}
        initialFocus
        className={cn("overflow-hidden p-0 md:w-80", contentClassName)}
      >
        <div className="p-1">
          <Input
            size="lg"
            type="search"
            value={query}
            onChange={(event) => {
              onQueryChange(event.target.value);
              updateActiveIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label={placeholder}
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-expanded
            aria-activedescendant={
              activeIndex >= 0
                ? `${generatedId}-option-${activeIndex}`
                : undefined
            }
            suffix={loading ? <Spinner size="sm" /> : undefined}
          />
        </div>

        <div className="max-h-[min(360px,55dvh)] overflow-y-auto p-1">
          {hasOptions ? (
            <div id={listboxId} role="listbox" aria-label={label} aria-multiselectable="true">
              {sections.map((section, sectionIndex) => (
                <div key={section.id} data-slot="filter-toolbar-picker-section">
                  {section.label && (
                    <div
                      className={cn(
                        itemGroupLabel.base,
                        itemGroupLabel.comfortable,
                      )}
                    >
                      {section.label}
                    </div>
                  )}
                  {section.options.map((option, optionIndex) => {
                    const index = sectionOffsets[sectionIndex] + optionIndex;
                    const active = index === activeIndex;
                    const checked = selected.includes(option.value);
                    return (
                      <button
                        key={option.id}
                        id={`${generatedId}-option-${index}`}
                        type="button"
                        role="option"
                        aria-selected={checked}
                        disabled={option.disabled}
                        data-active={active || undefined}
                        data-selected={checked || undefined}
                        className={cn(
                          itemRow.base,
                          itemRow.comfortable,
                          iconMuted,
                          "w-full gap-3 text-start",
                        )}
                        onMouseEnter={() => updateActiveIndex(index)}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => toggleOption(option)}
                      >
                        {option.icon && (
                          <span className="shrink-0 text-ink-muted [&_svg]:size-4">
                            {option.icon}
                          </span>
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-small text-ink">
                            {option.label}
                          </span>
                          {option.description && (
                            <span className="block truncate text-mini text-ink-muted">
                              {option.description}
                            </span>
                          )}
                        </span>
                        {option.suffix && !checked && (
                          <span className="shrink-0 text-mini text-ink-muted">
                            {option.suffix}
                          </span>
                        )}
                        {checked && (
                          <Check aria-hidden className="size-4 shrink-0 text-ink-muted" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-small text-ink-muted">
              {loading ? "Searching" : emptyContent}
            </div>
          )}
        </div>

        {selected.length > 0 && (
          <div className="flex justify-end px-2 pb-2 pt-1">
            <Button
              variant="tertiary"
              size="sm"
              className="text-ink-muted"
              onClick={() => onSelectionChange([])}
            >
              {clearLabel}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
