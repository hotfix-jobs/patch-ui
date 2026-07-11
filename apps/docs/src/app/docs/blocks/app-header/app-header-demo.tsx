"use client";

import { useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Input,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  SectionLabel,
  ToggleGroup,
  ToggleGroupItem,
} from "@patchui/react";
import {
  Bell,
  ChartBar,
  FolderOpen,
  Funnel,
  House,
  Kanban,
  MagnifyingGlass,
  Plus,
  Rows,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import {
  AppHeader,
  AppHeaderBrand,
  AppHeaderMobileTop,
  AppHeaderNav,
  AppHeaderNavItem,
  AppHeaderNavSection,
  AppHeaderRight,
  AppHeaderTools,
} from "@patchui/react/blocks/app-header";

const DASHBOARD_NAV: {
  label: string;
  prefix: React.ReactNode;
  suffix?: React.ReactNode;
}[] = [
  { label: "Home", prefix: <House /> },
  { label: "Projects", prefix: <FolderOpen />, suffix: <Badge>12</Badge> },
  { label: "Insights", prefix: <ChartBar /> },
  { label: "Team", prefix: <Users />, suffix: <Badge color="success">New</Badge> },
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
        <div className="w-full overflow-x-auto rounded-[var(--radius-12)] border border-hairline bg-base">
          <div className="min-w-[900px]">
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
              <Button variant="tertiary" size="md">
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
      </div>

      <div className="space-y-3">
        <SectionLabel>List page (with tools, mobile top slot, and filter toolbar)</SectionLabel>
        <div className="w-full overflow-x-auto rounded-[var(--radius-12)] border border-hairline bg-base">
          <div className="min-w-[900px]">
          <AppHeader
            bordered={false}
            filterToolbar={
              <div className="flex items-center justify-between gap-3 px-4 py-2 md:px-6">
                <div className="flex items-center gap-2">
                  <ToggleGroup defaultValue="board" size="sm" aria-label="View">
                    <ToggleGroupItem value="list" aria-label="List view">
                      <Rows />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="board" aria-label="Board view">
                      <Kanban />
                    </ToggleGroupItem>
                  </ToggleGroup>
                  <span aria-hidden className="h-4 w-px bg-hairline" />
                  <Button variant="tertiary" size="sm" icon={<Funnel />}>
                    Filters
                  </Button>
                  <Badge>Active</Badge>
                  <Badge>P1</Badge>
                </div>
                <span className="text-mini tabular-nums text-ink-muted">
                  24 projects
                </span>
              </div>
            }
          >
            <AppHeaderBrand>
              <LogoMark />
              <span>Patch</span>
            </AppHeaderBrand>

            <AppHeaderNav>
              <AppHeaderNavItem href="#" active onClick={(e) => e.preventDefault()}>
                Projects
              </AppHeaderNavItem>
              <AppHeaderNavItem href="#" onClick={(e) => e.preventDefault()}>
                Members
              </AppHeaderNavItem>
              <AppHeaderNavItem href="#" onClick={(e) => e.preventDefault()}>
                Reports
              </AppHeaderNavItem>
            </AppHeaderNav>

            <AppHeaderTools>
              <Input
                size="md"
                prefix={<MagnifyingGlass />}
                placeholder="Search projects…"
              />
            </AppHeaderTools>

            <AppHeaderMobileTop>
              <Button
                variant="tertiary"
                size="md"
                aria-label="Notifications"
                icon={<Bell />}
              />
            </AppHeaderMobileTop>

            <AppHeaderRight>
              <Button
                variant="tertiary"
                size="md"
                aria-label="Notifications"
                icon={<Bell />}
              />
              <Button variant="primary" size="md" icon={<Plus />}>
                New project
              </Button>
              <Avatar size="sm" letter="A" />
            </AppHeaderRight>
          </AppHeader>

          <div className="grid grid-cols-1 gap-3 border-t border-hairline bg-fill-1 p-4 sm:grid-cols-2 md:grid-cols-3 md:p-6">
            {[
              { name: "Homepage redesign", meta: "12 tasks · Due Fri" },
              { name: "Onboarding v2", meta: "8 tasks · P1" },
              { name: "Billing migration", meta: "4 tasks · Blocked" },
              { name: "API rate limits", meta: "6 tasks · In review" },
              { name: "Search relevance", meta: "9 tasks · P2" },
              { name: "Docs refresh", meta: "3 tasks · Ready" },
            ].map((p) => (
              <div
                key={p.name}
                className="rounded-[var(--radius-8)] border border-hairline bg-layer-1 p-3"
              >
                <p className="text-small font-medium text-ink">{p.name}</p>
                <p className="mt-1 text-mini text-ink-muted">{p.meta}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Marketing (with dropdowns)</SectionLabel>
        <div className="w-full overflow-x-auto rounded-[var(--radius-12)] border border-hairline bg-base">
          <div className="min-w-[900px]">
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
              <Button variant="tertiary" size="md">
                Sign in
              </Button>
              <Button variant="primary" size="md">
                Get started
              </Button>
            </AppHeaderRight>
          </AppHeader>
          </div>
        </div>
      </div>
    </div>
  );
}
