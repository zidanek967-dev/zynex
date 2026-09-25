import { cn } from "@/lib/utils";

/**
 * ZYNEX wordmark — icon mark + text. Kept as a component (not a static SVG file)
 * so the text renders in Space Grotesk via next/font instead of a font-dependent
 * embedded <text> element. The standalone icon-only mark lives at
 * public/favicon.svg for the browser tab.
 */
export function Logo({
  className,
  iconOnly = false,
}: {
  className?: string;
  iconOnly?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="zynexLogoGradient" x1="8" y1="10" x2="56" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#3D6BFF" />
            <stop offset="1" stopColor="#C6FF3E" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="#07080B" />
        <rect width="64" height="64" rx="16" fill="url(#zynexLogoGradient)" fillOpacity="0.12" />
        <path
          d="M20 18H44L23 42H45"
          stroke="url(#zynexLogoGradient)"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="45" cy="42" r="3.4" fill="#C6FF3E" />
      </svg>
      {!iconOnly && (
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          ZYNEX
        </span>
      )}
    </span>
  );
}
