-- Rate limiting for /api/admin/login. No RLS policies are defined, so with
-- RLS enabled this table is unreachable by anon/authenticated roles entirely
-- — only the service-role client (used server-side in the login route) can
-- touch it.
create table if not exists public.login_attempts (
  id uuid primary key default gen_random_uuid(),
  identifier text not null,
  created_at timestamptz not null default now()
);

create index if not exists login_attempts_identifier_created_at_idx
  on public.login_attempts (identifier, created_at);

alter table public.login_attempts enable row level security;
