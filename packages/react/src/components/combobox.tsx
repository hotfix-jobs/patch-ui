"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import {
  CaretDown,
  MagnifyingGlass,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { RemoveScroll } from "react-remove-scroll";
import { createContext, forwardRef, useContext, useMemo } from "react";
import type * as React from "react";
import { cn } from "../utils";
import {
  iconMuted,
  itemGroupLabel,
  itemRow,
  popupDivider,
  popupSurface,
  popupTriggerOpen,
} from "../recipes";
import { Checkbox } from "./checkbox";
import type { InputSize } from "./input";
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
   * Enables Base UI's multi-select mode. When `true`, `selectedValues`
   * is the source of truth for the picked items and the built-in
   * ComboboxInput clearable X becomes visible whenever the array is
   * non-empty. Clicking Clear then wipes both the input value and the
   * selection array via Base UI's native handler.
   */
  multiple?: boolean;
  /** Selected values in multi-select mode (Base UI's `value` array). */
  selectedValues?: readonly unknown[];
  /** Fires when Base UI toggles the selection array in multi mode. */
  onSelectedValuesChange?: (next: unknown[]) => void;
  /**
   * Auto-highlight behavior on the popup list:
   *   - `false` (default): open with no highlighted item. Arrow keys move to
   *     an option before Enter can select it.
   *   - `true`: only highlight on input change, not on plain open.
   *   - `"always"`: highlight the first item on open and input change.
   */
  autoHighlight?: boolean | "always";
  children: React.ReactNode;
}

const ComboboxSharedContext = createContext<{
  placeholder?: string;
  multiple?: boolean;
}>({});

export function Combobox({
  open,
  defaultOpen,
  onOpenChange,
  value,
  onValueChange,
  placeholder,
  multiple,
  selectedValues,
  onSelectedValuesChange,
  autoHighlight = false,
  children,
}: ComboboxProps): React.ReactElement {
  const shared = useMemo(
    () => ({ placeholder, multiple }),
    [placeholder, multiple],
  );
  // Base UI's ComboboxRoot is generic over Value + Multiple, and the
  // shape of `value` depends on both. Cast through `unknown as never` at
  // the boundary so consumers can pass a `string[]` selection array
  // without threading generics through our wrapper.
  const rootProps = multiple
    ? {
        multiple: true as const,
        value: selectedValues as never,
        onValueChange: onSelectedValuesChange
          ? (next: unknown) =>
              onSelectedValuesChange((next as unknown[]) ?? [])
          : undefined,
      }
    : {};

  return (
    <ComboboxSharedContext.Provider value={shared}>
      <ComboboxPrimitive.Root
        {...rootProps}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
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
  /** Removes control chrome when embedded in a composite surface. */
  variant?: "default" | "unstyled";
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /** Hide the trailing chevron. */
  hideChevron?: boolean;
  /** Show a trailing X to clear the input. */
  clearable?: boolean;
  onClear?: () => void;
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
      variant = "default",
      prefix,
      suffix,
      hideChevron,
      clearable,
      onClear,
      disabled,
      className,
      ...props
    },
    forwardedRef,
  ) {
    const unstyled = variant === "unstyled";
    const trailing = (clearable || !hideChevron || suffix) ? (
      <ComboboxAffix side="end">
        <span className={cn("inline-flex items-center gap-1.5", clearable && "group")}>
          {suffix}
          {clearable && (
            <ComboboxPrimitive.Clear
              aria-label="Clear"
              onClick={onClear}
              data-slot="combobox-input-clear"
              className="inline-flex size-5 items-center justify-center rounded-[var(--radius-8)] text-ink-muted hover:bg-layer-hover hover:text-ink active:bg-layer-hover transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] data-[ending-style]:hidden"
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
          !unstyled && "rounded-[var(--radius-8)]",
          !unstyled && [
            "bg-fill-1 hover:bg-fill-2",
            popupTriggerOpen,
            "outline-none has-focus-visible:[outline-style:solid] has-focus-visible:outline-[length:var(--focus-ring-width)] has-focus-visible:outline-[var(--focus-ring-color)] has-focus-visible:outline-offset-0",
            "transition-[color,background-color,outline-color] duration-[var(--duration-state)] ease-[var(--ease-standard)]",
          ],
          "has-disabled:opacity-50 has-disabled:cursor-not-allowed",
          "group-data-[invalid]/field:[outline-style:solid] group-data-[invalid]/field:outline-[length:1px] group-data-[invalid]/field:outline-error",
          "has-[[aria-invalid=true]]:[outline-style:solid] has-[[aria-invalid=true]]:outline-[length:1px] has-[[aria-invalid=true]]:outline-error",
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
  /** Applies to whichever popup renders (desktop or mobile).
   *  Use for styling that makes sense in both contexts. */
  className?: string;
  /** Desktop-only overrides. Trigger-anchored width lives here
   *  (e.g. `w-[var(--anchor-width)]`) — it's meaningless for the
   *  centered mobile modal, so we drop it on mobile. */
  desktopClassName?: string;
  /** Mobile-only overrides for the centered modal layout. */
  mobileClassName?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  children: React.ReactNode;
}

export function ComboboxPopup({
  className,
  desktopClassName,
  mobileClassName,
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
        <RemoveScroll>
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
              // Centered on mobile: fixed at viewport center via
              // top-1/2 / left-1/2 + translate. Full width minus
              // 8px gutters left/right.
              "fixed left-1/2 top-1/2 z-[80] w-[calc(100vw-1rem)] -translate-x-1/2 -translate-y-1/2 flex flex-col overflow-hidden outline-none",
              "rounded-[var(--radius-12)] bg-layer-1 border border-hairline shadow-menu",
              "max-h-[calc(100dvh-2rem)]",
              // Fade + slight vertical slide from below the center on
              // enter. `translate-y-[calc(-50%+8px)]` starts 8px below
              // the final -50% center and animates up. translate-x-1/2
              // stays put throughout.
              "transition-[opacity,translate] duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
              "data-starting-style:opacity-0 data-starting-style:translate-y-[calc(-50%+8px)]",
              "data-ending-style:opacity-0 data-ending-style:translate-y-[calc(-50%+8px)]",
              className,
              mobileClassName,
            )}
          >
            <ComboboxPrimitive.InputGroup
              data-slot="combobox-mobile-input"
              className="flex-none flex w-full items-center gap-2 px-3 text-ink"
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
        </RemoveScroll>
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
            desktopClassName,
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
  /** When provided, renders a trailing X affordance that calls this
   *  callback instead of Base UI's select handler on click. Useful in
   *  multi-select Selected sections where every row already represents
   *  an active pick and clicking the row still toggles it off, but a
   *  visible X communicates that intent more clearly. */
  onRemove?: () => void;
  /** aria-label for the remove X. Defaults to "Remove". */
  removeLabel?: string;
}

export function ComboboxItem({
  className,
  children,
  onSelect,
  disabled,
  value,
  onClick,
  onRemove,
  removeLabel = "Remove",
  ...props
}: ComboboxItemProps): React.ReactElement {
  const { multiple } = useContext(ComboboxSharedContext);
  const resolvedValue =
    value !== undefined ? value : typeof children === "string" ? children : null;
  return (
    <ComboboxPrimitive.Item
      value={resolvedValue}
      disabled={disabled}
      data-slot="combobox-item"
      className={cn(
        "group",
        itemRow.base,
        itemRow.comfortable,
        "gap-2 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
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
      {multiple && (
        <span
          aria-hidden
          data-slot="combobox-item-checkbox"
          className="relative inline-flex size-4 shrink-0 items-center justify-center"
        >
          <Checkbox
            checked={false}
            tabIndex={-1}
            aria-hidden
            className="pointer-events-none group-data-[selected]:invisible"
          />
          <ComboboxPrimitive.ItemIndicator className="absolute inset-0 inline-flex items-center justify-center">
            <Checkbox
              checked
              tabIndex={-1}
              aria-hidden
              className="pointer-events-none"
            />
          </ComboboxPrimitive.ItemIndicator>
        </span>
      )}
      {children}
      {onRemove && (
        <span
          role="button"
          aria-label={removeLabel}
          tabIndex={-1}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onRemove();
          }}
          className="ms-auto inline-flex size-5 shrink-0 items-center justify-center rounded-[var(--radius-8)] text-ink-muted transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-layer-hover hover:text-ink active:bg-layer-hover"
          data-slot="combobox-item-remove"
        >
          <X className="size-3" aria-hidden />
        </span>
      )}
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

export const ComboboxSearchIcon = MagnifyingGlass;
const ComboboxPrimitiveExport = ComboboxPrimitive;
export { ComboboxPrimitiveExport as ComboboxPrimitive };
