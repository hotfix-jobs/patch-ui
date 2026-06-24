"use client";

import { useState } from "react";
import { Input } from "@patchui/react";
import { Mail, Search } from "lucide-react";

/** Showcases Input variants, sizes, icon, prefix/suffix, states, and clear. */
export function InputDemo() {
  const [searchValue, setSearchValue] = useState("");
  const [emailValue, setEmailValue] = useState("not-an-email");
  const [savingValue, setSavingValue] = useState("Saving this...");

  return (
    <div className="flex flex-col gap-8">
      {/* Variants */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Variants
        </p>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input variant="outlined" placeholder="Outlined (default)" />
          <Input variant="ghost" placeholder="Ghost" />
          <Input variant="underline" placeholder="Underline" />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Sizes
        </p>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Default" />
          <Input size="lg" placeholder="Large" />
        </div>
      </div>

      {/* With Icon */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          With Icon
        </p>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input icon={<Search className="h-4 w-4" />} placeholder="Search..." />
          <Input icon={<Mail className="h-4 w-4" />} placeholder="Email" />
        </div>
      </div>

      {/* Prefix & Suffix */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Prefix & Suffix
        </p>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input prefix={"$"} placeholder="0.00" />
          <Input suffix={".com"} placeholder="username" />
        </div>
      </div>

      {/* Clear button */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Clear button
        </p>
        <div className="max-w-xs">
          <Input
            icon={<Search className="h-4 w-4" />}
            placeholder="Type to see the × clear"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClear={() => setSearchValue("")}
          />
        </div>
      </div>

      {/* Invalid */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Invalid state
        </p>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input
            icon={<Mail className="h-4 w-4" />}
            invalid
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder="Email"
          />
          <Input variant="underline" invalid placeholder="Underline invalid" />
        </div>
      </div>

      {/* Loading */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Loading state
        </p>
        <div className="max-w-xs">
          <Input
            loading
            value={savingValue}
            onChange={(e) => setSavingValue(e.target.value)}
          />
        </div>
      </div>

      {/* Disabled */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Disabled
        </p>
        <div className="max-w-xs">
          <Input placeholder="Disabled input" disabled />
        </div>
      </div>
    </div>
  );
}
