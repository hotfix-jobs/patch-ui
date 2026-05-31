"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Input,
  Label,
} from "@patchui/react";

/** Showcases Dialog with trigger, header, content, footer, and close button. */
export function DialogDemo() {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      {/* Basic Dialog */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Basic
        </p>
        <Dialog>
          <DialogTrigger render={<Button variant="secondary" />}>
            Edit Profile
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 p-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Jane Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@janedoe" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose render={<Button variant="secondary" />}>
                Cancel
              </DialogClose>
              <DialogClose render={<Button />}>Save changes</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Without Close Button */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Without Close Button
        </p>
        <Dialog>
          <DialogTrigger render={<Button variant="secondary" />}>
            Terms & Conditions
          </DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Terms of Service</DialogTitle>
              <DialogDescription>
                Please review and accept the terms before continuing.
              </DialogDescription>
            </DialogHeader>
            <div className="p-6 text-sm text-patch-text-secondary">
              By using this service you agree to our terms and conditions. This is a simplified example for demonstration purposes.
            </div>
            <DialogFooter>
              <DialogClose render={<Button variant="secondary" />}>
                Decline
              </DialogClose>
              <DialogClose render={<Button />}>Accept</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Controlled Dialog */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Controlled (Destructive)
        </p>
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogTrigger render={<Button variant="danger" />}>
            Delete Account
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="secondary" />}>
                Cancel
              </DialogClose>
              <Button variant="danger" onClick={() => setDeleteOpen(false)}>
                Delete Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
