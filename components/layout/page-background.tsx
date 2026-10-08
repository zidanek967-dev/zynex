"use client";

import { usePathname } from "next/navigation";

import { CosmicBackground } from "@/components/canvas/cosmic-bg-background";

// Admin is a working dashboard, not a marketing surface, so it stays plain.
// Every marketing page (home included — the hero disc layers over it) gets the
// site-wide cosmic nebula.
const EXCLUDED_PREFIXES = ["/admin"];

export function PageBackground() {
  const pathname = usePathname();

  if (EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;

  return <CosmicBackground />;
}
