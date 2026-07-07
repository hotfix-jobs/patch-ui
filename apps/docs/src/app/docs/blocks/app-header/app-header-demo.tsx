"use client";

import { useState } from "react";
import {
  Avatar,
  Badge,
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
  ChartBar,
  FolderOpen,
  House,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import {
  AppHeader,
  AppHeaderBrand,
  AppHeaderNav,
  AppHeaderNavItem,
  AppHeaderNavSection,
  AppHeaderRight,
} from "@patchui/react/blocks/app-header";

const DASHBOARD_NAV: {
  label: string;
  prefix: React.ReactNode;
  suffix?: React.ReactNode;
}[] = [
  { label: "Home", prefix: <House /> },
  { label: "Projects", prefix: <FolderOpen />, suffix: <Badge>12</Badge> },
  { label: "Insights", prefix: <ChartBar /> },
  { label: "Team", prefix: <Users />, suffix: <Badge variant="success">New</Badge> },
];

const MARKETING_DROPDOWNS = [
  {
    label: "Product",
    items: [
      { href: "#", eyebrow: "Overview", title: "Everything at a glance" },
      { href: "#", eyebrow: "Pricing", title: "Plans that scale with you" },
      { href: "#", eyebrow: "Changelog", title: "What shipped recently" },
    ],
  },
  {
    label: "Company",
    items: [
      { href: "#", eyebrow: "About", title: "Who we are" },
      { href: "#", eyebrow: "Blog", title: "Notes from the team" },
      { href: "#", eyebrow: "Careers", title: "Join the crew" },
      { href: "#", eyebrow: "Contact", title: "Get in touch" },
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

export function AppHeaderDemo() {
  const [active, setActive] = useState("Home");

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Dashboard</SectionLabel>
        <div className="w-full overflow-hidden rounded-[var(--radius-12)] border border-hairline bg-base">
          <AppHeader bordered={false}>
            <AppHeaderBrand>
              <LogoMark />
              <span>Patch</span>
            </AppHeaderBrand>

            <AppHeaderNav>
              {DASHBOARD_NAV.map((item) => (
                <AppHeaderNavItem
                  key={item.label}
                  href="#"
                  active={active === item.label}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(item.label);
                  }}
                >
                  {item.label}
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

          <div className="border-t border-hairline bg-fill-1 px-6 py-8">
            <p className="text-small text-ink">{active}</p>
            <p className="mt-1 text-small text-ink-muted">
              Content for the selected page renders here.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Marketing (with dropdowns)</SectionLabel>
        <div className="w-full overflow-hidden rounded-[var(--radius-12)] border border-hairline bg-base">
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
                        <div className="grid w-[440px] grid-cols-2 gap-2 p-4">
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
                      className="!inline-flex !items-center !rounded-full !px-3 !py-1.5 !text-small !text-ink-muted !bg-transparent hover:!bg-fill-1 hover:!text-ink"
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
