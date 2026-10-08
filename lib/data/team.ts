export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  accent: string;
  /** Path under /public. Falls back to an initials avatar when omitted. */
  photo?: string;
};

// Solo-founder-led for now — update this as ZYNEX hires.
export const TEAM: TeamMember[] = [
  {
    name: "Mohammed Zidane",
    role: "Founder / CEO",
    bio: "Runs every part of ZYNEX today — strategy, design, engineering, and AI — and stays hands-on with every client engagement.",
    accent: "#5EF2FF",
    photo: "/images/team-mohammed-zidane.jpg",
  },
];
