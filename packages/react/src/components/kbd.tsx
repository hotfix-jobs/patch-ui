"use client";

import type * as React from "react";
import { useSyncExternalStore } from "react";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

export interface KbdProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onClick"> {
  /** `sm` for inline body text, `md` for shortcut hints. */
  size?: "sm" | "md";
  /**
   * When provided, Kbd renders as a `<button>` with hover state.
   * Use for keys that represent an actual action the user can click.
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** Command / Meta modifier. Renders `⌘` on Mac, `Ctrl` on Windows/Linux. */
  meta?: boolean;
  /** Ctrl modifier. Renders `⌃` on Mac, `Ctrl` elsewhere. */
  ctrl?: boolean;
  /** Alt / Option modifier. Renders `⌥` on Mac, `Alt` elsewhere. */
  alt?: boolean;
  /** Shift modifier. Always `⇧`. */
  shift?: boolean;
}

/**
 * Client-side mac detection. During SSR and the first render we assume Mac
 * (matches Vercel's default) so the glyph doesn't flicker on Mac clients.
 */
function useIsMac(): boolean {
  return useSyncExternalStore(
    // No subscription target: platform doesn't change while the page runs.
    () => () => {},
    () => /Mac|iPhone|iPad|iPod/.test(navigator.platform),
    // Server + first-client-render snapshot. True matches Vercel's default
    // so the glyph doesn't flicker on Mac clients between SSR and hydrate.
    () => true,
  );
}

function modifiers(mac: boolean, m: {
  meta?: boolean;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
}): string[] {
  const parts: string[] = [];
  if (m.ctrl) parts.push(mac ? "⌃" : "Ctrl");
  if (m.meta) parts.push(mac ? "⌘" : "Ctrl");
  if (m.alt) parts.push(mac ? "⌥" : "Alt");
  if (m.shift) parts.push("⇧");
  return parts;
}

export function Kbd({
  size = "md",
  className,
  children,
  onClick,
  meta,
  ctrl,
  alt,
  shift,
  ...props
}: KbdProps): React.ReactElement {
  const mac = useIsMac();
  const interactive = typeof onClick === "function";
  const mods = modifiers(mac, { meta, ctrl, alt, shift });

  const content = mods.length > 0 ? (
    <span className="inline-flex items-center gap-1">
      {mods.map((m, i) => (
        <span key={i}>{m}</span>
      ))}
      {children}
    </span>
  ) : (
    children
  );

  const cls = cn(
    "inline-flex items-center justify-center font-sans font-medium tabular-nums text-gray-900",
    "rounded-[var(--radius-6)] bg-background-200",
    "border border-gray-alpha-400 shadow-[inset_0_-1px_0_0_var(--gray-alpha-400)]",
    "text-label-12",
    size === "sm" && "h-[18px] min-w-[18px] px-1",
    size === "md" && "h-5 min-w-5 px-1.5",
    mods.length > 0 && "px-1.5 gap-1",
    interactive && [
      "cursor-pointer hover:bg-gray-100 hover:text-gray-1000",
      focusRing,
      colorTransition,
    ],
    className,
  );

  if (interactive) {
    return (
      <button
        type="button"
        data-slot="kbd"
        className={cls}
        onClick={onClick}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }

  return (
    <kbd data-slot="kbd" className={cls} {...props}>
      {content}
    </kbd>
  );
}
