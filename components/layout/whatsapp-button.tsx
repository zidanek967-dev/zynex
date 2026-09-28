import { MessageCircle } from "lucide-react";

// Server Component — reading the plain (non-NEXT_PUBLIC) env var at render time
// is fine here since it's baked into public HTML either way (a phone number, not a secret).
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER ?? "971589342572";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        "Hi ZYNEX, I'd like to talk about a project.",
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ZYNEX on WhatsApp"
      className="glow-border fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full border border-border bg-success text-background shadow-lg shadow-success/20 transition-transform hover:scale-105 active:scale-95"
    >
      <MessageCircle className="size-6" fill="currentColor" strokeWidth={0} />
    </a>
  );
}
