# Modal

A controlled dialog for focused content and decisions that temporarily interrupt the current page.

Use Modal when people must review content or complete a short task before returning to the page. Use Sheet when the content benefits from a persistent edge-based workspace.

```tsx
"use client";

import { useState } from "react";
import {
  Button,
  Field,
  FieldLabel,
  Input,
  Modal,
  ModalAction,
  ModalActions,
  ModalBody,
  ModalHeader,
  ModalSubtitle,
  ModalTitle,
} from "@patchui/react";

export function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Rename Project</Button>
      <Modal active={open} onClickOutside={() => setOpen(false)}>
        <ModalHeader>
          <ModalTitle>Rename Project</ModalTitle>
          <ModalSubtitle>
            Choose a name that identifies this project.
          </ModalSubtitle>
        </ModalHeader>
        <ModalBody>
          <Field name="project-name">
            <FieldLabel>Project name</FieldLabel>
            <Input defaultValue="Enigma" />
          </Field>
        </ModalBody>
        <ModalActions>
          <ModalAction onClick={() => setOpen(false)}>Cancel</ModalAction>
          <ModalAction variant="primary" onClick={() => setOpen(false)}>
            Save Project
          </ModalAction>
        </ModalActions>
      </Modal>
    </>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/modal
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/modal.json). The canonical implementation lives in [packages/react/src/components/modal.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/modal.tsx).

## Usage

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Rename Project</Button>
<Modal active={open} onClickOutside={() => setOpen(false)}>
  <ModalHeader>
    <ModalTitle>Rename Project</ModalTitle>
    <ModalSubtitle>Choose a name that identifies this project.</ModalSubtitle>
  </ModalHeader>
  <ModalBody>...</ModalBody>
  <ModalActions>
    <ModalAction onClick={() => setOpen(false)}>Cancel</ModalAction>
    <ModalAction variant="primary">Save Project</ModalAction>
  </ModalActions>
</Modal>
```

Modal is controlled through `active`. Wire `onClickOutside` to the same close state used by Cancel because the callback handles both backdrop and Escape dismissal.

## Composition

```text
Modal
├── ModalHeader
│   ├── ModalTitle
│   └── ModalSubtitle
├── ModalBody
│   └── ModalInset (optional)
└── ModalActions
    └── ModalAction
```

ModalClose can replace or supplement the automatic close control when a custom header layout requires it.

## Examples

### Announcement

When ModalActions are absent, Modal displays a close button automatically. This works well for short announcements that do not require a decision.

```tsx
"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalSubtitle,
  ModalTitle,
} from "@patchui/react";

export function ModalAnnouncementDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        View Announcement
      </Button>
      <Modal
        active={open}
        onClickOutside={() => setOpen(false)}
        size="sm"
      >
        <ModalHeader>
          <ModalTitle>Changes Published</ModalTitle>
          <ModalSubtitle>
            The latest project updates are now available to everyone.
          </ModalSubtitle>
        </ModalHeader>
      </Modal>
    </>
  );
}

```

## API reference

| Prop                 | Type                                   | Default   | Description                                                                        |
| -------------------- | -------------------------------------- | --------- | ---------------------------------------------------------------------------------- |
| active               | boolean                                | false     | Controls whether the modal is open.                                                |
| onClickOutside       | () => void                             | -         | Handles close requests from Escape or backdrop interaction.                        |
| initialFocusRef      | RefObject\<HTMLElement \| null>        | -         | Moves initial focus to a specific element when the modal opens.                    |
| size                 | "sm" \| "md" \| "lg" \| "xl" \| "full" | "md"      | Sets the maximum popup width above the mobile breakpoint.                          |
| showClose            | boolean                                | automatic | Overrides the close button, which appears by default when ModalActions are absent. |
| ModalActions.stacked | boolean                                | false     | Stacks actions vertically instead of using a horizontal row.                       |

ModalAction inherits Button behavior, defaults to `variant="secondary"`, and supports `fullWidth` for stacked layouts. ModalHeader accepts `leading` or `trailing` content when a compact three-slot row is required.

## Accessibility

* ModalTitle and ModalSubtitle provide the dialog’s accessible name and description through Base UI Dialog.
* Focus is contained while the modal is open and returns to the previously focused element after close.
* Escape and backdrop interaction request dismissal through `onClickOutside`.
* Keep Cancel explicit when actions are present, especially for destructive or irreversible decisions.
* Use `initialFocusRef` when the safest initial action is not the first focusable element.

## Mobile behavior

Modal remains centered with narrow viewport gutters and a capped viewport height. ModalBody is the scrollable region, so headers and actions remain visible around long content.
