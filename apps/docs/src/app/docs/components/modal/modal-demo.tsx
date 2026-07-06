"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  ModalSubtitle,
  ModalActions,
  ModalAction,
} from "@patchui/react";
import { SectionLabel } from "@patchui/react";

const REPO_NAME = "billing-service";

export function ModalDemo() {
  const [basic, setBasic] = useState(false);
  const [destructive, setDestructive] = useState(false);
  const [longContent, setLongContent] = useState(false);
  const [typed, setTyped] = useState("");

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Basic</SectionLabel>
        <Button onClick={() => setBasic(true)}>Update project</Button>
        <Modal active={basic} onClickOutside={() => setBasic(false)}>
          <ModalBody>
            <h2 className="text-display-20 text-ink">
              Update project
            </h2>
            <p className="text-body-14 text-ink-muted">
              Rolling out the queued changes to the current environment.
            </p>
          </ModalBody>
          <ModalActions>
            <ModalAction onClick={() => setBasic(false)}>Cancel</ModalAction>
            <ModalAction
              variant="primary"
              onClick={() => setBasic(false)}
            >
              Update project
            </ModalAction>
          </ModalActions>
        </Modal>
      </div>

      <div className="space-y-3">
        <SectionLabel>Destructive with typed confirmation</SectionLabel>
        <Button variant="destructive" onClick={() => setDestructive(true)}>
          Delete repository
        </Button>
        <Modal
          active={destructive}
          onClickOutside={() => setDestructive(false)}
        >
          <ModalBody>
            <h2 className="text-display-20 text-ink">
              Delete repository
            </h2>
            <p className="text-body-14 text-ink">
              <span className="font-semibold">{REPO_NAME}</span> and all of its
              branches, releases, and settings will be permanently removed.
            </p>
            <div className="flex items-center gap-2 rounded-[var(--radius-6)] border border-error bg-error/10 px-3 py-2 text-error">
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2z" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-body-13">
                Removing {REPO_NAME} can't be undone.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="delete-confirm"
                className="text-body-14 text-ink"
              >
                To confirm, type the repository name{" "}
                <span className="font-semibold">"{REPO_NAME}"</span>
              </label>
              <input
                id="delete-confirm"
                type="text"
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                className="w-full rounded-[var(--radius-6)] border border-hairline-strong bg-canvas px-3 h-10 text-body-14 outline-none hover:border-hairline-tertiary focus-visible:border-hairline-tertiary"
              />
            </div>
          </ModalBody>
          <ModalActions>
            <ModalAction onClick={() => setDestructive(false)}>
              Cancel
            </ModalAction>
            <ModalAction
              variant="destructive"
              disabled={typed !== REPO_NAME}
              onClick={() => {
                setDestructive(false);
                setTyped("");
              }}
            >
              Delete repository
            </ModalAction>
          </ModalActions>
        </Modal>
      </div>

      <div className="space-y-3">
        <SectionLabel>Long content with fixed header</SectionLabel>
        <Button onClick={() => setLongContent(true)}>Open change log</Button>
        <Modal
          active={longContent}
          onClickOutside={() => setLongContent(false)}
          size="lg"
        >
          <ModalHeader>
            <ModalTitle>Change log</ModalTitle>
            <ModalSubtitle>
              Everything that shipped since your last visit.
            </ModalSubtitle>
          </ModalHeader>
          <ModalBody>
            {Array.from({ length: 12 }).map((_, i) => (
              <p key={i} className="text-body-14 text-ink">
                Entry {i + 1}. A small note about a fix, refactor, or new
                surface that landed this week. Long enough to force the body
                to scroll while the header stays put above.
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
