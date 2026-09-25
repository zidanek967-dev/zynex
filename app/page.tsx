import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <div className="glow-border glass flex flex-col items-center gap-6 rounded-3xl px-10 py-14 sm:px-16">
        <span className="rounded-full border border-border px-3 py-1 text-xs tracking-widest text-muted-foreground uppercase">
          Design system online
        </span>
        <h1 className="text-glow max-w-2xl text-4xl font-semibold text-balance sm:text-6xl">
          ZYNEX
        </h1>
        <p className="max-w-md text-base text-muted-foreground sm:text-lg">
          AI-built websites, apps, dashboards and agents. Stage (a) — tokens, fonts and
          shadcn primitives wired up. Home page content lands in a later stage.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <span className="size-3 rounded-full bg-brand" />
          <span className="size-3 rounded-full bg-brand-2" />
          <span className="size-3 rounded-full bg-success" />
          <span className="size-3 rounded-full bg-destructive" />
        </div>
      </div>
    </main>
  );
}
