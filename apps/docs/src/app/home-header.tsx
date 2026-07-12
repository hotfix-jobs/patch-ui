"use client";

import Link from "next/link";
import { Button } from "@patchui/react";
import {
  AppHeader,
  AppHeaderBrand,
  AppHeaderNav,
  AppHeaderNavItem,
  AppHeaderRight,
} from "@patchui/react/blocks/app-header";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { ThemeToggle } from "@/components/theme-toggle";

export function HomeHeader() {
  return (
    <AppHeader sticky>
      <AppHeaderBrand render={<Link href="/" />}>Patch UI</AppHeaderBrand>
      <AppHeaderNav>
        <AppHeaderNavItem href="/docs/components">Components</AppHeaderNavItem>
        <AppHeaderNavItem href="/docs/blocks/app-header">Blocks</AppHeaderNavItem>
        <AppHeaderNavItem href="/docs">Documentation</AppHeaderNavItem>
      </AppHeaderNav>
      <AppHeaderRight>
        <Button variant="tertiary" size="sm" icon={<GithubLogo />} aria-label="GitHub" render={<a href="https://github.com/hotfix-jobs/patch-ui" />} />
        <ThemeToggle />
      </AppHeaderRight>
    </AppHeader>
  );
}
