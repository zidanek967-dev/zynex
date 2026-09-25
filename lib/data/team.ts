export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  accent: string;
};

// TODO(placeholder): swap for the real team.
export const TEAM: TeamMember[] = [
  {
    name: "TODO(placeholder name)",
    role: "Founder / CEO",
    bio: "Sets the direction and stays close to every client engagement.",
    accent: "#3D6BFF",
  },
  {
    name: "TODO(placeholder name)",
    role: "Design Lead",
    bio: "Shapes the visual systems AI drafts are refined into.",
    accent: "#C6FF3E",
  },
  {
    name: "TODO(placeholder name)",
    role: "Engineering Lead",
    bio: "Reviews and hardens every AI-generated build before it ships.",
    accent: "#3EFFB0",
  },
  {
    name: "TODO(placeholder name)",
    role: "AI & Automation Lead",
    bio: "Builds the agents and workflows behind our own process, too.",
    accent: "#3D6BFF",
  },
];
