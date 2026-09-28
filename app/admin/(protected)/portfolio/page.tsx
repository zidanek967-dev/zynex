import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

import { deleteCaseStudy } from "./actions";

export const metadata: Metadata = { title: "Portfolio" };

export default async function AdminPortfolioPage() {
  const supabase = await createClient();
  const { data: caseStudies } = await supabase
    .from("case_studies")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-foreground">Portfolio</h1>
        <Button render={<Link href="/admin/portfolio/new" />}>New case study</Button>
      </div>

      {!caseStudies || caseStudies.length === 0 ? (
        <p className="text-sm text-muted-foreground">No case studies yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="glass glow-border flex items-center justify-between gap-4 rounded-2xl border border-border p-4"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {cs.title}{" "}
                  {!cs.published ? (
                    <span className="ml-2 rounded-full bg-white/5 px-2 py-0.5 text-xs text-muted-foreground">
                      Draft
                    </span>
                  ) : null}
                </p>
                <p className="text-xs text-muted-foreground">/{cs.slug}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  render={<Link href={`/admin/portfolio/${cs.id}`} />}
                >
                  Edit
                </Button>
                <form action={deleteCaseStudy.bind(null, cs.id)}>
                  <Button type="submit" variant="destructive" size="sm">
                    Delete
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
