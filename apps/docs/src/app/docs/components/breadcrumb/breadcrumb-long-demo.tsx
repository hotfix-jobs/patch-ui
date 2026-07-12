"use client";

import { Breadcrumb } from "@patchui/react";

export function BreadcrumbLongDemo() {
  return (
    <Breadcrumb
      items={[
        { name: "Home", href: "/" },
        { name: "Workspace", href: "/workspace" },
        { name: "Alan Turing", href: "/workspace/alan-turing" },
        { name: "Projects", href: "/workspace/alan-turing/projects" },
        { name: "Enigma" },
      ]}
    />
  );
}
