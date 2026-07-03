"use client";

import { useState } from "react";
import { Input, SearchInput , SectionLabel } from "@patchui/react";
import { ArrowUpCircle, Mail, Search } from "lucide-react";


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
        <SectionLabel>Prefix and suffix (styled, default)</SectionLabel>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input prefix={<ArrowUpCircle />} placeholder="Default" />
          <Input suffix={<ArrowUpCircle />} placeholder="Default" />
          <Input prefix="https://" suffix=".com" placeholder="Default" />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Prefix and suffix (unstyled, floating)</SectionLabel>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input
            prefix={<ArrowUpCircle />}
            prefixStyling={false}
            suffix={<ArrowUpCircle />}
            suffixStyling={false}
            placeholder="Default"
          />
          <Input
            prefix={<Search />}
            prefixStyling={false}
            placeholder="Search projects"
          />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Label + error message</SectionLabel>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input id="demo-label" label="Domain" placeholder="example.com" />
          <Input
            id="demo-err"
            label="Email"
            prefix={<Mail />}
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            error="Enter a valid email address."
          />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Rounded (pill-shaped)</SectionLabel>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input
            rounded
            prefix={<Search />}
            prefixStyling={false}
            placeholder="Search"
          />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>SearchInput (clears on Escape or Esc chip click)</SectionLabel>
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
