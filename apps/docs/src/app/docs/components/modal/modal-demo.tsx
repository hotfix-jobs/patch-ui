"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  ModalSubtitle,
  ModalInset,
  ModalActions,
  ModalAction,
} from "@patchui/react";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-medium text-gray-800">{children}</p>;
}

const REPO_NAME = "billing-service";

export function ModalDemo() {
  const [basic, setBasic] = useState(false);
  const [simple, setSimple] = useState(false);
  const [destructive, setDestructive] = useState(false);
  const [longContent, setLongContent] = useState(false);
  const [typed, setTyped] = useState("");

  return (
    <div className="flex flex-col gap-8">
      {/* Basic — short confirmation, no header */}
      <div>
        <SectionLabel>Basic</SectionLabel>
        <Button onClick={() => setBasic(true)}>Update project</Button>
        <Modal active={basic} onClickOutside={() => setBasic(false)}>
          <ModalBody>
            <h2 className="text-heading-20 font-semibold text-gray-1000">
              Update project
            </h2>
            <p className="text-copy-14 text-gray-800">
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

      {/* No header — short message */}
      <div>
        <SectionLabel>No header</SectionLabel>
        <Button variant="secondary" onClick={() => setSimple(true)}>
          Discard changes?
        </Button>
        <Modal active={simple} onClickOutside={() => setSimple(false)}>
          <ModalBody>
            <p className="text-copy-14 text-gray-1000">
              You have unsaved edits on this draft. Discard and reload?
            </p>
          </ModalBody>
          <ModalActions>
            <ModalAction onClick={() => setSimple(false)}>Keep editing</ModalAction>
            <ModalAction
              variant="error"
              onClick={() => setSimple(false)}
            >
              Discard changes
            </ModalAction>
          </ModalActions>
        </Modal>
      </div>

      {/* Destructive with typed confirmation gate */}
      <div>
        <SectionLabel>Destructive with typed confirmation</SectionLabel>
        <Button variant="error" onClick={() => setDestructive(true)}>
          Delete repository
        </Button>
        <Modal
          active={destructive}
          onClickOutside={() => setDestructive(false)}
        >
          <ModalBody>
            <h2 className="text-heading-20 font-semibold text-gray-1000">
              Delete repository
            </h2>
            <p className="text-copy-14 text-gray-1000">
              <span className="font-semibold">{REPO_NAME}</span> and all of its
              branches, releases, and settings will be permanently removed.
            </p>
            {/* Irreversibility band */}
            <div className="flex items-center gap-2 rounded-[var(--radius-6)] border border-red-300 bg-red-200 px-3 py-2 text-red-800">
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
              <p className="text-label-13">
                Removing {REPO_NAME} can't be undone.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="delete-confirm"
                className="text-label-14 text-gray-1000"
              >
                To confirm, type the repository name{" "}
                <span className="font-semibold">"{REPO_NAME}"</span>
              </label>
              <input
                id="delete-confirm"
                type="text"
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                className="w-full rounded-[var(--radius-6)] border border-gray-alpha-400 bg-background-100 px-3 h-10 text-copy-14 outline-none hover:border-gray-alpha-500 focus-visible:border-gray-alpha-600"
              />
            </div>
          </ModalBody>
          <ModalActions className="sm:justify-between">
            <ModalAction onClick={() => setDestructive(false)}>
              Cancel
            </ModalAction>
            <ModalAction
              variant="error"
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

      {/* Long content — header stays fixed while body scrolls */}
      <div>
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
              <p key={i} className="text-copy-14 text-gray-1000">
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
