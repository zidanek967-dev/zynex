import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { checkRateLimit } from "@/lib/ai/rate-limit";
import { getModel, isAiConfigured } from "@/lib/ai/provider";
import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { createAdminClient } from "@/lib/supabase/admin";

export const maxDuration = 30;

function extractText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

async function logMessages(
  sessionId: string | undefined,
  visitorId: string | undefined,
  userText: string,
  assistantText: string,
) {
  if (!sessionId || !visitorId) return;

  try {
    const supabase = createAdminClient();
    await supabase.from("chat_sessions").upsert(
      { id: sessionId, visitor_id: visitorId },
      { onConflict: "id", ignoreDuplicates: true },
    );
    await supabase.from("chat_messages").insert([
      { session_id: sessionId, role: "user", content: userText },
      { session_id: sessionId, role: "assistant", content: assistantText },
    ]);
  } catch {
    // Logging is best-effort — never block the chat reply on a DB hiccup.
  }
}

export async function POST(req: Request) {
  if (!isAiConfigured()) {
    return Response.json(
      {
        error:
          "The AI assistant isn't set up yet — message us on WhatsApp or email instead, both linked in the footer.",
      },
      { status: 503 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: "Too many messages — slow down a little and try again shortly." },
      { status: 429 },
    );
  }

  const body = (await req.json()) as {
    messages: UIMessage[];
    sessionId?: string;
    visitorId?: string;
  };
  const { messages, sessionId, visitorId } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "No message provided." }, { status: 400 });
  }

  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  const userText = lastUserMessage ? extractText(lastUserMessage) : "";

  const result = streamText({
    model: getModel(),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    onFinish: ({ text }) => {
      void logMessages(sessionId, visitorId, userText, text);
    },
  });

  return result.toUIMessageStreamResponse();
}
