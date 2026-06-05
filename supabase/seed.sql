-- Run this in the Supabase SQL editor

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  icon_name text not null default 'Layers',
  created_at timestamptz not null default now()
);

-- Seed data
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 74, 'Layers'),
  ('TypeScript Mastery', 48, 'Code2'),
  ('Next.js Architecture', 91, 'Blocks'),
  ('Database Design', 33, 'Database');

-- Enable RLS and allow anon reads
alter table courses enable row level security;

create policy "Allow anon read" on courses
  for select to anon using (true);
