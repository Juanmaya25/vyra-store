-- ════════════════════════════════════════════════════════════
--  VYRA · Reseñas de clientes
--  Supabase → SQL Editor → New query → pega esto → Run
-- ════════════════════════════════════════════════════════════

create table if not exists public.reviews (
  id          bigint generated always as identity primary key,
  created_at  timestamptz default now(),
  product_id  text not null,
  author      text not null,
  rating      int not null check (rating between 1 and 5),
  text        text not null
);

alter table public.reviews enable row level security;

create policy "publico puede crear resenas"
  on public.reviews for insert to anon with check (true);

create policy "lectura de resenas"
  on public.reviews for select to anon using (true);

grant insert, select on public.reviews to anon;
grant insert, select on public.reviews to authenticated;

-- ✅ Listo. Los clientes ya pueden dejar reseñas en cada producto.
