"use client";

import { Button, Toaster, toast } from "@patchui/react";

export function ToastDemo() {
  return (
    <>
      <Toaster position="bottom-right" />
      <div className="flex flex-col gap-8">
        <div>
          <p className="mb-3 text-xs font-medium text-ink-muted">
            Types
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={() => toast.success("Event created successfully")}
            >
              Success
            </Button>
            <Button
              variant="secondary"
              onClick={() => toast.error("Something went wrong")}
            >
              Error
            </Button>
            <Button
              variant="secondary"
              onClick={() => toast.warning("Please check your input")}
            >
              Warning
            </Button>
            <Button
              variant="secondary"
              onClick={() => toast.info("A new version is available")}
            >
              Info
            </Button>
            <Button
              variant="secondary"
              onClick={() => toast.loading("Uploading files...")}
            >
              Loading
            </Button>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium text-ink-muted">
            Default
          </p>
          <Button
            variant="secondary"
            onClick={() => toast("Hello! This is a toast.")}
          >
            Show Toast
          </Button>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium text-ink-muted">
            With Description
          </p>
          <Button
            variant="secondary"
            onClick={() =>
              toast.success("Scheduled: Catch up", {
                description: "Friday, February 10, 2025 at 5:57 PM",
              })
            }
          >
            With Description
          </Button>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium text-ink-muted">
            With Action
          </p>
          <Button
            variant="secondary"
            onClick={() =>
              toast.success("Message sent", {
                action: {
                  label: "Undo",
                  onClick: () => toast.info("Action undone"),
                },
              })
            }
          >
            With Action
          </Button>
        </div>
      </div>
    </>
  );
}
