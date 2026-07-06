"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { CaretDown, MagnifyingGlass, X } from "@phosphor-icons/react/dist/ssr";
import { createContext, forwardRef, useContext, useMemo } from "react";
import type * as React from "react";
import { cn } from "../utils";
import {
  iconMuted,
  itemGroupLabel,
  itemRow,
  popupDivider,
  popupSurface,
} from "../recipes";
import type { InputSize } from "./input";
import { Checkbox } from "./checkbox";
import {
  MOBILE_MEDIA_QUERY,
  useMediaQuery,
} from "../hooks/use-media-query";

/* --------------------------------- Root -------------------------------- */

export interface ComboboxProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Search text. */
  value?: string;
  onValueChange?: (next: string) => void;
  placeholder?: string;
  children: React.ReactNode;
}

const ComboboxSharedContext = createContext<{ placeholder?: string }>({});

export function Combobox({
  open,
  defaultOpen,
  onOpenChange,
  value,
  onValueChange,
  placeholder,
  children,
}: ComboboxProps): React.ReactElement {
  const shared = useMemo(() => ({ placeholder }), [placeholder]);
  return (
    <ComboboxSharedContext.Provider value={shared}>
      <ComboboxPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={
          onOpenChange ? (next) => onOpenChange(next) : undefined
        }
        inputValue={value}
        onInputValueChange={
          onValueChange ? (next) => onValueChange(next) : undefined
        }
      >
        {children}
      </ComboboxPrimitive.Root>
    </ComboboxSharedContext.Provider>
  );
}

/* -------------------------------- Input -------------------------------- */

function ChevronIndicator(): React.ReactElement {
  return (
    <ComboboxPrimitive.Icon
      render={
        <CaretDown
          aria-hidden
          className="size-4 shrink-0 text-ink-muted transition-transform duration-[var(--duration-state)] ease-[var(--ease-standard)]"
        />
      }
    />
  );
}

export interface ComboboxInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  size?: InputSize;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /** Hide the trailing chevron. */
  hideChevron?: boolean;
  /** Show a trailing X to clear the input. */
  clearable?: boolean;
  onClear?: () => void;
  /** Renders a full-radius (pill-shaped) input. */
  rounded?: boolean;
  /** Visual error state. */
  error?: boolean;
}

const heightBySize: Record<InputSize, string> = {
  sm: "h-6 text-body-13",
  md: "h-8 text-body-14",
  lg: "h-10 text-body-16",
};

const startPadBySize: Record<InputSize, string> = {
  sm: "ps-3",
  md: "ps-3",
  lg: "ps-3.5",
};

const endPadBySize: Record<InputSize, string> = {
  sm: "pe-3",
  md: "pe-3",
  lg: "pe-3.5",
};

function ComboboxAffix({
  side,
  children,
}: {
  side: "start" | "end";
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center text-ink-muted",
        side === "start" ? "ps-3 pe-1.5" : "ps-1.5 pe-3",
        "[&_svg]:size-4",
      )}
      data-slot={`combobox-input-${side === "start" ? "prefix" : "suffix"}`}
    >
      {children}
    </span>
  );
}

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
  function ComboboxInput(
    {
      size = "md",
      prefix,
      suffix,
      hideChevron,
      clearable,
      onClear,
      rounded,
      error,
      disabled,
      className,
      ...props
    },
    forwardedRef,
  ) {
    const shape = rounded ? "rounded-full" : "rounded-[var(--radius-6)]";
    const trailing = (clearable || !hideChevron || suffix) ? (
      <ComboboxAffix side="end">
        <span className="inline-flex items-center gap-1.5">
          {suffix}
          {clearable && (
            <ComboboxPrimitive.Clear
              aria-label="Clear"
              onClick={onClear}
              className="inline-flex size-5 items-center justify-center rounded-full text-ink-muted hover:bg-surface-2 hover:text-ink transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] data-[empty]:hidden"
            >
              <X className="size-3" />
            </ComboboxPrimitive.Clear>
          )}
          {!hideChevron && <ChevronIndicator />}
        </span>
      </ComboboxAffix>
    ) : null;

    return (
      <ComboboxPrimitive.InputGroup
        data-slot="combobox-input-group"
        className={cn(
          "relative inline-flex w-full items-center overflow-hidden text-ink",
          shape,
          "bg-surface-elevated border border-hairline",
          "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
          "hover:border-hairline-strong",
          "has-focus-visible:border-primary",
          "has-disabled:opacity-50 has-disabled:cursor-not-allowed",
          error && "!border-error",
          className,
        )}
      >
        {prefix && <ComboboxAffix side="start">{prefix}</ComboboxAffix>}
        <ComboboxPrimitive.Input
          ref={forwardedRef}
          disabled={disabled}
          autoComplete="off"
          data-slot="combobox-input"
          className={cn(
            "w-full min-w-0 bg-transparent border-none shadow-none outline-none ring-0",
            "placeholder:text-ink-subtle focus:outline-none focus:ring-0",
            heightBySize[size],
            prefix ? "ps-0" : startPadBySize[size],
            trailing ? "pe-0" : endPadBySize[size],
          )}
          {...props}
        />
        {trailing}
      </ComboboxPrimitive.InputGroup>
    );
  },
);

/* -------------------------------- Popup -------------------------------- */

export interface ComboboxPopupProps {
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  children: React.ReactNode;
}

export function ComboboxPopup({
  className,
  side = "bottom",
  align = "start",
  sideOffset = 6,
  children,
}: ComboboxPopupProps): React.ReactElement {
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);
  const { placeholder } = useContext(ComboboxSharedContext);

  if (isMobile) {
    return (
      <ComboboxPrimitive.Portal>
        <ComboboxPrimitive.Backdrop
          data-slot="combobox-backdrop"
          className={cn(
            "fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm",
            "transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
            "data-starting-style:opacity-0 data-ending-style:opacity-0",
          )}
        />
        <ComboboxPrimitive.Positioner className="contents">
          <ComboboxPrimitive.Popup
            data-slot="combobox-popup"
            data-mobile="true"
            className={cn(
              "fixed inset-x-2 bottom-2 z-[80] flex flex-col overflow-hidden outline-none",
              "rounded-[var(--radius-16)] bg-surface-elevated border border-hairline shadow-modal",
              "max-h-[calc(100dvh-1rem)]",
              "transition-[opacity,translate] duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
              "data-starting-style:opacity-0 data-starting-style:translate-y-8",
              "data-ending-style:opacity-0 data-ending-style:translate-y-8",
              className,
            )}
          >
            <ComboboxPrimitive.InputGroup
              data-slot="combobox-mobile-input"
              className="flex-none flex w-full items-center gap-2 border-b border-hairline px-3 text-ink"
            >
              <MagnifyingGlass
                aria-hidden
                className="size-4 shrink-0 text-ink-muted"
              />
              <ComboboxPrimitive.Input
                autoComplete="off"
                placeholder={placeholder}
                className="h-11 w-full min-w-0 bg-transparent border-none shadow-none outline-none ring-0 placeholder:text-ink-subtle focus:outline-none focus:ring-0 text-body-16"
              />
            </ComboboxPrimitive.InputGroup>
            <ComboboxPrimitive.List className="min-h-0 flex-1 overflow-y-auto p-1">
              {children}
            </ComboboxPrimitive.List>
          </ComboboxPrimitive.Popup>
        </ComboboxPrimitive.Positioner>
      </ComboboxPrimitive.Portal>
    );
  }

  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-[80] outline-none"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-popup"
          className={cn(
            "flex flex-col overflow-hidden outline-none",
            popupSurface,
            "min-w-[var(--anchor-width)] max-h-[min(var(--available-height),400px)]",
            "transition-[opacity,scale] duration-[var(--duration-state)] ease-[var(--ease-standard)]",
            "data-starting-style:opacity-0 data-starting-style:scale-95",
            "data-ending-style:opacity-0 data-ending-style:scale-95",
            className,
          )}
        >
          <ComboboxPrimitive.List className="min-h-0 flex-1 overflow-y-auto p-1">
            {children}
          </ComboboxPrimitive.List>
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

/* --------------------------------- Item -------------------------------- */

export interface ComboboxItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  onSelect?: () => void;
  disabled?: boolean;
  value?: unknown;
}

export function ComboboxItem({
  className,
  children,
  onSelect,
  disabled,
  value,
  onClick,
  ...props
}: ComboboxItemProps): React.ReactElement {
  return (
    <ComboboxPrimitive.Item
      value={value}
      disabled={disabled}
      data-slot="combobox-item"
      className={cn(
        itemRow.base,
        itemRow.comfortable,
        "md:min-h-7 md:px-2 md:py-1.5 md:text-body-13",
        "cursor-pointer gap-2 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        iconMuted,
        className,
      )}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        onSelect?.();
      }}
      {...props}
    >
      {children}
    </ComboboxPrimitive.Item>
  );
}

/* ---------------------------- CheckboxItem ---------------------------- */

export interface ComboboxCheckboxItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect" | "prefix"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onSelect?: (checked: boolean) => void;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  value?: unknown;
}

export function ComboboxCheckboxItem({
  className,
  children,
  checked = false,
  onCheckedChange,
  onSelect,
  disabled,
  prefix,
  suffix,
  value,
  onClick,
  ...props
}: ComboboxCheckboxItemProps): React.ReactElement {
  return (
    <ComboboxPrimitive.Item
      value={value}
      disabled={disabled}
      data-slot="combobox-checkbox-item"
      data-state={checked ? "checked" : "unchecked"}
      aria-checked={checked}
      className={cn(
        itemRow.base,
        itemRow.comfortable,
        "md:min-h-7 md:px-2 md:py-1.5 md:text-body-13",
        "cursor-pointer gap-2 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        iconMuted,
        className,
      )}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (disabled) return;
        const next = !checked;
        onCheckedChange?.(next);
        onSelect?.(next);
        e.preventDefault();
      }}
      {...props}
    >
      <Checkbox
        checked={checked}
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none"
      />
      {prefix}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {suffix && <span className="ms-auto flex items-center">{suffix}</span>}
    </ComboboxPrimitive.Item>
  );
}

/* -------------------------------- Divider ----------------------------- */

export function ComboboxDivider({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-divider"
      className={cn(popupDivider, className)}
      {...props}
    />
  );
}

/* ---------------------------- Group / Section ------------------------- */

export function ComboboxGroupLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-group-label"
      className={cn(
        itemGroupLabel.base,
        itemGroupLabel.comfortable,
        "md:px-2",
        className,
      )}
      {...props}
    />
  );
}

export interface ComboboxSectionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  title?: React.ReactNode;
  children: React.ReactNode;
}

export function ComboboxSection({
  title,
  className,
  children,
  ...props
}: ComboboxSectionProps): React.ReactElement {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-section"
      className={cn("py-1 first:pt-0 last:pb-0", className)}
      {...props}
    >
      {title != null && <ComboboxGroupLabel>{title}</ComboboxGroupLabel>}
      {children}
    </ComboboxPrimitive.Group>
  );
}

export { MagnifyingGlass as ComboboxSearchIcon };
export { ComboboxPrimitive };
