import { Reveal } from "@/components/motion/reveal";

export function Booking({ calLink }: { calLink: string }) {
  const src = `${calLink}?embed=true&theme=dark`;

  return (
    <Reveal className="glass glow-border overflow-hidden rounded-3xl border border-border">
      <iframe
        src={src}
        title="Book a call with ZYNEX"
        className="h-[720px] w-full"
        loading="lazy"
      />
    </Reveal>
  );
}
