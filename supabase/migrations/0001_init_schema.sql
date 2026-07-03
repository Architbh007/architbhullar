-- archit-website: initial Supabase schema
-- Single-admin CMS backend. Public read, admin-email-only write, via RLS.

create table if not exists public.profile (
  id smallint primary key default 1,
  name text not null default '',
  first_name text not null default '',
  last_name text not null default '',
  title text not null default '',
  subtitle text not null default '',
  bio text not null default '',
  bio_extended text[] not null default '{}',
  photo_url text,
  availability text not null default '',
  location text not null default '',
  university text not null default '',
  email text not null default '',
  wam numeric,
  wam_target numeric,
  updated_at timestamptz not null default now(),
  constraint profile_singleton check (id = 1)
);

create table if not exists public.timeline_entries (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  events text[] not null default '{}',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.experience_items (
  id uuid primary key default gen_random_uuid(),
  organization text not null default '',
  role text not null default '',
  duration text not null default '',
  description text not null default '',
  highlights text[] not null default '{}',
  type text not null check (type in ('education', 'work', 'project', 'achievement')),
  location text not null default '',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.skill_categories (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  sort_order int not null default 0
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.skill_categories(id) on delete cascade,
  name text not null,
  proficiency text,
  sort_order int not null default 0
);

create table if not exists public.projects (
  id text primary key,
  name text not null default '',
  full_name text not null default '',
  tagline text not null default '',
  problem text not null default '',
  architecture text not null default '',
  challenges text[] not null default '{}',
  solution text not null default '',
  stack text[] not null default '{}',
  github text,
  demo text,
  status text not null default 'completed' check (status in ('active', 'completed', 'archived')),
  timeline text not null default '',
  role text not null default '',
  impact text not null default '',
  learnings text[] not null default '{}',
  future_improvements text[] not null default '{}',
  featured boolean not null default false,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id text not null references public.projects(id) on delete cascade,
  kind text not null check (kind in ('cover', 'architecture', 'screenshot', 'video')),
  url text not null,
  storage_path text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.social_links (
  id smallint primary key default 1,
  github text not null default '',
  linkedin text not null default '',
  email text not null default '',
  updated_at timestamptz not null default now(),
  constraint social_links_singleton check (id = 1)
);

create table if not exists public.resume (
  id smallint primary key default 1,
  url text,
  storage_path text,
  filename text,
  uploaded_at timestamptz,
  constraint resume_singleton check (id = 1)
);

create table if not exists public.contact_information (
  id smallint primary key default 1,
  availability_blurb text not null default '',
  extra_blurb text not null default '',
  response_note text not null default '',
  cal_link text not null default '',
  updated_at timestamptz not null default now(),
  constraint contact_information_singleton check (id = 1)
);

-- RLS: public read, writes restricted to the single admin account by email.
do $$
declare
  t text;
  admin_email constant text := 'bhullararchit@gmail.com';
begin
  foreach t in array array[
    'profile', 'timeline_entries', 'experience_items', 'skill_categories',
    'skills', 'projects', 'project_media', 'social_links', 'resume', 'contact_information'
  ]
  loop
    execute format('alter table public.%I enable row level security', t);

    execute format('drop policy if exists "public_read" on public.%I', t);
    execute format('create policy "public_read" on public.%I for select using (true)', t);

    execute format('drop policy if exists "admin_insert" on public.%I', t);
    execute format(
      'create policy "admin_insert" on public.%I for insert with check (auth.jwt() ->> ''email'' = %L)',
      t, admin_email
    );

    execute format('drop policy if exists "admin_update" on public.%I', t);
    execute format(
      'create policy "admin_update" on public.%I for update using (auth.jwt() ->> ''email'' = %L) with check (auth.jwt() ->> ''email'' = %L)',
      t, admin_email, admin_email
    );

    execute format('drop policy if exists "admin_delete" on public.%I', t);
    execute format(
      'create policy "admin_delete" on public.%I for delete using (auth.jwt() ->> ''email'' = %L)',
      t, admin_email
    );
  end loop;
end $$;

-- Storage buckets: public read, admin-email-only write.
insert into storage.buckets (id, name, public)
values
  ('profile', 'profile', true),
  ('projects', 'projects', true),
  ('videos', 'videos', true),
  ('resumes', 'resumes', true)
on conflict (id) do nothing;

do $$
declare
  b text;
  admin_email constant text := 'bhullararchit@gmail.com';
begin
  foreach b in array array['profile', 'projects', 'videos', 'resumes']
  loop
    execute format('drop policy if exists "public_read_%s" on storage.objects', b);
    execute format(
      'create policy "public_read_%s" on storage.objects for select using (bucket_id = %L)',
      b, b
    );

    execute format('drop policy if exists "admin_insert_%s" on storage.objects', b);
    execute format(
      'create policy "admin_insert_%s" on storage.objects for insert with check (bucket_id = %L and auth.jwt() ->> ''email'' = %L)',
      b, b, admin_email
    );

    execute format('drop policy if exists "admin_update_%s" on storage.objects', b);
    execute format(
      'create policy "admin_update_%s" on storage.objects for update using (bucket_id = %L and auth.jwt() ->> ''email'' = %L) with check (bucket_id = %L and auth.jwt() ->> ''email'' = %L)',
      b, b, admin_email, b, admin_email
    );

    execute format('drop policy if exists "admin_delete_%s" on storage.objects', b);
    execute format(
      'create policy "admin_delete_%s" on storage.objects for delete using (bucket_id = %L and auth.jwt() ->> ''email'' = %L)',
      b, b, admin_email
    );
  end loop;
end $$;
