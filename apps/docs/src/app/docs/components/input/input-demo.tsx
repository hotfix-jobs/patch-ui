"use client";

import { useState } from "react";
import { Field, FieldError, FieldLabel, Input, SearchInput , SectionLabel } from "@patchui/react";
import { ArrowCircleUp, Envelope, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
export function InputDemo() {
  const [searchValue, setSearchValue] = useState("");
  const [emailValue, setEmailValue] = useState("not-an-email");
  const [savingValue, setSavingValue] = useState("Saving this…");

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Sizes</SectionLabel>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Default" />
          <Input size="lg" placeholder="Large" />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Prefix and suffix</SectionLabel>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input prefix={<ArrowCircleUp />} placeholder="Icon prefix" />
          <Input suffix={<ArrowCircleUp />} placeholder="Icon suffix" />
          <Input prefix="https://" suffix=".com" placeholder="Text prefix and suffix" />
          <Input prefix={<MagnifyingGlass />} placeholder="Search projects" />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Label + error message</SectionLabel>
        <div className="flex flex-col gap-3 max-w-xs">
          <Field>
            <FieldLabel>Domain</FieldLabel>
            <Input id="demo-label" placeholder="example.com" />
          </Field>
          <Field invalid>
            <FieldLabel>Email</FieldLabel>
            <Input
              id="demo-err"
              prefix={<Envelope />}
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <FieldError match>Enter a valid email address.</FieldError>
          </Field>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>SearchInput (X button clears the value)</SectionLabel>
        <div className="flex flex-col gap-3 max-w-xs">
          <SearchInput
            placeholder="Search projects"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Loading</SectionLabel>
        <div className="max-w-xs">
          <Input
            loading
            value={savingValue}
            onChange={(e) => setSavingValue(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Disabled</SectionLabel>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input placeholder="Disabled" disabled />
          <Input prefix="https://" suffix=".com" placeholder="Disabled" disabled />
        </div>
      </div>
    </div>
  );
}
