# Toast

A temporary notification that appears above the interface and can be triggered from anywhere.

Use Toast to confirm completed actions, report background work, or surface a brief problem without interrupting the current task.

```tsx
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

```

## Installation

```bash
npx shadcn add @patchui/toast
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/toast.json). The canonical implementation lives in [packages/react/src/components/toast.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/toast.tsx).

## Usage

```tsx
<>
  <Toaster position="bottom-right" />
  <Button onClick={() => toast.success("Project saved")}>
    Save project
  </Button>
</>
```

Mount one Toaster near the application root. Calls to `toast()` and its semantic methods share that global notification queue.

## Examples

### Semantic types

Choose the type that matches the meaning of the message. Loading toasts remain visible until dismissed programmatically.

```tsx
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

```

### Description and action

Add a description when the title needs context. Use one concise action for an immediate response such as Undo.

```tsx
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

```

## API reference

| Prop                      | Type                                                                                            | Default        | Description                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------- | -------------- | ----------------------------------------------------------------- |
| Toaster.position          | "top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right" | "bottom-right" | Places the notification stack against a viewport edge.            |
| Toaster.visibleToasts     | number                                                                                          | 3              | Limits the number of notifications visible in the stack.          |
| Toaster.toastWidth        | number                                                                                          | 360            | Sets the stack width in pixels.                                   |
| toast options.id          | string                                                                                          | -              | Provides an identifier that can update or dismiss a notification. |
| toast options.description | ReactNode                                                                                       | -              | Adds supporting content below the title.                          |
| toast options.duration    | number                                                                                          | -              | Overrides the type’s automatic dismissal delay in milliseconds.   |
| toast options.action      | { label: ReactNode; onClick: () => void }                                                       | -              | Adds one action that runs and then dismisses the notification.    |

Every toast call returns an ID. Pass it to `toast.dismiss(id)`, or call `toast.dismiss()` without an ID to clear the queue.

## Accessibility

* Success, info, loading, and default notifications announce politely.
* Warning and error notifications use an assertive announcement for higher priority.
* Keep titles brief and avoid placing essential information only in a temporary toast.
* Toasts pause for interaction, support swipe dismissal, and always provide a dismiss button.
