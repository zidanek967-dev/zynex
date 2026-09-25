import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { TEAM, type TeamMember } from "@/lib/data/team";

function initials(name: string) {
  if (name.startsWith("TODO")) return "ZX";
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Avatar({ member, size = "size-16" }: { member: TeamMember; size?: string }) {
  if (member.photo) {
    return (
      <span className={`relative block ${size} shrink-0 overflow-hidden rounded-full border border-border`}>
        <Image src={member.photo} alt={member.name} fill sizes="128px" className="object-cover" />
      </span>
    );
  }
  return (
    <span
      className={`flex ${size} shrink-0 items-center justify-center rounded-full text-lg font-semibold text-background`}
      style={{ backgroundColor: member.accent }}
    >
      {initials(member.name)}
    </span>
  );
}

export function Team() {
  const soloFounder = TEAM.length === 1;

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

      {soloFounder ? (
        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <div className="glass glow-border flex w-full max-w-xl flex-col items-center gap-4 rounded-3xl border border-border p-8 text-center sm:flex-row sm:text-left">
            <Avatar member={TEAM[0]} size="size-24" />
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground">
                {TEAM[0].name}
              </h3>
              <p className="text-sm font-medium text-brand">{TEAM[0].role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{TEAM[0].bio}</p>
            </div>
          </div>
        </Reveal>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <Reveal key={member.name + member.role} delay={i * 0.08}>
              <div className="glass glow-border flex h-full flex-col items-center gap-3 rounded-3xl border border-border p-6 text-center">
                <Avatar member={member} />
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
      )}
    </section>
  );
}
