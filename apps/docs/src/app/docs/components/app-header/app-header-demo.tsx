"use client";

import { useState } from "react";
import {
  AppHeader,
  AppHeaderBrand,
  AppHeaderNav,
  AppHeaderNavItem,
  AppHeaderRight,
  Avatar,
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetBody,
} from "@patchui/react";

const NAV = ["Overview", "Deployments", "Analytics", "Settings"];

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

function LogoMark() {
  return (
    <span className="flex size-6 items-center justify-center rounded-[var(--radius-6)] bg-gray-1000 text-background-100 text-label-13 font-semibold">
      P
    </span>
  );
}

export function AppHeaderDemo() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Overview");

  return (
    <div className="w-full overflow-hidden rounded-[var(--radius-12)] border border-gray-alpha-400 bg-background-100">
      <AppHeader bordered={false}>
        <AppHeaderBrand>
          <LogoMark />
          <span>Patch</span>
        </AppHeaderBrand>

        {/* Desktop nav */}
        <AppHeaderNav className="hidden sm:flex">
          {NAV.map((item) => (
            <AppHeaderNavItem
              key={item}
              href="#"
              active={active === item}
              onClick={(e) => {
                e.preventDefault();
                setActive(item);
              }}
            >
              {item}
            </AppHeaderNavItem>
          ))}
        </AppHeaderNav>

        <AppHeaderRight>
          <Button variant="tertiary" size="sm" className="hidden sm:inline-flex">
            Feedback
          </Button>
          <Avatar size="sm" letter="A" className="hidden sm:inline-flex" />
          <Button
            variant="tertiary"
            size="sm"
            aria-label="Open menu"
            className="sm:hidden"
            icon={<MenuIcon />}
            onClick={() => setOpen(true)}
          />
        </AppHeaderRight>
      </AppHeader>

      {/* Content preview underneath */}
      <div className="border-t border-gray-alpha-400 bg-background-200 px-6 py-8">
        <p className="text-copy-14 text-gray-1000">
          {active}
        </p>
        <p className="mt-1 text-copy-14 text-gray-800">
          Content for the selected tab renders here.
        </p>
      </div>

      {/* Mobile drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Patch</SheetTitle>
          </SheetHeader>
          <SheetBody>
            <nav className="flex flex-col gap-0.5">
              {NAV.map((label) => (
                <a
                  key={label}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(label);
                    setOpen(false);
                  }}
                  aria-current={active === label ? "page" : undefined}
                  className={`rounded-[var(--radius-6)] px-2 py-2 text-copy-14 transition-colors ${
                    active === label
                      ? "bg-gray-alpha-100 text-gray-1000 font-medium"
                      : "text-gray-800 hover:bg-gray-alpha-100 hover:text-gray-1000"
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </SheetBody>
        </SheetContent>
      </Sheet>
    </div>
  );
}
