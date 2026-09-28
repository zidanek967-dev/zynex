import type { MetadataRoute } from "next";

import { getBlogPosts, getCaseStudies } from "@/lib/supabase/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zynex.ai";

const STATIC_ROUTES = ["", "/services", "/portfolio", "/about", "/blog", "/faq", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, blogPosts] = await Promise.all([getCaseStudies(), getBlogPosts()]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${siteUrl}/portfolio/${study.slug}`,
    lastModified: new Date(study.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...caseStudyEntries, ...blogEntries];
}
