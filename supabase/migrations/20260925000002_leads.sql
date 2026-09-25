create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  project_type text not null,
  features text[] not null default '{}',
  timeline text not null,
  budget_range text not null,

  name text not null,
  email text not null,
  phone text,
  company text,
  message text,

  status text not null default 'new' check (status in ('new', 'contacted', 'won', 'lost')),
  notes text
);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_status_idx on public.leads (status);

create trigger leads_set_updated_at
  before update on public.leads
  for each row
  execute function public.set_updated_at();

alter table public.leads enable row level security;

-- Anyone (including anonymous visitors) can submit the quote builder.
create policy "leads_public_insert" on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- Only admins can read or manage leads.
create policy "leads_admin_select" on public.leads
  for select
  to authenticated
  using (public.is_admin());

create policy "leads_admin_update" on public.leads
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "leads_admin_delete" on public.leads
  for delete
  to authenticated
  using (public.is_admin());
