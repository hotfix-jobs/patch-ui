"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { RemoveScroll } from "react-remove-scroll";
import type * as React from "react";
import { cn } from "../../utils";

/** Complete site-header block with responsive mobile panel. */

/* --------------------------- context --------------------------- */

interface AppHeaderContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  panelId: string;
  brand: React.ReactNode;
  right: React.ReactNode;
  navChildren: React.ReactNode;
}

const AppHeaderContext = createContext<AppHeaderContextValue | null>(null);

const AppHeaderMobileRenderContext = createContext<boolean>(false);

function useAppHeaderContext(): AppHeaderContextValue {
  const ctx = useContext(AppHeaderContext);
  if (!ctx) {
    throw new Error("AppHeader subcomponents must be used inside <AppHeader>.");
  }
  return ctx;
}

function extractSlots(children: React.ReactNode): {
  brand: React.ReactNode;
  nav: React.ReactNode;
  right: React.ReactNode;
} {
  let brand: React.ReactNode = null;
  let nav: React.ReactNode = null;
  let right: React.ReactNode = null;
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const type = child.type as { displayName?: string };
    if (type === AppHeaderBrand || type.displayName === "AppHeaderBrand") {
      brand = child;
    } else if (type === AppHeaderNav || type.displayName === "AppHeaderNav") {
      nav = child;
    } else if (type === AppHeaderRight || type.displayName === "AppHeaderRight") {
      right = child;
    }
  });
  return { brand, nav, right };
}

/* --------------------------- root --------------------------- */

export interface AppHeaderProps extends useRender.ComponentProps<"header"> {
  /** Hairline bottom border. Default true. */
  bordered?: boolean;
  /** Pin the header to the top of its scroll container. Default false. */
  sticky?: boolean;
}

export function AppHeader({
  className,
  bordered = true,
  sticky = false,
  render,
  children,
  ...props
}: AppHeaderProps): React.ReactElement {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const { brand, nav, right } = useMemo(() => extractSlots(children), [children]);
  const navChildren = useMemo(() => {
    if (!isValidElement(nav)) return null;
    return (nav as React.ReactElement<{ children?: React.ReactNode }>).props
      .children;
  }, [nav]);

  const ctx: AppHeaderContextValue = { open, setOpen, panelId, brand, right, navChildren };

  const defaultProps = {
    className: cn(
      "bg-canvas",
      bordered && "border-b border-hairline",
      sticky ? "sticky top-0 z-50" : "relative",
      className,
    ),
    "data-slot": "app-header",
    children: (
      <div className="flex w-full items-center gap-6 px-4 py-3.5 md:px-6 md:gap-8 md:py-4">
        {brand}
        {nav}
        <AppHeaderRightWithTrigger>{right}</AppHeaderRightWithTrigger>
      </div>
    ),
  };

  return (
    <AppHeaderContext.Provider value={ctx}>
      {useRender({
        defaultTagName: "header",
        props: mergeProps<"header">(defaultProps, props),
        render,
      })}
      <AppHeaderMobilePanel />
    </AppHeaderContext.Provider>
  );
}

/* --------------------------- brand --------------------------- */

export type AppHeaderBrandProps = useRender.ComponentProps<"div">;

export function AppHeaderBrand({
  className,
  render,
  ...props
}: AppHeaderBrandProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex shrink-0 items-center gap-2 text-button-16 text-ink",
      className,
    ),
    "data-slot": "app-header-brand",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}
AppHeaderBrand.displayName = "AppHeaderBrand";

/* --------------------------- nav --------------------------- */

export type AppHeaderNavProps = useRender.ComponentProps<"nav">;

export function AppHeaderNav({
  className,
  render,
  children,
  ...props
}: AppHeaderNavProps): React.ReactElement {
  const defaultProps = {
    className: cn("hidden md:flex items-center gap-1", className),
    "data-slot": "app-header-nav",
    children,
  };

  return useRender({
    defaultTagName: "nav",
    props: mergeProps<"nav">(defaultProps, props),
    render,
  });
}
AppHeaderNav.displayName = "AppHeaderNav";

export interface AppHeaderNavItemProps extends useRender.ComponentProps<"a"> {
  /** Marks this item as the current page. */
  active?: boolean;
}

export function AppHeaderNavItem({
  className,
  active,
  render,
  onClick,
  ...props
}: AppHeaderNavItemProps): React.ReactElement {
  const mobile = useContext(AppHeaderMobileRenderContext);
  const headerCtx = useContext(AppHeaderContext);

  const baseClasses = mobile
    ? cn(
        "flex items-center gap-2 py-1 text-display-24 text-ink-muted hover:text-ink transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        active && "text-ink font-medium",
      )
    : cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-body-14 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        active
          ? "text-ink font-medium"
          : "text-ink-muted hover:bg-surface-1 hover:text-ink",
      );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (mobile && headerCtx && !e.defaultPrevented) headerCtx.setOpen(false);
  };

  const defaultProps = {
    className: cn(baseClasses, className),
    "data-slot": "app-header-nav-item",
    "data-active": active ? "" : undefined,
    "aria-current": active ? ("page" as const) : undefined,
    onClick: handleClick,
  };

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(defaultProps, props),
    render,
  });
}
AppHeaderNavItem.displayName = "AppHeaderNavItem";

/** Section rendered as a titled group inside the mobile panel; passes through on desktop. */
export interface AppHeaderNavSectionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

export function AppHeaderNavSection({
  title,
  children,
}: AppHeaderNavSectionProps): React.ReactElement {
  const mobile = useContext(AppHeaderMobileRenderContext);

  if (!mobile) return <>{children}</>;

  return (
    <div
      data-slot="app-header-nav-section"
      className="flex flex-col gap-3"
    >
      <div className="text-body-13 text-ink-tertiary">{title}</div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}
AppHeaderNavSection.displayName = "AppHeaderNavSection";

/* --------------------------- right actions --------------------------- */

export type AppHeaderRightProps = useRender.ComponentProps<"div">;

export function AppHeaderRight({
  children,
}: AppHeaderRightProps): React.ReactElement {
  return <>{children}</>;
}
AppHeaderRight.displayName = "AppHeaderRight";

function AppHeaderRightWithTrigger({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const { open, setOpen, panelId } = useAppHeaderContext();
  return (
    <div className="ms-auto flex items-center gap-2" data-slot="app-header-right">
      <span className="hidden md:contents">{children}</span>
      <button
        type="button"
        data-slot="app-header-mobile-trigger"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className="inline-flex md:hidden size-8 items-center justify-center rounded-full text-ink transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-surface-1"
      >
        <MorphingMenuIcon open={open} />
      </button>
    </div>
  );
}

function groupMobileNavChildren(children: React.ReactNode): React.ReactNode {
  const output: React.ReactNode[] = [];
  let bareBuffer: React.ReactNode[] = [];
  let bareKey = 0;

  const flushBare = () => {
    if (bareBuffer.length === 0) return;
    output.push(
      <div key={`bare-${bareKey++}`} className="flex flex-col gap-1">
        {bareBuffer}
      </div>,
    );
    bareBuffer = [];
  };

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const type = child.type as { displayName?: string };
    const isSection =
      type === AppHeaderNavSection ||
      type.displayName === "AppHeaderNavSection";

    if (isSection) {
      flushBare();
      output.push(child);
    } else {
      bareBuffer.push(child);
    }
  });
  flushBare();

  return output;
}

/* --------------------------- internal: morphing icon --------------------------- */

function MorphingMenuIcon({ open }: { open: boolean }): React.ReactElement {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };
  const bar =
    "absolute left-1/2 top-1/2 h-[1.5px] w-[16px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current";

  return (
    <span
      aria-hidden="true"
      data-slot="app-header-menu-icon"
      data-state={open ? "open" : "closed"}
      className="relative inline-flex h-[18px] w-[18px] items-center justify-center"
    >
      <motion.span
        className={bar}
        initial={false}
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
        transition={transition}
      />
      <motion.span
        className={bar}
        initial={false}
        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
        transition={transition}
      />
    </span>
  );
}

/* --------------------------- internal: mobile panel --------------------------- */

function AppHeaderMobilePanel(): React.ReactPortal | null {
  const { open, setOpen, panelId, brand, right, navChildren } = useAppHeaderContext();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <RemoveScroll forwardProps>
          <motion.div
            role="dialog"
            aria-modal="true"
            id={panelId}
            data-slot="app-header-mobile-panel"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.18, ease: [0.22, 1, 0.36, 1] }
            }
            className="fixed inset-0 z-50 flex flex-col bg-canvas md:hidden"
          >
            <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
              {brand}
              <div className="ms-auto flex items-center gap-2">
                {right}
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex size-8 items-center justify-center rounded-full text-ink transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-surface-1"
                >
                  <MorphingMenuIcon open={true} />
                </button>
              </div>
            </div>

            <AppHeaderMobileRenderContext.Provider value={true}>
              <nav className="flex flex-col gap-10 overflow-y-auto px-6 py-8">
                {groupMobileNavChildren(navChildren)}
              </nav>
            </AppHeaderMobileRenderContext.Provider>
          </motion.div>
        </RemoveScroll>
      )}
    </AnimatePresence>,
    document.body,
  );
}

