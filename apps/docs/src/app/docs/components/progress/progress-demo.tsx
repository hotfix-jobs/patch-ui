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
        <Progress value={90} variant="error" />
      </Stack>
      <Stack label="Sizes">
        <Progress value={60} size="sm" />
        <Progress value={60} size="md" />
        <Progress value={60} size="lg" />
      </Stack>
      <Stack label="Custom height">
        <Progress value={60} height={4} />
        <Progress value={60} height={10} />
        <Progress value={60} height={20} />
      </Stack>
      <Stack label="Custom width">
        <Progress value={60} width={120} />
        <Progress value={60} width={200} />
        <Progress value={60} width="100%" />
      </Stack>
      <Stack label="Custom max">
        <Progress value={30} max={40} />
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
      <p className="mb-2 text-label-12 text-gray-800">{label}</p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
