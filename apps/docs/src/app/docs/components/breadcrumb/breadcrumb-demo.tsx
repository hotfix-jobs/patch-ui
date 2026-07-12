"use client";

import { Breadcrumb } from "@patchui/react";

export function BreadcrumbDemo() {
  return (
    <Breadcrumb
      items={[
        { name: "Home", href: "/" },
        { name: "Projects", href: "/projects" },
        { name: "Enigma" },
      ]}
    />
  );
}
