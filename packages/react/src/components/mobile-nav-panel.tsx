"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RemoveScroll } from "react-remove-scroll";
import type * as React from "react";
import { cn } from "../utils";

/**
 * MobileNavPanel: header-anchored mobile navigation panel.
 *
 * Opens beneath a sticky header so the header stays visible and
 * interactive (the trigger button doubles as a close affordance via
 * icon animation, typically MorphingMenuIcon). Not a Sheet: the panel
 * starts below the header and has no backdrop, which is a structurally
 * different shape from Sheet's edge-anchored overlays.
 *
 * Consumers own the responsive gate (`className="md:hidden"` on the
 * trigger, for example) so the breakpoint isn't baked into the primitive.
 *
 * Compound shape:
 *   <MobileNavPanel open={open} onOpenChange={setOpen}>
 *     <MobileNavPanelBody>
 *       {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
 *     </MobileNavPanelBody>
 *     <MobileNavPanelFooter>
 *       <SignInButton />
 *     </MobileNavPanelFooter>
 *   </MobileNavPanel>
 *
 * Positioning: the top of the panel sits at `topOffset`, which defaults
 * to `var(--app-header-height, 60px)`. Set that CSS var on `:root` (or
 * on the header itself) to match your app's header height.
 */

export interface MobileNavPanelProps {
  /** Controlled open state. */
  open: boolean;
  /** Called when the panel should open or close (Escape, outside interactions). */
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  /**
   * Distance from the top of the viewport to the top of the panel. Any
   * valid CSS `top` value; typically a variable exposed by the app's
   * sticky header. Defaults to `var(--app-header-height, 60px)`.
   */
  topOffset?: string;
}

export function MobileNavPanel({
  open,
  onOpenChange,
  children,
  className,
  topOffset = "var(--app-header-height, 60px)",
}: MobileNavPanelProps): React.ReactPortal | null {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // ESC closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <RemoveScroll forwardProps>
          <motion.div
            role="dialog"
            aria-modal="true"
            data-slot="mobile-nav-panel"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.18, ease: [0.22, 1, 0.36, 1] }
            }
            style={{ top: topOffset }}
            className={cn(
              "fixed left-0 right-0 bottom-0 z-40 flex flex-col bg-background-100",
              className,
            )}
          >
            {children}
          </motion.div>
        </RemoveScroll>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export function MobileNavPanelBody({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      data-slot="mobile-nav-panel-body"
      className={cn(
        "flex flex-col gap-4 px-5 py-5 flex-1 min-h-0 overflow-y-auto",
        className,
      )}
      {...props}
    />
  );
}

export function MobileNavPanelFooter({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      data-slot="mobile-nav-panel-footer"
      className={cn(
        "flex flex-col gap-3 px-5 py-4 border-t border-gray-alpha-400",
        className,
      )}
      {...props}
    />
  );
}
