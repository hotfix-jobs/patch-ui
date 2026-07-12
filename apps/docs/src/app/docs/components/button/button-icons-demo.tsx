"use client";

import { Button } from "@patchui/react";
import { Download, Envelope, Trash } from "@phosphor-icons/react/dist/ssr";

export function ButtonIconsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button icon={<Envelope />}>Send Email</Button>
      <Button variant="secondary" icon={<Download />}>
        Download
      </Button>
      <Button variant="destructive" icon={<Trash />}>
        Delete Member
      </Button>
      <Button loading>Saving</Button>
      <Button disabled>Unavailable</Button>
    </div>
  );
}
