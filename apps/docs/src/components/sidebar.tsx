"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navigation } from "@/lib/navigation";
import { cn, SectionLabel } from "@patchui/react";

/**
 * Sidebar — the docs navigation column. Owns its own open state so the site
 * header doesn't need to know it exists.
 *
 * Desktop (lg+): always visible on the left, fixed under the sticky header.
 * Mobile (below lg): hidden by default. A floating hamburger at top-left
 * opens it as a drawer with a dim backdrop; tapping the backdrop, tapping
 * an item, or hitting the X in the header closes it.
 */
export function Sidebar() {
  const pathname = usePathname();
  const activeRef = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Keep the active item visible when navigating or on first load.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [pathname]);

  // Close the drawer when the route changes on mobile.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile floating menu button — appears below lg breakpoint,
          only when the drawer is closed. Sits just under the sticky
          header so it doesn't collide with brand/search. */}
      <button
        type="button"
        aria-label="Open documentation menu"
        onClick={() => setOpen(true)}
        className={cn(
          "fixed left-4 top-[calc(3.5rem+0.5rem)] z-40 flex size-9 items-center justify-center rounded-[var(--radius-6)] border-[0.5px] border-gray-alpha-400 bg-background-100 text-gray-1000 shadow-menu lg:hidden",
          "outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)]",
          open && "hidden",
        )}
      >
        <Menu className="size-4" aria-hidden />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm lg:hidden"
          onClick={close}
          aria-hidden
        />
      )}

      {/* Drawer + docked sidebar */}
      <div
        className={cn(
          "fixed top-14 bottom-0 left-0 z-50 w-64 overflow-y-auto",
          "border-r border-gray-alpha-400 bg-background-100",
          "transition-transform duration-[var(--duration-state)] ease-[var(--ease-standard)]",
          "lg:translate-x-0 lg:z-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Mobile close button inside the drawer header */}
        <div className="sticky top-0 flex h-10 items-center justify-end border-b-[0.5px] border-gray-alpha-400 bg-background-100 px-2 lg:hidden">
          <button
            type="button"
            aria-label="Close documentation menu"
            onClick={close}
            className="flex size-8 items-center justify-center rounded-[var(--radius-6)] text-gray-800 hover:bg-gray-alpha-100 hover:text-gray-1000"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <nav
          aria-label="Documentation"
          className="flex flex-col px-4 py-6"
        >
          {navigation.map((group, gi) => (
            <div
              key={group.title}
              className={cn(
                "flex flex-col gap-0.5",
                gi > 0 && "mt-6 pt-6 border-t border-gray-alpha-400",
              )}
            >
              <SectionLabel className="mb-1 px-2">
                {group.title}
              </SectionLabel>
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    ref={isActive ? activeRef : undefined}
                    href={item.href}
                    onClick={close}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-[var(--radius-6)] px-2 py-1.5",
                      "text-label-13",
                      "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
                      "outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)]",
                      isActive
                        ? "bg-gray-alpha-100 font-medium text-gray-1000"
                        : "text-gray-800 hover:bg-gray-alpha-100 hover:text-gray-1000",
                    )}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
