-- Extensions
create extension if not exists pgcrypto;

-- Generic updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Admin allowlist. App-layer ADMIN_EMAIL (middleware) and this table should stay in
-- sync; this table is the source of truth for RLS. Add/remove admins by editing rows.
create table public.admin_users (
  email text primary key
);

alter table public.admin_users enable row level security;

-- Admins can see the allowlist (useful for an admin-management UI later); no public access.
create policy "admin_users_select_self" on public.admin_users
  for select
  to authenticated
  using (email = (auth.jwt() ->> 'email'));

-- SECURITY DEFINER so RLS policies on other tables can call this without needing
-- their own access to admin_users.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users au
    where au.email = (auth.jwt() ->> 'email')
  );
$$;
