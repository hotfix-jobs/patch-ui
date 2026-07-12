"use client";

import { Button, Separator } from "@patchui/react";

export function SeparatorDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Button variant="secondary">Continue with Email</Button>
      <Separator label="or" />
      <Button>Continue as Guest</Button>
    </div>
  );
}
