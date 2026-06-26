"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  CircleAlert,
  CircleCheck,
  Info,
  Loader,
  TriangleAlert,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const emptySubscribe = () => () => {};
function useMounted(): boolean {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
import type * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils";
import { focusRing } from "../recipes";

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

interface ToastData {
  id: string;
  type: ToastType;
  title: React.ReactNode;
  description?: React.ReactNode;
  duration: number;
  action?: ToastAction;
}

/* ----------------------------- store ----------------------------- */

const DEFAULT_DURATIONS: Record<ToastType, number> = {
  default: 5000,
  success: 5000,
  info: 5000,
  warning: 6000,
  error: 7000,
  loading: Number.POSITIVE_INFINITY,
};

type Listener = () => void;

class ToastStore {
  private toasts: ToastData[] = [];
  private listeners = new Set<Listener>();
  private idCounter = 0;

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getSnapshot = (): ToastData[] => this.toasts;

  private emit() {
    this.listeners.forEach((l) => l());
  }

  private nextId(): string {
    this.idCounter += 1;
    return `t${this.idCounter}`;
  }

  add(input: {
    type?: ToastType;
    title: React.ReactNode;
    description?: React.ReactNode;
    duration?: number;
    action?: ToastAction;
    id?: string;
  }): string {
    const type = input.type ?? "default";
    const id = input.id ?? this.nextId();
    const duration = input.duration ?? DEFAULT_DURATIONS[type];
    const next: ToastData = {
      id,
      type,
      title: input.title,
      description: input.description,
      duration,
      action: input.action,
    };
    // Replace if id already present (used by update()); otherwise append.
    const existingIndex = this.toasts.findIndex((t) => t.id === id);
    if (existingIndex >= 0) {
      this.toasts = [
        ...this.toasts.slice(0, existingIndex),
        next,
        ...this.toasts.slice(existingIndex + 1),
      ];
    } else {
      this.toasts = [...this.toasts, next];
    }
    this.emit();
    return id;
  }

  dismiss(id?: string): void {
    this.toasts = id == null ? [] : this.toasts.filter((t) => t.id !== id);
    this.emit();
  }
}

const store = new ToastStore();

/* --------------------------- public API --------------------------- */

type ToastFn = (
  title: React.ReactNode,
  options?: ToastOptions,
) => string;

interface ToastApi extends ToastFn {
  success: ToastFn;
  error: ToastFn;
  warning: ToastFn;
  info: ToastFn;
  loading: ToastFn;
  dismiss: (id?: string) => void;
}

function createToastFn(type: ToastType): ToastFn {
  return (title, options) =>
    store.add({
      type,
      title,
      description: options?.description,
      duration: options?.duration,
      action: options?.action,
      id: options?.id,
    });
}

export const toast: ToastApi = Object.assign(createToastFn("default"), {
  success: createToastFn("success"),
  error: createToastFn("error"),
  warning: createToastFn("warning"),
  info: createToastFn("info"),
  loading: createToastFn("loading"),
  dismiss: (id?: string) => store.dismiss(id),
});

/* --------------------------- Toaster --------------------------- */

const TYPE_ICON: Record<ToastType, React.ReactNode | null> = {
  default: null,
  success: <CircleCheck className="size-4 text-[var(--badge-success-text)]" />,
  error: <CircleAlert className="size-4 text-[var(--badge-danger-text)]" />,
  warning: (
    <TriangleAlert className="size-4 text-[var(--badge-warning-text)]" />
  ),
  info: <Info className="size-4 text-patch-text-secondary" />,
  loading: (
    <Loader className="size-4 animate-spin text-patch-text-secondary" />
  ),
};

const TYPE_ARIA_LIVE: Record<ToastType, "polite" | "assertive"> = {
  default: "polite",
  success: "polite",
  info: "polite",
  loading: "polite",
  warning: "assertive",
  error: "assertive",
};

const POSITION_CLASSES: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4 sm:top-6 sm:left-6 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 sm:top-6 items-center",
  "top-right": "top-4 right-4 sm:top-6 sm:right-6 items-end",
  "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6 items-start",
  "bottom-center":
    "bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6 items-center",
  "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6 items-end",
};

function isTopPosition(p: ToastPosition): boolean {
  return p.startsWith("top");
}

export interface ToasterProps {
  position?: ToastPosition;
  visibleToasts?: number;
  gap?: number;
  toastWidth?: number;
  className?: string;
}

export function Toaster({
  position = "bottom-right",
  visibleToasts = 3,
  gap = 8,
  toastWidth = 360,
  className,
}: ToasterProps): React.ReactPortal | null {
  const toasts = useSyncExternalStore(
    (l) => store.subscribe(l),
    store.getSnapshot,
    store.getSnapshot,
  );
  const mounted = useMounted();
  const [isPaused, setIsPaused] = useState(false);

  // Newest at end of array; show most-recent N. For top positions we want
  // newest visually at the top; for bottom positions, newest at the bottom.
  const visible = useMemo(() => {
    const slice = toasts.slice(-visibleToasts);
    return isTopPosition(position) ? slice.reverse() : slice;
  }, [toasts, visibleToasts, position]);

  if (!mounted) return null;

  const topPos = isTopPosition(position);

  return createPortal(
    <div
      role="region"
      aria-label="Notifications"
      data-slot="toaster"
      className={cn(
        "pointer-events-none fixed z-90 flex flex-col",
        POSITION_CLASSES[position],
        className,
      )}
      style={{ width: toastWidth, gap }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {visible.map((t, idx) => {
          const stackIndex = topPos ? idx : visible.length - 1 - idx;
          return (
            <ToastItem
              key={t.id}
              toast={t}
              stackIndex={stackIndex}
              isPaused={isPaused}
              position={position}
            />
          );
        })}
      </AnimatePresence>
    </div>,
    document.body,
  );
}

/* --------------------------- ToastItem --------------------------- */

function ToastItem({
  toast: t,
  stackIndex,
  isPaused,
  position,
}: {
  toast: ToastData;
  stackIndex: number;
  isPaused: boolean;
  position: ToastPosition;
}): React.ReactElement {
  const reduceMotion = useReducedMotion();
  const topPos = isTopPosition(position);
  const enterY = topPos ? -16 : 16;

  // Stacking: only the front toast is fully visible; behind toasts scale
  // down and lose opacity. stackIndex 0 is frontmost (visible).
  const isFront = stackIndex === 0;
  const stackScale = Math.max(0, 1 - stackIndex * 0.05);
  const stackOpacity = stackIndex === 0 ? 1 : Math.max(0, 1 - stackIndex * 0.3);
  // Peek the stack by translating behind toasts slightly toward the viewport
  // edge (visually layering).
  const stackOffset = stackIndex * 6 * (topPos ? 1 : -1);

  const variants: Variants = {
    initial: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: enterY, scale: 0.96 },
    animate: reduceMotion
      ? { opacity: stackOpacity }
      : {
          opacity: stackOpacity,
          y: stackOffset,
          scale: stackScale,
        },
    exit: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: enterY, scale: 0.96 },
  };

  // Auto-dismiss timer with pause-on-hover. Resumes from remaining time.
  const remainingRef = useRef(t.duration);
  const startedAtRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const dismiss = useCallback(() => {
    clear();
    store.dismiss(t.id);
  }, [clear, t.id]);

  useEffect(() => {
    // Only the frontmost toast counts down — toasts behind in the stack
    // are visually hidden anyway and would dismiss out of order.
    if (!isFront) return;
    if (!Number.isFinite(t.duration)) return;

    if (isPaused) {
      if (timerRef.current && startedAtRef.current) {
        const elapsed = performance.now() - startedAtRef.current;
        remainingRef.current = Math.max(0, remainingRef.current - elapsed);
        clear();
      }
      return;
    }

    startedAtRef.current = performance.now();
    timerRef.current = setTimeout(() => {
      store.dismiss(t.id);
    }, remainingRef.current);

    return clear;
  }, [isFront, isPaused, t.id, t.duration, clear]);

  const icon = TYPE_ICON[t.type];
  const ariaLive = TYPE_ARIA_LIVE[t.type];

  return (
    <motion.div
      layout
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 380,
              damping: 36,
              mass: 0.7,
              opacity: { duration: 0.18 },
            }
      }
      role="status"
      aria-live={ariaLive}
      aria-atomic="true"
      data-slot="toast"
      data-type={t.type}
      className={cn(
        "pointer-events-auto relative w-full select-none",
        "rounded-[var(--radius-patch-sm)] border-[0.5px] border-[var(--patch-border)]",
        "bg-patch-surface text-patch-text",
        "shadow-patch-popup",
        "px-3 py-3 pe-10",
        "flex items-start gap-2.5",
        "tracking-[var(--tracking-patch-small)]",
      )}
      style={{ originX: 0.5, originY: topPos ? 0 : 1 }}
    >
      {icon && (
        <span className="mt-px shrink-0" data-slot="toast-icon">
          {icon}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div
          className="text-[length:var(--text-patch-control)] font-semibold leading-tight text-patch-text"
          data-slot="toast-title"
        >
          {t.title}
        </div>
        {t.description != null && (
          <div
            className="mt-0.5 text-[length:var(--text-patch-mini)] leading-snug text-patch-text-secondary"
            data-slot="toast-description"
          >
            {t.description}
          </div>
        )}
        {t.action && (
          <button
            type="button"
            onClick={() => {
              t.action?.onClick();
              dismiss();
            }}
            className={cn(
              "mt-2 inline-flex items-center justify-center",
              "rounded-[var(--radius-patch-sm)] border-[0.5px] border-[var(--patch-border)]",
              "bg-transparent px-2.5 py-1",
              "text-[length:var(--text-patch-control)] font-medium text-patch-text",
              "transition-colors duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)]",
              "hover:bg-patch-accent",
              focusRing,
            )}
            data-slot="toast-action"
          >
            {t.action.label}
          </button>
        )}
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={dismiss}
        data-slot="toast-close"
        className={cn(
          "absolute top-1/2 -translate-y-1/2 end-2",
          "flex h-7 w-7 items-center justify-center",
          "rounded-[var(--radius-patch-sm)] text-patch-text-tertiary",
          "transition-colors duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)]",
          "hover:bg-patch-surface-hover hover:text-patch-text",
          focusRing,
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
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
      </button>
    </motion.div>
  );
}
