"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { DocsSearch } from "./docs-search";

export function Header({ onMenuToggle }: { onMenuToggle?: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center border-b border-patch-border bg-patch-bg px-4 gap-4">
      {/* Mobile menu button */}
      <button
        className="mr-2 inline-flex h-9 w-9 items-center justify-center rounded-md text-patch-text-secondary hover:text-patch-text lg:hidden"
        onClick={onMenuToggle}
        aria-label="Toggle navigation"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <Link
        href="/docs"
        className="flex items-center font-semibold text-patch-text"
      >
        <span className="text-lg">Patch UI</span>
      </Link>

      <div className="flex-1" />

      <DocsSearch />

      <ThemeToggle />
    </header>
  );
}
