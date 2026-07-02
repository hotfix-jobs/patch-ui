"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";
import { cn, SectionLabel } from "@patchui/react";

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
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <div
        className={cn(
          "fixed top-14 bottom-0 left-0 z-50 w-64 overflow-y-auto",
          "border-r border-gray-alpha-400 bg-background-100",
          "transition-transform duration-[var(--duration-state)] ease-[var(--ease-standard)]",
          "lg:translate-x-0 lg:z-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
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
                    onClick={onClose}
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
