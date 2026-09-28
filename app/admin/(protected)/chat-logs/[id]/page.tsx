import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Chat transcript" };

export default async function ChatLogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: session }, { data: messages }] = await Promise.all([
    supabase.from("chat_sessions").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", id)
      .order("created_at", { ascending: true }),
  ]);

  if (!session) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Visitor {session.visitor_id.slice(0, 8)}
        </h1>
        <p className="text-xs text-muted-foreground">
          Session started {new Date(session.created_at).toLocaleString()}
        </p>
      </div>

      <div className="flex max-w-2xl flex-col gap-3">
        {!messages || messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No messages logged for this session.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                message.role === "user"
                  ? "self-end bg-brand text-white"
                  : "self-start bg-surface text-foreground/90",
              )}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <p className="mt-1 text-[0.65rem] opacity-70">
                {new Date(message.created_at).toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
