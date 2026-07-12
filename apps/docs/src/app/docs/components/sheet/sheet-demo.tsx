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
