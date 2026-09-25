import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { PageBackground } from "@/components/layout/page-background";
import { PageTransition } from "@/components/motion/page-transition";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zynex.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ZYNEX — AI-Built Websites, Apps & Agents",
    template: "%s — ZYNEX",
  },
  description:
    "ZYNEX is an AI-powered product studio. We design and build websites, portals, web apps, mobile apps, dashboards and AI agents — delivered in days, not months.",
  openGraph: {
    type: "website",
    siteName: "ZYNEX",
    title: "ZYNEX — AI-Built Websites, Apps & Agents",
    description:
      "AI-powered product studio delivering websites, apps, dashboards and AI agents in days, not months.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZYNEX — AI-Built Websites, Apps & Agents",
    description:
      "AI-powered product studio delivering websites, apps, dashboards and AI agents in days, not months.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZYNEX",
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  description:
    "AI-powered product studio building websites, apps, dashboards and AI agents.",
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AE",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <div className="grain-overlay pointer-events-none fixed inset-0 z-50" aria-hidden="true" />
        <PageBackground />
        <SmoothScrollProvider>
          <Nav />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
