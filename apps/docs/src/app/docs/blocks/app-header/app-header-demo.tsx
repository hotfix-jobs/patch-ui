"use client";

import { useState } from "react";
import {
  Avatar,
  Button,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  SectionLabel,
} from "@patchui/react";
import {
  AppHeader,
  AppHeaderBrand,
  AppHeaderNav,
  AppHeaderNavItem,
  AppHeaderNavSection,
  AppHeaderRight,
} from "@patchui/react/blocks/app-header";

const DASHBOARD_NAV = ["Home", "Projects", "Insights", "Team"];

const MARKETING_DROPDOWNS = [
  {
    label: "Product",
    items: [
      { href: "#", eyebrow: "Overview", title: "See what the product does" },
      { href: "#", eyebrow: "Features", title: "Everything in one place" },
      { href: "#", eyebrow: "Automations", title: "Save time on repeatable work" },
      { href: "#", eyebrow: "Insights", title: "Understand what's happening" },
      { href: "#", eyebrow: "API", title: "Build on top of the platform" },
      { href: "#", eyebrow: "Integrations", title: "Works with what you already use" },
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
    <span className="flex size-6 items-center justify-center rounded-[var(--radius-6)] bg-ink text-canvas text-button-14">
      P
    </span>
  );
}

export function AppHeaderDemo() {
  const [active, setActive] = useState("Home");

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Dashboard</SectionLabel>
        <div className="w-full overflow-hidden rounded-[var(--radius-12)] border border-hairline bg-canvas">
          <AppHeader bordered={false}>
            <AppHeaderBrand>
              <LogoMark />
              <span>Patch</span>
            </AppHeaderBrand>

            <AppHeaderNav>
              {DASHBOARD_NAV.map((item) => (
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
              <Button variant="tertiary" size="md" shape="pill">
                Send feedback
              </Button>
              <Avatar size="sm" letter="A" />
            </AppHeaderRight>
          </AppHeader>

          <div className="border-t border-hairline bg-surface-1 px-6 py-8">
            <p className="text-body-14 text-ink">{active}</p>
            <p className="mt-1 text-body-14 text-ink-muted">
              Content for the selected page renders here.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Marketing (with dropdowns)</SectionLabel>
        <div className="w-full overflow-hidden rounded-[var(--radius-12)] border border-hairline bg-canvas">
          <AppHeader bordered={false}>
            <AppHeaderBrand>
              <LogoMark />
              <span>Patch</span>
            </AppHeaderBrand>

            <AppHeaderNav>
              <NavigationMenu className="hidden md:block">
                <NavigationMenuList>
                  {MARKETING_DROPDOWNS.map((group) => (
                    <NavigationMenuItem key={group.label}>
                      <NavigationMenuTrigger>{group.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[680px] grid-cols-3 gap-2 p-4">
                          {group.items.map((item) => (
                            <NavigationMenuLink
                              key={item.eyebrow}
                              href={item.href}
                              onClick={(e) => e.preventDefault()}
                              className="block rounded-[var(--radius-6)] bg-transparent p-3 hover:bg-surface-2 group"
                            >
                              <div className="flex flex-col gap-1">
                                <span className="text-caption-12 text-ink-muted group-hover:text-ink transition-colors">
                                  {item.eyebrow}
                                </span>
                                <span className="text-body-14 text-ink">
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
                      className="!inline-flex !items-center !rounded-full !px-3 !py-1.5 !text-body-14 !text-ink-muted !bg-transparent hover:!bg-surface-1 hover:!text-ink"
                    >
                      Pricing
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {MARKETING_DROPDOWNS.map((group) => (
                <AppHeaderNavSection key={group.label} title={group.label}>
                  {group.items.map((item) => (
                    <AppHeaderNavItem
                      key={item.eyebrow}
                      href={item.href}
                      onClick={(e) => e.preventDefault()}
                    >
                      {item.eyebrow}
                    </AppHeaderNavItem>
                  ))}
                </AppHeaderNavSection>
              ))}
              <AppHeaderNavItem href="#" onClick={(e) => e.preventDefault()}>
                Pricing
              </AppHeaderNavItem>
            </AppHeaderNav>

            <AppHeaderRight>
              <Button variant="tertiary" size="md" shape="pill">
                Sign in
              </Button>
              <Button variant="primary" size="md" shape="pill">
                Get started
              </Button>
            </AppHeaderRight>
          </AppHeader>
        </div>
      </div>
    </div>
  );
}
