"use client";
import { useEffect, useState } from "react";
import { Progress } from "@patchui/react";

export function ProgressDemo() {
  const [value, setValue] = useState(20);
  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 7));
    }, 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-sm">
      <Stack label="Animated">
        <Progress value={value} />
      </Stack>
      <Stack label="Variants">
        <Progress value={40} variant="success" />
        <Progress value={70} variant="warning" />
        <Progress value={90} variant="danger" />
      </Stack>
      <Stack label="Sizes">
        <Progress value={60} size="sm" />
        <Progress value={60} size="md" />
        <Progress value={60} size="lg" />
      </Stack>
      <Stack label="Indeterminate">
        <Progress value={null} />
      </Stack>
    </div>
  );
}

function Stack({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-gray-800">
        {label}
      </p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
