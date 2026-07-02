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

export function ModalDemo() {
  const [basic, setBasic] = useState(false);
  const [simple, setSimple] = useState(false);
  const [destructive, setDestructive] = useState(false);
  const [longContent, setLongContent] = useState(false);
  const [projectName, setProjectName] = useState("");

  return (
    <div className="flex flex-col gap-8">
      {/* Basic — the only one using ModalHeader */}
      <div>
        <SectionLabel>With header</SectionLabel>
        <Button onClick={() => setBasic(true)}>Update project</Button>
        <Modal active={basic} onClickOutside={() => setBasic(false)}>
          <ModalHeader>
            <ModalTitle>Update Project</ModalTitle>
            <ModalSubtitle>
              Bumping the framework to the latest major. Your build settings
              will migrate automatically.
            </ModalSubtitle>
          </ModalHeader>
          <ModalBody>
            <p className="text-copy-14 text-gray-1000">
              Continue to apply the update.
            </p>
          </ModalBody>
          <ModalActions>
            <ModalAction onClick={() => setBasic(false)}>Cancel</ModalAction>
            <ModalAction
              variant="primary"
              onClick={() => setBasic(false)}
            >
              Update Project
            </ModalAction>
          </ModalActions>
        </Modal>
      </div>

      {/* Simple — no header, just a short message + actions */}
      <div>
        <SectionLabel>No header</SectionLabel>
        <Button variant="secondary" onClick={() => setSimple(true)}>
          Discard changes?
        </Button>
        <Modal active={simple} onClickOutside={() => setSimple(false)}>
          <ModalBody>
            <p className="text-copy-14 text-gray-1000">
              You have unsaved changes on this branch. Discard them and reload?
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

      {/* Destructive with type-to-confirm gate (Vercel destructive-action-modal pattern) */}
      <div>
        <SectionLabel>Destructive with typed confirmation</SectionLabel>
        <Button variant="error" onClick={() => setDestructive(true)}>
          Delete project
        </Button>
        <Modal
          active={destructive}
          onClickOutside={() => setDestructive(false)}
        >
          <ModalBody>
            <h2 className="text-heading-20 font-semibold text-gray-1000">
              Delete Project
            </h2>
            <p className="text-copy-14 text-gray-1000">
              <span className="font-semibold">next-year-boilerplate</span> and
              all its deployments, domains, and environment variables will be
              permanently deleted.
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
                Deleting next-year-boilerplate cannot be undone.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="delete-confirm"
                className="text-label-14 text-gray-1000"
              >
                To confirm, type the project name{" "}
                <span className="font-semibold">"next-year-boilerplate"</span>
              </label>
              <input
                id="delete-confirm"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
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
              disabled={projectName !== "next-year-boilerplate"}
              onClick={() => {
                setDestructive(false);
                setProjectName("");
              }}
            >
              Delete Project
            </ModalAction>
          </ModalActions>
        </Modal>
      </div>

      {/* Long content — body scrolls between fixed regions */}
      <div>
        <SectionLabel>Long content (body scrolls)</SectionLabel>
        <Button onClick={() => setLongContent(true)}>Open release notes</Button>
        <Modal
          active={longContent}
          onClickOutside={() => setLongContent(false)}
          size="lg"
        >
          <ModalBody>
            <h2 className="text-heading-16 text-gray-1000">
              Release Notes — v4.0.0
            </h2>
            {Array.from({ length: 12 }).map((_, i) => (
              <p key={i} className="text-copy-14 text-gray-1000">
                Section {i + 1}. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
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
              Acknowledge
            </ModalAction>
          </ModalActions>
        </Modal>
      </div>
    </div>
  );
}
