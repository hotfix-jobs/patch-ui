"use client";

import {
  Button,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  Input,
  Label,
} from "@patchui/react";

/** Showcases Sheet from different directions. */
export function SheetDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Default (Right) */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Right (Default)
        </p>
        <Sheet>
          <SheetTrigger render={<Button variant="secondary" />}>
            Open Sheet
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Account Settings</SheetTitle>
              <SheetDescription>
                Update your account preferences here.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 p-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="sheet-name">Display Name</Label>
                <Input id="sheet-name" defaultValue="Jane Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="sheet-email">Email</Label>
                <Input id="sheet-email" type="email" defaultValue="jane@example.com" />
              </div>
            </div>
            <SheetFooter>
              <Button>Save Changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Directions */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Directions
        </p>
        <div className="flex flex-wrap gap-3">
          {(["left", "right", "top", "bottom"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger render={<Button variant="secondary" />}>
                {side.charAt(0).toUpperCase() + side.slice(1)}
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Sheet - {side}</SheetTitle>
                  <SheetDescription>
                    This sheet slides in from the {side}.
                  </SheetDescription>
                </SheetHeader>
                <div className="p-6 text-sm text-gray-900">
                  Sheet content goes here.
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </div>

      {/* Without Close Button */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Without Close Button
        </p>
        <Sheet>
          <SheetTrigger render={<Button variant="secondary" />}>
            No Close Button
          </SheetTrigger>
          <SheetContent side="right" showCloseButton={false}>
            <SheetHeader>
              <SheetTitle>Custom Sheet</SheetTitle>
              <SheetDescription>
                This sheet has no built-in close button. Click the backdrop to dismiss.
              </SheetDescription>
            </SheetHeader>
            <div className="p-6 text-sm text-gray-900">
              Use the backdrop or a custom close action to dismiss this sheet.
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
