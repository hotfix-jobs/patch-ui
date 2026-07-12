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
