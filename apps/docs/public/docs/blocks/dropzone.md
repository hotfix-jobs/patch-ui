# Dropzone

A file-selection surface with drag and drop, native browsing, validation, and removable file rows.

Use Dropzone to collect attachments, images, documents, or imports before handing the selected files to an application-owned upload pipeline.

```tsx
"use client";

import { useState } from "react";
import { Dropzone } from "@patchui/react/blocks/dropzone";

export function DropzoneDemo() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="w-full max-w-md">
      <Dropzone
        value={files}
        onValueChange={setFiles}
        accept="image/*,application/pdf"
        maxFiles={5}
        maxSize={5 * 1024 * 1024}
        description="Up to 5 files, images or PDFs, 5 MB each"
      />
    </div>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/dropzone
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/dropzone.json). The canonical implementation lives in [packages/react/src/blocks/dropzone/index.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/blocks/dropzone/index.tsx).

## Usage

```tsx
const [files, setFiles] = useState<File[]>([]);

<Dropzone
  value={files}
  onValueChange={setFiles}
  accept="image/*,application/pdf"
  maxFiles={5}
  maxSize={5 * 1024 * 1024}
/>
```

Dropzone manages file selection, not network transfer. Start the upload from `onValueChange` or a later form submission, and pass `progress` while a transfer is active.

## Examples

### Single file

Set `multiple={false}` for an avatar, resume, or other field that accepts one file.

```tsx
"use client";

import { useState } from "react";
import { Dropzone } from "@patchui/react/blocks/dropzone";

export function DropzoneSingleDemo() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="w-full max-w-md">
      <Dropzone
        value={files}
        onValueChange={setFiles}
        multiple={false}
        accept="image/png,image/jpeg"
        maxSize={2 * 1024 * 1024}
        title="Upload a profile image"
        description="PNG or JPG, up to 2 MB"
      />
    </div>
  );
}

```

### Compact

Use the small size when Dropzone sits inside a form, Sheet, or other dense surface. Hide the file list only when the selected file appears elsewhere.

```tsx
"use client";

import { Dropzone } from "@patchui/react/blocks/dropzone";

export function DropzoneCompactDemo() {
  return (
    <div className="w-full max-w-md">
      <Dropzone
        size="sm"
        multiple={false}
        showFileList={false}
        accept="application/pdf"
        maxSize={5 * 1024 * 1024}
        title="Drop a document here"
        description="PDF, up to 5 MB"
      />
    </div>
  );
}

```

## Validation and progress

Use `maxFiles` and `maxSize` for common limits. Supply `validate(file, currentFiles)` when acceptance depends on duplicate names, application rules, or other file metadata.

Pass a number from 0 to 100 to `progress` for determinate upload progress, or `null` for an indeterminate transfer. Selection and removal remain disabled until `progress` becomes `undefined`.

## API reference

| Prop                  | Type                                      | Default | Description                                                    |
| --------------------- | ----------------------------------------- | ------- | -------------------------------------------------------------- |
| value / onValueChange | File\[] / (files: File\[]) => void        | -       | Controls the selected files.                                   |
| accept                | string                                    | -       | Filters the native file picker using MIME types or extensions. |
| multiple              | boolean                                   | true    | Allows more than one selected file.                            |
| maxFiles / maxSize    | number / number                           | -       | Limits the file count and bytes per file.                      |
| validate              | (file, currentFiles) => boolean \| string | -       | Accepts or rejects each incoming file.                         |
| progress              | number \| null                            | -       | Displays uploading state across selected file rows.            |
| size                  | "sm" \| "md"                              | "md"    | Selects compact or standalone spacing.                         |
| showFileList          | boolean                                   | true    | Shows removable rows for selected files.                       |
| renderFile            | (file, index, onRemove) => ReactNode      | -       | Replaces the default file row.                                 |

Title and description accept React nodes so upload requirements can be stated directly in the drop area.

## Accessibility

* The drop area opens the native file picker with Enter or Space.
* State file limits and supported formats in visible helper text.
* Every default file row includes a removal button named with its file name.
* Do not rely on drag and drop as the only selection method.
