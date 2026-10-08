"use client";

import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { MessageSquare, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const VISITOR_ID_KEY = "zynex_visitor_id";

function getOrCreateVisitorId() {
  if (typeof window === "undefined") return "";
  const existing = window.localStorage.getItem(VISITOR_ID_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  window.localStorage.setItem(VISITOR_ID_KEY, id);
  return id;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [configError, setConfigError] = useState<string | null>(null);
  const [visitorId] = useState(getOrCreateVisitorId);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [transport] = useState(
    () => new DefaultChatTransport({ api: "/api/chat", body: () => ({ sessionId, visitorId }) }),
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport,
    onError: async (err) => {
      try {
        const parsed = JSON.parse(err.message) as { error?: string };
        setConfigError(parsed.error ?? null);
      } catch {
        setConfigError("Something went wrong. Try again, or reach us on WhatsApp.");
      }
    },
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || status === "streaming" || status === "submitted") return;
    setConfigError(null);
    setInput("");
    void sendMessage({ text });
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3">
      {open ? (
        <div className="glass glow-border fx-card flex h-[28rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl border border-border">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="font-display text-sm font-semibold text-foreground">
              ZYNEX Assistant
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
            {messages.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Ask about our services, timelines, or what it&apos;s like to work with ZYNEX.
                For a real quote, use the{" "}
                <a href="/contact" className="text-brand underline underline-offset-2">
                  quote builder
                </a>
                .
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm",
                      message.role === "user"
                        ? "ml-auto bg-gradient-brand text-primary-foreground"
                        : "bg-surface text-foreground/90",
                    )}
                  >
                    {message.parts
                      .filter((part) => part.type === "text")
                      .map((part, i) => (
                        <span key={i} className="whitespace-pre-wrap">
                          {part.text}
                        </span>
                      ))}
                  </div>
                ))}
              </div>
            )}

            {configError || error ? (
              <p className="mt-3 text-xs text-danger">
                {configError ?? "Something went wrong. Try again, or reach us on WhatsApp."}
              </p>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border p-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              aria-label="Message"
              disabled={status === "streaming" || status === "submitted"}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || status === "streaming" || status === "submitted"}
              aria-label="Send"
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open ZYNEX chat assistant"}
        className="glow-border flex size-14 items-center justify-center rounded-full border border-border bg-gradient-brand text-primary-foreground shadow-lg shadow-brand/25 transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X className="size-6" /> : <MessageSquare className="size-6" />}
      </button>
    </div>
  );
}
