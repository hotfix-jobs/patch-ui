"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
  CardMeta,
  Button,
} from "@patchui/react";

/** Showcases Card variants and compound sub-components. */
export function CardDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      {/* Default */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Default
        </p>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Project Settings</CardTitle>
            <CardDescription>Manage your project configuration and preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-900">
              Configure build targets, environment variables, and deployment settings for your project.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Save Changes</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Variants */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Variants
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card variant="ghost">
            <CardContent>
              <p className="text-sm font-medium text-gray-1000">Ghost</p>
              <p className="text-xs text-gray-900">Transparent with bottom border.</p>
            </CardContent>
          </Card>
          <Card variant="interactive">
            <CardContent>
              <p className="text-sm font-medium text-gray-1000">Interactive</p>
              <p className="text-xs text-gray-900">Hover to see the highlight effect.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* With Action */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          With Header Action
        </p>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
            <CardAction>
              <Button variant="secondary" size="sm">Mark all read</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-900">
              Use CardAction inside CardHeader to place a button aligned to the top-right corner.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Meta footer */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Meta footer
        </p>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Design System</CardTitle>
            <CardDescription>Updated 2 hours ago</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-900">
              Attribution row at the bottom of a card - icon, primary text, optional secondary, optional action.
            </p>
          </CardContent>
          <CardMeta
            icon={
              <span className="inline-flex size-7 items-center justify-center rounded-[var(--radius-6)] bg-gray-200 text-[11px] font-semibold text-gray-900">
                JD
              </span>
            }
            primary="Jane Doe"
            secondary="Product Designer"
            action={<Button size="sm" variant="secondary">View</Button>}
          />
        </Card>
      </div>
    </div>
  );
}
