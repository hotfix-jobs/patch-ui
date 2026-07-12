"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@patchui/react";

export function CardDemo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div>
          <CardTitle>Workspace activity</CardTitle>
          <CardDescription>Changes from the last seven days.</CardDescription>
        </div>
        <Button variant="tertiary" size="sm">
          View
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-small text-ink">
          Three updates were published during the last seven days.
        </p>
      </CardContent>
      <CardFooter divided>
        <span className="text-mini text-ink-muted">Updated recently</span>
      </CardFooter>
    </Card>
  );
}
