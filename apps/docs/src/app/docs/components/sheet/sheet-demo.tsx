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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-medium text-gray-800">{children}</p>;
}

export function SheetDemo() {
  const [name, setName] = useState("Ada Lovelace");
  const [email, setEmail] = useState("ada@example.com");

  return (
    <div className="flex flex-col gap-8">
      {/* Right side — editable profile */}
      <div>
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

      {/* Non-modal inspector */}
      <div>
        <SectionLabel>Non-modal inspector</SectionLabel>
        <Sheet>
          <SheetTrigger render={<Button variant="secondary" />}>
            Open inspector
          </SheetTrigger>
          <SheetContent modal={false}>
            <SheetHeader>
              <SheetTitle>Deployment details</SheetTitle>
              <SheetDescription>
                Non-modal: the page underneath stays interactive so you can
                keep browsing while this stays open.
              </SheetDescription>
            </SheetHeader>
            <SheetBody>
              <p className="text-copy-14 text-gray-1000">
                Use `modal={false}` for persistent side panels that pair with
                the page underneath (record inspectors, help drawers).
              </p>
            </SheetBody>
          </SheetContent>
        </Sheet>
      </div>

      {/* Left side */}
      <div>
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
                "Deployments",
                "Analytics",
                "Domains",
                "Settings",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-copy-14 text-gray-1000 hover:text-gray-900"
                >
                  {item}
                </a>
              ))}
            </SheetBody>
          </SheetContent>
        </Sheet>
      </div>

      {/* Bottom side */}
      <div>
        <SectionLabel>Bottom side (mobile picker)</SectionLabel>
        <Sheet>
          <SheetTrigger render={<Button variant="secondary" />}>
            Pick region
          </SheetTrigger>
          <SheetContent side="bottom" modal>
            <SheetHeader>
              <SheetTitle>Choose a region</SheetTitle>
            </SheetHeader>
            <SheetBody>
              {["US East", "US West", "EU West", "Asia Pacific"].map((r) => (
                <SheetClose
                  key={r}
                  render={
                    <button className="w-full rounded-[var(--radius-6)] border border-gray-alpha-400 bg-background-100 px-3 py-3 text-copy-14 text-gray-1000 hover:bg-gray-alpha-100" />
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
