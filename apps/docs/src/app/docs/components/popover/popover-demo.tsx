"use client";

import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  Button,
  Input,
  Label,
} from "@patchui/react";
import { Info, Settings } from "lucide-react";

export function PopoverDemo() {
  return (
    <div className="flex flex-col gap-10">
      {/* Basic click */}
      <Section label="Click trigger">
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            Open popover
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4">
            <h3 className="text-label-13 font-semibold text-gray-1000">
              Place a popover anywhere
            </h3>
            <p className="mt-2 text-label-12 leading-relaxed text-gray-900">
              Any element can be the trigger. The popup holds arbitrary content —
              text, forms, lists, custom layouts.
            </p>
          </PopoverContent>
        </Popover>
      </Section>

      {/* Hover with arrow */}
      <Section label="Hover trigger + arrow">
        <Popover hover arrow>
          <PopoverTrigger
            render={
              <Button
                variant="ghost"
                size="sm"
                icon={<Info className="size-4" />}
              />
            }
            aria-label="Why we need this"
          />
          <PopoverContent className="max-w-[260px] p-3">
            <p className="text-label-12 leading-relaxed text-gray-900">
              Hover-triggered popovers open after a short delay and close
              gracefully. The arrow points back to the source.
            </p>
          </PopoverContent>
        </Popover>
      </Section>

      {/* Form (modal — traps focus) */}
      <Section label="Form (modal focus trap)">
        <FormPopover />
      </Section>

      {/* Placement */}
      <Section label="Placement: right">
        <Popover placement="right">
          <PopoverTrigger
            render={
              <Button
                variant="ghost"
                size="sm"
                icon={<Settings className="size-4" />}
              />
            }
            aria-label="Settings"
          />
          <PopoverContent className="w-56 p-3">
            <div className="flex flex-col gap-2 text-label-13 text-gray-900">
              <button className="text-left hover:text-gray-1000">
                Profile
              </button>
              <button className="text-left hover:text-gray-1000">
                Workspace
              </button>
              <button className="text-left hover:text-gray-1000">
                Sign out
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </Section>
    </div>
  );
}

function FormPopover() {
  const [name, setName] = useState("");
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Edit name
      </PopoverTrigger>
      <PopoverContent modal className="w-80 p-4">
        <h3 className="text-label-13 font-semibold text-gray-1000">
          Display name
        </h3>
        <p className="mt-1 text-label-12 text-gray-900">
          Shown next to your activity.
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <Label htmlFor="display-name">Name</Label>
          <Input
            id="display-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane"
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <PopoverClose
            render={<Button variant="ghost" size="sm" />}
          >
            Cancel
          </PopoverClose>
          <PopoverClose render={<Button size="sm" />}>Save</PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-medium text-gray-800">
        {label}
      </p>
      {children}
    </div>
  );
}
