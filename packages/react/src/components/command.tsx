"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import {
  FloatingFocusManager,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createContext, useContext } from "react";
import type * as React from "react";
import { cn } from "../utils";
import { iconMuted, itemGroupLabel, itemRow, popupDivider, popupSurface } from "../recipes";

import { Check } from "@phosphor-icons/react";
type Density = "compact" | "comfortable";

const CommandDensityContext = createContext<Density>("comfortable");

const CommandCloseContext = createContext<(() => void) | null>(null);

/** Command palette / searchable list built on Base UI Autocomplete (inline mode). */
export function Command(
  props: React.ComponentProps<typeof AutocompletePrimitive.Root>,
): React.ReactElement {
  return <AutocompletePrimitive.Root data-slot="command" inline {...props} />;
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
          "h-12 w-full flex-1 border-none bg-transparent text-body-14 text-ink placeholder:text-ink-subtle outline-none ring-0 focus:outline-none focus:ring-0",
          prefix ? "ps-0" : "ps-4",
          action ? "pe-2" : "pe-4",
          className,
        )}
        {...props}
      />
      {action && (
        <span
          className="flex shrink-0 items-center gap-1.5 pe-3 text-caption-12 text-ink-muted"
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
          "px-3 py-6 text-center text-caption-12 text-ink-muted",
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
      className={cn(
        itemRow.base,
        "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        iconMuted,
        density === "compact"
          ? itemRow.compact
          : "min-h-11 px-3 py-2.5 text-body-14 [&_svg:not([class*='size-'])]:size-[18px]",
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
          <span className="mt-0.5 truncate text-caption-12 text-ink-muted">
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

/** Floating command palette (not modal, no scrim). Escape and outside clicks dismiss. */
export function CommandDialog({
  open,
  onOpenChange,
  children,
  ...commandProps
}: CommandDialogProps): React.ReactElement | null {
  const close = () => onOpenChange?.(false);
  const isOpen = open ?? false;

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: (next) => {
      if (!next) close();
    },
  });
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context, { role: "dialog" });
  const { getFloatingProps } = useInteractions([dismiss, role]);

  const reduceMotion = useReducedMotion();

  return (
    <FloatingPortal>
      <AnimatePresence>
        {isOpen && (
          // pointer-events-auto on the wrapper routes outside clicks to useDismiss
          // instead of the app behind the palette.
          <div
            className="fixed inset-0 z-[80] flex items-start justify-center p-4 pt-[15vh] pointer-events-auto"
            data-slot="command-dialog-overlay"
          >
            <FloatingFocusManager context={context} modal={false}>
              <motion.div
                ref={refs.setFloating}
                {...getFloatingProps()}
                data-slot="command-dialog"
                aria-modal="true"
                className={cn(
                  popupSurface,
                  "flex w-full max-w-xl max-h-[70vh] flex-col overflow-hidden",
                )}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        mass: 0.6,
                      }
                }
              >
                <CommandCloseContext.Provider value={close}>
                  <Command {...commandProps}>{children}</Command>
                </CommandCloseContext.Provider>
              </motion.div>
            </FloatingFocusManager>
          </div>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
}

export { AutocompletePrimitive };
