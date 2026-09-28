import Link from "next/link";
import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Overview" };

async function getCounts() {
  const supabase = await createClient();

  const [leads, newLeads, caseStudies, blogPosts, chatSessions] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("case_studies").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("chat_sessions").select("*", { count: "exact", head: true }),
  ]);

  return {
    leads: leads.count ?? 0,
    newLeads: newLeads.count ?? 0,
    caseStudies: caseStudies.count ?? 0,
    blogPosts: blogPosts.count ?? 0,
    chatSessions: chatSessions.count ?? 0,
  };
}

const CARDS = [
  { key: "newLeads" as const, label: "New leads", href: "/admin/leads" },
  { key: "leads" as const, label: "Total leads", href: "/admin/leads" },
  { key: "caseStudies" as const, label: "Case studies", href: "/admin/portfolio" },
  { key: "blogPosts" as const, label: "Blog posts", href: "/admin/blog" },
  { key: "chatSessions" as const, label: "Chat sessions", href: "/admin/chat-logs" },
];

export default async function AdminOverviewPage() {
  const counts = await getCounts();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold text-foreground">Overview</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CARDS.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="glass glow-border rounded-2xl border border-border p-5 transition-colors hover:border-brand/40"
          >
            <p className="text-3xl font-semibold text-foreground">{counts[card.key]}</p>
            <p className="mt-1 text-sm text-muted-foreground">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
