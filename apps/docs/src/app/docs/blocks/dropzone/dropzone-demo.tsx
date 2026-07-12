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
