"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { createContext, useContext } from "react";
import type * as React from "react";
import { cn } from "../utils";
import { itemGroupLabel, itemRow, popupDivider, popupSurface } from "../recipes";

import { Check } from "@phosphor-icons/react/dist/ssr";
type Density = "compact" | "comfortable";

const CommandDensityContext = createContext<Density>("comfortable");

const CommandCloseContext = createContext<(() => void) | null>(null);

/** Command palette / searchable list built on Base UI Autocomplete (inline mode). */
export function Command(
  props: React.ComponentProps<typeof AutocompletePrimitive.Root>,
): React.ReactElement {
  return (
    <AutocompletePrimitive.Root
      data-slot="command"
      inline
      autoHighlight={false}
      {...props}
    />
  );
}

export interface CommandInputProps
  extends Omit<React.ComponentProps<typeof AutocompletePrimitive.Input>, "prefix"> {
  prefix?: React.ReactNode;
  /** Trailing node (Kbd hint, chip). Consumers wire click behavior themselves. */
  action?: React.ReactNode;
}

export function CommandInput({
  className,
  prefix,
  action,
  ...props
}: CommandInputProps): React.ReactElement {
  return (
    <span
      className="relative inline-flex w-full items-center bg-transparent text-ink-muted"
      data-slot="command-input-wrapper"
    >
      {prefix && (
        <span className="flex shrink-0 items-center ps-4 pe-2 [&_svg]:size-4 [&_svg]:shrink-0">
          {prefix}
        </span>
      )}
      <AutocompletePrimitive.Input
        data-slot="command-input"
        className={cn(
          "h-12 w-full flex-1 border-none bg-transparent text-small text-ink placeholder:text-ink-subtle outline-none ring-0 focus:outline-none focus:ring-0",
          prefix ? "ps-0" : "ps-4",
          action ? "pe-2" : "pe-4",
          className,
        )}
        {...props}
      />
      {action && (
        <span
          className="flex shrink-0 items-center gap-1.5 pe-3 text-mini text-ink-muted"
          data-slot="command-input-action"
        >
          {action}
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
 * Base UI's Autocomplete.Empty root stays mounted for aria-live; padding must live on
 * an inner wrapper so the root doesn't reserve vertical space when items exist.
 */
export function CommandEmpty({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Empty>): React.ReactElement {
  return (
    <AutocompletePrimitive.Empty data-slot="command-empty" {...props}>
      <div
        className={cn(
          "px-3 py-6 text-center text-mini text-ink-muted",
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
  prefix,
  suffix,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof AutocompletePrimitive.Item>,
  "prefix" | "suffix"
> & {
  selected?: boolean;
  description?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}): React.ReactElement {
  const density = useContext(CommandDensityContext);

  // Selected check replaces the suffix: they share the trailing slot.
  const trailing = selected ? (
    <Check
      className="ms-auto size-3.5 shrink-0 text-ink-muted"
    />
  ) : suffix ? (
    <span className="ms-auto flex items-center">{suffix}</span>
  ) : null;

  return (
    <AutocompletePrimitive.Item
      data-slot="command-item"
      data-selected={selected ? "" : undefined}
      className={cn(
        itemRow.base,
        "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        density === "compact"
          ? itemRow.compact
          : "min-h-11 px-3 py-2.5 text-small [&_svg:not([class*='size-'])]:size-[18px]",
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
          <span className="mt-0.5 truncate text-mini text-ink-muted">
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

export function CommandSection({
  title,
  label,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<typeof AutocompletePrimitive.Group>, "children"> & {
  title?: React.ReactNode;
  /** @deprecated Use `title`. */
  label?: React.ReactNode;
  children: React.ReactNode;
}): React.ReactElement {
  const heading = title ?? label;
  return (
    <AutocompletePrimitive.Group
      className={cn("py-1 first:pt-0 last:pb-0", className)}
      data-slot="command-section"
      {...props}
    >
      {heading != null && <CommandGroupLabel>{heading}</CommandGroupLabel>}
      {children}
    </AutocompletePrimitive.Group>
  );
}

export function CommandGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.GroupLabel>): React.ReactElement {
  const density = useContext(CommandDensityContext);
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot="command-group-label"
      className={cn(
        itemGroupLabel.base,
        density === "compact" ? itemGroupLabel.compact : "px-3",
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
      className={cn(popupDivider, className)}
      {...props}
    />
  );
}

export interface CommandDialogProps
  extends React.ComponentProps<typeof AutocompletePrimitive.Root> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** Floating command palette. Escape and outside clicks dismiss. */
export function CommandDialog({
  open,
  onOpenChange,
  children,
  ...commandProps
}: CommandDialogProps): React.ReactElement | null {
  const close = () => onOpenChange?.(false);

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) close();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          data-slot="command-dialog-overlay"
          className={cn(
            "fixed inset-0 z-[80] bg-white/40 dark:bg-black/40",
            "transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
            "data-starting-style:opacity-0 data-ending-style:opacity-0",
          )}
        />
        <DialogPrimitive.Popup
          data-slot="command-dialog"
          className={cn(
            popupSurface,
            "fixed left-1/2 top-1/2 z-[80] flex w-[calc(100vw-1rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden max-h-[calc(100dvh-2rem)] sm:max-h-[70vh]",
            "transition-[opacity,scale] duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
            "data-starting-style:opacity-0 data-starting-style:scale-97",
            "data-ending-style:opacity-0 data-ending-style:scale-97",
          )}
        >
          <CommandCloseContext.Provider value={close}>
            <Command {...commandProps}>{children}</Command>
          </CommandCloseContext.Provider>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export { AutocompletePrimitive };
