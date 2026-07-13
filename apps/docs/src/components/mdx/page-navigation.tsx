"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@patchui/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { navigation } from "@/lib/navigation";

const pages = navigation.flatMap((group) => group.items);

const relatedPages: Record<string, { title: string; href: string }> = {
  "/docs/components/toggle": { title: "Toggle Group", href: "/docs/components/toggle-group" },
  "/docs/components/input": { title: "Field", href: "/docs/components/field" },
  "/docs/components/popover": { title: "Tooltip", href: "/docs/components/tooltip" },
  "/docs/components/progress": { title: "Spinner", href: "/docs/components/spinner" },
  "/docs/components/menu": { title: "Navigation Menu", href: "/docs/components/navigation-menu" },
  "/docs/components/switch": { title: "Toggle", href: "/docs/components/toggle" },
};

export function PageNavigation() {
  const pathname = usePathname();
  const index = pages.findIndex((page) => page.href === pathname);
  if (index < 0) return null;

  const previous = pages[index - 1];
  const next = pages[index + 1];
  const related = relatedPages[pathname];

  return (
    <div className="mt-12 border-t border-hairline pt-6">
      {related && (
        <p className="mb-4 text-small text-ink-muted">
          Related: <Link href={related.href} className="font-medium text-ink underline decoration-hairline-tertiary underline-offset-4 hover:decoration-ink">{related.title}</Link>
        </p>
      )}
      <nav aria-label="Documentation pages" className="flex items-center justify-between gap-4">
        {previous ? (
          <Button
            variant="tertiary"
            size="sm"
            icon={<ArrowLeft aria-hidden />}
            render={<Link href={previous.href} />}
          >
            {previous.title}
          </Button>
        ) : <span />}
        {next && (
          <Button
            variant="tertiary"
            size="sm"
            icon={<ArrowRight aria-hidden />}
            iconPosition="right"
            render={<Link href={next.href} />}
          >
            {next.title}
          </Button>
        )}
      </nav>
    </div>
  );
}
