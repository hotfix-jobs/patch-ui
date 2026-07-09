"use client";

import { useCallback, useRef, useState } from "react";
import type * as React from "react";
import { cn } from "../../utils";
import { focusRing } from "../../recipes";
import { Progress } from "../../components/progress";
import { Card } from "../../components/card";
import { File, Upload, X } from "@phosphor-icons/react/dist/ssr";
export interface DropzoneProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onDrop" | "onChange" | "title" | "defaultValue"
  > {
  /** Controlled file list. */
  value?: File[];
  /** Initial files when uncontrolled. */
  defaultValue?: File[];
  /** Called when the file list changes (add or remove). */
  onValueChange?: (files: File[]) => void;
  /** `accept` attribute passed to the underlying file input. */
  accept?: string;
  /** Allow multiple files. Default true. */
  multiple?: boolean;
  /** Max number of files. */
  maxFiles?: number;
  /** Max size per file in bytes. */
  maxSize?: number;
  /** Disable interaction. */
  disabled?: boolean;
  /** Render the file list below the drop area. Default true. */
  showFileList?: boolean;
  /**
   * Validate a file before adding it. Return false (or a rejection reason)
   * to refuse. Defaults to size + accept checks.
   */
  validate?: (file: File, currentFiles: File[]) => boolean | string;
  /** Custom render function for each file row. */
  renderFile?: (
    file: File,
    index: number,
    onRemove: () => void,
  ) => React.ReactNode;
  /** Visual title rendered inside the drop area. */
  title?: React.ReactNode;
  /** Helper text rendered below the title. */
  description?: React.ReactNode;
  /** Uploading state: number 0-100 for determinate, `null` for indeterminate. */
  progress?: number | null;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
}

/** Drag-and-drop file upload with file list. */
export function Dropzone({
  value: controlledValue,
  defaultValue,
  onValueChange,
  accept,
  multiple = true,
  maxFiles,
  maxSize,
  disabled,
  showFileList = true,
  validate,
  renderFile,
  title = "Drop files here or click to browse",
  description,
  progress,
  className,
  ...props
}: DropzoneProps): React.ReactElement {
  const isUploading = progress !== undefined;
  const interactionDisabled = disabled || isUploading;
  const [uncontrolled, setUncontrolled] = useState<File[]>(defaultValue ?? []);
  const files = controlledValue ?? uncontrolled;
  const setFiles = useCallback(
    (next: File[]) => {
      if (controlledValue === undefined) setUncontrolled(next);
      onValueChange?.(next);
    },
    [controlledValue, onValueChange],
  );

  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const defaultValidate = useCallback(
    (file: File): boolean | string => {
      if (maxSize != null && file.size > maxSize) {
        return `File exceeds ${formatBytes(maxSize)}`;
      }
      return true;
    },
    [maxSize],
  );

  const accept_files = useCallback(
    (incoming: FileList | File[]) => {
      const arr = Array.from(incoming);
      const out: File[] = [...files];
      for (const f of arr) {
        if (maxFiles != null && out.length >= maxFiles) break;
        const fn = validate ?? defaultValidate;
        const result = fn(f, out);
        if (result !== true) continue;
        out.push(f);
      }
      setFiles(out);
    },
    [files, validate, defaultValidate, maxFiles, setFiles],
  );

  const removeAt = useCallback(
    (index: number) => {
      setFiles(files.filter((_, i) => i !== index));
    },
    [files, setFiles],
  );

  return (
    <div
      data-slot="dropzone-root"
      className={cn("flex w-full flex-col gap-3", className)}
      {...props}
    >
      <div
        role="button"
        tabIndex={interactionDisabled ? -1 : 0}
        aria-disabled={interactionDisabled || undefined}
        data-slot="dropzone"
        data-drag-over={isDragOver || undefined}
        onClick={() => {
          if (interactionDisabled) return;
          inputRef.current?.click();
        }}
        onKeyDown={(e) => {
          if (interactionDisabled) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          if (interactionDisabled) return;
          e.preventDefault();
          if (!isDragOver) setIsDragOver(true);
        }}
        onDragLeave={(e) => {
          if (e.currentTarget.contains(e.relatedTarget as Node)) return;
          setIsDragOver(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          if (interactionDisabled) return;
          if (e.dataTransfer.files.length > 0) {
            accept_files(e.dataTransfer.files);
          }
        }}
        className={cn(
          "relative flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-[var(--radius-6)] border border-dashed border-hairline px-6 py-10",
          "text-center transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
          "hover:border-hairline-tertiary hover:bg-layer-hover",
          "data-[drag-over]:border-primary data-[drag-over]:bg-fill-1",
          disabled && "pointer-events-none opacity-50",
          isUploading && "pointer-events-none",
          focusRing,
        )}
      >
        <Upload aria-hidden className="size-6 text-ink-muted" />
        <div className="flex flex-col gap-1">
          <p className="text-small font-medium text-ink">
            {title}
          </p>
          {description && (
            <p className="text-mini text-ink-muted">
              {description}
            </p>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={interactionDisabled}
          onChange={(e) => {
            if (e.target.files) accept_files(e.target.files);
            e.target.value = "";
          }}
          className="sr-only"
          data-slot="dropzone-input"
        />
      </div>

      {showFileList && files.length > 0 && (
        <ul
          data-slot="dropzone-file-list"
          className="flex flex-col gap-1"
        >
          {files.map((f, i) =>
            renderFile ? (
              <li key={`${f.name}-${i}`}>{renderFile(f, i, () => removeAt(i))}</li>
            ) : (
              <li
                key={`${f.name}-${i}`}
                data-slot="dropzone-file"
                data-state={isUploading ? "uploading" : undefined}
              >
                <Card
                  direction="row"
                  className="items-center gap-3 px-3 py-2"
                >
                  <File className="size-4 shrink-0 text-ink-muted" />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="truncate text-small text-ink">
                      {f.name}
                    </span>
                    {isUploading ? (
                      <Progress
                        value={progress}
                        size="sm"
                        label={`Uploading ${f.name}`}
                      />
                    ) : (
                      <span className="text-mini text-ink-muted">
                        {formatBytes(f.size)}
                      </span>
                    )}
                  </div>
                  {!isUploading && (
                    <button
                      type="button"
                      onClick={() => removeAt(i)}
                      aria-label={`Remove ${f.name}`}
                      className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-layer-hover hover:text-ink"
                    >
                      <X className="size-3.5" aria-hidden />
                    </button>
                  )}
                </Card>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}
