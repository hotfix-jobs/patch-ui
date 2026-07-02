import type * as React from "react";

/**
 * SectionLabel — small muted heading used at the top of each demo section
 * inside `*-demo.tsx` files. Centralized so we don't repeat the same
 * paragraph markup in every demo.
 */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-label-12 font-medium text-gray-800">{children}</p>
  );
}
