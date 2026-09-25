"use client";

import { usePathname } from "next/navigation";

import { DotMatrixBackground } from "@/components/canvas/dot-matrix-background";

// Home has its own hero background (the accretion disc); admin is a working
// dashboard, not a marketing surface, so it stays plain. Every other page
// gets the ambient dot-matrix texture.
const EXCLUDED_PREFIXES = ["/admin"];

export function PageBackground() {
  const pathname = usePathname();

  if (pathname === "/") return null;
  if (EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;

  return <DotMatrixBackground />;
}
