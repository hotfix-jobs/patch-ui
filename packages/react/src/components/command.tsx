"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { createContext, useContext } from "react";
import type * as React from "react";
import { CheckIcon } from "../internal-icons";
import { cn } from "../utils";
import { Kbd } from "./kbd";
import { Modal } from "./modal";

type Density = "compact" | "comfortable";

const CommandDensityContext = createContext<Density>("comfortable");

/** Provides the close handler so CommandInput can render a clickable Esc chip. */
const CommandCloseContext = createContext<(() => void) | null>(null);

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
  showEscape = true,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Input> & {
  /** Show the Esc chip on the right when a close handler is available. Default true. */
  showEscape?: boolean;
}): React.ReactElement {
  const close = useContext(CommandCloseContext);
  const showKbd = showEscape && close != null;
  return (
    <span
      className={cn(
        "relative inline-flex w-full items-center border-b border-gray-alpha-400 bg-transparent",
      )}
      data-slot="command-input-wrapper"
    >
      <span className="flex shrink-0 items-center ps-3 pe-2 text-gray-800">
        <SearchIcon />
      </span>
      <AutocompletePrimitive.Input
        data-slot="command-input"
        className={cn(
          "h-12 w-full flex-1 border-none bg-transparent text-copy-14 text-gray-1000 placeholder:text-gray-700 outline-none ring-0 focus:outline-none focus:ring-0",
          showKbd ? "pe-2" : "pe-3",
          className,
        )}
        {...props}
      />
      {showKbd && (
        <span className="flex shrink-0 items-center pe-3">
          <Kbd onClick={close} aria-label="Close">
            Esc
          </Kbd>
        </span>
      )}
    </span>
  );
}

export function CommandList({
  className,
  density = "comfortable",
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

/**
 * Base UI's Autocomplete.Empty only auto-hides when the list is driven via
 * the `items` prop. When rendering results from JSX (grouped sections, custom
 * filtering), Base UI can't count them — consumers should conditionally
 * render CommandEmpty themselves based on their result count.
 */
export function CommandEmpty({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Empty>): React.ReactElement {
  return (
    <AutocompletePrimitive.Empty
      data-slot="command-empty"
      className={cn(
        "block px-3 py-6 text-center text-label-12 text-gray-800",
        className,
      )}
      {...props}
    >
      {children}
    </AutocompletePrimitive.Empty>
  );
}

export function CommandItem({
  className,
  selected,
  description,
  prefix,
  suffix,
  children,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Item> & {
  /** Trailing check indicating "currently chosen". */
  selected?: boolean;
  /** Secondary line below the title for two-line items. */
  description?: React.ReactNode;
  /** Leading node (icon). */
  prefix?: React.ReactNode;
  /** Trailing node (kbd shortcut, badge, count). */
  suffix?: React.ReactNode;
}): React.ReactElement {
  const density = useContext(CommandDensityContext);

  // Selected check REPLACES the suffix — they share the trailing slot.
  // `selected` is for persistent choices (Theme = "Dark"); ephemeral
  // one-shot commands should leave it undefined.
  const trailing = selected ? (
    <CheckIcon
      className="ms-auto size-3.5 shrink-0 text-gray-800"
      strokeWidth={2.25}
    />
  ) : suffix ? (
    <span className="ms-auto flex items-center">{suffix}</span>
  ) : null;

  return (
    <AutocompletePrimitive.Item
      data-slot="command-item"
      className={cn(
        // Inset rounded highlight (matches Menu). Popup owns 4px padding via
        // CommandList's p-1; items rounded with radius-6.
        "cursor-default select-none rounded-[var(--radius-6)] text-gray-1000 outline-none data-highlighted:bg-gray-alpha-100 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
            {prefix}
            {children}
            {trailing}
          </span>
          <span className="mt-0.5 truncate text-label-12 font-normal text-gray-800">
            {description}
          </span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {prefix}
          {children}
          {trailing}
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
        "px-3 pb-1 pt-2 !text-gray-700",
        className,
      )}
      style={{ fontSize: 10, lineHeight: 1.35 }}
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
  const close = () => onOpenChange?.(false);
  return (
    <Modal
      active={open ?? false}
      onClickOutside={close}
      size="xl"
      className="gap-0 overflow-hidden p-0"
    >
      <CommandCloseContext.Provider value={close}>
        <Command {...commandProps}>{children}</Command>
      </CommandCloseContext.Provider>
    </Modal>
  );
}

export { AutocompletePrimitive };
