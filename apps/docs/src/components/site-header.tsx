"use client";

import Link from "next/link";
import { Button } from "@patchui/react";

// Inline GitHub mark — lucide-react dropped brand icons in v0.400+.
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.09 3.29 9.4 7.87 10.93.58.11.79-.25.79-.55 0-.27-.01-1.15-.02-2.08-3.2.7-3.87-1.4-3.87-1.4-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.5 3.18-1.18 3.18-1.18.63 1.59.23 2.77.12 3.06.74.81 1.19 1.84 1.19 3.1 0 4.44-2.7 5.42-5.27 5.7.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.55A11.53 11.53 0 0 0 23.5 12.03C23.5 5.66 18.35.5 12 .5Z" />
    </svg>
  );
}
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
        <Button
          variant="secondary"
          size="sm"
          shape="circle"
          icon={<GithubIcon className="size-4" />}
          aria-label="GitHub"
          render={
            <a
              href="https://github.com/hotfix-jobs/patch-ui"
              target="_blank"
              rel="noreferrer"
            />
          }
        />
        <ThemeToggle />
      </AppHeaderRight>
    </AppHeader>
  );
}
