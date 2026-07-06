"use client";

import { useState } from "react";
import {
  Button,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  SheetClose,
  Label,
  Input,
} from "@patchui/react";
import { SectionLabel } from "@patchui/react";

export function SheetDemo() {
  const [name, setName] = useState("Ada Lovelace");
  const [email, setEmail] = useState("ada@example.com");

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Editable profile</SectionLabel>
        <Sheet>
          <SheetTrigger render={<Button variant="secondary" />}>
            Open profile
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Profile</SheetTitle>
              <SheetDescription>
                Update the member's name and contact details.
              </SheetDescription>
            </SheetHeader>
            <SheetBody>
              <div className="flex flex-col gap-2">
                <Label htmlFor="sheet-name">Name</Label>
                <Input
                  id="sheet-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="sheet-email">Email</Label>
                <Input
                  id="sheet-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </SheetBody>
            <SheetFooter>
              <SheetClose render={<Button variant="secondary">Cancel</Button>} />
              <SheetClose render={<Button variant="primary">Save changes</Button>} />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-3">
        <SectionLabel>Left side (navigation)</SectionLabel>
        <Sheet>
          <SheetTrigger render={<Button variant="secondary" />}>
            Open menu
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <SheetBody>
              {[
                "Home",
                "Projects",
                "Team",
                "Analytics",
                "Settings",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-body-14 text-ink hover:text-ink"
                >
                  {item}
                </a>
              ))}
            </SheetBody>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-3">
        <SectionLabel>Bottom side (mobile picker)</SectionLabel>
        <Sheet>
          <SheetTrigger render={<Button variant="secondary" />}>
            Pick region
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Choose a region</SheetTitle>
            </SheetHeader>
            <SheetBody className="gap-1 p-2">
              {["US East", "US West", "EU West", "Asia Pacific"].map((r) => (
                <SheetClose
                  key={r}
                  render={
                    <Button
                      variant="tertiary"
                      size="lg"
                      className="w-full justify-start hover:bg-surface-2 active:bg-surface-3"
                    />
                  }
                >
                  {r}
                </SheetClose>
              ))}
            </SheetBody>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
