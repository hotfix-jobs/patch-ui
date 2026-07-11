"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CaretDown, Check } from "@phosphor-icons/react/dist/ssr";
import type * as React from "react";
import { RemoveScroll } from "react-remove-scroll";
import { cn } from "../utils";
import { itemRow, popupSurface, popupTriggerOpen, selectionFocus } from "../recipes";
import {
  MOBILE_MEDIA_QUERY,
  useMediaQuery,
} from "../hooks/use-media-query";

export type SelectSize = "sm" | "md" | "lg";
export type SelectVariant = "default" | "unstyled";

export interface SelectProps
  extends Omit<
    React.ComponentProps<typeof SelectPrimitive.Root>,
    "value" | "defaultValue" | "onValueChange" | "items"
  > {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: SelectSize;
  /** Removes trigger chrome when embedded in a composite surface. */
  variant?: SelectVariant;
  /** Content rendered at the start (icon, unit symbol). */
  prefix?: React.ReactNode;
  /** Content rendered at the end (before the chevron). */
  suffix?: React.ReactNode;
  /** Associates the trigger with a label. */
  id?: string;
  /** IDs of elements that describe the trigger. */
  "aria-describedby"?: string;
  /** Marks the trigger invalid. Pair with FieldError for its message. */
  invalid?: boolean;
  /** Placeholder text shown when no value is selected. */
  placeholder?: string;
  /** Class name applied to the trigger. */
  className?: string;
  /** Renders the trigger's selected-value display. Base UI's `Select.Value`
   *  defaults to showing the raw `value` string, which surfaces ugly ids
   *  (uuids, slugs) when the option label doesn't match the value. Pass a
   *  mapper so consumers control the display without rebuilding the
   *  trigger. Return `null` to fall through to the placeholder. */
  renderValue?: (value: string) => React.ReactNode;
}

const heightBySize: Record<SelectSize, string> = {
  sm: "h-6 text-small",
  md: "h-8 text-small",
  lg: "h-10 text-regular",
};

const leadingPad: Record<SelectSize, string> = {
  sm: "ps-3",
  md: "ps-3",
  lg: "ps-3.5",
};

const trailingPad: Record<SelectSize, string> = {
  sm: "pe-7",
  md: "pe-8",
  lg: "pe-9",
};

/**
 * Rich select. Use `SelectItem` children; pair with `SelectGroup` / `SelectGroupLabel`
 * for optgroup semantics. For a searchable list, reach for `Combobox`.
 */
export function Select({
  value,
  defaultValue,
  onValueChange,
  size = "md",
  variant = "default",
  prefix,
  suffix,
  id,
  "aria-describedby": ariaDescribedBy,
  invalid,
  placeholder,
  disabled,
  required,
  className,
  renderValue,
  children,
  ...props
}: SelectProps): React.ReactElement {
  const unstyled = variant === "unstyled";
  const trigger = (
    <SelectPrimitive.Trigger
      id={id}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      aria-describedby={ariaDescribedBy}
      data-slot="select"
      className={cn(
        "relative inline-flex w-full items-center overflow-hidden text-ink",
        !unstyled && "rounded-[var(--radius-8)]",
        !unstyled && [
          "bg-fill-1 hover:bg-fill-2 focus-visible:bg-fill-2",
          popupTriggerOpen,
          selectionFocus,
          "outline-none",
          "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        ],
        "group-data-[invalid]/field:[outline-style:solid] group-data-[invalid]/field:outline-[length:1px] group-data-[invalid]/field:outline-error",
        "aria-invalid:[outline-style:solid] aria-invalid:outline-[length:1px] aria-invalid:outline-error",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        heightBySize[size],
        prefix ? "ps-0" : leadingPad[size],
        trailingPad[size],
        className,
      )}
    >
      {prefix && (
        <span
          className="pointer-events-none inline-flex shrink-0 items-center ps-3 pe-1.5 text-ink-muted [&_svg]:size-4"
          data-slot="select-prefix"
        >
          {prefix}
        </span>
      )}
      <SelectPrimitive.Value
        placeholder={placeholder}
        className="flex-1 truncate text-left"
        data-slot="select-value"
      >
        {renderValue
          ? (v: string) => {
              const rendered = renderValue(v);
              return rendered != null && rendered !== ""
                ? rendered
                : placeholder;
            }
          : undefined}
      </SelectPrimitive.Value>
      {suffix && (
        <span
          className="pointer-events-none inline-flex shrink-0 items-center ps-1.5 pe-1.5 text-ink-muted [&_svg]:size-4"
          data-slot="select-suffix"
        >
          {suffix}
        </span>
      )}
      <SelectPrimitive.Icon
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-muted",
          size === "sm" ? "right-2" : size === "lg" ? "right-3" : "right-2.5",
        )}
      >
        <CaretDown aria-hidden className="size-3.5" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );

  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={
        onValueChange ? (next) => onValueChange(String(next ?? "")) : undefined
      }
      disabled={disabled}
      required={required}
      {...props}
    >
      {trigger}
      <SelectPopupSurface>{children}</SelectPopupSurface>
    </SelectPrimitive.Root>
  );
}

/* ---------------------------- Popup surface ---------------------------- */

function SelectPopupSurface({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);

  if (isMobile) {
    // Matches Menu's mobile treatment: centered dialog + RemoveScroll +
    // fade/upward-drift enter. Keeps Select and Menu visually identical
    // as pickers on phones.
    return (
      <SelectPrimitive.Portal>
        <RemoveScroll>
          <SelectPrimitive.Backdrop
            data-slot="select-backdrop"
            className={cn(
              "fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm",
              "transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
              "data-starting-style:opacity-0 data-ending-style:opacity-0",
            )}
          />
          <SelectPrimitive.Positioner
            alignItemWithTrigger={false}
            className="contents"
          >
            <SelectPrimitive.Popup
              data-slot="select-popup"
              data-mobile="true"
              className={cn(
                "fixed left-1/2 top-1/2 z-[80] w-[calc(100vw-1rem)] -translate-x-1/2 -translate-y-1/2 flex flex-col overflow-hidden outline-none",
                "rounded-[var(--radius-12)] bg-layer-1 border border-hairline shadow-menu",
                "max-h-[calc(100dvh-2rem)] p-1",
                "transition-[opacity,translate] duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
                "data-starting-style:opacity-0 data-starting-style:translate-y-[calc(-50%+8px)]",
                "data-ending-style:opacity-0 data-ending-style:translate-y-[calc(-50%+8px)]",
              )}
            >
              <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
            </SelectPrimitive.Popup>
          </SelectPrimitive.Positioner>
        </RemoveScroll>
      </SelectPrimitive.Portal>
    );
  }

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        alignItemWithTrigger={false}
        side="bottom"
        align="start"
        sideOffset={4}
        className="z-50 outline-none"
      >
        <SelectPrimitive.Popup
          data-slot="select-popup"
          className={cn(
            popupSurface,
            "min-w-[var(--anchor-width)] max-h-[var(--available-height)] overflow-y-auto p-1 outline-none",
            "transition-[opacity,scale] duration-[var(--duration-state)] ease-[var(--ease-standard)]",
            "data-starting-style:opacity-0 data-starting-style:scale-95",
            "data-ending-style:opacity-0 data-ending-style:scale-95",
          )}
        >
          {children}
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

/* ------------------------------- Item ------------------------------- */

export interface SelectItemProps
  extends React.ComponentProps<typeof SelectPrimitive.Item> {
  value: string;
}

export function SelectItem({
  className,
  children,
  ...props
}: SelectItemProps): React.ReactElement {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        itemRow.base,
        itemRow.comfortable,
        "md:min-h-7 md:px-2 md:py-1.5 md:text-small",
        "relative pe-8",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex-1 truncate">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-muted">
        <Check aria-hidden className="size-3.5" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

/* --------------------------- Group / Label -------------------------- */

export function SelectGroup(
  props: React.ComponentProps<typeof SelectPrimitive.Group>,
): React.ReactElement {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

export function SelectGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.GroupLabel>): React.ReactElement {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-group-label"
      className={cn(
        "px-2.5 pt-1.5 pb-1 text-micro text-ink-tertiary",
        className,
      )}
      {...props}
    />
  );
}

/* ---------------------------- Separator ----------------------------- */

export function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>): React.ReactElement {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("-mx-1 my-1 h-px bg-hairline", className)}
      {...props}
    />
  );
}

export { SelectPrimitive };
