"use client";

import { Pagination } from "@patchui/react";

export function PaginationStatesDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Pagination page={18} totalPages={42} onPageChange={() => {}} />
      <Pagination
        page={18}
        totalPages={42}
        onPageChange={() => {}}
        loading
      />
    </div>
  );
}
