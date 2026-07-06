"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalActions,
  ModalAction,
  ModalClose,
  ModalHeader,
  ModalSubtitle,
  ModalTitle,
  SectionLabel,
} from "@patchui/react";
import { Warning } from "@phosphor-icons/react/dist/ssr";

const PROJECT_NAME = "acme-web";

export function ModalDemo() {
  const [basic, setBasic] = useState(false);
  const [destructive, setDestructive] = useState(false);
  const [bodyOnly, setBodyOnly] = useState(false);
  const [detail, setDetail] = useState(false);
  const [typed, setTyped] = useState("");

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Basic confirmation</SectionLabel>
        <Button onClick={() => setBasic(true)}>Publish changes</Button>
        <Modal active={basic} onClickOutside={() => setBasic(false)}>
          <ModalHeader>
            <ModalTitle>Publish changes</ModalTitle>
            <ModalSubtitle>
              The queued edits will go live. This can be reverted from history.
            </ModalSubtitle>
          </ModalHeader>
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
          <ModalHeader>
            <ModalTitle>Delete project</ModalTitle>
            <ModalSubtitle>
              <span className="font-semibold">{PROJECT_NAME}</span> and all of
              its contents will be permanently removed.
            </ModalSubtitle>
          </ModalHeader>
          <ModalBody>
            <div className="flex items-center gap-2 rounded-[var(--radius-6)] border border-error bg-error/10 px-3 py-2 text-error">
              <Warning className="size-4 shrink-0" aria-hidden />
              <p className="text-small">
                Removing {PROJECT_NAME} can't be undone.
              </p>
            </div>
            <Input
              id="delete-confirm"
              label={`To confirm, type the project name "${PROJECT_NAME}"`}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
            />
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
        <SectionLabel>Announcement (no footer)</SectionLabel>
        <Button variant="secondary" onClick={() => setBodyOnly(true)}>
          You're all set
        </Button>
        <Modal active={bodyOnly} onClickOutside={() => setBodyOnly(false)}>
          <ModalHeader>
            <ModalTitle>You're all set</ModalTitle>
            <ModalSubtitle>
              Every change from the last review has been merged. Close this
              window to head back to your workspace.
            </ModalSubtitle>
          </ModalHeader>
        </Modal>
      </div>

      <div className="space-y-3">
        <SectionLabel>Rich content with header</SectionLabel>
        <Button variant="secondary" onClick={() => setDetail(true)}>
          Open release note
        </Button>
        <Modal
          active={detail}
          onClickOutside={() => setDetail(false)}
          size="lg"
          showClose={false}
        >
          <ModalHeader
            leading={<span>Oct 12</span>}
            trailing={<ModalClose className="static size-7" />}
          >
            <ModalTitle>Release note</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <h2 className="text-title2 text-ink">Templates</h2>
            <p className="text-small leading-relaxed text-ink">
              Save any layout as a template to reuse across projects.
              Templates carry field defaults, sub-tasks, and labels so you
              can spin up a fresh project in a single click.
            </p>
            <div className="flex flex-col gap-2">
              <h3 className="text-small font-medium text-ink">What's new</h3>
              <ul className="flex flex-col gap-1.5 text-small text-ink">
                <li>Share templates with your team from the sidebar</li>
                <li>Turn any existing project into a template</li>
                <li>Set field defaults per template</li>
              </ul>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}
