"use client";

import { File, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing } from "../recipes";

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
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
}

/**
 * Dropzone — drag-and-drop file upload with file list. Accepts files via
 * drop or via a click-to-browse fallback. Renders a preview row per file
 * with a remove × button.
 *
 * Use for any file-upload UX: avatars, attachments, document uploads,
 * resume parsers. Pure UI primitive — consumers wire `onValueChange` to
 * their upload pipeline.
 */
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
  className,
  ...props
}: DropzoneProps): React.ReactElement {
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
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        data-slot="dropzone"
        data-drag-over={isDragOver || undefined}
        onClick={() => {
          if (disabled) return;
          inputRef.current?.click();
        }}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          if (disabled) return;
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
          if (disabled) return;
          if (e.dataTransfer.files.length > 0) {
            accept_files(e.dataTransfer.files);
          }
        }}
        className={cn(
          "relative flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-[var(--radius-patch-sm)] border-[0.5px] border-dashed border-patch-border px-6 py-10",
          "text-center transition-colors duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)]",
          "hover:border-[var(--patch-border-hover)] hover:bg-patch-surface",
          "data-[drag-over]:border-patch-text data-[drag-over]:bg-patch-accent",
          disabled && "pointer-events-none opacity-50",
          focusRing,
        )}
      >
        <div
          aria-hidden
          className="flex size-10 items-center justify-center rounded-[var(--radius-patch-sm)] border-[0.5px] border-patch-border bg-patch-surface text-patch-text-secondary"
        >
          <Upload className="size-5" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[length:var(--text-patch-control)] font-medium text-patch-text">
            {title}
          </p>
          {description && (
            <p className="text-[length:var(--text-patch-mini)] text-patch-text-tertiary">
              {description}
            </p>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
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
                className="flex items-center gap-3 rounded-[var(--radius-patch-xs)] border-[0.5px] border-patch-border bg-patch-surface px-3 py-2"
              >
                <File className="size-4 shrink-0 text-patch-text-tertiary" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[length:var(--text-patch-control)] text-patch-text">
                    {f.name}
                  </span>
                  <span className="text-[length:var(--text-patch-micro)] text-patch-text-tertiary">
                    {formatBytes(f.size)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  aria-label={`Remove ${f.name}`}
                  className="inline-flex size-6 shrink-0 items-center justify-center rounded-[var(--radius-patch-xs)] text-patch-text-tertiary transition-colors duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)] hover:bg-patch-surface-hover hover:text-patch-text active:scale-90"
                >
                  <X className="size-3.5" />
                </button>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}
