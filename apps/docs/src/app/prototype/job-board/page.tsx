import type { Metadata } from "next";
import { Suspense } from "react";
import { JobBoardPrototype } from "./prototype";

export const metadata: Metadata = {
  title: "Job board surface prototype",
  robots: { index: false, follow: false },
};

export default function JobBoardPrototypePage() {
  return (
    <Suspense>
      <JobBoardPrototype />
    </Suspense>
  );
}
