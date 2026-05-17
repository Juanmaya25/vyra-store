-- ════════════════════════════════════════════════════════════
--  VYRA · Permitir actualizar el estado de pedidos desde el admin
--  Supabase → SQL Editor → New query → pega esto → Run
-- ════════════════════════════════════════════════════════════

create policy "admin puede actualizar pedidos"
  on public.orders for update
  to anon
  using (true) with check (true);

grant update on public.orders to anon;
grant update on public.orders to authenticated;

-- ✅ Listo. Ahora puedes cambiar el estado (Procesando/Enviado/
--    Entregado) de cada pedido desde el panel admin.
