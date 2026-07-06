"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing } from "../recipes";

import { CaretDown, CaretLeft, CaretRight, CaretUp } from "@phosphor-icons/react";
const CHEVRON_ICON = {
  up: CaretUp,
  down: CaretDown,
  left: CaretLeft,
  right: CaretRight,
} as const;

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type ScrollerOverflow = "x" | "y" | "both";

export interface ScrollerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Scroll axis. `x` for horizontal rails, `y` for stacked feeds, `both` for a grid canvas. */
  overflow?: ScrollerOverflow;
  /** Container height. Number → px, string → passed through. */
  height?: number | string;
  /** Container width. Number → px, string → passed through. Default `"100%"`. */
  width?: number | string;
  /** Render Prev / Next buttons that page through direct children. */
  withButtons?: boolean;
  /** How far each button click scrolls, in pixels. Default 240. */
  scrollStep?: number;
  /**
   * Fade the edge of the scroll region when there's more content in that
   * direction (via `mask-image`). Default `true`. Only meaningful for
   * `overflow="x"` and `overflow="y"`.
   */
  fade?: boolean;
  /** Fade width in pixels. Default 32. */
  fadeWidth?: number;
  /** Class on the inner content wrapper: apply gap here for rail spacing. */
  childrenContainerClassName?: string;
  /** aria-label on the scroll region (best when there's no visible heading). */
  ariaLabel?: string;
  children?: React.ReactNode;
}

/**
 * Scroller: a scroll container for overflowing lists (horizontal rails,
 * long vertical feeds, or free bidirectional canvases). Optional Prev /
 * Next buttons page through the visible content.
 *
 * Keep items a consistent width in horizontal mode so the rail snaps
 * cleanly; use `shrink-0` on children so flex doesn't compress them.
 *
 *   <Scroller overflow="x" withButtons childrenContainerClassName="gap-3">
 *     {items.map((item) => <Card key={item.id} className="shrink-0 w-64">…</Card>)}
 *   </Scroller>
 */
export function Scroller({
  overflow = "x",
  height,
  width,
  withButtons = false,
  scrollStep = 240,
  fade = true,
  fadeWidth = 32,
  childrenContainerClassName,
  ariaLabel,
  className,
  style,
  children,
  ...props
}: ScrollerProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  const horizontal = overflow === "x" || overflow === "both";
  const vertical = overflow === "y" || overflow === "both";

  const updateAffordances = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (overflow === "y") {
      setCanScrollBack(el.scrollTop > 1);
      setCanScrollForward(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
    } else {
      setCanScrollBack(el.scrollLeft > 1);
      setCanScrollForward(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }
  }, [overflow]);

  useIsoLayoutEffect(() => {
    updateAffordances();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", updateAffordances, { passive: true });
    const ro = new ResizeObserver(updateAffordances);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateAffordances);
      ro.disconnect();
    };
  }, [updateAffordances]);

  const scrollBy = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    const options: ScrollToOptions = { behavior: "smooth" };
    if (overflow === "y") {
      options.top = el.scrollTop + dir * scrollStep;
    } else {
      options.left = el.scrollLeft + dir * scrollStep;
    }
    el.scrollTo(options);
  };

  const dimStyle: React.CSSProperties = {
    ...(height != null && {
      height: typeof height === "number" ? `${height}px` : height,
    }),
    ...(width != null && {
      width: typeof width === "number" ? `${width}px` : width,
    }),
    ...style,
  };

  // Fade mask: gradient that fades to transparent at whichever edge has
  // more content past it. Only applies to overflow="x" / "y" (a 2-axis
  // canvas would need a corner mask which is out of scope). Consumers
  // can opt out via `fade={false}`.
  const maskStyle: React.CSSProperties = {};
  if (fade && overflow !== "both") {
    const stops: string[] = [];
    if (overflow === "x") {
      if (canScrollBack && canScrollForward) {
        stops.push(
          `linear-gradient(to right, transparent 0, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent 100%)`,
        );
      } else if (canScrollBack) {
        stops.push(
          `linear-gradient(to right, transparent 0, black ${fadeWidth}px)`,
        );
      } else if (canScrollForward) {
        stops.push(
          `linear-gradient(to right, black calc(100% - ${fadeWidth}px), transparent 100%)`,
        );
      }
    } else if (overflow === "y") {
      if (canScrollBack && canScrollForward) {
        stops.push(
          `linear-gradient(to bottom, transparent 0, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent 100%)`,
        );
      } else if (canScrollBack) {
        stops.push(
          `linear-gradient(to bottom, transparent 0, black ${fadeWidth}px)`,
        );
      } else if (canScrollForward) {
        stops.push(
          `linear-gradient(to bottom, black calc(100% - ${fadeWidth}px), transparent 100%)`,
        );
      }
    }
    if (stops.length > 0) {
      maskStyle.maskImage = stops[0];
      (maskStyle as unknown as { WebkitMaskImage: string }).WebkitMaskImage = stops[0];
    }
  }

  const scrollAxisClass =
    overflow === "x"
      ? "overflow-x-auto overflow-y-hidden"
      : overflow === "y"
        ? "overflow-y-auto overflow-x-hidden"
        : "overflow-auto";

  const innerFlexClass = horizontal && !vertical ? "inline-flex" : vertical && !horizontal ? "flex flex-col" : "grid";

  const region = (
    <div
      ref={ref}
      data-slot="scroller"
      data-overflow={overflow}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      className={cn(
        "relative w-full",
        scrollAxisClass,
        // Momentum scrolling. Horizontal-only rails hide the scrollbar
        // (edge fade masks are the affordance); vertical + both-axis
        // rails keep the global thin scrollbar as the "more content
        // below" affordance. `scrollbar-hide` utility beats the global
        // thin-scrollbar defaults declared in @layer base.
        "[-webkit-overflow-scrolling:touch]",
        overflow === "x" && "scrollbar-hide",
        focusRing,
        className,
      )}
      style={{ ...dimStyle, ...maskStyle }}
      {...props}
    >
      <div
        data-slot="scroller-content"
        className={cn(innerFlexClass, childrenContainerClassName)}
      >
        {children}
      </div>
    </div>
  );

  if (!withButtons) return region;

  // Buttons layer: absolutely positioned above the scroll region. Fade
  // in/out when the corresponding scroll direction is available.
  return (
    <div className="relative" style={dimStyle}>
      {region}
      {overflow === "y" ? (
        <>
          <ScrollButton
            direction="up"
            visible={canScrollBack}
            onClick={() => scrollBy(-1)}
          />
          <ScrollButton
            direction="down"
            visible={canScrollForward}
            onClick={() => scrollBy(1)}
          />
        </>
      ) : (
        <>
          <ScrollButton
            direction="left"
            visible={canScrollBack}
            onClick={() => scrollBy(-1)}
          />
          <ScrollButton
            direction="right"
            visible={canScrollForward}
            onClick={() => scrollBy(1)}
          />
        </>
      )}
    </div>
  );
}

/* ------------------------------ Button ------------------------------ */

const POSITION: Record<"up" | "down" | "left" | "right", string> = {
  up: "top-2 left-1/2 -translate-x-1/2",
  down: "bottom-2 left-1/2 -translate-x-1/2",
  left: "left-2 top-1/2 -translate-y-1/2",
  right: "right-2 top-1/2 -translate-y-1/2",
};

const LABEL: Record<"up" | "down" | "left" | "right", string> = {
  up: "Scroll up",
  down: "Scroll down",
  left: "Scroll left",
  right: "Scroll right",
};

function ScrollButton({
  direction,
  visible,
  onClick,
}: {
  direction: "up" | "down" | "left" | "right";
  visible: boolean;
  onClick: () => void;
}) {
  const Icon = CHEVRON_ICON[direction];
  return (
    <button
      type="button"
      aria-label={LABEL[direction]}
      onClick={onClick}
      tabIndex={visible ? 0 : -1}
      data-slot="scroller-button"
      className={cn(
        // Floating over-content chevron pill: elevated surface (matches
        // popups + toasts), softer hairline border, muted-to-ink icon
        // treatment on hover so the affordance stays quiet at rest.
        "absolute z-10 flex size-8 items-center justify-center rounded-full bg-surface-elevated text-ink-muted border border-hairline shadow-menu transition-[opacity,color,background-color] duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-surface-1 hover:text-ink",
        POSITION[direction],
        focusRing,
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <Icon aria-hidden="true" className="size-4" />
    </button>
  );
}
