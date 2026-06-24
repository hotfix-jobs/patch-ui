"use client";
import { useState } from "react";
import { TagInput } from "@patchui/react";

export function TagInputDemo() {
  const [tags, setTags] = useState<string[]>(["react", "typescript"]);

  return (
    <div className="flex flex-col gap-8 max-w-md">
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Basic
        </p>
        <TagInput
          value={tags}
          onValueChange={setTags}
          placeholder="Add a skill — Enter or comma"
        />
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Underline variant + max 5 tags
        </p>
        <TagInput
          defaultValue={["design", "engineering"]}
          variant="underline"
          max={5}
          placeholder="Add up to 5"
        />
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Invalid state
        </p>
        <TagInput
          defaultValue={["editor's pick"]}
          invalid
          placeholder="At least 3 tags required"
        />
      </div>
    </div>
  );
}
