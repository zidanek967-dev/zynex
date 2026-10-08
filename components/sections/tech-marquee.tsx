const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "Three.js",
  "Vercel AI SDK",
  "Motion",
  "PostgreSQL",
  "Vercel",
];

export function TechMarquee() {
  const items = [...STACK, ...STACK];

  return (
    <section
      aria-label="Technologies we build with"
      className="border-y border-border bg-surface/80 py-4 backdrop-blur-sm"
    >
      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max items-center">
          {items.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex items-center font-mono text-[0.95rem] font-medium tracking-[0.2em] whitespace-nowrap text-muted-foreground uppercase"
            >
              {tech}
              <i className="mx-7 text-brand not-italic" aria-hidden="true">
                ◆
              </i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
