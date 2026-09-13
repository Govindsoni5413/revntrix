-- ============================================================================
-- REVNTRIX — Supabase Database Schema & RLS Policies (TRD §2, §3, §4)
-- ============================================================================

-- Enable pgcrypto if needed for UUID generation
create extension if not exists "pgcrypto";

-- ── 2.1 profiles ──
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 2.2 admin_users ──
create table if not exists admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null default 'admin' check (role in ('admin', 'owner')),
  created_at timestamptz not null default now()
);

-- ── 2.3 campaigns ──
create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  campaign_code text unique not null,
  prospect_name text not null,
  status text not null default 'draft' check (status in ('draft','active','expired','archived')),
  starts_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 2.4 campaign_overrides ──
create table if not exists campaign_overrides (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  niche_id text not null check (niche_id in ('INT','CLN','EST','JW','RES','ECO')),
  business_name_override text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (campaign_id, niche_id)
);

-- ── 2.5 outreach_leads ──
create table if not exists outreach_leads (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  niche_id text not null check (niche_id in ('INT','CLN','EST','JW','RES','ECO')),
  design_id text not null,
  intent text not null check (intent in ('ready_made','custom')),
  campaign_id uuid references campaigns(id) on delete set null,
  requirements jsonb,
  phone text,
  status text not null default 'new' check (status in ('new','contacted','qualified','proposal','won','lost','follow_up')),
  consent_given boolean not null default false,
  consent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 2.6 clients ──
create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references outreach_leads(id) on delete set null,
  name text not null,
  contact_phone text,
  contact_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 2.7 projects ──
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  niche_id text not null,
  design_id text not null,
  status text not null default 'in_progress',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 2.8 analytics_events ──
create table if not exists analytics_events (
  id bigint generated always as identity primary key,
  event_type text not null,
  niche_id text,
  design_id text,
  campaign_id uuid references campaigns(id) on delete set null,
  session_id text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- ── 2.9 admin_daily_summary ──
create table if not exists admin_daily_summary (
  id uuid primary key default gen_random_uuid(),
  summary_date date not null unique,
  new_leads_count integer not null default 0,
  campaigns_expired_count integer not null default 0,
  analytics_purged_count integer not null default 0,
  created_at timestamptz not null default now()
);

-- ── Indexes (TRD §3) ──
create index if not exists campaigns_status_idx on campaigns(status);
create index if not exists campaigns_expires_at_idx on campaigns(expires_at);
create index if not exists campaign_overrides_campaign_niche_idx on campaign_overrides(campaign_id, niche_id);
create index if not exists leads_created_at_idx on outreach_leads(created_at);
create index if not exists leads_campaign_idx on outreach_leads(campaign_id);
create index if not exists leads_status_idx on outreach_leads(status);
create index if not exists projects_client_idx on projects(client_id);
create index if not exists analytics_events_created_at_idx on analytics_events(created_at);
create index if not exists analytics_events_campaign_idx on analytics_events(campaign_id);
create index if not exists analytics_events_type_idx on analytics_events(event_type);

-- ── RLS: Enable on all tables (TRD §4) ──
alter table profiles enable row level security;
alter table admin_users enable row level security;
alter table campaigns enable row level security;
alter table campaign_overrides enable row level security;
alter table outreach_leads enable row level security;
alter table clients enable row level security;
alter table projects enable row level security;
alter table analytics_events enable row level security;
alter table admin_daily_summary enable row level security;

-- ── 4.1 Admin Security Definer Function ──
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.id = auth.uid()
      and au.role in ('admin', 'owner')
  );
$$;

-- ── 4.2 Admin Policies ──
create policy "admin_full_campaigns" on campaigns for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin_full_overrides" on campaign_overrides for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin_full_leads" on outreach_leads for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin_full_clients" on clients for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin_full_projects" on projects for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin_read_summary" on admin_daily_summary for select to authenticated using (public.is_admin());
create policy "admin_read_analytics" on analytics_events for select to authenticated using (public.is_admin());
