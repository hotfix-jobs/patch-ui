"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  ModalSubtitle,
  ModalActions,
  ModalAction,
  SectionLabel,
} from "@patchui/react";
import { Warning } from "@phosphor-icons/react/dist/ssr";

const PROJECT_NAME = "acme-web";

export function ModalDemo() {
  const [basic, setBasic] = useState(false);
  const [destructive, setDestructive] = useState(false);
  const [bodyOnly, setBodyOnly] = useState(false);
  const [longContent, setLongContent] = useState(false);
  const [typed, setTyped] = useState("");

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Basic</SectionLabel>
        <Button onClick={() => setBasic(true)}>Publish changes</Button>
        <Modal active={basic} onClickOutside={() => setBasic(false)}>
          <ModalBody>
            <h2 className="text-display-20 text-ink">Publish changes</h2>
            <p className="text-body-14 text-ink-muted">
              The queued edits will go live. This can be reverted from history.
            </p>
          </ModalBody>
          <ModalActions>
            <ModalAction onClick={() => setBasic(false)}>Cancel</ModalAction>
            <ModalAction variant="primary" onClick={() => setBasic(false)}>
              Publish
            </ModalAction>
          </ModalActions>
        </Modal>
      </div>

      <div className="space-y-3">
        <SectionLabel>Destructive with typed confirmation</SectionLabel>
        <Button variant="destructive" onClick={() => setDestructive(true)}>
          Delete project
        </Button>
        <Modal
          active={destructive}
          onClickOutside={() => setDestructive(false)}
        >
          <ModalBody>
            <h2 className="text-display-20 text-ink">Delete project</h2>
            <p className="text-body-14 text-ink">
              <span className="font-semibold">{PROJECT_NAME}</span> and all of
              its contents will be permanently removed.
            </p>
            <div className="flex items-center gap-2 rounded-[var(--radius-6)] border border-error bg-error/10 px-3 py-2 text-error">
              <Warning className="size-4 shrink-0" aria-hidden />
              <p className="text-body-13">
                Removing {PROJECT_NAME} can't be undone.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Input
                id="delete-confirm"
                label={`To confirm, type the project name "${PROJECT_NAME}"`}
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalActions>
            <ModalAction onClick={() => setDestructive(false)}>
              Cancel
            </ModalAction>
            <ModalAction
              variant="destructive"
              disabled={typed !== PROJECT_NAME}
              onClick={() => {
                setDestructive(false);
                setTyped("");
              }}
            >
              Delete project
            </ModalAction>
          </ModalActions>
        </Modal>
      </div>

      <div className="space-y-3">
        <SectionLabel>Body only (no footer actions)</SectionLabel>
        <Button variant="secondary" onClick={() => setBodyOnly(true)}>
          Show release note
        </Button>
        <Modal active={bodyOnly} onClickOutside={() => setBodyOnly(false)}>
          <ModalBody>
            <h2 className="text-display-20 text-ink">You're all set</h2>
            <p className="text-body-14 text-ink-muted">
              Every change from the last review has been merged. Close this
              window to head back to your workspace.
            </p>
          </ModalBody>
        </Modal>
      </div>

      <div className="space-y-3">
        <SectionLabel>Long content with fixed header</SectionLabel>
        <Button onClick={() => setLongContent(true)}>Open changelog</Button>
        <Modal
          active={longContent}
          onClickOutside={() => setLongContent(false)}
          size="lg"
        >
          <ModalHeader>
            <ModalTitle>Changelog</ModalTitle>
            <ModalSubtitle>
              Everything that shipped since your last visit.
            </ModalSubtitle>
          </ModalHeader>
          <ModalBody>
            {Array.from({ length: 12 }).map((_, i) => (
              <p key={i} className="text-body-14 text-ink">
                Entry {i + 1}. A short note about something that landed this
                week. Long enough to force the body to scroll while the
                header stays put above.
              </p>
            ))}
          </ModalBody>
          <ModalActions>
            <ModalAction onClick={() => setLongContent(false)}>
              Close
            </ModalAction>
            <ModalAction
              variant="primary"
              onClick={() => setLongContent(false)}
            >
              Got it
            </ModalAction>
          </ModalActions>
        </Modal>
      </div>
    </div>
  );
}
