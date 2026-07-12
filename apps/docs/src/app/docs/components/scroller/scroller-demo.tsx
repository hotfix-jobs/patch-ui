"use client";

import { Card, CardContent, CardTitle, Scroller } from "@patchui/react";

const projects = [
  "Design System",
  "Planning",
  "Documentation",
  "Analytics",
  "Mobile App",
];

export function ScrollerDemo() {
  return (
    <Scroller
      overflow="x"
      ariaLabel="Featured projects"
      childrenContainerClassName="gap-3 p-1"
    >
      {projects.map((project) => (
        <Card key={project} className="w-52 shrink-0">
          <CardContent>
            <CardTitle render={<h3 />}>{project}</CardTitle>
            <p className="mt-1 text-small text-ink-muted">Active project</p>
          </CardContent>
        </Card>
      ))}
    </Scroller>
  );
}
