"use client";

import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  AppHeader,
  AppHeaderBrand,
  AppHeaderRight,
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetBody,
} from "@patchui/react";

function LinkCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <NavigationMenuLink href="#">
      <span className="block font-medium text-gray-1000">{title}</span>
      <span className="mt-0.5 block text-label-12 text-gray-800">
        {description}
      </span>
    </NavigationMenuLink>
  );
}

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

const MOBILE_LINKS = ["Product", "Resources", "Pricing"];

export function NavigationMenuDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full overflow-hidden rounded-[var(--radius-12)] border-[0.5px] border-gray-alpha-400">
      <AppHeader>
        <AppHeaderBrand>Patch</AppHeaderBrand>

        <NavigationMenu className="hidden sm:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[min(440px,calc(100vw-2rem))] grid-cols-2 gap-1">
                  <LinkCard title="Features" description="Everything in the box." />
                  <LinkCard title="Integrations" description="Connect your stack." />
                  <LinkCard title="Changelog" description="What shipped lately." />
                  <LinkCard title="Customers" description="Teams who use it." />
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[min(220px,calc(100vw-2rem))] gap-0.5">
                  <NavigationMenuLink href="#">Docs</NavigationMenuLink>
                  <NavigationMenuLink href="#">Guides</NavigationMenuLink>
                  <NavigationMenuLink href="#">Blog</NavigationMenuLink>
                  <NavigationMenuLink href="#">Support</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" className="px-3 py-1.5 font-medium">
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <AppHeaderRight>
          <Button size="sm" className="hidden sm:inline-flex">
            Get started
          </Button>
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

      {/* Mobile drawer (NavigationMenu is desktop-only; use a Sheet on mobile) */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle>Patch</SheetTitle>
          </SheetHeader>
          <SheetBody>
            <nav className="flex flex-col gap-0.5">
              {MOBILE_LINKS.map((label) => (
                <a
                  key={label}
                  href="#"
                  onClick={() => setOpen(false)}
                  className="rounded-[var(--radius-6)] px-2 py-2 text-label-13 text-gray-900 transition-colors hover:bg-gray-200 hover:text-gray-1000"
                >
                  {label}
                </a>
              ))}
            </nav>
          </SheetBody>
        </SheetContent>
      </Sheet>

      <div className="p-6 text-label-13 text-gray-900">
        Hover or focus the menu items to open the morphing dropdown. Under the
        <code> sm</code> breakpoint it collapses to a Sheet drawer.
      </div>
    </div>
  );
}
