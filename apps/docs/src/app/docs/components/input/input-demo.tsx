"use client";

import { useState } from "react";
import { Input } from "@patchui/react";
import { Mail, Search } from "lucide-react";

export function InputDemo() {
  const [searchValue, setSearchValue] = useState("");
  const [emailValue, setEmailValue] = useState("not-an-email");
  const [savingValue, setSavingValue] = useState("Saving this…");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-label-12 text-gray-800">Sizes</p>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Default" />
          <Input size="lg" placeholder="Large" />
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">With Icon</p>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input icon={<Search className="h-4 w-4" />} placeholder="Search" />
          <Input icon={<Mail className="h-4 w-4" />} placeholder="Email" />
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Prefix and Suffix</p>
        <div className="flex flex-col gap-3 max-w-xs">
          <Input prefix="$" placeholder="0.00" />
          <Input suffix=".com" placeholder="username" />
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Clear</p>
        <div className="max-w-xs">
          <Input
            icon={<Search className="h-4 w-4" />}
            placeholder="Type to show the clear button"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClear={() => setSearchValue("")}
          />
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Invalid</p>
        <div className="max-w-xs">
          <Input
            icon={<Mail className="h-4 w-4" />}
            invalid
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder="Email"
          />
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Loading</p>
        <div className="max-w-xs">
          <Input
            loading
            value={savingValue}
            onChange={(e) => setSavingValue(e.target.value)}
          />
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Disabled</p>
        <div className="max-w-xs">
          <Input placeholder="Disabled input" disabled />
        </div>
      </div>
    </div>
  );
}
