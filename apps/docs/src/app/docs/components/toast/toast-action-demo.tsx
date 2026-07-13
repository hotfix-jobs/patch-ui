"use client";

import { Button, toast } from "@patchui/react";

export function ToastActionDemo() {
  return (
    <Button
      variant="secondary"
      onClick={() =>
        toast.success("Message sent", {
          description: "Delivered to Ada Lovelace",
          action: {
            label: "Undo",
            onClick: () => toast.info("Message restored to drafts"),
          },
        })
      }
    >
      Send message
    </Button>
  );
}
