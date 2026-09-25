import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Separator } from "@/components/ui/separator";

const EMAIL = "hello@zynex.ai"; // TODO(placeholder): real contact email
// Server Component — reading the plain (non-NEXT_PUBLIC) env var at render time
// is fine here since it's baked into public HTML either way (a phone number, not a secret).
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER ?? "971589342572";

const FOOTER_LINKS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Studio",
    links: [
      { href: "/services", label: "Services" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Get started",
    links: [
      { href: "/contact", label: "Get a Quote" },
      { href: "/contact", label: "Book a Call" },
      { href: "/faq", label: "FAQ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Logo />
            <p className="max-w-sm text-sm text-muted-foreground">
              AI-powered product studio. We design and build websites, portals, web
              apps, mobile apps, dashboards and AI agents — delivered in days, not
              months.
            </p>
            <div className="flex flex-col gap-2 pt-2 text-sm">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex w-fit items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4" />
                {EMAIL}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hi ZYNEX, I'd like to talk about a project.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <MessageCircle className="size-4" />
                WhatsApp us
              </a>
            </div>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <span className="font-display text-sm font-semibold text-foreground">
                {group.title}
              </span>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} ZYNEX. All rights reserved.</p>
          <p>Built in the UAE. AI-designed, AI-built.</p>
        </div>
      </div>
    </footer>
  );
}
