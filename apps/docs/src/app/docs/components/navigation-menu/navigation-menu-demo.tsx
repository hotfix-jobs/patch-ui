"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  Button,
} from "@patchui/react";

const DROPDOWNS = [
  {
    label: "Product",
    items: [
      { href: "#", eyebrow: "Overview", title: "See what the product does" },
      { href: "#", eyebrow: "Analytics", title: "Turn data into decisions" },
      { href: "#", eyebrow: "Automations", title: "Save time on repeat work" },
      { href: "#", eyebrow: "Reports", title: "Share what you've learned" },
      { href: "#", eyebrow: "API", title: "Build on top of the platform" },
      { href: "#", eyebrow: "Integrations", title: "Connect the tools you use" },
    ],
  },
  {
    label: "Resources",
    items: [
      { href: "#", eyebrow: "Docs", title: "Everything you need to know" },
      { href: "#", eyebrow: "Guides", title: "Practical walk-throughs" },
      { href: "#", eyebrow: "Blog", title: "Notes from the team" },
      { href: "#", eyebrow: "Community", title: "Talk to other users" },
      { href: "#", eyebrow: "Support", title: "Get help when you need it" },
      { href: "#", eyebrow: "Changelog", title: "What shipped recently" },
    ],
  },
];

function LogoMark() {
  return (
    <span className="flex size-6 items-center justify-center rounded-[var(--radius-6)] bg-ink text-base text-small font-medium">
      P
    </span>
  );
}

export function NavigationMenuDemo() {
  return (
    <div className="w-full overflow-hidden rounded-[var(--radius-12)] bg-base">
      {/* Header-style row so the dropdown reads in a realistic context.
          NavigationMenu is desktop-only -- on small viewports use a
          Sheet or the AppHeader block's mobile panel instead. */}
      <div className="flex w-full items-center gap-6 px-4 py-3.5 md:px-6 md:gap-8 md:py-4">
        <div className="flex shrink-0 items-center gap-2 text-regular font-medium text-ink">
          <LogoMark />
          <span>Patch</span>
        </div>

        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            {DROPDOWNS.map((group) => (
              <NavigationMenuItem key={group.label}>
                <NavigationMenuTrigger>{group.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[680px] grid-cols-3 gap-2 p-4">
                    {group.items.map((item) => (
                      <NavigationMenuLink
                        key={item.eyebrow}
                        href={item.href}
                        onClick={(e) => e.preventDefault()}
                        className="block rounded-[var(--radius-6)] bg-transparent p-3 hover:bg-layer-hover group"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="text-mini text-ink-muted group-hover:text-ink transition-colors">
                            {item.eyebrow}
                          </span>
                          <span className="text-small text-ink">
                            {item.title}
                          </span>
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                onClick={(e) => e.preventDefault()}
                className="!inline-flex !items-center !rounded-[var(--radius-8)] !px-3 !py-1.5 !text-small !text-ink-muted !bg-transparent hover:!bg-layer-hover hover:!text-ink active:!bg-layer-selected"
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ms-auto flex items-center gap-2">
          <Button variant="tertiary" size="md">
            Sign in
          </Button>
          <Button variant="primary" size="md">
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
}
