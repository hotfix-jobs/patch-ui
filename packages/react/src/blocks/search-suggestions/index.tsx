"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { MagnifyingGlass, X } from "@phosphor-icons/react/dist/ssr";
import { useId, useMemo, useRef, useState } from "react";
import type * as React from "react";
import { cn } from "../../utils";
import { itemGroupLabel, itemRow, selectionFocus } from "../../recipes";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/popover";
import { Spinner } from "../../components/spinner";
import {
  MOBILE_MEDIA_QUERY,
  useMediaQuery,
} from "../../hooks/use-media-query";

export interface SearchSuggestion {
  id: string;
  label: React.ReactNode;
  value: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
}

export interface SearchSuggestionSection {
  id: string;
  label?: React.ReactNode;
  suggestions: SearchSuggestion[];
}

export interface SearchSuggestionsField {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  icon?: React.ReactNode;
  sections: SearchSuggestionSection[];
  loading?: boolean;
  emptyContent?: React.ReactNode;
}

export interface SearchSuggestionsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onSubmit"> {
  fields: SearchSuggestionsField[];
  activeField?: string;
  defaultActiveField?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onActiveFieldChange?: (fieldId: string) => void;
  onFieldValueChange: (fieldId: string, value: string) => void;
  onSuggestionSelect: (
    fieldId: string,
    suggestion: SearchSuggestion,
  ) => void;
  onSubmit: (values: Record<string, string>) => void;
  submitLabel?: string;
}

/** Coordinated multi-field search with an anchored desktop panel and centered mobile panel. */
export function SearchSuggestions({
  fields,
  activeField: controlledActiveField,
  defaultActiveField,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  onActiveFieldChange,
  onFieldValueChange,
  onSuggestionSelect,
  onSubmit,
  submitLabel = "Search",
  className,
  ...props
}: SearchSuggestionsProps): React.ReactElement {
  const generatedId = useId();
  const anchorRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [uncontrolledActiveField, setUncontrolledActiveField] = useState(
    defaultActiveField ?? fields[0]?.id ?? "",
  );
  const [activeIndex, setActiveIndex] = useState(-1);

  const open = controlledOpen ?? uncontrolledOpen;
  const activeFieldId =
    controlledActiveField ?? uncontrolledActiveField ?? fields[0]?.id ?? "";
  const activeField =
    fields.find((field) => field.id === activeFieldId) ?? fields[0];
  const suggestions = useMemo(
    () => activeField?.sections.flatMap((section) => section.suggestions) ?? [],
    [activeField],
  );
  const listboxId = `${generatedId}-listbox`;
  const triggerId = `${generatedId}-trigger`;

  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
    if (!next) setActiveIndex(-1);
  };

  const activateField = (fieldId: string) => {
    if (controlledActiveField === undefined) setUncontrolledActiveField(fieldId);
    onActiveFieldChange?.(fieldId);
    setActiveIndex(-1);
    setOpen(true);
  };

  const selectSuggestion = (suggestion: SearchSuggestion) => {
    if (!activeField || suggestion.disabled) return;
    onSuggestionSelect(activeField.id, suggestion);
    setOpen(false);
  };

  const moveActive = (direction: 1 | -1) => {
    if (suggestions.length === 0) return;
    let next = activeIndex;
    for (let attempts = 0; attempts < suggestions.length; attempts += 1) {
      next = (next + direction + suggestions.length) % suggestions.length;
      if (!suggestions[next]?.disabled) {
        setActiveIndex(next);
        return;
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) setOpen(true);
      moveActive(event.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const suggestion = suggestions[activeIndex];
      if (suggestion) selectSuggestion(suggestion);
      else onSubmit(Object.fromEntries(fields.map((field) => [field.id, field.value])));
      return;
    }
    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
    }
  };

  if (!activeField) {
    return <div className={className} {...props} />;
  }

  return (
    <MotionConfig reducedMotion="user">
      <Popover
        open={open}
        triggerId={triggerId}
        onOpenChange={(next, details) => {
          if (details.reason === "trigger-press") return;
          const target = details.event.target;
          if (
            !next &&
            target instanceof Node &&
            anchorRef.current?.contains(target)
          ) {
            return;
          }
          setOpen(next);
        }}
      >
        <div
          ref={anchorRef}
          data-slot="search-suggestions"
          data-open={open || undefined}
          className={cn("relative w-full", className)}
          {...props}
        >
          <div className="relative flex flex-col gap-1 rounded-[var(--radius-12)] bg-fill-1 p-1 sm:flex-row sm:items-center">
            {fields.map((field) => {
              const active = field.id === activeField.id;
              return (
                <div
                  key={field.id}
                  data-slot="search-suggestions-field"
                  className="relative min-w-0 flex-1"
                >
                  {active && (
                    <motion.div
                      layoutId={`${generatedId}-active-field`}
                      className="absolute inset-0 rounded-[var(--radius-8)] bg-layer-1"
                      transition={{ type: "spring", stiffness: 500, damping: 42 }}
                    />
                  )}
                  <div className="relative block min-w-0">
                    <span className="sr-only">{field.label}</span>
                    <Input
                      variant="unstyled"
                      size="lg"
                      type="search"
                      value={field.value}
                      placeholder={field.placeholder}
                      prefix={field.icon}
                      aria-label={field.label}
                      aria-autocomplete="list"
                      aria-controls={listboxId}
                      aria-expanded={open && active}
                      aria-activedescendant={
                        active && activeIndex >= 0
                          ? `${generatedId}-option-${activeIndex}`
                          : undefined
                      }
                      onFocus={() => {
                        if (!isMobile) activateField(field.id);
                      }}
                      onClick={() => activateField(field.id)}
                      onChange={(event) => {
                        onFieldValueChange(field.id, event.target.value);
                        if (!active) activateField(field.id);
                        else if (!open) setOpen(true);
                      }}
                      onKeyDown={handleKeyDown}
                      suffix={
                        field.value ? (
                          <button
                            type="button"
                            aria-label={`Clear ${field.label}`}
                            className={cn(
                              "inline-flex size-6 items-center justify-center rounded-[var(--radius-8)] text-ink-muted hover:bg-layer-hover hover:text-ink active:bg-layer-hover",
                              selectionFocus,
                            )}
                            onClick={() => {
                              onFieldValueChange(field.id, "");
                              activateField(field.id);
                            }}
                          >
                            <X aria-hidden className="size-3.5" />
                          </button>
                        ) : undefined
                      }
                      className="relative"
                    />
                  </div>
                </div>
              );
            })}
            <PopoverTrigger
              id={triggerId}
              render={
                <Button
                  type="button"
                  size="lg"
                  className="shrink-0"
                  icon={<MagnifyingGlass aria-hidden />}
                  onClick={() =>
                    onSubmit(
                      Object.fromEntries(
                        fields.map((field) => [field.id, field.value]),
                      ),
                    )
                  }
                />
              }
            >
              {submitLabel}
            </PopoverTrigger>
          </div>
        </div>

        <PopoverContent
          anchor={anchorRef}
          align="start"
          sideOffset={8}
          initialFocus={isMobile}
          finalFocus={false}
          className="overflow-hidden p-0 md:w-[var(--anchor-width)] md:min-w-[420px]"
        >
          {isMobile && (
            <div className="p-1">
              <Input
                size="lg"
                type="search"
                value={activeField.value}
                placeholder={activeField.placeholder}
                prefix={activeField.icon}
                aria-label={activeField.label}
                aria-autocomplete="list"
                aria-controls={listboxId}
                aria-expanded
                aria-activedescendant={
                  activeIndex >= 0 ? `${generatedId}-option-${activeIndex}` : undefined
                }
                onChange={(event) =>
                  onFieldValueChange(activeField.id, event.target.value)
                }
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
          <SearchSuggestionsResults
            field={activeField}
            listboxId={listboxId}
            generatedId={generatedId}
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
            onSelect={selectSuggestion}
          />
        </PopoverContent>
      </Popover>
    </MotionConfig>
  );
}

function SearchSuggestionsResults({
  field,
  listboxId,
  generatedId,
  activeIndex,
  onActiveIndexChange,
  onSelect,
}: {
  field: SearchSuggestionsField;
  listboxId: string;
  generatedId: string;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onSelect: (suggestion: SearchSuggestion) => void;
}): React.ReactElement {
  let optionIndex = -1;
  const hasSuggestions = field.sections.some(
    (section) => section.suggestions.length > 0,
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={field.id}
        layout="size"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ type: "spring", stiffness: 600, damping: 48 }}
        className="min-h-0 overflow-y-auto p-1"
        style={{ maxHeight: "min(360px, 55dvh)" }}
      >
        {field.loading && !hasSuggestions ? (
          <div className="flex items-center justify-center gap-2 px-4 py-8 text-small text-ink-muted">
            <Spinner size="sm" />
            <span>Searching</span>
          </div>
        ) : hasSuggestions ? (
          <div id={listboxId} role="listbox" aria-label={field.label}>
            {field.sections.map((section) => (
              <div key={section.id} data-slot="search-suggestions-section">
                {section.label && (
                  <div className={cn(itemGroupLabel.base, itemGroupLabel.comfortable)}>
                    {section.label}
                  </div>
                )}
                {section.suggestions.map((suggestion) => {
                  optionIndex += 1;
                  const index = optionIndex;
                  const active = index === activeIndex;
                  return (
                    <button
                      key={suggestion.id}
                      id={`${generatedId}-option-${index}`}
                      type="button"
                      role="option"
                      aria-selected={active}
                      disabled={suggestion.disabled}
                      data-active={active || undefined}
                      className={cn(
                        itemRow.base,
                        itemRow.comfortable,
                        "w-full gap-3 text-start",
                      )}
                      onMouseEnter={() => onActiveIndexChange(index)}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => onSelect(suggestion)}
                    >
                      {suggestion.icon && (
                        <span className="shrink-0 text-ink-muted [&_svg]:size-4">
                          {suggestion.icon}
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-small text-ink">
                          {suggestion.label}
                        </span>
                        {suggestion.description && (
                          <span className="block truncate text-mini text-ink-muted">
                            {suggestion.description}
                          </span>
                        )}
                      </span>
                      {suggestion.suffix && (
                        <span className="shrink-0 text-mini text-ink-muted">
                          {suggestion.suffix}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-small text-ink-muted">
            {field.emptyContent ?? "No suggestions found."}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
