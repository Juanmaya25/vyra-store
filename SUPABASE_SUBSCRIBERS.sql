-- ════════════════════════════════════════════════════════════
--  VYRA · Tabla de suscriptores (correos para publicidad)
--  Supabase → SQL Editor → New query → pega esto → Run
-- ════════════════════════════════════════════════════════════

create table if not exists public.subscribers (
  id          bigint generated always as identity primary key,
  created_at  timestamptz default now(),
  email       text not null unique,
  name        text,
  source      text not null default 'web'
);

alter table public.subscribers enable row level security;

-- Cualquiera puede suscribirse (insertar su correo)
create policy "publico puede suscribirse"
  on public.subscribers for insert
  to anon
  with check (true);

-- Permitir upsert (actualizar si el correo ya existe)
create policy "publico puede actualizar su suscripcion"
  on public.subscribers for update
  to anon
  using (true) with check (true);

-- Lectura (para el panel admin)
create policy "lectura de suscriptores"
  on public.subscribers for select
  to anon
  using (true);

-- Permisos a nivel de tabla (necesario porque desactivamos exposición automática)
grant insert, update, select on public.subscribers to anon;
grant insert, update, select on public.subscribers to authenticated;

-- ✅ Listo. Los correos de clientes y del newsletter se guardarán aquí.
