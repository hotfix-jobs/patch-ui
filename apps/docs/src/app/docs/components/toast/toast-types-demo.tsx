"use client";

import { Button, toast } from "@patchui/react";

export function ToastTypesDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="secondary" onClick={() => toast.success("Project published")}>
        Success
      </Button>
      <Button variant="secondary" onClick={() => toast.error("Publish failed")}>
        Error
      </Button>
      <Button variant="secondary" onClick={() => toast.warning("Review missing fields")}>
        Warning
      </Button>
      <Button variant="secondary" onClick={() => toast.info("An update is available")}>
        Info
      </Button>
      <Button variant="secondary" onClick={() => toast.loading("Publishing project")}>
        Loading
      </Button>
    </div>
  );
}
