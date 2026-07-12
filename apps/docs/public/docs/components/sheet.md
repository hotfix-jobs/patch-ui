# Sheet

An edge-anchored drawer for secondary navigation, inspectors, forms, and mobile-first choices.

Use Sheet when content should remain spatially connected to an application edge. Use Modal for centered tasks that require focused attention without implying a persistent workspace.

```tsx
"use client";

import {
  Button,
  Field,
  FieldLabel,
  Input,
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@patchui/react";

export function SheetDemo() {
  return (
    <Sheet side="right">
      <SheetTrigger render={<Button variant="secondary" />}>
        Edit Profile
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
          <SheetDescription>Update member details.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <Field name="name">
            <FieldLabel>Name</FieldLabel>
            <Input defaultValue="Ada Lovelace" />
          </Field>
          <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <Input type="email" defaultValue="ada@example.com" />
          </Field>
        </SheetBody>
        <SheetFooter>
          <SheetClose render={<Button variant="secondary" />}>
            Cancel
          </SheetClose>
          <SheetClose render={<Button />}>
            Save Profile
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/sheet
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/sheet.json). The canonical implementation lives in [packages/react/src/components/sheet.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/sheet.tsx).

## Usage

```tsx
<Sheet side="right">
  <SheetTrigger render={<Button variant="secondary" />}>
    Edit Profile
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Profile</SheetTitle>
      <SheetDescription>Update member details.</SheetDescription>
    </SheetHeader>
    <SheetBody>...</SheetBody>
    <SheetFooter>
      <SheetClose render={<Button variant="secondary" />}>Cancel</SheetClose>
      <SheetClose render={<Button />}>Save Profile</SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

Set `side` on Sheet so placement and swipe direction remain synchronized. SheetContent owns the outer boundary, backdrop, and elevation.

## Composition

```text
Sheet
├── SheetTrigger
└── SheetContent
    ├── SheetHeader
    │   ├── SheetTitle
    │   └── SheetDescription
    ├── SheetBody
    └── SheetFooter
        └── SheetClose
```

## Examples

### Bottom picker

Bottom sheets work well for a short mobile-first choice list. Each option can close the sheet directly through SheetClose.

```tsx
"use client";

import {
  Button,
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@patchui/react";

const regions = ["US East", "US West", "EU West", "Asia Pacific"];

export function SheetBottomDemo() {
  return (
    <Sheet side="bottom">
      <SheetTrigger render={<Button variant="secondary" />}>
        Choose Region
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Data Region</SheetTitle>
          <SheetDescription>Choose where project data is stored.</SheetDescription>
        </SheetHeader>
        <SheetBody className="gap-1 p-2">
          {regions.map((region) => (
            <SheetClose
              key={region}
              render={<Button variant="tertiary" className="w-full justify-start" />}
            >
              {region}
            </SheetClose>
          ))}
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}

```

## API reference

| Prop                           | Type                                   | Default   | Description                                                            |
| ------------------------------ | -------------------------------------- | --------- | ---------------------------------------------------------------------- |
| open / onOpenChange            | boolean / (open: boolean) => void      | -         | Controls the drawer’s open state.                                      |
| defaultOpen                    | boolean                                | false     | Sets the initial uncontrolled open state.                              |
| side                           | "top" \| "right" \| "bottom" \| "left" | "right"   | Selects the anchored edge and matching swipe direction.                |
| SheetContent.showClose         | boolean                                | automatic | Overrides the close control, which SheetHeader normally supplies.      |
| SheetHeader.leading / trailing | ReactNode / ReactNode                  | -         | Switches to a compact three-slot header when edge controls are needed. |
| SheetFooter.stacked            | boolean                                | false     | Stacks footer actions vertically instead of using a horizontal row.    |

SheetHeader adds a close control by default; set `hideClose` or provide custom trailing content to override it. SheetClose can render a Button or another semantic control.

## Accessibility

* SheetTitle and SheetDescription provide the drawer’s accessible name and description through Base UI Drawer.
* Focus is contained while open and returns to the trigger after close.
* Escape, backdrop interaction, swipe dismissal, and SheetClose all request the same open-state change.
* Keep Cancel explicit when a sheet contains editable or unsaved state.
* SheetBody is the scrollable region, preserving access to the header and footer around long content.

## Placement guidance

Use right for inspectors and editing, left for application navigation, bottom for short mobile-first choices, and top only when the relationship to the upper edge is meaningful. Keep placement consistent across similar workflows.
