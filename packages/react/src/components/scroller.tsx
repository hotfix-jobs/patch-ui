"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
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
 * Scroll container for overflowing lists. Wraps Base UI ScrollArea to get
 * a styled overlay scrollbar in vertical / bidirectional modes, and hides
 * it entirely in horizontal mode (edge fade masks are the "more content"
 * affordance for rails).
 *
 *   <Scroller overflow="x" childrenContainerClassName="gap-3">
 *     {items.map((item) => <Card key={item.id} className="shrink-0 w-64">…</Card>)}
 *   </Scroller>
 */
export function Scroller({
  overflow = "x",
  height,
  width,
  fade = true,
  fadeWidth = 32,
  childrenContainerClassName,
  ariaLabel,
  className,
  style,
  children,
  ...props
}: ScrollerProps): React.ReactElement {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  const horizontal = overflow === "x" || overflow === "both";
  const vertical = overflow === "y" || overflow === "both";

  const updateAffordances = useCallback(() => {
    const el = viewportRef.current;
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
    const el = viewportRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateAffordances, { passive: true });
    const ro = new ResizeObserver(updateAffordances);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateAffordances);
      ro.disconnect();
    };
  }, [updateAffordances]);

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
  // canvas would need a corner mask which is out of scope).
  const maskStyle: React.CSSProperties = {};
  if (fade && overflow !== "both") {
    let stops: string | null = null;
    if (overflow === "x") {
      if (canScrollBack && canScrollForward) {
        stops = `linear-gradient(to right, transparent 0, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent 100%)`;
      } else if (canScrollBack) {
        stops = `linear-gradient(to right, transparent 0, black ${fadeWidth}px)`;
      } else if (canScrollForward) {
        stops = `linear-gradient(to right, black calc(100% - ${fadeWidth}px), transparent 100%)`;
      }
    } else if (overflow === "y") {
      if (canScrollBack && canScrollForward) {
        stops = `linear-gradient(to bottom, transparent 0, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent 100%)`;
      } else if (canScrollBack) {
        stops = `linear-gradient(to bottom, transparent 0, black ${fadeWidth}px)`;
      } else if (canScrollForward) {
        stops = `linear-gradient(to bottom, black calc(100% - ${fadeWidth}px), transparent 100%)`;
      }
    }
    if (stops) {
      maskStyle.maskImage = stops;
      (maskStyle as unknown as { WebkitMaskImage: string }).WebkitMaskImage = stops;
    }
  }

  const innerFlexClass =
    horizontal && !vertical
      ? "inline-flex"
      : vertical && !horizontal
        ? "flex flex-col"
        : "grid";

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroller"
      data-overflow={overflow}
      className={cn("relative w-full", className)}
      style={dimStyle}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        data-slot="scroller-viewport"
        className={cn(
          "size-full [-webkit-overflow-scrolling:touch]",
          focusRing,
        )}
        style={maskStyle}
      >
        <ScrollAreaPrimitive.Content
          data-slot="scroller-content"
          className={cn(innerFlexClass, childrenContainerClassName)}
        >
          {children}
        </ScrollAreaPrimitive.Content>
      </ScrollAreaPrimitive.Viewport>
      {vertical && (
        <ScrollAreaPrimitive.Scrollbar
          orientation="vertical"
          data-slot="scroller-scrollbar"
          className={cn(
            "absolute end-0.5 top-0.5 bottom-0.5 flex w-1.5 touch-none select-none",
            "opacity-0 transition-opacity duration-[var(--duration-state)] ease-[var(--ease-standard)]",
            "data-[hovering]:opacity-100 data-[scrolling]:opacity-100",
          )}
        >
          <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-ink/25 hover:bg-ink/40" />
        </ScrollAreaPrimitive.Scrollbar>
      )}
    </ScrollAreaPrimitive.Root>
  );
}
