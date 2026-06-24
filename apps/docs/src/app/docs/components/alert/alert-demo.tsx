"use client";
import { Alert } from "@patchui/react";

export function AlertDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Alert title="Heads up">
        Your changes are saved every 30 seconds.
      </Alert>
      <Alert variant="success" title="Saved">
        All your work has been committed.
      </Alert>
      <Alert variant="warning" title="Storage almost full">
        You're using 92% of your plan. Consider upgrading.
      </Alert>
      <Alert variant="danger" title="Could not connect" dismissible>
        We couldn't reach the server. Retry or check your connection.
      </Alert>
    </div>
  );
}
