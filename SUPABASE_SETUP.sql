-- ════════════════════════════════════════════════════════════
--  VYRA · CONFIGURACIÓN COMPLETA DE BASE DE DATOS
--  Este es el ÚNICO archivo que necesitas ejecutar.
--  Supabase → SQL Editor → New query → pega TODO → Run.
--  Es seguro ejecutarlo varias veces (no da errores).
-- ════════════════════════════════════════════════════════════

-- ─────────────── 1. PEDIDOS ───────────────
create table if not exists public.orders (
  id          bigint generated always as identity primary key,
  created_at  timestamptz default now(),
  cliente     text not null,
  email       text not null,
  pais        text not null,
  items       jsonb not null,
  total_usd   numeric not null,
  estado      text not null default 'Procesando'
);
alter table public.orders add column if not exists coupon text;
alter table public.orders enable row level security;

drop policy if exists "orders_insert" on public.orders;
drop policy if exists "orders_select" on public.orders;
drop policy if exists "orders_update" on public.orders;
create policy "orders_insert" on public.orders for insert to anon, authenticated with check (true);
create policy "orders_select" on public.orders for select to anon, authenticated using (true);
create policy "orders_update" on public.orders for update to anon, authenticated using (true) with check (true);
grant select, insert, update on public.orders to anon, authenticated;

-- ─────────────── 2. SUSCRIPTORES ───────────────
create table if not exists public.subscribers (
  id          bigint generated always as identity primary key,
  created_at  timestamptz default now(),
  email       text not null unique,
  name        text,
  source      text not null default 'web'
);
alter table public.subscribers enable row level security;

drop policy if exists "subs_insert" on public.subscribers;
drop policy if exists "subs_select" on public.subscribers;
drop policy if exists "subs_update" on public.subscribers;
create policy "subs_insert" on public.subscribers for insert to anon, authenticated with check (true);
create policy "subs_select" on public.subscribers for select to anon, authenticated using (true);
create policy "subs_update" on public.subscribers for update to anon, authenticated using (true) with check (true);
grant select, insert, update on public.subscribers to anon, authenticated;

-- ─────────────── 3. RESEÑAS ───────────────
create table if not exists public.reviews (
  id          bigint generated always as identity primary key,
  created_at  timestamptz default now(),
  product_id  text not null,
  author      text not null,
  rating      int not null check (rating between 1 and 5),
  text        text not null
);
alter table public.reviews enable row level security;

drop policy if exists "reviews_insert" on public.reviews;
drop policy if exists "reviews_select" on public.reviews;
create policy "reviews_insert" on public.reviews for insert to anon, authenticated with check (true);
create policy "reviews_select" on public.reviews for select to anon, authenticated using (true);
grant select, insert on public.reviews to anon, authenticated;

-- ─────────────── 4. CUPONES ───────────────
create table if not exists public.coupons (
  id          bigint generated always as identity primary key,
  created_at  timestamptz default now(),
  code        text not null unique,
  percent     int not null check (percent between 1 and 90)
);
alter table public.coupons add column if not exists single_use boolean default false;
alter table public.coupons add column if not exists used boolean default false;
alter table public.coupons enable row level security;

drop policy if exists "coupons_select" on public.coupons;
drop policy if exists "coupons_insert" on public.coupons;
drop policy if exists "coupons_update" on public.coupons;
drop policy if exists "coupons_delete" on public.coupons;
create policy "coupons_select" on public.coupons for select to anon, authenticated using (true);
create policy "coupons_insert" on public.coupons for insert to anon, authenticated with check (true);
create policy "coupons_update" on public.coupons for update to anon, authenticated using (true) with check (true);
create policy "coupons_delete" on public.coupons for delete to anon, authenticated using (true);
grant select, insert, update, delete on public.coupons to anon, authenticated;

insert into public.coupons (code, percent) values
  ('BIENVENIDA5', 5), ('VYRA8', 8), ('DROP10', 10)
on conflict (code) do nothing;

-- ✅ LISTO. Todo el backend de VYRA queda configurado correctamente:
--    pedidos · suscriptores · reseñas · cupones (con ruleta de 1 solo uso).
