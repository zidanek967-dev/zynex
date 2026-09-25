"use client";

import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";
import { useReducedMotion } from "motion/react";
import Image from "next/image";
import {
  type CSSProperties,
  type FocusEvent,
  useMemo,
  useRef,
  useState,
} from "react";

export interface OrbitStackItem {
  name: string;
  role: string;
  description: string;
  accent?: string;
  initials?: string;
  stat?: string;
  image?: string;
}

interface OrbitCardStackProps {
  items?: OrbitStackItem[];
  className?: string;
  cardClassName?: string;
  defaultActiveIndex?: number;
  spread?: number;
  lift?: number;
  onActiveChange?: (item: OrbitStackItem, index: number) => void;
}

// TODO(placeholder): swap for real client testimonials.
const defaultItems: OrbitStackItem[] = [
  {
    name: "TODO(placeholder name)",
    role: "Founder, TODO(placeholder company)",
    description:
      "TODO(placeholder testimonial): what this client said about working with ZYNEX.",
    accent: "#3D6BFF",
    stat: "Fintech",
  },
  {
    name: "TODO(placeholder name)",
    role: "Head of Product, TODO(placeholder company)",
    description:
      "TODO(placeholder testimonial): what this client said about working with ZYNEX.",
    accent: "#C6FF3E",
    stat: "Retail",
  },
  {
    name: "TODO(placeholder name)",
    role: "COO, TODO(placeholder company)",
    description:
      "TODO(placeholder testimonial): what this client said about working with ZYNEX.",
    accent: "#3EFFB0",
    stat: "SaaS",
  },
  {
    name: "TODO(placeholder name)",
    role: "Founder, TODO(placeholder company)",
    description:
      "TODO(placeholder testimonial): what this client said about working with ZYNEX.",
    accent: "#3D6BFF",
    stat: "Healthcare",
  },
  {
    name: "TODO(placeholder name)",
    role: "Marketing Lead, TODO(placeholder company)",
    description:
      "TODO(placeholder testimonial): what this client said about working with ZYNEX.",
    accent: "#C6FF3E",
    stat: "Hospitality",
  },
];

function inRange(index: number, length: number) {
  return Math.min(Math.max(0, index), Math.max(0, length - 1));
}

function initialsFor(item: OrbitStackItem) {
  return (
    item.initials ??
    item.name
      .split(/\s+/)
      .map((part) => part.at(0))
      .join("")
      .slice(0, 2)
      .toUpperCase()
  );
}

function Portrait({ item }: { item: OrbitStackItem }) {
  const initials = initialsFor(item);
  const shared =
    "relative flex aspect-[1.36] w-full overflow-hidden rounded-[1.45rem] border border-border bg-surface";

  if (item.image) {
    return (
      <div className={shared}>
        <Image src={item.image} alt={item.name} fill sizes="21rem" className="object-cover" />
        <span className="absolute bottom-4 right-4 rounded-full bg-background px-3 py-1 text-xs font-semibold tracking-[0.18em] text-foreground">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div
      className={shared}
      style={{ "--portrait-accent": item.accent ?? "#3D6BFF" } as CSSProperties}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,var(--portrait-accent),transparent_45%),radial-gradient(circle_at_85%_78%,var(--portrait-accent),transparent_38%)] opacity-[0.18]" />
      <Quote
        className="absolute left-5 top-5 size-8 opacity-40"
        style={{ color: "var(--portrait-accent)" }}
        aria-hidden
      />
      <span
        className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full text-xs font-semibold tracking-[0.1em] text-background"
        style={{ backgroundColor: item.accent ?? "#3D6BFF" }}
      >
        {initials}
      </span>
    </div>
  );
}

export function OrbitCardStack({
  items = defaultItems,
  className,
  cardClassName,
  defaultActiveIndex = 2,
  spread = 168,
  lift = 34,
  onActiveChange,
}: OrbitCardStackProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const cards = items.length ? items : defaultItems;
  const restingIndex = inRange(defaultActiveIndex, cards.length);
  const [activeIndex, setActiveIndex] = useState(restingIndex);
  const [open, setOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const midpoint = (cards.length - 1) / 2;

  const layouts = useMemo(
    () =>
      cards.map((_, index) => {
        const orbit = index - midpoint;
        const stack = index - restingIndex;
        return {
          open: {
            x: orbit * spread,
            y: Math.abs(orbit) * 30 + Math.max(0, Math.abs(orbit) - 1) * 10,
            rotation: orbit * 8.5,
          },
          closed: {
            x: stack * 10,
            y: Math.abs(stack) * 5,
            rotation: stack * 2.8,
          },
        };
      }),
    [cards, midpoint, restingIndex, spread],
  );

  const activate = (index: number) => {
    const next = inRange(index, cards.length);
    setOpen(true);
    setActiveIndex(next);
    onActiveChange?.(cards[next]!, next);
  };
  const close = () => {
    setOpen(false);
    setActiveIndex(restingIndex);
  };
  const leaveFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
  };

  return (
    <div
      className={cn(
        "relative flex min-h-full w-full items-center justify-center overflow-hidden p-8",
        className,
      )}
    >
      <div
        ref={stageRef}
        className="relative h-[470px] w-full max-w-[980px]"
        onMouseLeave={close}
        onBlur={leaveFocus}
        role="list"
        aria-label="Client testimonial card stack"
      >
        {cards.map((item, index) => {
          const position = open ? layouts[index]!.open : layouts[index]!.closed;
          const active = index === activeIndex;
          const style: CSSProperties = {
            zIndex: active ? 80 : 50 - Math.abs(index - activeIndex),
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${
              position.y - (open && active ? lift : 0)
            }px)) rotate(${position.rotation}deg) scale(${open ? 0.985 : 0.97})`,
            transitionDuration: reduceMotion ? "0ms" : "420ms",
          };

          return (
            <article
              key={`${item.name}-${index}`}
              role="listitem"
              tabIndex={0}
              aria-current={active ? "true" : undefined}
              className={cn(
                "glow-border absolute left-1/2 top-1/2 w-[min(78vw,21rem)] origin-bottom cursor-pointer rounded-[1.9rem] border border-border bg-surface p-4 text-foreground outline-none",
                "transition-[transform] ease-[cubic-bezier(.2,.8,.2,1)] focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                cardClassName,
              )}
              style={style}
              onMouseEnter={() => activate(index)}
              onFocus={() => activate(index)}
              onClick={() => activate(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                  event.preventDefault();
                  const next = (index + 1) % cards.length;
                  activate(next);
                  stageRef.current
                    ?.querySelectorAll<HTMLElement>("[role=listitem]")
                    [next]?.focus();
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                  event.preventDefault();
                  const next = (index - 1 + cards.length) % cards.length;
                  activate(next);
                  stageRef.current
                    ?.querySelectorAll<HTMLElement>("[role=listitem]")
                    [next]?.focus();
                }
                if (event.key === "Escape") {
                  event.currentTarget.blur();
                  close();
                }
              }}
            >
              <div className="relative">
                <Portrait item={item} />
              </div>
              <div className="px-2 pb-2 pt-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {item.role}
                </p>
                <h3 className="mt-2 font-display text-[1.7rem] font-semibold leading-tight tracking-tight text-foreground">
                  {item.name}
                </h3>
                <p className="mt-4 max-w-[17rem] text-[0.95rem] font-medium leading-[1.42] tracking-[-0.01em] text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-5 border-t border-border pt-4 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {item.stat ?? "Client"}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
