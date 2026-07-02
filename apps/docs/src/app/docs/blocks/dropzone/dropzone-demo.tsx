"use client";
import { useState } from "react";
import { Dropzone } from "@patchui/react/blocks/dropzone";

export function DropzoneDemo() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="flex flex-col gap-8 max-w-md">
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Basic
        </p>
        <Dropzone
          value={files}
          onValueChange={setFiles}
          accept="image/*,application/pdf"
          maxSize={5 * 1024 * 1024}
          title="Drop files here or click to browse"
          description="Up to 5 MB, image or PDF"
        />
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Single file, no list shown
        </p>
        <Dropzone
          multiple={false}
          showFileList={false}
          title="Upload your resume"
          description="PDF only, max 2 MB"
          accept="application/pdf"
          maxSize={2 * 1024 * 1024}
        />
      </div>
    </div>
  );
}
