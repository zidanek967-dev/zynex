import { createElement, type ElementType } from "react";

/**
 * Hero headline: every character rises out of its own mask on load (pure CSS
 * animation, so it renders on the server and never waits on hydration). Wrap
 * words in `*asterisks*` for accent colour — ramps cyan to violet, soft glow.
 */
export function CascadeText({
  text,
  as: Tag = "h1",
  className,
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  const plain = text.replaceAll("*", "");
  const segments = text.split("*");

  let charIndex = 0;

  return createElement(
    Tag,
    { className, "aria-label": plain },
    segments.map((segment, segIndex) => {
      const accent = segIndex % 2 === 1;
      const words = segment.split(/(\s+)/).filter(Boolean);
      const wordCount = words.filter((w) => !/^\s+$/.test(w)).length;
      let wordIndex = 0;
      const content = words.map((part, wi) => {
        if (/^\s+$/.test(part)) return " ";
        // Accent words ramp from cyan to violet across the phrase.
        const ratio = accent && wordCount > 1 ? Math.round((wordIndex++ / (wordCount - 1)) * 100) : 0;
        return (
          <span
            key={wi}
            aria-hidden="true"
            className="inline-block whitespace-nowrap"
            style={
              accent
                ? { color: `color-mix(in oklab, var(--brand) ${100 - ratio}%, var(--brand-2))` }
                : undefined
            }
          >
            {part.split("").map((ch) => {
              const i = charIndex++;
              return (
                <span key={i} className="cascade-mask">
                  <span className="cascade-ch" style={{ "--i": i } as React.CSSProperties}>
                    {ch}
                  </span>
                </span>
              );
            })}
          </span>
        );
      });

      if (!accent) return <span key={segIndex}>{content}</span>;
      return (
        <span key={segIndex} className="drop-shadow-[0_0_18px_rgba(94,242,255,0.35)]">
          {content}
        </span>
      );
    }),
  );
}
