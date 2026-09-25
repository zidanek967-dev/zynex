import {
  AppWindow,
  Bot,
  Globe,
  LayoutDashboard,
  PanelsTopLeft,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  websites: Globe,
  "web-portals": PanelsTopLeft,
  "web-apps": AppWindow,
  "mobile-apps": Smartphone,
  dashboards: LayoutDashboard,
  "ai-agents": Bot,
  automation: Workflow,
};
