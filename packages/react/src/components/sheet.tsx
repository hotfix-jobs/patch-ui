"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import type * as React from "react";
import { RemoveScroll } from "react-remove-scroll";
import { cn } from "../utils";
import { focusRing } from "../recipes";

export const Sheet: typeof DrawerPrimitive.Root = DrawerPrimitive.Root;

export function SheetTrigger(
  props: DrawerPrimitive.Trigger.Props,
): React.ReactElement {
  return <DrawerPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

export function SheetClose(
  props: DrawerPrimitive.Close.Props,
): React.ReactElement {
  const nativeButton = props.render ? false : props.nativeButton;
  return <DrawerPrimitive.Close data-slot="sheet-close" {...props} nativeButton={nativeButton} />;
}

export function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: DrawerPrimitive.Popup.Props & {
  side?: "right" | "left" | "top" | "bottom";
  showCloseButton?: boolean;
}): React.ReactElement {
  return (
    <DrawerPrimitive.Portal>
      {/* noIsolation: react-remove-scroll's default pointer-event lockout
          isolates the sheet's tree, but that also blocks portaled popups
          (Select, Menu, Tooltip) from receiving clicks. The Drawer's own
          modal/backdrop already handles outside-click dismissal, so the
          isolation is duplicative — turning it off lets nested portals
          work without sacrificing scroll lock or backdrop dismiss. */}
      <RemoveScroll noIsolation>
      <DrawerPrimitive.Backdrop
        className="fixed inset-0 z-70 bg-black/60 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0"
        data-slot="sheet-backdrop"
      />
      {/* Drawer.Viewport is required for the popup's transition lifecycle
          (data-starting-style / data-ending-style) and swipe handling.
          Without it, Base UI logs a warning and the sheet appears/disappears
          with no animation. */}
      <DrawerPrimitive.Viewport className="fixed inset-0 z-70 pointer-events-none">
      <DrawerPrimitive.Popup
        className={cn(
          "fixed z-70 flex flex-col bg-patch-surface text-patch-text border-[0.5px] border-[var(--dialog-border)] shadow-patch-overlay pointer-events-auto transition-transform duration-[var(--duration-patch-spring)] ease-[var(--ease-patch-out)]",
          side === "right" &&
            "inset-y-0 right-0 h-full w-full max-w-md rounded-l-[var(--radius-patch-lg)] data-ending-style:translate-x-full data-starting-style:translate-x-full",
          side === "left" &&
            "inset-y-0 left-0 h-full w-full max-w-md rounded-r-[var(--radius-patch-lg)] data-ending-style:-translate-x-full data-starting-style:-translate-x-full",
          side === "top" &&
            "inset-x-0 top-0 w-full rounded-b-[var(--radius-patch-lg)] data-ending-style:-translate-y-full data-starting-style:-translate-y-full",
          side === "bottom" &&
            "inset-x-0 bottom-0 w-full rounded-t-[var(--radius-patch-lg)] data-ending-style:translate-y-full data-starting-style:translate-y-full",
          className,
        )}
        data-slot="sheet-popup"
        {...props}
      >
        {children}
        {showCloseButton && (
          <DrawerPrimitive.Close
            aria-label="Close"
            className={cn("absolute end-3 top-5 flex h-7 w-7 items-center justify-center rounded-[var(--radius-patch-sm)] text-patch-text-tertiary transition-colors duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)] hover:bg-patch-surface-hover hover:text-patch-text", focusRing)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </DrawerPrimitive.Close>
        )}
      </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
      </RemoveScroll>
    </DrawerPrimitive.Portal>
  );
}

export function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex flex-col gap-2 p-6", className)}
      data-slot="sheet-header"
      {...props}
    />
  );
}

export function SheetTitle({
  className,
  ...props
}: DrawerPrimitive.Title.Props): React.ReactElement {
  return (
    <DrawerPrimitive.Title
      className={cn("font-semibold text-lg leading-none text-patch-text", className)}
      data-slot="sheet-title"
      {...props}
    />
  );
}

export function SheetDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props): React.ReactElement {
  return (
    <DrawerPrimitive.Description
      className={cn("text-patch-text-secondary text-sm", className)}
      data-slot="sheet-description"
      {...props}
    />
  );
}

export function SheetPanel({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex-1 overflow-y-auto p-6", className)}
      data-slot="sheet-panel"
      {...props}
    />
  );
}

export function SheetFooter({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 border-t-[0.5px] border-patch-border px-6 py-4 sm:flex-row sm:justify-end",
        className,
      )}
      data-slot="sheet-footer"
      {...props}
    />
  );
}

export function SheetHandle({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex justify-center pt-2 pb-1", className)}
      data-slot="sheet-handle"
      {...props}
    >
      <div className="h-1 w-8 rounded-full bg-[#333]" />
    </div>
  );
}

export { DrawerPrimitive as SheetPrimitive };
