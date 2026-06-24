"use client";

import {
  FloatingArrow,
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  arrow,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
  type Placement,
} from "@floating-ui/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import type * as React from "react";
import { cn } from "../utils";

/**
 * Popover — a generic floating popup attached to any trigger. Holds
 * arbitrary content (not constrained to menu items the way Menu is).
 *
 * Use Popover for inline help, rich tooltips, mini settings panels,
 * date / color pickers, notification panels — anywhere you need a
 * floating surface that can hold composed UI.
 *
 * For static text labels on hover, use [Tooltip]. For a list of actions,
 * use [Menu]. For an input + filterable list, use [Combobox].
 *
 * Usage:
 *   <Popover>
 *     <PopoverTrigger render={<Button />}>Open</PopoverTrigger>
 *     <PopoverContent>
 *       <div className="p-4 w-72">...</div>
 *     </PopoverContent>
 *   </Popover>
 */

type PopoverContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refs: ReturnType<typeof useFloating>["refs"];
  floatingStyles: React.CSSProperties;
  context: ReturnType<typeof useFloating>["context"];
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
  arrowRef: React.RefObject<SVGSVGElement | null>;
  showArrow: boolean;
};

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(): PopoverContextValue {
  const ctx = useContext(PopoverContext);
  if (!ctx)
    throw new Error("Popover subcomponents must be used inside <Popover>");
  return ctx;
}

export interface PopoverProps {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called when the open state should change. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Placement of the popup relative to the trigger. Default `bottom`.
   * Auto-flips to opposite side when there's no room.
   */
  placement?: Placement;
  /** Distance in pixels between the popup and trigger. Default 6. */
  sideOffset?: number;
  /**
   * Open the popup on trigger hover (with safe close timing). Default
   * false. When false, only click opens.
   */
  hover?: boolean;
  /** Show a small arrow pointing back to the trigger. Default false. */
  arrow?: boolean;
  /**
   * Trap focus inside the popup while open. Default false (non-modal).
   * Set true for popovers with form inputs that need focus containment.
   */
  modal?: boolean;
  children: React.ReactNode;
}

export function Popover({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom",
  sideOffset = 6,
  hover = false,
  arrow: showArrow = false,
  modal: _modal = false,
  children,
}: PopoverProps): React.ReactElement {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  const arrowRef = useRef<SVGSVGElement | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    transform: false,
    middleware: [
      offset(sideOffset),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      ...(showArrow ? [arrow({ element: arrowRef })] : []),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, { enabled: !hover });
  const hoverHook = useHover(context, {
    enabled: hover,
    delay: { open: 75, close: 100 },
    move: false,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "dialog" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    hoverHook,
    dismiss,
    role,
  ]);

  return (
    <PopoverContext.Provider
      value={{
        open,
        setOpen,
        refs,
        floatingStyles,
        context,
        getReferenceProps,
        getFloatingProps,
        arrowRef,
        showArrow,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

/* --------------------------- Trigger --------------------------- */

export interface PopoverTriggerProps {
  /** Element to render as the trigger (preserves polymorphism). */
  render?: React.ReactElement;
  children?: React.ReactNode;
}

export function PopoverTrigger({
  render,
  children,
  ...rest
}: PopoverTriggerProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  const { refs, getReferenceProps, open } = usePopoverContext();
  const triggerProps = getReferenceProps({
    ref: refs.setReference,
    ...rest,
  });

  if (render && isValidElement(render)) {
    return cloneElement(render, {
      ...triggerProps,
      "data-slot": "popover-trigger",
      "data-state": open ? "open" : "closed",
      children:
        (render.props as { children?: React.ReactNode }).children ?? children,
    } as React.HTMLAttributes<HTMLElement>);
  }
  return (
    <button
      type="button"
      data-slot="popover-trigger"
      data-state={open ? "open" : "closed"}
      {...triggerProps}
    >
      {children}
    </button>
  );
}

/* --------------------------- Content --------------------------- */

export interface PopoverContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: React.ReactNode;
  /**
   * Trap focus inside the popup while open. Default false (non-modal).
   * Override on a per-Popover basis when the popup contains form inputs
   * that need focus containment.
   */
  modal?: boolean;
}

export function PopoverContent({
  className,
  children,
  modal = false,
  ...props
}: PopoverContentProps): React.ReactElement | null {
  const {
    open,
    context,
    refs,
    floatingStyles,
    getFloatingProps,
    arrowRef,
    showArrow,
  } = usePopoverContext();
  const reduceMotion = useReducedMotion();

  return (
    <FloatingPortal>
      <AnimatePresence>
        {open && (
          <FloatingFocusManager
            context={context}
            modal={modal}
            initialFocus={modal ? 0 : -1}
            returnFocus={modal}
          >
            <motion.div
              ref={refs.setFloating}
              data-slot="popover-content"
              {...getFloatingProps(props)}
              style={{
                ...floatingStyles,
                transformOrigin: "var(--transform-origin, top center)",
              }}
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
              className={cn(
                "z-[80] rounded-[var(--radius-patch-sm)] bg-patch-surface border-[0.5px] border-[var(--patch-border)] shadow-patch-popup outline-none",
                className,
              )}
            >
              {children}
              {showArrow && (
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  width={12}
                  height={6}
                  fill="var(--patch-surface)"
                  stroke="var(--patch-border)"
                  strokeWidth={0.5}
                />
              )}
            </motion.div>
          </FloatingFocusManager>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
}

/* --------------------------- Close --------------------------- */

export interface PopoverCloseProps {
  render?: React.ReactElement;
  children?: React.ReactNode;
}

export function PopoverClose({
  render,
  children,
  ...rest
}: PopoverCloseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  const { setOpen } = usePopoverContext();
  const onClick = () => setOpen(false);

  if (render && isValidElement(render)) {
    return cloneElement(render, {
      onClick,
      "data-slot": "popover-close",
      ...rest,
      children:
        (render.props as { children?: React.ReactNode }).children ?? children,
    } as React.HTMLAttributes<HTMLElement>);
  }
  return (
    <button
      type="button"
      onClick={onClick}
      data-slot="popover-close"
      {...rest}
    >
      {children}
    </button>
  );
}
