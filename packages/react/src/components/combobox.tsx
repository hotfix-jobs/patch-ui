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
  /**
   * Auto-highlight behavior on the popup list:
   *   - `"always"` (default): the first item is always highlighted on open
   *     and on every input change. Popup opens scrolled to the top and Enter
   *     picks the first match. Standard typeahead behavior.
   *   - `true`: only highlight on input change, not on plain open.
   *   - `false`: never auto-highlight; the popup opens with nothing focused
   *     and Enter is a no-op until the user arrows to an item. Note that
   *     this exposes a Base UI quirk where the popup can open scrolled to
   *     the last item under loop-focus navigation. Use only if you have a
   *     strong reason to want the "no preselection" behavior.
   */
  autoHighlight?: boolean | "always";
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
  autoHighlight = "always",
  children,
}: ComboboxProps): React.ReactElement {
  const shared = useMemo(() => ({ placeholder }), [placeholder]);
  // Full workaround for Base UI issue #3077: the popup opens with the
  // last item marked `data-highlighted` AND scrolled into view. Scroll
  // reset alone doesn't clear the highlight — Base UI's activeIndex
  // still points to that item and the CSS lights it up.
  //
  // The Base UI author's recommendation is to dispatch synthetic
  // pointer events on the highlighted item: pointerout clears Base UI's
  // internal active state, and pointermove on the parent re-syncs the
  // pointer position ref. Then reset scrollTop. Two nested rAFs defer
  // past Base UI's own rAF-scheduled scrollIntoView.
  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange?.(nextOpen);
    if (!nextOpen) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const popup = document.querySelector<HTMLElement>(
          '[data-slot="combobox-popup"]',
        );
        if (!popup) return;
        const highlighted = popup.querySelector<HTMLElement>(
          "[data-highlighted]",
        );
        if (highlighted) {
          highlighted.parentElement?.dispatchEvent(
            new Event("pointermove", { bubbles: true }),
          );
          highlighted.dispatchEvent(
            new PointerEvent("pointerout", { bubbles: true }),
          );
        }
        const scroller = popup.querySelector<HTMLElement>(
          '[role="listbox"], [role="grid"]',
        );
        if (scroller) scroller.scrollTop = 0;
      });
    });
  };
  return (
    <ComboboxSharedContext.Provider value={shared}>
      <ComboboxPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={handleOpenChange}
        inputValue={value}
        onInputValueChange={
          onValueChange ? (next) => onValueChange(next) : undefined
        }
        // Base UI's ComboboxRoot narrows autoHighlight to boolean in its
        // public types, but the underlying AriaCombobox accepts 'always'
        // and forwards it unchanged. Cast so consumers can opt into the
        // stronger mode without dropping to the primitive.
        autoHighlight={autoHighlight as boolean}
      >
        {children}
      </ComboboxPrimitive.Root>
    </ComboboxSharedContext.Provider>
  );
}

/* -------------------------------- Input -------------------------------- */

function ChevronIndicator({
  className,
}: {
  className?: string;
}): React.ReactElement {
  return (
    <ComboboxPrimitive.Icon
      render={
        <CaretDown
          aria-hidden
          className={cn(
            "size-4 shrink-0 text-ink-muted transition-transform duration-[var(--duration-state)] ease-[var(--ease-standard)]",
            className,
          )}
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
  sm: "h-6 text-small",
  md: "h-8 text-small",
  lg: "h-10 text-regular",
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
        <span className={cn("inline-flex items-center gap-1.5", clearable && "group")}>
          {suffix}
          {clearable && (
            <ComboboxPrimitive.Clear
              aria-label="Clear"
              onClick={onClear}
              data-slot="combobox-input-clear"
              className="inline-flex size-5 items-center justify-center rounded-full text-ink-muted hover:bg-layer-hover hover:text-ink transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] data-[ending-style]:hidden"
            >
              <X className="size-3" />
            </ComboboxPrimitive.Clear>
          )}
          {!hideChevron && (
            <ChevronIndicator
              className={cn(
                "group-data-[popup-open]/combobox-input:rotate-180",
                clearable &&
                  "group-has-[[data-slot=combobox-input-clear]:not([data-ending-style])]:hidden",
              )}
            />
          )}
        </span>
      </ComboboxAffix>
    ) : null;

    return (
      <ComboboxPrimitive.InputGroup
        data-slot="combobox-input-group"
        className={cn(
          "group/combobox-input relative inline-flex w-full items-center overflow-hidden text-ink",
          shape,
          "bg-layer-1 border border-hairline",
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
              "rounded-[var(--radius-16)] bg-layer-1 border border-hairline shadow-modal",
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
                className="h-11 w-full min-w-0 bg-transparent border-none shadow-none outline-none ring-0 placeholder:text-ink-subtle focus:outline-none focus:ring-0 text-regular"
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
  const resolvedValue =
    value !== undefined ? value : typeof children === "string" ? children : null;
  return (
    <ComboboxPrimitive.Item
      value={resolvedValue}
      disabled={disabled}
      data-slot="combobox-item"
      className={cn(
        itemRow.base,
        itemRow.comfortable,
        "md:min-h-7 md:px-2 md:py-1.5 md:text-small",
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
  const resolvedValue =
    value !== undefined ? value : typeof children === "string" ? children : null;
  return (
    <ComboboxPrimitive.Item
      value={resolvedValue}
      disabled={disabled}
      data-slot="combobox-checkbox-item"
      data-state={checked ? "checked" : "unchecked"}
      aria-checked={checked}
      className={cn(
        itemRow.base,
        itemRow.comfortable,
        "md:min-h-7 md:px-2 md:py-1.5 md:text-small",
        "cursor-pointer gap-2 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        iconMuted,
        className,
      )}
      onClick={(e: React.MouseEvent<HTMLDivElement> & {
        preventBaseUIHandler?: () => void;
      }) => {
        e.preventBaseUIHandler?.();
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
