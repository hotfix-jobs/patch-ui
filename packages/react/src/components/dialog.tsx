"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import type * as React from "react";
import { RemoveScroll } from "react-remove-scroll";
import { cn } from "../utils";
import { focusRing } from "../recipes";

export const DialogCreateHandle: typeof DialogPrimitive.createHandle =
  DialogPrimitive.createHandle;

export const Dialog: typeof DialogPrimitive.Root = DialogPrimitive.Root;

export function DialogTrigger(
  props: DialogPrimitive.Trigger.Props,
): React.ReactElement {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

export function DialogClose(
  props: DialogPrimitive.Close.Props,
): React.ReactElement {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

export function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
}): React.ReactElement {
  return (
    <DialogPrimitive.Portal>
      {/* noIsolation: react-remove-scroll's default pointer-event lockout
          isolates the dialog's tree, but that also blocks portaled popups
          (Select, Menu, Tooltip) from receiving clicks. The Dialog's own
          modal/backdrop already handles outside-click dismissal, so the
          isolation is duplicative — turning it off lets nested portals
          work without sacrificing scroll lock or backdrop dismiss. */}
      <RemoveScroll noIsolation>
      <DialogPrimitive.Backdrop
        className="fixed inset-0 z-50 bg-black/60 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0"
        data-slot="dialog-backdrop"
      />
      <DialogPrimitive.Viewport
        className="fixed inset-0 z-50 grid grid-rows-[1fr_auto_3fr] justify-items-center p-4 max-sm:grid-rows-[1fr_auto] max-sm:p-0 max-sm:pt-12"
        data-slot="dialog-viewport"
      >
        <DialogPrimitive.Popup
          className={cn(
            "relative row-start-2 flex max-h-full min-h-0 w-full min-w-0 max-w-lg origin-center flex-col rounded-[var(--radius-patch-lg)] bg-patch-surface text-patch-text border-[0.5px] border-[var(--patch-border)] shadow-patch-overlay transition-[scale,opacity] duration-[250ms] ease-[var(--ease-patch-spring)] data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-starting-style:scale-[0.97] data-starting-style:opacity-0 max-sm:max-w-none max-sm:rounded-none max-sm:border-0",
            className,
          )}
          data-slot="dialog-popup"
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close
              aria-label="Close"
              className={cn("absolute end-3 top-3 flex h-7 w-7 items-center justify-center rounded-[var(--radius-patch-sm)] text-patch-text-tertiary transition-colors duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)] hover:bg-patch-surface-hover hover:text-patch-text", focusRing)}
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
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Viewport>
      </RemoveScroll>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  // pr-12 reserves space for the absolute-positioned X close button
  // (end-3 top-3, h-7 w-7) so titles never overlap it.
  return (
    <div
      className={cn("flex flex-col gap-2 p-4 pr-12", className)}
      data-slot="dialog-header"
      {...props}
    />
  );
}

export function DialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 px-4 py-3 sm:flex-row sm:justify-end",
        className,
      )}
      data-slot="dialog-footer"
      {...props}
    />
  );
}

export function DialogTitle({
  className,
  ...props
}: DialogPrimitive.Title.Props): React.ReactElement {
  return (
    <DialogPrimitive.Title
      className={cn("font-semibold text-[length:var(--text-patch-body)] leading-none text-patch-text", className)}
      data-slot="dialog-title"
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props): React.ReactElement {
  return (
    <DialogPrimitive.Description
      className={cn("text-patch-text-tertiary text-[length:var(--text-patch-mini)]", className)}
      data-slot="dialog-description"
      {...props}
    />
  );
}

export function DialogPanel({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex-1 overflow-y-auto p-4", className)}
      data-slot="dialog-panel"
      {...props}
    />
  );
}

export { DialogPrimitive };
