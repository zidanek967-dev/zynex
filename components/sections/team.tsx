import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { TEAM } from "@/lib/data/team";

function initials(name: string) {
  if (name.startsWith("TODO")) return "ZX";
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Team() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <Reveal className="flex flex-col items-center gap-3 text-center">
        <span className="text-xs font-semibold tracking-widest text-brand uppercase">Team</span>
        <SplitText
          as="h2"
          text="The people behind the process"
          className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((member, i) => (
          <Reveal key={member.name + member.role} delay={i * 0.08}>
            <div className="glass glow-border flex h-full flex-col items-center gap-3 rounded-3xl border border-border p-6 text-center">
              <span
                className="flex size-16 items-center justify-center rounded-full text-lg font-semibold text-background"
                style={{ backgroundColor: member.accent }}
              >
                {initials(member.name)}
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-brand">{member.role}</p>
              </div>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
