"use client";

import { useState } from "react";
import {
  Field,
  FieldLabel,
  Select,
  SelectItem,
} from "@patchui/react";

export function SelectDemo() {
  const [framework, setFramework] = useState("react");

  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="select-framework-preview">Framework</FieldLabel>
      <Select
        id="select-framework-preview"
        value={framework}
        onValueChange={setFramework}
      >
        <SelectItem value="react">React</SelectItem>
        <SelectItem value="vue">Vue</SelectItem>
        <SelectItem value="svelte">Svelte</SelectItem>
        <SelectItem value="solid">Solid</SelectItem>
      </Select>
    </Field>
  );
}
