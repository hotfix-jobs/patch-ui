"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function DocsRouteFocus() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollRoot = document.querySelector<HTMLElement>('[data-slot="docs-scroll"]');
    scrollRoot?.scrollTo({ top: 0 });

    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      scrollRoot?.scrollTo({ top: 0 });
      secondFrame = requestAnimationFrame(() => {
        const heading = document.querySelector<HTMLElement>('[data-slot="docs-article"] h1');
        scrollRoot?.scrollTo({ top: 0 });
        heading?.focus({ preventScroll: true });
      });
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [pathname]);

  return null;
}
