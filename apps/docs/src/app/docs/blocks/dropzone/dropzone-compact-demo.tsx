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
