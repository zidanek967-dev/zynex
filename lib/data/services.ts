export type Service = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  href: string;
};

export const SERVICES: Service[] = [
  {
    id: "websites",
    label: "Websites",
    shortLabel: "Websites",
    description: "Marketing sites and landing pages that convert, built and shipped in days.",
    href: "/services#websites",
  },
  {
    id: "web-portals",
    label: "Web Portals",
    shortLabel: "Portals",
    description: "Client and partner portals with auth, roles, and real data underneath.",
    href: "/services#web-portals",
  },
  {
    id: "web-apps",
    label: "Web Apps",
    shortLabel: "Web Apps",
    description: "Full product builds — from first prototype to a scalable, tested app.",
    href: "/services#web-apps",
  },
  {
    id: "mobile-apps",
    label: "Mobile Apps",
    shortLabel: "Mobile",
    description: "Native-feeling iOS and Android apps from a single AI-accelerated build.",
    href: "/services#mobile-apps",
  },
  {
    id: "dashboards",
    label: "Dashboards & Internal Tools",
    shortLabel: "Dashboards",
    description: "Internal tools and admin dashboards that replace spreadsheets for good.",
    href: "/services#dashboards",
  },
  {
    id: "ai-agents",
    label: "AI Agents & Voice Agents",
    shortLabel: "AI Agents",
    description: "Chat and voice agents that qualify leads, answer support, and act on data.",
    href: "/services#ai-agents",
  },
  {
    id: "automation",
    label: "Automation",
    shortLabel: "Automation",
    description: "Workflow automation that connects your tools and removes busywork.",
    href: "/services#automation",
  },
];
