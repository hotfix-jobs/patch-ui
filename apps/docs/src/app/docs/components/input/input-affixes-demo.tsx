"use client";

import { Field, FieldLabel, Input } from "@patchui/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export function InputAffixesDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Field>
        <FieldLabel>Project domain</FieldLabel>
        <Input prefix="https://" suffix=".com" placeholder="project" />
      </Field>
      <Field>
        <FieldLabel>Search projects</FieldLabel>
        <Input prefix={<MagnifyingGlass />} placeholder="Project name" />
      </Field>
    </div>
  );
}
