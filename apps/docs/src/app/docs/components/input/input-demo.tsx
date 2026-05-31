"use client";

import { Input } from "@patchui/react";
import { Mail, Search } from "lucide-react";

/** Showcases Input sizes, icon, prefix/suffix, and disabled state. */
export function InputDemo() {
  return (
    <div className="flex flex-col gap-8">
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
          <Input icon={<Search className="h-4 w-4" />} placeholder="Search…" />
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
