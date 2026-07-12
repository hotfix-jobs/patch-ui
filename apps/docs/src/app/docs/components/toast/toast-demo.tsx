"use client";

import { Button, Toaster, toast } from "@patchui/react";

export function ToastDemo() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Button
        variant="secondary"
        onClick={() => toast("Project changes saved")}
      >
        Show toast
      </Button>
    </>
  );
}
