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

      {/* Destructive with type-to-confirm gate */}
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
            <h2 className="text-heading-16 text-gray-1000">Delete Project</h2>
            <p className="text-copy-14 text-gray-800">
              Type the project name below to confirm. This action cannot be
              undone.
            </p>
            <ModalInset>
              <p className="text-label-13 text-gray-800">Project</p>
              <p className="text-copy-14 text-gray-1000">acme-web</p>
            </ModalInset>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Type acme-web to confirm"
              className="w-full rounded-[var(--radius-6)] border border-gray-alpha-400 bg-background-100 px-3 h-10 text-copy-14 outline-none placeholder:text-gray-700 hover:border-gray-alpha-500 focus-visible:border-gray-alpha-600"
            />
          </ModalBody>
          <ModalActions>
            <ModalAction onClick={() => setDestructive(false)}>
              Cancel
            </ModalAction>
            <ModalAction
              variant="error"
              disabled={projectName !== "acme-web"}
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
