-- ════════════════════════════════════════════════════════════
--  VYRA · Esquema de base de datos
--  Cópialo y pégalo en: Supabase → SQL Editor → New query → Run
-- ════════════════════════════════════════════════════════════

-- Tabla de pedidos
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

-- Activar Row Level Security
alter table public.orders enable row level security;

-- Política: cualquiera puede CREAR un pedido (checkout desde el navegador)
create policy "público puede crear pedidos"
  on public.orders for insert
  to anon
  with check (true);

-- Política: cualquiera puede LEER pedidos (para el panel admin demo)
-- ⚠️ En producción real esto se debe restringir a usuarios autenticados.
create policy "lectura de pedidos"
  on public.orders for select
  to anon
  using (true);

-- ✅ Listo. La tienda ya puede guardar pedidos reales
--    y el panel admin los mostrará automáticamente.
