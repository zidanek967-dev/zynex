-- Seed data: admin allowlist + placeholder portfolio/blog content.
-- Replace the case studies and blog posts via /admin once real content is ready.

insert into public.admin_users (email) values
  ('zidane.k967@gmail.com')
on conflict (email) do nothing;

insert into public.case_studies
  (slug, title, summary, problem, solution, stack, results, client_name, industry, cover_image_url, published, sort_order)
values
  (
    'placeholder-fintech-dashboard',
    'TODO(placeholder): Fintech Ops Dashboard',
    'TODO(placeholder): A real-time operations dashboard replacing a stack of spreadsheets for a UAE fintech.',
    'TODO(placeholder): describe the client''s actual problem here.',
    'TODO(placeholder): describe how ZYNEX solved it here.',
    array['Next.js', 'Supabase', 'Tailwind CSS'],
    'TODO(placeholder): quantify the outcome, e.g. "Cut reporting time by 80%".',
    'TODO(placeholder client name)',
    'Fintech',
    null,
    true,
    1
  ),
  (
    'placeholder-ecommerce-relaunch',
    'TODO(placeholder): E-commerce Relaunch',
    'TODO(placeholder): A full storefront relaunch with an AI-assisted product catalog.',
    'TODO(placeholder): describe the client''s actual problem here.',
    'TODO(placeholder): describe how ZYNEX solved it here.',
    array['Next.js', 'Stripe', 'Supabase'],
    'TODO(placeholder): quantify the outcome, e.g. "3x conversion rate in 60 days".',
    'TODO(placeholder client name)',
    'Retail',
    null,
    true,
    2
  ),
  (
    'placeholder-support-ai-agent',
    'TODO(placeholder): AI Support Agent',
    'TODO(placeholder): A voice + chat AI agent handling first-line customer support.',
    'TODO(placeholder): describe the client''s actual problem here.',
    'TODO(placeholder): describe how ZYNEX solved it here.',
    array['Vercel AI SDK', 'Next.js', 'Supabase'],
    'TODO(placeholder): quantify the outcome, e.g. "70% of tickets resolved without a human".',
    'TODO(placeholder client name)',
    'SaaS',
    null,
    true,
    3
  )
on conflict (slug) do nothing;

insert into public.blog_posts
  (slug, title, excerpt, content, category, reading_time_minutes, author_name, published, published_at)
values
  (
    'why-ai-built-software-ships-faster',
    'Why AI-Built Software Ships Faster',
    'TODO(placeholder excerpt): how ZYNEX compresses months of build time into days without cutting quality.',
    E'TODO(placeholder): full markdown content for this article.\n\n## Heading\n\nBody copy goes here.',
    'Engineering',
    5,
    'ZYNEX Team',
    true,
    now()
  ),
  (
    'choosing-between-a-website-and-a-web-app',
    'Choosing Between a Website and a Web App',
    'TODO(placeholder excerpt): a practical framework for founders deciding what to build first.',
    E'TODO(placeholder): full markdown content for this article.\n\n## Heading\n\nBody copy goes here.',
    'Strategy',
    4,
    'ZYNEX Team',
    true,
    now()
  ),
  (
    'what-an-ai-agent-can-actually-do-for-your-business',
    'What an AI Agent Can Actually Do For Your Business',
    'TODO(placeholder excerpt): cutting through the hype to concrete, shippable AI agent use cases.',
    E'TODO(placeholder): full markdown content for this article.\n\n## Heading\n\nBody copy goes here.',
    'AI',
    6,
    'ZYNEX Team',
    true,
    now()
  )
on conflict (slug) do nothing;
