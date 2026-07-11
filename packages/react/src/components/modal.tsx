"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "@phosphor-icons/react/dist/ssr";
import {
  Children,
  isValidElement,
  useCallback,
} from "react";
import type * as React from "react";
import { cn } from "../utils";
import { selectionFocus } from "../recipes";
import { Button, type ButtonProps } from "./button";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  full: "sm:max-w-none",
};

export interface ModalProps {
  active: boolean;
  onClickOutside?: () => void;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  /** Max-width on tablet+; mobile uses narrow viewport gutters. Default `md`. */
  size?: ModalSize;
  /** Auto-render a close X in the top-right corner. Defaults to true when
   *  there are no `<ModalActions>` in the tree, false when there are. */
  showClose?: boolean;
  className?: string;
  children: React.ReactNode;
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

export function Modal({
  active,
  onClickOutside,
  initialFocusRef,
  size = "md",
  showClose,
  className,
  children,
}: ModalProps): React.ReactElement {
  const resolvedShowClose =
    showClose ?? !hasChildOfType(children, ModalActions);

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) onClickOutside?.();
    },
    [onClickOutside],
  );

  return (
    <DialogPrimitive.Root open={active} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          data-slot="modal-backdrop"
          className={cn(
            "fixed inset-0 z-50 bg-white/60 dark:bg-black/60",
            "transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
            "data-starting-style:opacity-0 data-ending-style:opacity-0",
          )}
        />
        <DialogPrimitive.Popup
          data-slot="modal-popup"
          initialFocus={initialFocusRef}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 flex w-[calc(100vw-1rem)] min-w-0 min-h-0 -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[var(--radius-12)] bg-layer-1 text-ink border border-hairline shadow-modal max-h-[calc(100dvh-2rem)] sm:w-full",
            SIZE_CLASSES[size],
            "transition-[opacity,transform,scale] duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
            "data-starting-style:scale-97 data-starting-style:opacity-0 data-ending-style:scale-97 data-ending-style:opacity-0",
            className,
          )}
        >
          {resolvedShowClose && (
            <ModalClose className="absolute top-2 end-2 z-10" />
          )}
          {children}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export interface ModalHeaderProps extends React.ComponentProps<"div"> {
  /** Content pinned to the leading edge of the header row. When set,
   *  switches the header to a three-slot row layout: leading /
   *  children (center) / trailing. */
  leading?: React.ReactNode;
  /** Content pinned to the trailing edge. */
  trailing?: React.ReactNode;
}

export function ModalHeader({
  className,
  leading,
  trailing,
  children,
  ...props
}: ModalHeaderProps): React.ReactElement {
  const isRow = leading != null || trailing != null;
  if (isRow) {
    return (
      <div
        data-slot="modal-header"
        className={cn(
          "flex h-11 shrink-0 items-center justify-between gap-3 px-4",
          className,
        )}
        {...props}
      >
        <div className="flex min-w-0 flex-1 basis-0 items-center gap-2 text-mini text-ink-muted">
          {leading}
        </div>
        <div className="flex min-w-0 items-center gap-2 text-small font-medium text-ink">
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
      data-slot="modal-header"
      className={cn(
        "flex flex-col gap-1 px-5 pt-5 pb-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function ModalTitle({
  className,
  ...props
}: React.ComponentProps<"h2">): React.ReactElement {
  return (
    <DialogPrimitive.Title
      data-slot="modal-title"
      className={cn("text-regular font-medium text-ink", className)}
      {...props}
    />
  );
}

export function ModalSubtitle({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  return (
    <DialogPrimitive.Description
      data-slot="modal-subtitle"
      className={cn("text-small text-ink-muted", className)}
      {...props}
    />
  );
}

export function ModalClose({
  className,
  ...props
}: React.ComponentProps<"button">): React.ReactElement {
  return (
    <DialogPrimitive.Close
      aria-label="Close"
      data-slot="modal-close"
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-8)] text-ink-muted hover:bg-layer-hover hover:text-ink active:bg-layer-hover transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        selectionFocus,
        className,
      )}
      {...props}
    >
      <X aria-hidden className="size-4" />
    </DialogPrimitive.Close>
  );
}

export function ModalBody({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      data-slot="modal-body"
      className={cn(
        "flex flex-col gap-4 p-5 flex-1 min-h-0 overflow-y-auto",
        className,
      )}
      {...props}
    />
  );
}

export function ModalInset({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      data-slot="modal-inset"
      className={cn(
        "rounded-[var(--radius-8)] bg-fill-1 p-4",
        className,
      )}
      {...props}
    />
  );
}

export interface ModalActionsProps extends React.ComponentProps<"div"> {
  /** Stack actions vertically full-width. */
  stacked?: boolean;
}

export function ModalActions({
  className,
  stacked = false,
  ...props
}: ModalActionsProps): React.ReactElement {
  return (
    <div
      data-slot="modal-actions"
      className={cn(
        "flex gap-2 px-5 pt-2 pb-5",
        stacked ? "flex-col" : "flex-row justify-between",
        className,
      )}
      {...props}
    />
  );
}

export interface ModalActionProps extends Omit<ButtonProps, "variant"> {
  /** Default `secondary`. */
  variant?: ButtonProps["variant"];
  fullWidth?: boolean;
}

export function ModalAction({
  variant = "secondary",
  fullWidth,
  className,
  ...props
}: ModalActionProps): React.ReactElement {
  return (
    <Button
      variant={variant}
      data-slot="modal-action"
      className={cn(fullWidth && "w-full", className)}
      {...props}
    />
  );
}

export { DialogPrimitive as ModalPrimitive };
