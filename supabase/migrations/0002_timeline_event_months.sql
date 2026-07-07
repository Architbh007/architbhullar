-- Timeline events gain an optional month per entry.
-- events: text[] -> jsonb array of { "month": string | null, "text": string }.

alter table public.timeline_entries
  alter column events drop default;

alter table public.timeline_entries
  alter column events type jsonb
  using to_jsonb(events);

update public.timeline_entries
set events = coalesce(
  (select jsonb_agg(jsonb_build_object('text', e)) from jsonb_array_elements_text(events) as e),
  '[]'::jsonb
);

alter table public.timeline_entries
  alter column events set default '[]'::jsonb;
