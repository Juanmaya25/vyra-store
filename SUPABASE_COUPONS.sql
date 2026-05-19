-- ════════════════════════════════════════════════════════════
--  VYRA · Cupones gestionables desde el admin
--  Supabase → SQL Editor → New query → pega esto → Run
-- ════════════════════════════════════════════════════════════

create table if not exists public.coupons (
  id          bigint generated always as identity primary key,
  created_at  timestamptz default now(),
  code        text not null unique,
  percent     int not null check (percent between 1 and 90)
);

alter table public.coupons enable row level security;

create policy "coupons select" on public.coupons for select to anon using (true);
create policy "coupons select auth" on public.coupons for select to authenticated using (true);
create policy "coupons insert" on public.coupons for insert to anon with check (true);
create policy "coupons insert auth" on public.coupons for insert to authenticated with check (true);
create policy "coupons delete" on public.coupons for delete to anon using (true);
create policy "coupons delete auth" on public.coupons for delete to authenticated using (true);

grant select, insert, delete on public.coupons to anon;
grant select, insert, delete on public.coupons to authenticated;

-- Cupones iniciales (los mismos de la ruleta)
insert into public.coupons (code, percent) values
  ('BIENVENIDA5', 5), ('VYRA8', 8), ('DROP10', 10)
on conflict (code) do nothing;

-- ✅ Listo. Ahora puedes crear y borrar cupones desde el panel admin.
