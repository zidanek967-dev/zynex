-- Address Supabase security-linter warnings on the helper functions.
alter function public.set_updated_at() set search_path = public, pg_temp;

-- is_admin() must stay callable by `authenticated` (RLS policies invoke it as that
-- role), but has no reason to be publicly executable via RPC by anonymous visitors.
revoke execute on function public.is_admin() from public;
revoke execute on function public.is_admin() from anon;
grant execute on function public.is_admin() to authenticated;
