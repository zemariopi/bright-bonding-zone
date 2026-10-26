alter table public.api_calls drop constraint if exists api_calls_outcome_check;
alter table public.api_calls add constraint api_calls_outcome_check check (outcome in ('pending', 'ok', 'error'));
alter table public.api_calls add column if not exists query_key text;
create index if not exists api_calls_time on public.api_calls (created_at);

-- Atomically checks the provisional test-phase limits and reserves one Google call.
-- Serialized with a transaction advisory lock so concurrent requests cannot both pass.
create or replace function public.reserve_places_call(_user_id uuid, _kind text, _query_key text default null)
returns table (reservation_id uuid, denied text)
language plpgsql
security definer
set search_path = public
as $$
declare
  day_start timestamptz := (date_trunc('day', now() at time zone 'America/Sao_Paulo') at time zone 'America/Sao_Paulo');
  n integer;
  last_key text;
  new_id uuid;
begin
  if _kind not in ('search', 'details') then raise exception 'invalid kind'; end if;
  perform pg_advisory_xact_lock(hashtext('zm9_places_limits'));

  select count(*) into n from api_calls where created_at >= day_start;
  if n >= 20 then return query select null::uuid, 'global_daily'; return; end if;

  if _kind = 'search' then
    select count(*) into n from api_calls where user_id = _user_id and kind = 'search' and created_at >= day_start;
    if n >= 5 then return query select null::uuid, 'user_searches_daily'; return; end if;
    select query_key into last_key from api_calls
      where user_id = _user_id and kind = 'search' and outcome in ('ok', 'pending')
      order by created_at desc limit 1;
    if last_key is not null and last_key = _query_key then return query select null::uuid, 'duplicate_search'; return; end if;
  else
    select count(*) into n from api_calls where user_id = _user_id and kind = 'details' and outcome = 'pending' and created_at > now() - interval '2 minutes';
    if n > 0 then return query select null::uuid, 'audit_in_progress'; return; end if;
    select count(*) into n from api_calls where user_id = _user_id and kind = 'details' and outcome = 'ok' and created_at >= day_start;
    if n >= 2 then return query select null::uuid, 'user_audits_daily'; return; end if;
  end if;

  insert into api_calls (user_id, kind, outcome, query_key) values (_user_id, _kind, 'pending', _query_key) returning id into new_id;
  return query select new_id, null::text;
end;
$$;

create or replace function public.finish_places_call(_id uuid, _ok boolean, _http_status integer, _audit_id uuid default null)
returns void
language sql
security definer
set search_path = public
as $$
  update api_calls set outcome = case when _ok then 'ok' else 'error' end, http_status = _http_status, audit_id = coalesce(_audit_id, audit_id)
  where id = _id and outcome = 'pending';
$$;

revoke all on function public.reserve_places_call(uuid, text, text) from public, anon, authenticated;
revoke all on function public.finish_places_call(uuid, boolean, integer, uuid) from public, anon, authenticated;
grant execute on function public.reserve_places_call(uuid, text, text) to service_role;
grant execute on function public.finish_places_call(uuid, boolean, integer, uuid) to service_role;