import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * ZYNEX wordmark — the real halftone logo (public/images/zynex-logo-sm.webp,
 * transparent background, pale on dark). The standalone icon-only mark for the
 * browser tab lives at public/favicon.svg.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/zynex-logo-sm.webp"
      alt="ZYNEX"
      width={360}
      height={268}
      priority
      className={cn("h-[52px] w-auto self-start drop-shadow-[0_0_10px_rgba(94,242,255,0.25)]", className)}
    />
  );
}
