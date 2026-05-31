"use client";

import { useState } from "react";
import { Pagination } from "@patchui/react";

export function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <Pagination page={page} totalPages={10} onPageChange={setPage} />
  );
}
