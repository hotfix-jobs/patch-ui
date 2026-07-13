"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@patchui/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function CardActionableDemo() {
  return (
    <Card
      actionable
      render={<a href="#api-reference" />}
      className="block w-full max-w-md"
    >
      <CardContent className="flex items-center justify-between gap-4">
        <div>
          <CardTitle render={<span />}>Browse resources</CardTitle>
          <CardDescription>Open the complete collection.</CardDescription>
        </div>
        <ArrowRight aria-hidden className="size-4 shrink-0 text-ink-muted" />
      </CardContent>
    </Card>
  );
}
