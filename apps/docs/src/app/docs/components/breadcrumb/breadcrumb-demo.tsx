"use client";

import { Breadcrumb } from "@patchui/react";
import { SectionLabel } from "@patchui/react";

export function BreadcrumbDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Basic</SectionLabel>
        <Breadcrumb
          items={[
            { name: "Home", href: "/" },
            { name: "Docs", href: "/docs" },
            { name: "Breadcrumb" },
          ]}
        />
      </div>

      <div className="space-y-3">
        <SectionLabel>Long chain (collapses middle on mobile)</SectionLabel>
        <p className="mb-2 text-small text-ink-muted">
          Resize the viewport below the sm breakpoint to see the middle
          crumbs collapse behind a <code>…</code> toggle.
        </p>
        <Breadcrumb
          items={[
            { name: "Home", href: "/" },
            { name: "Workspace", href: "/workspace" },
            { name: "Alan Turing", href: "/workspace/alan-turing" },
            { name: "Projects", href: "/workspace/alan-turing/projects" },
            { name: "Enigma decryption" },
          ]}
        />
      </div>

      <div className="space-y-3">
        <SectionLabel>No home crumb</SectionLabel>
        <Breadcrumb
          items={[
            { name: "Settings", href: "/settings" },
            { name: "Team", href: "/settings/team" },
            { name: "Roles" },
          ]}
        />
      </div>

      <div className="space-y-3">
        <SectionLabel>Long current-page label truncates</SectionLabel>
        <div className="max-w-[420px]">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Posts", href: "/posts" },
              {
                name: "An intolerably long final-crumb title that would otherwise overflow the container width",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
