"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { ChatWidget } from "@/components/chat/chat-widget";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

/**
 * The marketing site's nav/footer/WhatsApp/chatbot chrome — everywhere
 * except /admin, which is a working dashboard with its own shell
 * (`app/admin/layout.tsx`), not a marketing surface.
 */
export function MarketingChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return <>{children}</>;

  return (
    <>
      <Nav />
      {children}
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </>
  );
}
