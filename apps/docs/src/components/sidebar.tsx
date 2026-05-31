"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";
import { cn } from "@patchui/react";

export function Sidebar({
  open,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const activeRef = useRef<HTMLAnchorElement>(null);

  // Keep the active item visible when navigating or on first load.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [pathname]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={cn(
          "fixed top-14 bottom-0 left-0 z-50 w-64 overflow-y-auto border-r border-patch-border bg-patch-bg transition-transform duration-200 ease-in-out lg:translate-x-0 lg:z-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <nav
          aria-label="Documentation"
          className="flex flex-col gap-6 px-4 py-6"
        >
          {navigation.map((group) => (
            <div key={group.title} className="flex flex-col gap-0.5">
              <div className="px-2 pb-1 text-[length:var(--text-patch-micro)] font-semibold uppercase tracking-[var(--tracking-patch-label)] text-patch-text-tertiary">
                {group.title}
              </div>
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    ref={isActive ? activeRef : undefined}
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-[var(--radius-patch-sm)] px-2 py-1.5 text-[length:var(--text-patch-control)] transition-colors duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)]",
                      "outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--patch-focus-ring)] focus-visible:outline-offset-[var(--patch-focus-ring-offset)]",
                      isActive
                        ? "bg-patch-surface-hover font-medium text-patch-text"
                        : "text-patch-text-secondary hover:bg-patch-surface-hover hover:text-patch-text",
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
