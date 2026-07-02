"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectItem,
  SelectGroup,
  SelectGroupLabel,
  SelectSeparator,
} from "@patchui/react";

/** Showcases Select with basic items, grouped items, sizes, and disabled item. */
export function SelectDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Basic Select */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Basic
        </p>
        <Select defaultValue="Apple">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Choose a fruit…" />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="Apple">Apple</SelectItem>
            <SelectItem value="Banana">Banana</SelectItem>
            <SelectItem value="Cherry">Cherry</SelectItem>
            <SelectItem value="Grape">Grape</SelectItem>
          </SelectPopup>
        </Select>
      </div>

      {/* Grouped Select */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Grouped
        </p>
        <Select defaultValue="React">
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Choose a framework…" />
          </SelectTrigger>
          <SelectPopup>
            <SelectGroup>
              <SelectGroupLabel>Frontend</SelectGroupLabel>
              <SelectItem value="React">React</SelectItem>
              <SelectItem value="Vue">Vue</SelectItem>
              <SelectItem value="Svelte">Svelte</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectGroupLabel>Backend</SelectGroupLabel>
              <SelectItem value="Node.js">Node.js</SelectItem>
              <SelectItem value="Python">Python</SelectItem>
              <SelectItem value="Go">Go</SelectItem>
            </SelectGroup>
          </SelectPopup>
        </Select>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Sizes
        </p>
        <div className="flex flex-wrap items-start gap-3">
          <Select defaultValue="Small">
            <SelectTrigger size="sm" className="w-36">
              <SelectValue placeholder="Small" />
            </SelectTrigger>
            <SelectPopup>
              <SelectItem value="Small">Small</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
            </SelectPopup>
          </Select>
          <Select defaultValue="Default">
            <SelectTrigger size="md" className="w-36">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectPopup>
              <SelectItem value="Default">Default</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectPopup>
          </Select>
          <Select defaultValue="Large">
            <SelectTrigger size="lg" className="w-36">
              <SelectValue placeholder="Large" />
            </SelectTrigger>
            <SelectPopup>
              <SelectItem value="Large">Large</SelectItem>
              <SelectItem value="Extra Large">Extra Large</SelectItem>
            </SelectPopup>
          </Select>
        </div>
      </div>

      {/* Disabled Item */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Disabled Item
        </p>
        <Select defaultValue="Available">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Choose status…" />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="Busy">Busy</SelectItem>
            <SelectItem value="Offline" disabled>Offline</SelectItem>
          </SelectPopup>
        </Select>
      </div>
    </div>
  );
}
