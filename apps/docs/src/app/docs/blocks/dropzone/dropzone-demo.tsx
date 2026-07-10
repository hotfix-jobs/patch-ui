"use client";
import { useState } from "react";
import { Dropzone } from "@patchui/react/blocks/dropzone";
import { SectionLabel } from "@patchui/react";

export function DropzoneDemo() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="flex max-w-md flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Multiple files</SectionLabel>
        <Dropzone
          value={files}
          onValueChange={setFiles}
          accept="image/*,application/pdf"
          maxSize={5 * 1024 * 1024}
          title="Drop files here or click to browse"
          description="Up to 5 MB, images or PDFs"
        />
      </div>

      <div className="space-y-3">
        <SectionLabel>Single file, no list</SectionLabel>
        <Dropzone
          multiple={false}
          showFileList={false}
          title="Upload an image"
          description="PNG or JPG, up to 2 MB"
          accept="image/png,image/jpeg"
          maxSize={2 * 1024 * 1024}
        />
      </div>

      <div className="space-y-3">
        <SectionLabel>Compact (size=&quot;sm&quot;)</SectionLabel>
        <Dropzone
          size="sm"
          multiple={false}
          showFileList={false}
          title="Drop resume here"
          description="PDF, up to 5 MB"
          accept="application/pdf"
          maxSize={5 * 1024 * 1024}
        />
      </div>
    </div>
  );
}
