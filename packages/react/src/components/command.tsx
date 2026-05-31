"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import type * as React from "react";
import { cn } from "../utils";
import { Dialog, DialogContent } from "./dialog";

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
      className="size-4 shrink-0 text-patch-text-tertiary"
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
  return (
    <div className="flex items-center gap-2 border-b border-patch-border px-3">
      <SearchIcon />
      <AutocompletePrimitive.Input
        data-slot="command-input"
        className={cn(
          "h-11 w-full flex-1 bg-transparent text-[length:var(--text-patch-control)] text-patch-text placeholder:text-patch-text-tertiary outline-none",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.List>): React.ReactElement {
  return (
    <AutocompletePrimitive.List
      data-slot="command-list"
      className={cn("max-h-[min(330px,60vh)] overflow-y-auto p-1", className)}
      {...props}
    />
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
          "px-3 py-6 text-center text-[length:var(--text-patch-control)] text-patch-text-tertiary",
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
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Item>): React.ReactElement {
  return (
    <AutocompletePrimitive.Item
      data-slot="command-item"
      className={cn(
        "flex cursor-default select-none items-center gap-2 rounded-[var(--radius-patch-sm)] px-2 py-1.5 text-[length:var(--text-patch-control)] text-patch-text-secondary outline-none transition-colors duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)] data-highlighted:bg-patch-surface-hover data-highlighted:text-patch-text [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

export function CommandGroup(
  props: React.ComponentProps<typeof AutocompletePrimitive.Group>,
): React.ReactElement {
  return <AutocompletePrimitive.Group data-slot="command-group" {...props} />;
}

export function CommandGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.GroupLabel>): React.ReactElement {
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot="command-group-label"
      className={cn(
        "px-2 pb-1 pt-2 text-[length:var(--text-patch-micro)] font-semibold uppercase tracking-[var(--tracking-patch-label)] text-patch-text-tertiary",
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
      className={cn("my-1 h-px bg-patch-border", className)}
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-xl gap-0 overflow-hidden p-0"
      >
        <Command {...commandProps}>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}

export { AutocompletePrimitive };
