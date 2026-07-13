"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@patchui/react";

const links = [
  {
    href: "/docs/components/button",
    title: "Button",
    description: "Action hierarchy, icons, and loading states.",
  },
  {
    href: "/docs/components/input",
    title: "Input",
    description: "Single-line text entry and inline adornments.",
  },
  {
    href: "/docs/components/table",
    title: "Table",
    description: "Structured data with sorting and selection.",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-80 gap-1 p-1">
              {links.map((link) => (
                <NavigationMenuLink key={link.href} href={link.href}>
                  <span className="block font-medium text-ink">
                    {link.title}
                  </span>
                  <span className="mt-0.5 block text-mini text-ink-muted">
                    {link.description}
                  </span>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/docs" variant="trigger">
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
