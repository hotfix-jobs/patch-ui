"use client";

import { Avatar, AvatarFallback } from "@patchui/react";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[length:var(--text-patch-mini)] font-medium text-patch-text-tertiary">
      {children}
    </p>
  );
}

export function AvatarDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <Label>Sizes</Label>
        <div className="flex items-center gap-3">
          <Avatar size="sm">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar size="md">
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div>
        <Label>Shapes</Label>
        <div className="flex items-center gap-3">
          <Avatar shape="circle">
            <AvatarFallback>CI</AvatarFallback>
          </Avatar>
          <Avatar shape="square">
            <AvatarFallback>SQ</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div>
        <Label>Stacked group</Label>
        <div className="flex -space-x-2">
          {["JD", "AS", "MK"].map((initials) => (
            <Avatar key={initials} className="ring-2 ring-patch-bg">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          ))}
          <Avatar className="border-[0.5px] border-patch-border bg-patch-surface-2 text-patch-text-secondary ring-2 ring-patch-bg">
            <AvatarFallback>+5</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
