"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { createContext, useContext } from "react";
import type * as React from "react";
import { CheckIcon } from "../internal-icons";
import { cn } from "../utils";
import { Modal } from "./modal";

type Density = "compact" | "comfortable";

const CommandDensityContext = createContext<Density>("compact");

/**
 * Command - a command palette / searchable list built on Base UI Autocomplete
 * (inline mode: the list is always visible, no positioned popup). Use the
 * `items` prop for built-in filtering, or `filteredItems` to drive results from
 * your own search (e.g. a fuzzy index). Wrap in `CommandDialog` for a Cmd+K
 * palette.
 *
 * Usage:
 *   <CommandDialog open={open} onOpenChange={setOpen} items={items}>
 *     <CommandInput placeholder="Search..." />
 *     <CommandList>
 *       <CommandEmpty>No results.</CommandEmpty>
 *       {(item) => <CommandItem key={item.id} onClick={() => run(item)}>{item.label}</CommandItem>}
 *     </CommandList>
 *   </CommandDialog>
 */

export function Command(
  props: React.ComponentProps<typeof AutocompletePrimitive.Root>,
): React.ReactElement {
  return <AutocompletePrimitive.Root data-slot="command" inline {...props} />;
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0 text-gray-800"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Input>): React.ReactElement {
  // Visually mirrors Input's `underline` variant + `lg` size: bottom border
  // hairline, no other chrome, search icon left. Hand-built so the inner
  // element can be Base UI's AutocompletePrimitive.Input (Command needs
  // it for type-ahead + keyboard navigation).
  return (
    <span
      className={cn(
        "relative inline-flex w-full items-center",
        "rounded-none bg-transparent",
        "border-b border-[var(--input-border)]",
        "has-focus-visible:border-b border-[var(--input-border-focus)]",
        "transition-[color,box-shadow] duration-[var(--duration-state)] ease-[var(--ease-standard)]",
      )}
      data-slot="command-input-wrapper"
    >
      <span className="flex shrink-0 items-center ps-3 pe-2 text-gray-800">
        <SearchIcon />
      </span>
      <AutocompletePrimitive.Input
        data-slot="command-input"
        className={cn(
          "h-11 w-full flex-1 border-none bg-transparent pe-3 text-label-13 tracking-[-0.005em] text-gray-1000 placeholder:text-[var(--input-placeholder)] outline-none ring-0 focus:outline-none focus:ring-0",
          className,
        )}
        {...props}
      />
    </span>
  );
}

export function CommandList({
  className,
  density = "compact",
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof AutocompletePrimitive.List>,
  "children"
> & {
  density?: Density;
  children?: React.ReactNode;
}): React.ReactElement {
  return (
    <CommandDensityContext.Provider value={density}>
      <AutocompletePrimitive.List
        data-slot="command-list"
        className={cn("max-h-[min(330px,60vh)] overflow-y-auto p-1", className)}
        {...props}
      >
        {children}
      </AutocompletePrimitive.List>
    </CommandDensityContext.Provider>
  );
}

export function CommandEmpty({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Empty>): React.ReactElement {
  // Base UI keeps the Empty root mounted always (it's an aria-live region), so
  // padding must live on an inner wrapper that only renders when the list is
  // actually empty - otherwise it leaves a persistent empty box under the list.
  return (
    <AutocompletePrimitive.Empty data-slot="command-empty" {...props}>
      <div
        className={cn(
          "px-3 py-6 text-center text-label-13 text-gray-800",
          className,
        )}
      >
        {children}
      </div>
    </AutocompletePrimitive.Empty>
  );
}

export function CommandItem({
  className,
  selected,
  description,
  children,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Item> & {
  /** When true, renders a trailing check to indicate "currently chosen". */
  selected?: boolean;
  /** Secondary line below the title for two-line items. */
  description?: React.ReactNode;
}): React.ReactElement {
  const density = useContext(CommandDensityContext);

  const trailingCheck = selected && (
    <CheckIcon
      className="ms-auto size-3.5 shrink-0 text-gray-800"
      strokeWidth={2.25}
    />
  );

  return (
    <AutocompletePrimitive.Item
      data-slot="command-item"
      className={cn(
        "cursor-default select-none rounded-[var(--radius-6)] text-gray-900 outline-none transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] data-highlighted:bg-[var(--menu-item-hover)] data-highlighted:text-gray-1000 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        density === "compact"
          ? "min-h-7 px-2 py-1.5 text-label-13"
          : "min-h-11 px-3 py-2.5 text-copy-14 [&_svg:not([class*='size-'])]:size-[18px]",
        className,
      )}
      {...props}
    >
      {description != null ? (
        <span className="flex w-full flex-col">
          <span className="flex items-center gap-2">
            {children}
            {trailingCheck}
          </span>
          <span className="mt-0.5 truncate text-label-12 font-normal text-gray-800">
            {description}
          </span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {children}
          {trailingCheck}
        </span>
      )}
    </AutocompletePrimitive.Item>
  );
}

export function CommandGroup(
  props: React.ComponentProps<typeof AutocompletePrimitive.Group>,
): React.ReactElement {
  return <AutocompletePrimitive.Group data-slot="command-group" {...props} />;
}

/**
 * Compound section: a labeled group with consistent spacing.
 * Sugar for <CommandGroup><CommandGroupLabel>...</CommandGroupLabel>...items...</CommandGroup>.
 */
export function CommandSection({
  label,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<typeof AutocompletePrimitive.Group>, "children"> & {
  label?: React.ReactNode;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <AutocompletePrimitive.Group
      className={cn("py-1 first:pt-0 last:pb-0", className)}
      data-slot="command-section"
      {...props}
    >
      {label != null && <CommandGroupLabel>{label}</CommandGroupLabel>}
      {children}
    </AutocompletePrimitive.Group>
  );
}

export function CommandGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.GroupLabel>): React.ReactElement {
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot="command-group-label"
      className={cn(
        "px-2 pb-1 pt-2 text-label-12 font-semibold uppercase tracking-tight text-gray-800",
        className,
      )}
      {...props}
    />
  );
}

export function CommandCollection(
  props: React.ComponentProps<typeof AutocompletePrimitive.Collection>,
): React.ReactElement {
  return <AutocompletePrimitive.Collection {...props} />;
}

export function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Separator>): React.ReactElement {
  return (
    <AutocompletePrimitive.Separator
      data-slot="command-separator"
      className={cn("my-1 h-px bg-gray-alpha-400", className)}
      {...props}
    />
  );
}

export interface CommandDialogProps
  extends React.ComponentProps<typeof AutocompletePrimitive.Root> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandDialog({
  open,
  onOpenChange,
  children,
  ...commandProps
}: CommandDialogProps): React.ReactElement {
  return (
    <Modal
      active={open ?? false}
      onClickOutside={() => onOpenChange?.(false)}
      showCloseButton={false}
      size="xl"
      className="gap-0 overflow-hidden p-0"
    >
      <Command {...commandProps}>{children}</Command>
    </Modal>
  );
}

export { AutocompletePrimitive };
