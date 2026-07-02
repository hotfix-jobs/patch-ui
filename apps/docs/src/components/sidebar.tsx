"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { navigation } from "@/lib/navigation";
import { cn, SectionLabel } from "@patchui/react";
import { useSidebarState } from "./sidebar-state";

/**
 * Sidebar: the docs navigation column.
 *
 * Desktop (lg+): a normal-flow sticky column on the left. Sits below the
 * sticky header, stays visible while the main content scrolls, and lets
 * the footer sit naturally below both sidebar and main.
 * Mobile (below lg): hidden by default. A floating hamburger opens it as
 * a fixed drawer with a dim backdrop; the drawer has its own X close
 * button, backdrop tap closes, and route change closes.
 */
export function Sidebar() {
  const pathname = usePathname();
  const activeRef = useRef<HTMLAnchorElement>(null);
  const { open, setOpen } = useSidebarState();
  const close = () => setOpen(false);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  const navContent = (
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
  );

  return (
    <>
      {/* Desktop: sticky column in document flow */}
      <aside
        className={cn(
          "hidden lg:block lg:w-64 lg:shrink-0 lg:border-r lg:border-gray-alpha-400",
          "lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:overflow-y-auto",
        )}
      >
        {navContent}
      </aside>

      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm lg:hidden"
          onClick={close}
          aria-hidden
        />
      )}

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed top-14 bottom-0 left-0 z-50 w-64 overflow-y-auto lg:hidden",
          "border-r border-gray-alpha-400 bg-background-100",
          "transition-transform duration-[var(--duration-state)] ease-[var(--ease-standard)]",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="sticky top-0 flex h-10 items-center justify-end border-b-[0.5px] border-gray-alpha-400 bg-background-100 px-2">
          <button
            type="button"
            aria-label="Close documentation menu"
            onClick={close}
            className="flex size-8 items-center justify-center rounded-[var(--radius-6)] text-gray-800 hover:bg-gray-alpha-100 hover:text-gray-1000"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
        {navContent}
      </div>
    </>
  );
}
