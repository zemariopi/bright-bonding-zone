create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- Future plans: starts empty, no names, prices or limits invented.
create table public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  monthly_audit_limit integer check (monthly_audit_limit is null or monthly_audit_limit >= 0),
  active boolean not null default false,
  created_at timestamptz not null default now()
);
grant select on public.plans to authenticated;
grant all on public.plans to service_role;
alter table public.plans enable row level security;
create policy "Signed-in users read active plans" on public.plans for select to authenticated using (active);
create policy "Admins manage plans" on public.plans for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Plan assignment per user (empty until plans exist).
create table public.user_plans (
  user_id uuid primary key,
  plan_id uuid references public.plans(id) on delete set null,
  assigned_at timestamptz not null default now()
);
grant select on public.user_plans to authenticated;
grant all on public.user_plans to service_role;
alter table public.user_plans enable row level security;
create policy "Users read own plan" on public.user_plans for select to authenticated using (auth.uid() = user_id);

-- Completed audits: ONE row = ONE plan unit, regardless of API calls.
create table public.audits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  business_name text not null,
  city text not null,
  uf text not null,
  place_id text not null,
  completed_at timestamptz not null default now()
);
create index audits_user_month on public.audits (user_id, completed_at);
grant select on public.audits to authenticated;
grant all on public.audits to service_role;
alter table public.audits enable row level security;
create policy "Users read own audits" on public.audits for select to authenticated using (auth.uid() = user_id);

-- Technical API calls (search, details). Never consume plan units.
create table public.api_calls (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  audit_id uuid references public.audits(id) on delete set null,
  kind text not null check (kind in ('search', 'details')),
  outcome text not null check (outcome in ('ok', 'error')),
  http_status integer,
  created_at timestamptz not null default now()
);
create index api_calls_user_time on public.api_calls (user_id, created_at);
grant select on public.api_calls to authenticated;
grant all on public.api_calls to service_role;
alter table public.api_calls enable row level security;
create policy "Users read own api calls" on public.api_calls for select to authenticated using (auth.uid() = user_id);
-- No insert/update/delete policies for users: records are written only by the server.