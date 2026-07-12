"use client";

import { Button } from "@patchui/react";
import {
  AppHeader,
  AppHeaderBrand,
  AppHeaderNav,
  AppHeaderNavItem,
  AppHeaderNavSection,
  AppHeaderRight,
} from "@patchui/react/blocks/app-header";

export function AppHeaderMarketingDemo() {
  return (
    <div className="w-full overflow-hidden rounded-[var(--radius-12)] bg-base">
      <AppHeader bordered={false}>
        <AppHeaderBrand render={<a href="#" onClick={(event) => event.preventDefault()} />}>
          Patch
        </AppHeaderBrand>

        <AppHeaderNav>
          <AppHeaderNavSection title="Product">
            <AppHeaderNavItem href="#">Features</AppHeaderNavItem>
            <AppHeaderNavItem href="#">Pricing</AppHeaderNavItem>
          </AppHeaderNavSection>
          <AppHeaderNavSection title="Resources">
            <AppHeaderNavItem href="#">Docs</AppHeaderNavItem>
            <AppHeaderNavItem href="#">Blog</AppHeaderNavItem>
          </AppHeaderNavSection>
        </AppHeaderNav>

        <AppHeaderRight>
          <Button variant="tertiary" size="md">Sign in</Button>
          <Button variant="primary" size="md">Get started</Button>
        </AppHeaderRight>
      </AppHeader>

      <div className="px-6 py-10 text-center">
        <p className="text-title3 font-medium text-ink">Build a focused product experience.</p>
      </div>
    </div>
  );
}
