"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  SectionLabel,
} from "@patchui/react";

export function CardDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Structured card</SectionLabel>
        <Card className="max-w-md">
          <CardHeader>
            <div>
              <CardTitle>Workspace activity</CardTitle>
              <CardDescription>A concise summary of recent changes.</CardDescription>
            </div>
            <Button variant="tertiary" size="sm">View</Button>
          </CardHeader>
          <CardContent>
            <p className="text-small text-ink">
              Three updates were published during the last seven days.
            </p>
          </CardContent>
          <CardFooter divided>
            <span className="text-mini text-ink-muted">Updated 12 minutes ago</span>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-3">
        <SectionLabel>Actionable link</SectionLabel>
        <Card
          actionable
          render={<Link href="#card-usage" />}
          className="block max-w-md"
        >
          <CardContent className="flex items-center justify-between gap-4">
            <div>
              <CardTitle render={<span />}>Browse resources</CardTitle>
              <CardDescription>Open the complete collection.</CardDescription>
            </div>
            <ArrowRight aria-hidden className="size-4 shrink-0 text-ink-muted" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <SectionLabel>Surface</SectionLabel>
          <Card variant="surface">
            <CardContent>
              <p className="text-small">A quiet grouped-content surface.</p>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-3">
          <SectionLabel>Elevated</SectionLabel>
          <Card variant="elevated">
            <CardContent>
              <p className="text-small">A distinct object above the page surface.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
