"use client";

import { useEffect } from "react";
import { useSidebar } from "@patchui/react";
import { SEARCH_OPEN_EVENT } from "./docs-search";

/** Closes the mobile sidebar when the search palette opens. */
export function CloseMobileSidebarOnSearch() {
  const { setOpenMobile } = useSidebar();
  useEffect(() => {
    const onOpen = () => setOpenMobile(false);
    window.addEventListener(SEARCH_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(SEARCH_OPEN_EVENT, onOpen);
  }, [setOpenMobile]);
  return null;
}
