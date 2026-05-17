"use client";

import { useEffect, useState } from "react";
import { Package, LogIn } from "lucide-react";
import { Nav, Footer, WhatsAppFloat, useCurrency } from "../ui";
import { useAuth } from "../auth";
import { fmt } from "../products";

export default function Cuenta() {
  const { user, ready, loginGoogle } = useAuth();
  const [cur] = useCurrency();
  const [orders, setOrders] = useState<any[] | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const { supabase } = await import("../supabase");
        const { data } = await supabase
          .from("orders")
          .select("*")
          .eq("email", user.email)
          .order("created_at", { ascending: false });
        setOrders(data ?? []);
      } catch { setOrders([]); }
    })();
  }, [user]);

  const estadoColor: Record<string, string> = {
    Procesando: "text-[#FFB84D] bg-[#FFB84D]/10",
    Enviado: "text-[#C6FF3D] bg-[#C6FF3D]/10",
    Entregado: "text-[#7B5CFF] bg-[#7B5CFF]/10",
  };

  return (
    <div className="relative min-h-screen">
      <div className="aurora" /><div className="grain" />
      <Nav base="../" />
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {!ready && <p className="text-white/45 font-mono text-sm">Cargando...</p>}

        {ready && !user && (
          <div className="glass rounded-3xl p-12 text-center">
            <LogIn size={40} className="text-[#C6FF3D] mx-auto mb-4" />
            <h1 className="font-display font-black text-2xl mb-2">Inicia sesión</h1>
            <p className="text-white/50 mb-7">Entra con Google para ver el historial de tus pedidos.</p>
            <button onClick={loginGoogle} className="btn-lime px-8 py-3.5 rounded-full">Entrar con Google</button>
          </div>
        )}

        {ready && user && (
          <>
            <div className="flex items-center gap-4 mb-10">
              {user.avatar
                ? <img src={user.avatar} alt="" className="w-14 h-14 rounded-full" />
                : <span className="w-14 h-14 rounded-full bg-[#C6FF3D] text-[#0A0A0F] flex items-center justify-center text-xl font-bold">{user.name[0]?.toUpperCase()}</span>}
              <div>
                <h1 className="font-display font-black text-2xl">Hola, {user.name.split(" ")[0]}</h1>
                <p className="text-white/45 text-sm">{user.email}</p>
              </div>
            </div>

            <h2 className="font-display font-bold text-lg mb-4">Mis pedidos</h2>

            {orders === null && <p className="text-white/45 font-mono text-sm">Cargando pedidos...</p>}
            {orders?.length === 0 && (
              <div className="glass rounded-3xl p-12 text-center">
                <Package size={36} className="text-white/20 mx-auto mb-4" />
                <p className="text-white/45">Aún no tienes pedidos.</p>
                <a href="../" className="btn-lime inline-block px-7 py-3 rounded-full mt-6">Ir a comprar</a>
              </div>
            )}

            <div className="space-y-4">
              {(orders ?? []).map((o) => (
                <div key={o.id} className="glass rounded-2xl p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div>
                      <span className="font-mono text-[#C6FF3D]">#VY-{o.id}</span>
                      <span className="text-white/40 text-xs ml-3">{new Date(o.created_at).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${estadoColor[o.estado] ?? "text-white/60 bg-white/5"}`}>{o.estado}</span>
                  </div>
                  <div className="space-y-1.5">
                    {(o.items ?? []).map((it: any, i: number) => (
                      <div key={i} className="flex justify-between text-sm text-white/65">
                        <span>{it.qty}× {it.name} <span className="text-white/35">· {it.variant}</span></span>
                        <span className="font-mono">{fmt(it.priceUSD * it.qty, cur)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 pt-3 border-t border-[var(--line)]">
                    <span className="text-white/55 text-sm">Total</span>
                    <span className="font-display font-bold">{fmt(Number(o.total_usd), cur)}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer base="../" />
      <WhatsAppFloat />
    </div>
  );
}
