import { z } from "zod";

export const PROJECT_TYPES = [
  "website",
  "web-portal",
  "web-app",
  "mobile-app",
  "dashboard",
  "ai-agent",
  "automation",
  "not-sure",
] as const;

export const PROJECT_TYPE_LABELS: Record<(typeof PROJECT_TYPES)[number], string> = {
  website: "Website / landing page",
  "web-portal": "Web portal",
  "web-app": "Web app",
  "mobile-app": "Mobile app",
  dashboard: "Dashboard / internal tool",
  "ai-agent": "AI / voice agent",
  automation: "Automation",
  "not-sure": "Not sure yet",
};

export const FEATURES = [
  "auth",
  "payments",
  "cms",
  "admin-dashboard",
  "ai-chatbot",
  "mobile-app",
  "integrations",
  "automation",
] as const;

export const FEATURE_LABELS: Record<(typeof FEATURES)[number], string> = {
  auth: "User accounts / authentication",
  payments: "Payments / billing",
  cms: "Blog / CMS",
  "admin-dashboard": "Admin dashboard",
  "ai-chatbot": "AI features / chatbot",
  "mobile-app": "iOS / Android app",
  integrations: "Third-party integrations",
  automation: "Workflow automation",
};

export const TIMELINES = ["asap", "2-4-weeks", "1-3-months", "flexible"] as const;

export const TIMELINE_LABELS: Record<(typeof TIMELINES)[number], string> = {
  asap: "ASAP (this week)",
  "2-4-weeks": "2–4 weeks",
  "1-3-months": "1–3 months",
  flexible: "Flexible / exploring",
};

export const BUDGET_RANGES = ["under-5k", "5k-15k", "15k-50k", "50k-plus"] as const;

export const BUDGET_RANGE_LABELS: Record<(typeof BUDGET_RANGES)[number], string> = {
  "under-5k": "Under $5k",
  "5k-15k": "$5k – $15k",
  "15k-50k": "$15k – $50k",
  "50k-plus": "$50k+",
};

export const leadSchema = z.object({
  projectType: z.enum(PROJECT_TYPES, { error: "Pick a project type" }),
  features: z.array(z.enum(FEATURES)),
  timeline: z.enum(TIMELINES, { error: "Pick a timeline" }),
  budgetRange: z.enum(BUDGET_RANGES, { error: "Pick a budget range" }),
  name: z.string().trim().min(2, "Enter your name"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  message: z.string().trim().optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;

export const LEAD_STEP_FIELDS = [
  ["projectType", "features"],
  ["timeline", "budgetRange"],
  ["name", "email", "phone", "company", "message"],
] as const satisfies readonly (keyof LeadFormValues)[][];
