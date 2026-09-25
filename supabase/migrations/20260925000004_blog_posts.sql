create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null, -- markdown
  category text not null default 'General',
  reading_time_minutes int not null default 4,

  author_name text not null default 'ZYNEX Team',
  cover_image_url text,
  og_image_url text,

  published boolean not null default true,
  published_at timestamptz not null default now()
);

create index blog_posts_published_idx on public.blog_posts (published, published_at desc);
create index blog_posts_category_idx on public.blog_posts (category);

create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row
  execute function public.set_updated_at();

alter table public.blog_posts enable row level security;

create policy "blog_posts_public_select" on public.blog_posts
  for select
  to anon, authenticated
  using (published = true);

create policy "blog_posts_admin_select" on public.blog_posts
  for select
  to authenticated
  using (public.is_admin());

create policy "blog_posts_admin_insert" on public.blog_posts
  for insert
  to authenticated
  with check (public.is_admin());

create policy "blog_posts_admin_update" on public.blog_posts
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "blog_posts_admin_delete" on public.blog_posts
  for delete
  to authenticated
  using (public.is_admin());
