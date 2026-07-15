"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type * as React from "react";
import {
  Sheet,
  SheetPrimitive,
  SheetTrigger,
} from "../../components/sheet";
import { selectionFocus } from "../../recipes";
import { cn } from "../../utils";

/** Complete site-header block with responsive mobile panel. */

/* --------------------------- context --------------------------- */

interface AppHeaderContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  panelId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  mobileGeometry: MobileGeometry | null;
  right: React.ReactNode;
  navChildren: React.ReactNode;
}

interface MobileGeometry {
  headerBottom: number;
  triggerTop: number;
  triggerLeft: number;
  triggerWidth: number;
  triggerHeight: number;
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
  mobileTop: React.ReactNode;
} {
  let brand: React.ReactNode = null;
  let nav: React.ReactNode = null;
  let right: React.ReactNode = null;
  let mobileTop: React.ReactNode = null;
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const type = child.type as { displayName?: string };
    if (type === AppHeaderBrand || type.displayName === "AppHeaderBrand") {
      brand = child;
    } else if (type === AppHeaderNav || type.displayName === "AppHeaderNav") {
      nav = child;
    } else if (type === AppHeaderRight || type.displayName === "AppHeaderRight") {
      right = child;
    } else if (
      type === AppHeaderMobileTop ||
      type.displayName === "AppHeaderMobileTop"
    ) {
      mobileTop = child;
    }
  });
  return { brand, nav, right, mobileTop };
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
  const [mobileGeometry, setMobileGeometry] = useState<MobileGeometry | null>(
    null,
  );
  const panelId = useId();
  const headerRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const { brand, nav, right, mobileTop } = useMemo(
    () => extractSlots(children),
    [children],
  );
  const navChildren = useMemo(() => {
    if (!isValidElement(nav)) return null;
    return (nav as React.ReactElement<{ children?: React.ReactNode }>).props
      .children;
  }, [nav]);

  const updateMobileGeometry = useCallback(() => {
    const header = headerRef.current;
    const trigger = triggerRef.current;
    if (!header || !trigger) return;

    const headerRect = header.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    setMobileGeometry({
      headerBottom: headerRect.bottom,
      triggerTop: triggerRect.top,
      triggerLeft: triggerRect.left,
      triggerWidth: triggerRect.width,
      triggerHeight: triggerRect.height,
    });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;

    updateMobileGeometry();
    const observer = new ResizeObserver(updateMobileGeometry);
    if (headerRef.current) observer.observe(headerRef.current);
    if (triggerRef.current) observer.observe(triggerRef.current);
    window.addEventListener("resize", updateMobileGeometry);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateMobileGeometry);
    };
  }, [open, updateMobileGeometry]);

  const ctx: AppHeaderContextValue = {
    open,
    setOpen,
    panelId,
    triggerRef,
    mobileGeometry,
    right,
    navChildren,
  };

  const defaultProps = {
    className: cn(
      "bg-base",
      bordered && "border-b border-hairline",
      sticky ? "sticky top-0 z-50" : "relative",
      className,
    ),
    "data-slot": "app-header",
    children: (
      <>
        <div className="flex w-full items-center gap-4 px-4 py-3.5 md:px-6 md:gap-6 md:py-4">
          {brand}
          {nav}
          <AppHeaderRightWithTrigger mobileTop={mobileTop}>{right}</AppHeaderRightWithTrigger>
        </div>
      </>
    ),
  };

  return (
    <AppHeaderContext.Provider value={ctx}>
      <Sheet open={open} onOpenChange={setOpen} side="top">
        {useRender({
          defaultTagName: "header",
          ref: headerRef,
          props: mergeProps<"header">(defaultProps, props),
          render,
        })}
        <AppHeaderMobilePanel />
      </Sheet>
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
      "flex shrink-0 items-center gap-2 text-regular font-medium text-ink",
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

export type AppHeaderNavItemProps = Omit<
  useRender.ComponentProps<"a">,
  "prefix"
> & {
  /** Marks this item as the current page. */
  active?: boolean;
  /** Leading node (typically an icon). */
  prefix?: React.ReactNode;
  /** Trailing node (badge, count, chevron). Pushed to the row's end. */
  suffix?: React.ReactNode;
};

export function AppHeaderNavItem({
  className,
  active,
  prefix,
  suffix,
  render,
  onClick,
  children,
  ...props
}: AppHeaderNavItemProps): React.ReactElement {
  const mobile = useContext(AppHeaderMobileRenderContext);
  const headerCtx = useContext(AppHeaderContext);

  const baseClasses = mobile
    ? cn(
        "flex items-center gap-2.5 rounded-[var(--radius-8)] px-3 py-2.5 text-regular text-ink-muted transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-layer-hover hover:text-ink [&_svg]:size-5",
        active && "bg-layer-hover font-medium text-ink",
      )
    : cn(
        "inline-flex items-center gap-1.5 rounded-[var(--radius-8)] px-3 py-1.5 text-small transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] [&_svg]:size-4",
        active
          ? "text-ink font-medium"
          : "text-ink-muted hover:bg-layer-hover hover:text-ink",
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
    children: (
      <>
        {prefix && (
          <span className="shrink-0 [&_svg]:shrink-0" data-slot="app-header-nav-item-prefix">
            {prefix}
          </span>
        )}
        <span className="min-w-0 flex-1 truncate">{children}</span>
        {suffix && (
          <span
            className="ms-auto flex shrink-0 items-center [&_svg]:shrink-0"
            data-slot="app-header-nav-item-suffix"
          >
            {suffix}
          </span>
        )}
      </>
    ),
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
      className="flex flex-col gap-1"
    >
      <div className="px-3 pb-1 pt-2 text-micro text-ink-tertiary">
        {title}
      </div>
      <div className="flex flex-col gap-0.5">{children}</div>
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

/** Content pinned into the mobile top bar just before the hamburger
 *  trigger. Hidden on desktop and never rendered in the mobile panel
 *  footer. Meant for one-tap actions (e.g. notification bell) that
 *  should stay reachable without opening the panel. */
export function AppHeaderMobileTop({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement {
  return <>{children}</>;
}
AppHeaderMobileTop.displayName = "AppHeaderMobileTop";

function AppHeaderRightWithTrigger({
  children,
  mobileTop,
}: {
  children: React.ReactNode;
  mobileTop?: React.ReactNode;
}): React.ReactElement {
  const { open, panelId, navChildren, triggerRef } = useAppHeaderContext();
  const hasNav = Children.count(navChildren) > 0;
  return (
    <div className="ms-auto flex items-center gap-2" data-slot="app-header-right">
      <span className={hasNav ? "hidden md:contents" : "contents"}>{children}</span>
      {hasNav && mobileTop && (
        <span className="md:hidden contents" data-slot="app-header-mobile-top">
          {mobileTop}
        </span>
      )}
      {hasNav && (
        <SheetTrigger
          render={
            <button
              type="button"
              ref={triggerRef}
              data-slot="app-header-mobile-trigger"
              aria-label="Open menu"
              aria-controls={panelId}
              className={cn(
                "inline-flex md:hidden size-8 items-center justify-center rounded-[var(--radius-8)] text-ink transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-layer-hover",
                open && "invisible",
              )}
            />
          }
        >
          <MorphingMenuIcon open={open} />
        </SheetTrigger>
      )}
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
  const bar =
    "absolute left-1/2 top-1/2 h-px w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-transform duration-[var(--duration-state)] ease-[var(--ease-standard)]";

  return (
    <span
      aria-hidden="true"
      data-slot="app-header-menu-icon"
      data-state={open ? "open" : "closed"}
      className="relative inline-flex h-[18px] w-[18px] items-center justify-center"
    >
      <span
        className={cn(
          bar,
          open
            ? "[animation:patch-app-header-menu-top-open_var(--duration-state)_var(--ease-standard)_both]"
            : "[transform:translateY(-4px)_rotate(0deg)]",
        )}
      />
      <span
        className={cn(
          bar,
          open
            ? "[animation:patch-app-header-menu-bottom-open_var(--duration-state)_var(--ease-standard)_both]"
            : "[transform:translateY(4px)_rotate(0deg)]",
        )}
      />
    </span>
  );
}

/* --------------------------- internal: mobile panel --------------------------- */

function AppHeaderMobilePanel(): React.ReactElement {
  const { panelId, navChildren, right, mobileGeometry } =
    useAppHeaderContext();

  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Backdrop className="fixed inset-0 z-70 bg-transparent md:hidden" />
      <SheetPrimitive.Viewport className="fixed inset-0 z-70 md:hidden">
        <SheetPrimitive.Popup
          aria-label="Main navigation"
          aria-modal="true"
          id={panelId}
          data-slot="app-header-mobile-panel"
          className="fixed inset-0 z-70 bg-transparent outline-none md:hidden"
        >
          <SheetPrimitive.Close
            aria-label="Close menu"
            style={
              mobileGeometry
                ? {
                    top: mobileGeometry.triggerTop,
                    left: mobileGeometry.triggerLeft,
                    width: mobileGeometry.triggerWidth,
                    height: mobileGeometry.triggerHeight,
                  }
                : { visibility: "hidden" }
            }
            className={cn(
              "absolute z-10 inline-flex items-center justify-center rounded-[var(--radius-8)] text-ink transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-layer-hover focus-visible:bg-layer-hover active:bg-layer-hover",
              selectionFocus,
            )}
          >
            <MorphingMenuIcon open />
          </SheetPrimitive.Close>
          <div
            className="absolute inset-x-0 bottom-0 flex flex-col bg-base [animation:patch-app-header-panel-in_var(--duration-overlay)_var(--ease-standard)]"
            style={{ top: mobileGeometry?.headerBottom ?? 0 }}
          >
            <AppHeaderMobileRenderContext.Provider value={true}>
              <nav className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-6">
                {groupMobileNavChildren(navChildren)}
              </nav>
              {right && Children.count(right) > 0 && (
                <div
                  data-slot="app-header-mobile-footer"
                  className="flex items-center gap-2 border-t border-hairline p-4 [&>button]:min-w-0 [&>button]:flex-1 [&>a]:min-w-0 [&>a]:flex-1"
                >
                  {right}
                </div>
              )}
            </AppHeaderMobileRenderContext.Provider>
          </div>
        </SheetPrimitive.Popup>
      </SheetPrimitive.Viewport>
    </SheetPrimitive.Portal>
  );
}
