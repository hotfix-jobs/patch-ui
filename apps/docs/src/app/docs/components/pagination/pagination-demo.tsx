"use client";

import { useState } from "react";
import { Pagination } from "@patchui/react";

export function PaginationDemo() {
  const [page, setPage] = useState(4);

  return (
    <Pagination
      page={page}
      totalPages={12}
      onPageChange={setPage}
    />
  );
}
