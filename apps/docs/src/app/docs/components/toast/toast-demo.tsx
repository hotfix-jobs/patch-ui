"use client";

import { Button, Toaster, toast } from "@patchui/react";

/** Showcases Toast notifications with different types and actions. */
export function ToastDemo() {
  return (
    <>
      <Toaster position="bottom-right" />
      <div className="flex flex-col gap-8">
        {/* Types */}
        <div>
          <p className="mb-3 text-xs font-medium text-gray-800">
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

        {/* Default (No Type) */}
        <div>
          <p className="mb-3 text-xs font-medium text-gray-800">
            Default
          </p>
          <Button
            variant="secondary"
            onClick={() => toast("Hello! This is a toast.")}
          >
            Show Toast
          </Button>
        </div>

        {/* With Description */}
        <div>
          <p className="mb-3 text-xs font-medium text-gray-800">
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

        {/* With Action */}
        <div>
          <p className="mb-3 text-xs font-medium text-gray-800">
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
