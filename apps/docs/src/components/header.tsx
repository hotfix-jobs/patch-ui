"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@patchui/react";
import { ThemeToggle } from "./theme-toggle";
import { DocsSearch } from "./docs-search";

export function Header({ onMenuToggle }: { onMenuToggle?: () => void }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center gap-4 border-b-[0.5px] border-gray-alpha-400 bg-background-100/80 px-4 backdrop-blur-md"
    >
      {/* Mobile menu toggle */}
      <Button
        variant="ghost"
        size="sm"
        icon={<Menu className="size-5" />}
        onClick={onMenuToggle}
        aria-label="Toggle navigation"
        className="lg:hidden"
      />

      <Link
        href="/docs"
        className="flex items-center font-semibold text-gray-1000"
      >
        <span className="text-lg">Patch UI</span>
      </Link>

      <div className="flex-1" />

      <DocsSearch />

      <ThemeToggle />
    </header>
  );
}
