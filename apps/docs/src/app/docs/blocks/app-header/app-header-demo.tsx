"use client";

import { useState } from "react";
import { Avatar, Badge, Button } from "@patchui/react";
import { ChartBar, FolderOpen, House } from "@phosphor-icons/react/dist/ssr";
import {
  AppHeader,
  AppHeaderBrand,
  AppHeaderMobileTop,
  AppHeaderNav,
  AppHeaderNavItem,
  AppHeaderRight,
} from "@patchui/react/blocks/app-header";

const navItems = [
  { label: "Home", icon: <House /> },
  { label: "Projects", icon: <FolderOpen />, badge: <Badge>12</Badge> },
  { label: "Insights", icon: <ChartBar /> },
];

export function AppHeaderDemo() {
  const [active, setActive] = useState("Home");

  return (
    <div className="min-h-dvh w-full bg-base">
      <AppHeader>
        <AppHeaderBrand>
          <span className="flex size-6 items-center justify-center rounded-[var(--radius-6)] bg-ink text-small font-medium text-[color:var(--base)]">
            P
          </span>
          <span>Patch</span>
        </AppHeaderBrand>

        <AppHeaderNav>
          {navItems.map((item) => (
            <AppHeaderNavItem
              key={item.label}
              href="#"
              active={active === item.label}
              prefix={item.icon}
              suffix={item.badge}
              onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
              }}
            >
              {item.label}
            </AppHeaderNavItem>
          ))}
        </AppHeaderNav>

        <AppHeaderMobileTop>
          <Avatar size="sm" letter="A" />
        </AppHeaderMobileTop>

        <AppHeaderRight>
          <Button variant="secondary" size="md">Send feedback</Button>
          <span className="hidden md:block">
            <Avatar size="sm" letter="A" />
          </span>
        </AppHeaderRight>
      </AppHeader>

      <div className="bg-fill-1 px-6 py-8">
        <p className="text-small font-medium text-ink">{active}</p>
        <p className="mt-1 text-small text-ink-muted">The selected workspace page appears here.</p>
      </div>
    </div>
  );
}
