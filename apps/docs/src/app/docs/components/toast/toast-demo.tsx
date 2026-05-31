"use client";

import {
  Button,
  ToastProvider,
  toastManager,
} from "@patchui/react";

/** Showcases Toast notifications with different types and actions. */
export function ToastDemo() {
  return (
    <ToastProvider position="bottom-right">
      <div className="flex flex-col gap-8">
        {/* Types */}
        <div>
          <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
            Types
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={() =>
                toastManager.add({ title: "Event created successfully", type: "success" })
              }
            >
              Success
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toastManager.add({ title: "Something went wrong", type: "error" })
              }
            >
              Error
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toastManager.add({ title: "Please check your input", type: "warning" })
              }
            >
              Warning
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toastManager.add({ title: "A new version is available", type: "info" })
              }
            >
              Info
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toastManager.add({ title: "Uploading files…", type: "loading" })
              }
            >
              Loading
            </Button>
          </div>
        </div>

        {/* Default (No Type) */}
        <div>
          <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
            Default
          </p>
          <Button
            variant="secondary"
            onClick={() =>
              toastManager.add({ title: "Hello! This is a toast." })
            }
          >
            Show Toast
          </Button>
        </div>

        {/* With Description */}
        <div>
          <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
            With Description
          </p>
          <Button
            variant="secondary"
            onClick={() =>
              toastManager.add({
                title: "Scheduled: Catch up",
                description: "Friday, February 10, 2025 at 5:57 PM",
                type: "success",
              })
            }
          >
            With Description
          </Button>
        </div>

        {/* With Action */}
        <div>
          <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
            With Action
          </p>
          <Button
            variant="secondary"
            onClick={() =>
              toastManager.add({
                title: "Message sent",
                type: "success",
                actionProps: {
                  children: "Undo",
                  onClick: () => {
                    toastManager.add({ title: "Action undone", type: "info" });
                  },
                },
              })
            }
          >
            With Action
          </Button>
        </div>
      </div>
    </ToastProvider>
  );
}
