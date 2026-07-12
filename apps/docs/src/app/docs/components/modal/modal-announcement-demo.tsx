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
