"use client";

import Link from "next/link";
import { Button } from "@patchui/react";
import {
  AppHeader,
  AppHeaderBrand,
  AppHeaderRight,
} from "@patchui/react/blocks/app-header";
import { ThemeToggle } from "./theme-toggle";
import { DocsSearch } from "./docs-search";

/**
 * SiteHeader — the single header used across every page (homepage, docs,
 * blocks). Uses the AppHeader block from patch-ui so the site dogfoods its
 * own primitive.
 *
 * No Docs / Components nav links here — the sidebar handles that on docs
 * pages, and marketing pages don't need duplicate navigation.
 */
export function SiteHeader() {
  return (
    <AppHeader sticky>
      <AppHeaderBrand render={<Link href="/" />}>Patch UI</AppHeaderBrand>
      <AppHeaderRight>
        <DocsSearch />
        <ThemeToggle />
        <Button
          variant="secondary"
          size="sm"
          render={
            <a
              href="https://github.com/hotfix-jobs/patch-ui"
              target="_blank"
              rel="noreferrer"
            />
          }
        >
          GitHub
        </Button>
      </AppHeaderRight>
    </AppHeader>
  );
}
