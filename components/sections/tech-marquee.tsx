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
    <section aria-label="Technologies we build with" className="border-y border-border py-8">
      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-12">
          {items.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="font-display text-lg font-medium tracking-tight text-muted-foreground/70 whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
