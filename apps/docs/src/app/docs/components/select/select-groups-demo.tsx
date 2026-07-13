"use client";

import {
  Field,
  FieldLabel,
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
} from "@patchui/react";

export function SelectGroupsDemo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="select-region-preview">Data region</FieldLabel>
      <Select id="select-region-preview" defaultValue="us-central">
        <SelectGroup>
          <SelectGroupLabel>United States</SelectGroupLabel>
          <SelectItem value="us-east">East</SelectItem>
          <SelectItem value="us-central">Central</SelectItem>
          <SelectItem value="us-west">West</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectGroupLabel>Europe</SelectGroupLabel>
          <SelectItem value="eu-west">West</SelectItem>
          <SelectItem value="eu-central">Central</SelectItem>
        </SelectGroup>
      </Select>
    </Field>
  );
}
