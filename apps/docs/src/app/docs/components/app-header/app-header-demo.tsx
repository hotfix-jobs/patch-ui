"use client";

import { useState } from "react";
import {
  AppHeader,
  AppHeaderBrand,
  AppHeaderNav,
  AppHeaderNavItem,
  AppHeaderRight,
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetPanel,
} from "@patchui/react";

const NAV = ["Dashboard", "Projects", "Settings"];

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function AppHeaderDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full overflow-hidden rounded-[var(--radius-12)] border-[0.5px] border-gray-alpha-400">
      <AppHeader>
        <AppHeaderBrand>Patch</AppHeaderBrand>

        {/* Desktop nav */}
        <AppHeaderNav className="hidden sm:flex">
          <AppHeaderNavItem href="#" active>
            Dashboard
          </AppHeaderNavItem>
          <AppHeaderNavItem href="#">Projects</AppHeaderNavItem>
          <AppHeaderNavItem href="#">Settings</AppHeaderNavItem>
        </AppHeaderNav>

        <AppHeaderRight>
          <Button size="sm" className="hidden sm:inline-flex">
            Get started
          </Button>
          {/* Mobile menu trigger */}
          <Button
            variant="ghost"
            size="sm"
            aria-label="Open menu"
            className="sm:hidden"
            icon={<MenuIcon />}
            onClick={() => setOpen(true)}
          />
        </AppHeaderRight>
      </AppHeader>

      {/* Mobile drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle>Patch</SheetTitle>
          </SheetHeader>
          <SheetPanel>
            <nav className="flex flex-col gap-0.5">
              {NAV.map((label) => (
                <a
                  key={label}
                  href="#"
                  onClick={() => setOpen(false)}
                  className="rounded-[var(--radius-6)] px-2 py-2 text-label-13 text-gray-900 transition-colors hover:bg-gray-200 hover:text-gray-1000"
                >
                  {label}
                </a>
              ))}
              <Button size="sm" className="mt-3 w-full">
                Get started
              </Button>
            </nav>
          </SheetPanel>
        </SheetContent>
      </Sheet>

      <div className="p-6 text-label-13 text-gray-900">
        Resize the preview: under the <code>sm</code> breakpoint the nav collapses
        to a menu button that opens a Sheet drawer.
      </div>
    </div>
  );
}
