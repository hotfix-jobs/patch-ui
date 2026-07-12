"use client";

import {
  Button,
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@patchui/react";

const regions = ["US East", "US West", "EU West", "Asia Pacific"];

export function SheetBottomDemo() {
  return (
    <Sheet side="bottom">
      <SheetTrigger render={<Button variant="secondary" />}>
        Choose Region
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Data Region</SheetTitle>
          <SheetDescription>Choose where project data is stored.</SheetDescription>
        </SheetHeader>
        <SheetBody className="gap-1 p-2">
          {regions.map((region) => (
            <SheetClose
              key={region}
              render={<Button variant="tertiary" className="w-full justify-start" />}
            >
              {region}
            </SheetClose>
          ))}
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
