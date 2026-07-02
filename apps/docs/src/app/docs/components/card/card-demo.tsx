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

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-label-12 text-gray-800">{children}</p>;
}

export function CardDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div>
        <Label>Default</Label>
        <Card border className="max-w-sm">
          <CardHeader>
            <CardTitle>Project Settings</CardTitle>
            <CardDescription>Manage your project configuration and preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-copy-14 text-gray-900">
              Configure build targets, environment variables, and deployment settings for your project.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Save Changes</Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Label>Basic (no border)</Label>
        <Card className="p-4 max-w-sm">
          <p className="text-copy-14 text-gray-900">A simple card with just a subtle bg.</p>
        </Card>
      </div>

      <div>
        <Label>Hoverable + border</Label>
        <Card border hoverable className="p-4 max-w-sm">
          <p className="text-copy-14 text-gray-900">Hover to see the bg and border shift.</p>
        </Card>
      </div>

      <div>
        <Label>Border between children (list container)</Label>
        <Card border borderBetween className="max-w-sm">
          <div className="p-4"><p className="text-copy-14 text-gray-900">Option 1</p></div>
          <div className="p-4"><p className="text-copy-14 text-gray-900">Option 2</p></div>
          <div className="p-4"><p className="text-copy-14 text-gray-900">Option 3</p></div>
        </Card>
      </div>

      <div>
        <Label>Border between children (row direction)</Label>
        <Card border borderBetween direction="row" className="max-w-md">
          <div className="p-4 flex-1"><p className="text-copy-14 text-gray-900">Left</p></div>
          <div className="p-4 flex-1"><p className="text-copy-14 text-gray-900">Middle</p></div>
          <div className="p-4 flex-1"><p className="text-copy-14 text-gray-900">Right</p></div>
        </Card>
      </div>

      <div>
        <Label>Secondary surface + shadow</Label>
        <Card secondary shadow className="p-4 max-w-sm">
          <p className="text-copy-14 text-gray-900">
            Secondary uses `gray-100` fill for a nested surface tone.
          </p>
        </Card>
      </div>

      <div>
        <Label>With header action</Label>
        <Card border className="max-w-sm">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
            <CardAction>
              <Button variant="secondary" size="sm">Mark all read</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-copy-14 text-gray-900">
              CardAction inside CardHeader places a control aligned top-right.
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <Label>Meta footer</Label>
        <Card border className="max-w-sm">
          <CardHeader>
            <CardTitle>Design System</CardTitle>
            <CardDescription>Updated 2 hours ago</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-copy-14 text-gray-900">
              Attribution row at the bottom of a card — icon, primary text, optional secondary, optional action.
            </p>
          </CardContent>
          <CardMeta
            icon={
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-gray-200 text-label-12 font-medium text-gray-900">
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
