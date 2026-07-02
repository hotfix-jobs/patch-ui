"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@patchui/react";

/**
 * SiteFooter: the single footer used across every page. On /docs routes,
 * `lg:pl-64` reserves the left column so the footer content sits alongside
 * the docs main content instead of hiding behind the fixed sidebar.
 */
export function SiteFooter() {
  const pathname = usePathname();
  const isDocs = pathname.startsWith("/docs");

  return (
    <footer
      className={cn(
        "border-t-[0.5px] border-gray-alpha-400 px-6 py-8 md:px-12 lg:px-16",
        isDocs && "lg:pl-[calc(16rem+4rem)]",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 text-label-12 text-gray-800">
        <span>MIT licensed. Copyright © Hotfix.</span>
        <div className="flex items-center gap-5">
          <Link href="/docs" className="font-medium hover:text-gray-1000">
            Docs
          </Link>
          <Link
            href="/docs/components/button"
            className="font-medium hover:text-gray-1000"
          >
            Components
          </Link>
          <Link
            href="/docs/credits"
            className="font-medium hover:text-gray-1000"
          >
            Credits
          </Link>
          <a
            href="https://github.com/hotfix-jobs/patch-ui"
            target="_blank"
            rel="noreferrer"
            className="font-medium hover:text-gray-1000"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
