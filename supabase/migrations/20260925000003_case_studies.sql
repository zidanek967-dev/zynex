create table public.case_studies (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  slug text not null unique,
  title text not null,
  summary text not null,
  problem text not null,
  solution text not null,
  stack text[] not null default '{}',
  results text not null,

  client_name text,
  industry text,
  cover_image_url text,
  gallery_image_urls text[] not null default '{}',

  published boolean not null default true,
  sort_order int not null default 0
);

create index case_studies_published_idx on public.case_studies (published, sort_order);

create trigger case_studies_set_updated_at
  before update on public.case_studies
  for each row
  execute function public.set_updated_at();

alter table public.case_studies enable row level security;

-- Public can read only published case studies.
create policy "case_studies_public_select" on public.case_studies
  for select
  to anon, authenticated
  using (published = true);

-- Admins can read everything (including drafts) and manage.
create policy "case_studies_admin_select" on public.case_studies
  for select
  to authenticated
  using (public.is_admin());

create policy "case_studies_admin_insert" on public.case_studies
  for insert
  to authenticated
  with check (public.is_admin());

create policy "case_studies_admin_update" on public.case_studies
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "case_studies_admin_delete" on public.case_studies
  for delete
  to authenticated
  using (public.is_admin());
