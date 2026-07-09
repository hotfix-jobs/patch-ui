"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import {
  CheckCircle,
  Info,
  Warning,
  WarningCircle,
  X,
} from "@phosphor-icons/react/dist/ssr";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing } from "../recipes";
import { Spinner } from "./spinner";

/* ----------------------------- types ----------------------------- */

export type ToastType =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastAction {
  label: React.ReactNode;
  onClick: () => void;
}

export interface ToastOptions {
  id?: string;
  description?: React.ReactNode;
  duration?: number;
  action?: ToastAction;
}

type ToastData = {
  action?: ToastAction;
};

/* --------------------------- manager --------------------------- */

const DEFAULT_DURATIONS: Record<ToastType, number> = {
  default: 5000,
  success: 5000,
  info: 5000,
  warning: 6000,
  error: 7000,
  loading: 0,
};

const HIGH_PRIORITY: Partial<Record<ToastType, true>> = {
  warning: true,
  error: true,
};

const manager = ToastPrimitive.createToastManager<ToastData>();

function addToast(type: ToastType, title: React.ReactNode, options?: ToastOptions): string {
  return manager.add({
    id: options?.id,
    type,
    title,
    description: options?.description,
    timeout: options?.duration ?? DEFAULT_DURATIONS[type],
    priority: HIGH_PRIORITY[type] ? "high" : "low",
    data: options?.action ? { action: options.action } : undefined,
  });
}

type ToastFn = (title: React.ReactNode, options?: ToastOptions) => string;

interface ToastApi extends ToastFn {
  success: ToastFn;
  error: ToastFn;
  warning: ToastFn;
  info: ToastFn;
  loading: ToastFn;
  dismiss: (id?: string) => void;
}

export const toast: ToastApi = Object.assign(
  ((title, options) => addToast("default", title, options)) as ToastFn,
  {
    success: (title, options) => addToast("success", title, options),
    error: (title, options) => addToast("error", title, options),
    warning: (title, options) => addToast("warning", title, options),
    info: (title, options) => addToast("info", title, options),
    loading: (title, options) => addToast("loading", title, options),
    dismiss: (id?: string) => manager.close(id),
  } satisfies Omit<ToastApi, keyof ToastFn>,
);

/* --------------------------- Toaster --------------------------- */

const POSITION_CLASSES: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4 sm:top-6 sm:left-6",
  "top-center": "top-4 left-1/2 -translate-x-1/2 sm:top-6",
  "top-right": "top-4 right-4 sm:top-6 sm:right-6",
  "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6",
  "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6",
};

function isTopPosition(p: ToastPosition): boolean {
  return p.startsWith("top");
}

export interface ToasterProps {
  position?: ToastPosition;
  visibleToasts?: number;
  toastWidth?: number;
  className?: string;
}

export function Toaster({
  position = "bottom-right",
  visibleToasts = 3,
  toastWidth = 360,
  className,
}: ToasterProps): React.ReactElement {
  return (
    <ToastPrimitive.Provider toastManager={manager} limit={visibleToasts}>
      <ToastPrimitive.Viewport
        data-slot="toaster"
        data-position={position}
        className={cn(
          "pointer-events-none fixed z-90",
          POSITION_CLASSES[position],
          className,
        )}
        style={{ width: toastWidth }}
      >
        <ToastList position={position} />
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Provider>
  );
}

/* --------------------------- ToastList --------------------------- */

const TYPE_ICON: Record<string, React.ReactNode> = {
  success: <CheckCircle className="size-4 text-success" />,
  error: <WarningCircle className="size-4 text-error" />,
  warning: <Warning className="size-4 text-warning" />,
  info: <Info className="size-4 text-ink-muted" />,
  loading: <Spinner size="sm" className="text-ink-muted" />,
};

function ToastList({ position }: { position: ToastPosition }): React.ReactElement {
  const { toasts } = ToastPrimitive.useToastManager<ToastData>();
  const top = isTopPosition(position);

  return (
    <>
      {toasts.map((t) => {
        const icon = t.type ? TYPE_ICON[t.type] : null;
        const action = t.data?.action;
        return (
          <ToastPrimitive.Root
            key={t.id}
            toast={t}
            swipeDirection={top ? ["up", "right"] : ["down", "right"]}
            data-slot="toast"
            data-type={t.type ?? "default"}
            className={cn(
              "pointer-events-auto absolute w-full select-none",
              "rounded-[var(--radius-12)]",
              "bg-layer-1 text-ink",
              "border border-hairline shadow-modal",
              "px-3 py-3 pe-10",
              "flex items-start gap-2.5",
              // Stacking + transitions via Base UI CSS variables
              top
                ? "top-0 [transform:translateY(calc(var(--toast-index)*var(--toast-swipe-movement-y,0px)+var(--toast-index)*8px))_scale(calc(1-var(--toast-index)*0.05))]"
                : "bottom-0 [transform:translateY(calc(var(--toast-index)*-8px+var(--toast-swipe-movement-y,0px)))_scale(calc(1-var(--toast-index)*0.05))]",
              "transition-[transform,opacity] duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
              "data-[starting-style]:opacity-0",
              top
                ? "data-[starting-style]:-translate-y-4 data-[ending-style]:-translate-y-4"
                : "data-[starting-style]:translate-y-4 data-[ending-style]:translate-y-4",
              "data-[ending-style]:opacity-0",
              "[[data-expanded]_&]:!translate-y-[var(--toast-offset-y)] [[data-expanded]_&]:!scale-100",
            )}
          >
            {icon && (
              <span className="mt-px shrink-0" data-slot="toast-icon">
                {icon}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <ToastPrimitive.Title
                className="text-small font-medium leading-tight text-ink"
                data-slot="toast-title"
              />
              <ToastPrimitive.Description
                className="mt-0.5 text-mini leading-snug text-ink-muted data-[empty]:hidden"
                data-slot="toast-description"
              />
              {action && (
                <ToastPrimitive.Action
                  onClick={action.onClick}
                  className={cn(
                    "mt-2 inline-flex items-center justify-center",
                    "rounded-[var(--radius-8)] border border-hairline",
                    "bg-layer-1 px-2.5 py-1",
                    "text-small font-medium text-ink",
                    "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
                    "hover:bg-layer-2 hover:border-hairline-strong",
                    focusRing,
                  )}
                  data-slot="toast-action"
                >
                  {action.label}
                </ToastPrimitive.Action>
              )}
            </div>
            <ToastPrimitive.Close
              aria-label="Dismiss"
              data-slot="toast-close"
              className={cn(
                "absolute top-1/2 -translate-y-1/2 end-2",
                "flex size-7 items-center justify-center",
                "rounded-full text-ink-muted",
                "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
                "hover:bg-layer-hover hover:text-ink",
                focusRing,
              )}
            >
              <X className="size-3.5" aria-hidden />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        );
      })}
    </>
  );
}

export { ToastPrimitive };
