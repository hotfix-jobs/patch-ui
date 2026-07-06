"use client";

import { useState } from "react";
import { Pagination, SectionLabel } from "@patchui/react";

export function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Basic</SectionLabel>
        <Pagination page={page} totalPages={10} onPageChange={setPage} />
      </div>

      <div className="space-y-3">
        <SectionLabel>Long range (ellipsis)</SectionLabel>
        <Pagination page={5} totalPages={42} onPageChange={() => {}} />
      </div>

      <div className="space-y-3">
        <SectionLabel>Short range (no ellipsis needed)</SectionLabel>
        <Pagination page={2} totalPages={5} onPageChange={() => {}} />
      </div>

      <div className="space-y-3">
        <SectionLabel>Loading state</SectionLabel>
        <Pagination
          page={5}
          totalPages={42}
          onPageChange={() => {}}
          loading
        />
      </div>
    </div>
  );
}
