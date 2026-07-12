"use client";

import { useState } from "react";
import {
  Button,
  Field,
  FieldLabel,
  Input,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@patchui/react";

export function PopoverDemo() {
  const [width, setWidth] = useState("480");

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="secondary" />}>
        Edit Width
      </PopoverTrigger>
      <PopoverContent className="p-4 md:w-72">
        <p className="text-small font-medium text-ink">Dimensions</p>
        <p className="mt-1 text-small text-ink-muted">
          Set the project width in pixels.
        </p>
        <Field name="width" className="mt-4">
          <FieldLabel>Width</FieldLabel>
          <Input
            inputMode="numeric"
            value={width}
            onChange={(event) => setWidth(event.target.value)}
            suffix="px"
          />
        </Field>
        <div className="mt-4 flex justify-end gap-2">
          <PopoverClose render={<Button variant="tertiary" size="sm" />}>
            Cancel
          </PopoverClose>
          <PopoverClose render={<Button size="sm" />}>
            Save
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
