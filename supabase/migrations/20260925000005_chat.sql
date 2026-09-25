create table public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  visitor_id text not null, -- client-generated id, persisted in localStorage
  lead_id uuid references public.leads (id) on delete set null,
  metadata jsonb not null default '{}'::jsonb
);

create index chat_sessions_visitor_idx on public.chat_sessions (visitor_id);

create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  session_id uuid not null references public.chat_sessions (id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null
);

create index chat_messages_session_idx on public.chat_messages (session_id, created_at);

alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;

-- The public chatbot widget can only ever create rows, never read them back
-- directly — the /api/chat route (server-side, service role) handles reads for
-- conversation context so anon clients can't enumerate other visitors' chats.
create policy "chat_sessions_public_insert" on public.chat_sessions
  for insert
  to anon, authenticated
  with check (true);

create policy "chat_sessions_admin_select" on public.chat_sessions
  for select
  to authenticated
  using (public.is_admin());

create policy "chat_sessions_admin_update" on public.chat_sessions
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "chat_sessions_admin_delete" on public.chat_sessions
  for delete
  to authenticated
  using (public.is_admin());

create policy "chat_messages_public_insert" on public.chat_messages
  for insert
  to anon, authenticated
  with check (true);

create policy "chat_messages_admin_select" on public.chat_messages
  for select
  to authenticated
  using (public.is_admin());

create policy "chat_messages_admin_delete" on public.chat_messages
  for delete
  to authenticated
  using (public.is_admin());
