"use client";

import { useState } from "react";
import { Input } from "@patchui/react";
import { ArrowUpCircle, Mail, Search } from "lucide-react";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-label-12 text-gray-800">{children}</p>;
}

export function InputDemo() {
  const [searchValue, setSearchValue] = useState("");
  const [emailValue, setEmailValue] = useState("not-an-email");
  const [savingValue, setSavingValue] = useState("Saving this…");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Label>Sizes</Label>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Default" />
          <Input size="lg" placeholder="Large" />
        </div>
      </div>

      <div>
        <Label>Prefix and suffix (styled, default)</Label>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input prefix={<ArrowUpCircle />} placeholder="Default" />
          <Input suffix={<ArrowUpCircle />} placeholder="Default" />
          <Input prefix="https://" suffix=".com" placeholder="Default" />
        </div>
      </div>

      <div>
        <Label>Prefix and suffix (unstyled, floating)</Label>
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

      <div>
        <Label>Label + error message</Label>
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

      <div>
        <Label>Rounded (pill-shaped)</Label>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input
            rounded
            prefix={<Search />}
            prefixStyling={false}
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClear={() => setSearchValue("")}
          />
        </div>
      </div>

      <div>
        <Label>Loading</Label>
        <div className="max-w-xs">
          <Input
            loading
            value={savingValue}
            onChange={(e) => setSavingValue(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label>Disabled</Label>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input placeholder="Disabled" disabled />
          <Input prefix="https://" suffix=".com" placeholder="Disabled" disabled />
        </div>
      </div>
    </div>
  );
}
