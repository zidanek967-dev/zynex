import Link from "next/link";
import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Chat Logs" };

export default async function AdminChatLogsPage() {
  const supabase = await createClient();
  const { data: sessions } = await supabase
    .from("chat_sessions")
    .select("*, chat_messages(count)")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold text-foreground">Chat logs</h1>

      {!sessions || sessions.length === 0 ? (
        <p className="text-sm text-muted-foreground">No chat sessions yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {sessions.map((session) => (
            <Link
              key={session.id}
              href={`/admin/chat-logs/${session.id}`}
              className="glass glow-border flex items-center justify-between gap-4 rounded-2xl border border-border p-4 transition-colors hover:border-brand/40"
            >
              <div>
                <p className="text-sm font-medium text-foreground">Visitor {session.visitor_id.slice(0, 8)}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(session.created_at).toLocaleString()}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-1 text-xs text-muted-foreground">
                {session.chat_messages?.[0]?.count ?? 0} messages
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
