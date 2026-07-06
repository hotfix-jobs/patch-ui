"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { X } from "@phosphor-icons/react/dist/ssr";
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
} from "react";
import type * as React from "react";
import { cn } from "../utils";

export type SheetSide = "top" | "right" | "bottom" | "left";

const SIDE_TO_SWIPE: Record<SheetSide, "up" | "down" | "left" | "right"> = {
  top: "up",
  right: "right",
  bottom: "down",
  left: "left",
};

/* --------------------------------- Root -------------------------------- */

export interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  /** Edge the drawer slides from. Default `right`. */
  side?: SheetSide;
  children: React.ReactNode;
}

export function Sheet({
  open,
  onOpenChange,
  defaultOpen = false,
  side = "right",
  children,
}: SheetProps): React.ReactElement {
  return (
    <DrawerPrimitive.Root
      open={open}
      onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}
      defaultOpen={defaultOpen}
      swipeDirection={SIDE_TO_SWIPE[side]}
    >
      <SheetSideContext.Provider value={side}>
        {children}
      </SheetSideContext.Provider>
    </DrawerPrimitive.Root>
  );
}

const SheetSideContext = createContext<SheetSide>("right");

/* ------------------------------- Trigger ------------------------------- */

export type SheetTriggerProps = React.ComponentProps<
  typeof DrawerPrimitive.Trigger
>;

export function SheetTrigger(props: SheetTriggerProps): React.ReactElement {
  return <DrawerPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

/* ------------------------------- Content ------------------------------- */

const SIDE_LAYOUT: Record<SheetSide, string> = {
  right:
    "top-0 bottom-0 right-0 w-[85vw] max-w-md border-l border-hairline rounded-l-[var(--radius-12)]",
  left:
    "top-0 bottom-0 left-0 w-[85vw] max-w-md border-r border-hairline rounded-r-[var(--radius-12)]",
  top: "top-0 left-0 right-0 border-b border-hairline rounded-b-[var(--radius-12)]",
  bottom:
    "bottom-0 left-0 right-0 border-t border-hairline rounded-t-[var(--radius-12)]",
};

const SIDE_ENTER: Record<SheetSide, string> = {
  right:
    "data-starting-style:translate-x-full data-ending-style:translate-x-full",
  left:
    "data-starting-style:-translate-x-full data-ending-style:-translate-x-full",
  top: "data-starting-style:-translate-y-full data-ending-style:-translate-y-full",
  bottom:
    "data-starting-style:translate-y-full data-ending-style:translate-y-full",
};

export interface SheetContentProps
  extends Omit<
    React.ComponentProps<typeof DrawerPrimitive.Popup>,
    "children"
  > {
  /** @deprecated Pass `side` on the parent `<Sheet>` instead. */
  side?: SheetSide;
  /** Auto-render a close X in the top-right corner. Defaults to true
   *  when there's no `<SheetFooter>` in the tree, false when there is. */
  showClose?: boolean;
  children?: React.ReactNode;
}

function hasChildOfType(
  children: React.ReactNode,
  Component: React.ComponentType,
): boolean {
  let found = false;
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === Component) found = true;
  });
  return found;
}

export function SheetContent({
  side: sideProp,
  showClose,
  className,
  children,
  ...props
}: SheetContentProps): React.ReactElement {
  const contextSide = useContext(SheetSideContext);
  const side = sideProp ?? contextSide;
  const resolvedShowClose =
    showClose ?? !hasChildOfType(children, SheetFooter);

  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Backdrop
        data-slot="sheet-backdrop"
        className={cn(
          "fixed inset-0 z-70 bg-white/60 dark:bg-black/60",
          "transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
          "data-starting-style:opacity-0 data-ending-style:opacity-0",
        )}
      />
      <DrawerPrimitive.Viewport className="fixed inset-0 z-70">
        <DrawerPrimitive.Popup
          data-slot="sheet-popup"
          data-side={side}
          className={cn(
            "fixed flex flex-col overflow-hidden bg-surface-elevated text-ink shadow-modal",
            SIDE_LAYOUT[side],
            "transition-transform duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
            SIDE_ENTER[side],
            className,
          )}
          {...props}
        >
          {resolvedShowClose && (
            <SheetClose className="absolute top-2 end-2 z-10" />
          )}
          {children}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPrimitive.Portal>
  );
}

/* -------------------------------- Close -------------------------------- */

export interface SheetCloseProps {
  render?: React.ReactElement;
  children?: React.ReactNode;
}

export function SheetClose({
  render,
  children,
  className,
  ...rest
}: SheetCloseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  if (render && isValidElement(render)) {
    return (
      <DrawerPrimitive.Close
        data-slot="sheet-close"
        render={cloneElement(render, {
          children:
            (render.props as { children?: React.ReactNode }).children ??
            children,
        } as React.HTMLAttributes<HTMLElement>)}
        {...rest}
      />
    );
  }

  if (children != null) {
    return (
      <DrawerPrimitive.Close
        data-slot="sheet-close"
        className={className}
        {...rest}
      >
        {children}
      </DrawerPrimitive.Close>
    );
  }

  return (
    <DrawerPrimitive.Close
      aria-label="Close"
      data-slot="sheet-close"
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-surface-2 hover:text-ink transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        className,
      )}
      {...rest}
    >
      <X aria-hidden className="size-4" />
    </DrawerPrimitive.Close>
  );
}

/* -------------------------- Header / Title / Desc -------------------- */

export interface SheetHeaderProps extends React.ComponentProps<"div"> {
  /** Content pinned to the leading edge. When set, switches the header
   *  to a three-slot row layout: leading / children / trailing. */
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

export function SheetHeader({
  className,
  leading,
  trailing,
  children,
  ...props
}: SheetHeaderProps): React.ReactElement {
  const isRow = leading != null || trailing != null;
  if (isRow) {
    return (
      <div
        data-slot="sheet-header"
        className={cn(
          "flex h-11 shrink-0 items-center justify-between gap-3 border-b border-hairline px-4",
          className,
        )}
        {...props}
      >
        <div className="flex min-w-0 flex-1 basis-0 items-center gap-2 text-caption-12 text-ink-muted">
          {leading}
        </div>
        <div className="flex min-w-0 items-center gap-2 text-button-14 text-ink">
          {children}
        </div>
        <div className="flex min-w-0 flex-1 basis-0 items-center justify-end gap-2">
          {trailing}
        </div>
      </div>
    );
  }
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex flex-col gap-1 border-b border-hairline px-5 py-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SheetTitle({
  className,
  ...props
}: React.ComponentProps<"h2">): React.ReactElement {
  return (
    <DrawerPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-button-16 text-ink", className)}
      {...props}
    />
  );
}

export function SheetDescription({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  return (
    <DrawerPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-body-14 text-ink-muted", className)}
      {...props}
    />
  );
}

/* --------------------------------- Body -------------------------------- */

export function SheetBody({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      data-slot="sheet-body"
      className={cn(
        "flex flex-col gap-4 p-5 flex-1 min-h-0 overflow-y-auto",
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------- Footer ------------------------------ */

export interface SheetFooterProps extends React.ComponentProps<"div"> {
  /** Stack actions vertically full-width. */
  stacked?: boolean;
}

export function SheetFooter({
  className,
  stacked = false,
  ...props
}: SheetFooterProps): React.ReactElement {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "flex gap-2 border-t border-hairline px-5 py-3",
        stacked ? "flex-col" : "flex-row justify-between",
        className,
      )}
      {...props}
    />
  );
}

export { DrawerPrimitive as SheetPrimitive };
