export type Service = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  href: string;
  /** Fuller copy for the dedicated /services page. */
  summary: string;
  features: string[];
  idealFor: string;
};

export const SERVICES: Service[] = [
  {
    id: "websites",
    label: "Websites",
    shortLabel: "Websites",
    description: "Marketing sites and landing pages that convert, built and shipped in days.",
    href: "/services#websites",
    summary:
      "A fast, on-brand marketing site or landing page — designed and built by AI, refined by our team, and tuned to actually convert visitors instead of just looking good.",
    features: [
      "Custom design system — no template look",
      "Copy and structure built around your offer",
      "SEO fundamentals, OG images, sitemap out of the box",
      "Lighthouse-tuned performance and accessibility",
    ],
    idealFor: "Launching, relaunching, or replacing a site that isn't pulling its weight.",
  },
  {
    id: "web-portals",
    label: "Web Portals",
    shortLabel: "Portals",
    description: "Client and partner portals with auth, roles, and real data underneath.",
    href: "/services#web-portals",
    summary:
      "A secure, role-aware portal for clients, partners, or vendors — authentication, permissions, and real data wired up from day one, not bolted on later.",
    features: [
      "Authentication and role-based access control",
      "Data model designed around how your business actually works",
      "Client-facing dashboards, document exchange, status tracking",
      "Built to extend as your needs grow",
    ],
    idealFor: "Giving clients or partners self-serve access instead of email threads and spreadsheets.",
  },
  {
    id: "web-apps",
    label: "Web Apps",
    shortLabel: "Web Apps",
    description: "Full product builds — from first prototype to a scalable, tested app.",
    href: "/services#web-apps",
    summary:
      "A full product build — from first working prototype to a scalable, tested application — using AI to compress the timeline without skipping the engineering.",
    features: [
      "Product scoping and technical architecture",
      "AI-accelerated implementation, human-reviewed",
      "Real database, real auth, real integrations",
      "Tested and documented, not just demo-ready",
    ],
    idealFor: "Founders and teams turning an idea or spec into a real, shippable product.",
  },
  {
    id: "mobile-apps",
    label: "Mobile Apps",
    shortLabel: "Mobile",
    description: "Native-feeling iOS and Android apps from a single AI-accelerated build.",
    href: "/services#mobile-apps",
    summary:
      "A native-feeling iOS and Android app from a single build — push notifications, offline support, and app-store submission included.",
    features: [
      "One codebase, native performance on both platforms",
      "Push notifications and offline-first data where it matters",
      "App Store / Play Store submission handled for you",
      "Shares a backend with your web app when you have one",
    ],
    idealFor: "Bringing an existing product to mobile, or shipping mobile-first from day one.",
  },
  {
    id: "dashboards",
    label: "Dashboards & Internal Tools",
    shortLabel: "Dashboards",
    description: "Internal tools and admin dashboards that replace spreadsheets for good.",
    href: "/services#dashboards",
    summary:
      "An internal dashboard or admin tool that replaces the spreadsheet-and-Slack-thread workflow your team has outgrown.",
    features: [
      "Built around your team's actual workflow, not a generic template",
      "Role-based permissions for staff, ops, and leadership views",
      "Reporting, exports, and audit trails where they matter",
      "Connects to the tools and data you already use",
    ],
    idealFor: "Teams tracking operations in spreadsheets that have started to crack under the weight.",
  },
  {
    id: "ai-agents",
    label: "AI Agents & Voice Agents",
    shortLabel: "AI Agents",
    description: "Chat and voice agents that qualify leads, answer support, and act on data.",
    href: "/services#ai-agents",
    summary:
      "A chat or voice agent that qualifies leads, answers support questions, and takes action on your data — not a generic chatbot bolted onto your site.",
    features: [
      "Trained on your product, docs, and tone of voice",
      "Qualifies leads and routes them to the right next step",
      "Can read and write to your systems, not just answer questions",
      "Full conversation logs for review and iteration",
    ],
    idealFor: "Teams drowning in repetitive support or lead-qualification conversations.",
  },
  {
    id: "automation",
    label: "Automation",
    shortLabel: "Automation",
    description: "Workflow automation that connects your tools and removes busywork.",
    href: "/services#automation",
    summary:
      "Workflow automation that connects the tools you already use — removing the manual copy-paste, data entry, and status-chasing that eats your team's time.",
    features: [
      "Maps your actual workflow before automating anything",
      "Connects CRMs, spreadsheets, email, and internal tools",
      "Error handling and alerts, not silent failures",
      "Documented so your team can maintain it",
    ],
    idealFor: "Teams with a repeatable manual process that's outgrown doing it by hand.",
  },
];
