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
