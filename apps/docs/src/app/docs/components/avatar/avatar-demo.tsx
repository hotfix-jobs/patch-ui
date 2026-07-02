"use client";

import { Avatar, AvatarFallback, AvatarGroup } from "@patchui/react";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-label-12 text-gray-800">{children}</p>;
}

export function AvatarDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <Label>Sizes</Label>
        <div className="flex items-center gap-3">
          <Avatar size="xs"><AvatarFallback>JD</AvatarFallback></Avatar>
          <Avatar size="sm"><AvatarFallback>AS</AvatarFallback></Avatar>
          <Avatar size="md"><AvatarFallback>MK</AvatarFallback></Avatar>
          <Avatar size="lg"><AvatarFallback>LF</AvatarFallback></Avatar>
          <Avatar size="xl"><AvatarFallback>BV</AvatarFallback></Avatar>
        </div>
      </div>

      <div>
        <Label>Shapes</Label>
        <div className="flex items-center gap-3">
          <Avatar shape="circle"><AvatarFallback>CI</AvatarFallback></Avatar>
          <Avatar shape="square"><AvatarFallback>SQ</AvatarFallback></Avatar>
        </div>
      </div>

      <div>
        <Label>Group</Label>
        <AvatarGroup size="md" max={4}>
          <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>AS</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>MK</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>LF</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>BV</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>RT</AvatarFallback></Avatar>
        </AvatarGroup>
      </div>
    </div>
  );
}
