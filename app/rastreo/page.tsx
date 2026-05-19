"use client";

import { useState } from "react";
import { PackageSearch, Check } from "lucide-react";
import { Nav, Footer, WhatsAppFloat } from "../ui";
import type { OrderRow } from "../supabase";

type OrderItem = { name: string; qty: number; variant: string; priceUSD: number };

const STEPS = ["Procesando", "Enviado", "Entregado"];

export default function Rastreo() {
  const [id, setId] = useState("");
  const [order, setOrder] = useState<OrderRow | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "notfound">("idle");

  async function track(e: React.FormEvent) {
    e.preventDefault();
    const num = id.replace(/[^0-9]/g, "");
    if (!num) return;
    setState("loading");
    setOrder(null);
    try {
      const { supabase } = await import("../supabase");
      const { data } = await supabase.from("orders").select("*").eq("id", Number(num)).single();
      if (data) { setOrder(data as OrderRow); setState("idle"); }
      else setState("notfound");
    } catch { setState("notfound"); }
  }

  const stepIdx = order ? STEPS.indexOf(order.estado) : -1;

  return (
    <div className="relative min-h-screen">
      <div className="aurora" /><div className="grain" />
      <Nav base="../" />
      <main className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-3">
          <PackageSearch size={26} className="text-[#15B968]" />
          <h1 className="font-display font-black text-3xl">Rastrea tu pedido</h1>
        </div>
        <p className="text-[#14201A]/50 mb-8">Ingresa tu número de pedido (ej: <span className="font-mono">VY-1</span>) para ver el estado.</p>

        <form onSubmit={track} className="flex gap-3 mb-10">
          <input value={id} onChange={(e) => setId(e.target.value)} placeholder="VY-1"
            className="flex-1 glass rounded-xl px-4 py-3 text-sm outline-none focus:border-[#15B968]" />
          <button className="btn-lime px-7 py-3 rounded-xl">Rastrear</button>
        </form>

        {state === "loading" && <p className="text-[#14201A]/45 font-mono text-sm">Buscando...</p>}
        {state === "notfound" && (
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-[#14201A]/55">No encontramos ese pedido. Revisa el número o escríbenos por WhatsApp.</p>
          </div>
        )}

        {order && (
          <div className="glass rounded-3xl p-7">
            <div className="flex items-center justify-between mb-7">
              <div>
                <p className="font-mono text-[#15B968] font-bold">#VY-{order.id}</p>
                <p className="text-[#14201A]/50 text-sm mt-0.5">{order.cliente} · {order.pais}</p>
              </div>
              <span className="text-[#14201A]/40 text-xs font-mono">
                {order.created_at ? new Date(order.created_at).toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" }) : ""}
              </span>
            </div>

            {order.estado === "Cancelado" ? (
              <p className="text-[#E0457E] font-display font-bold">Pedido cancelado</p>
            ) : (
              <div className="flex items-center justify-between relative">
                <div className="absolute top-4 left-6 right-6 h-0.5 bg-[var(--line)]" />
                <div className="absolute top-4 left-6 h-0.5 bg-[#15B968] transition-all"
                  style={{ width: `${(stepIdx / (STEPS.length - 1)) * 85}%` }} />
                {STEPS.map((s, i) => (
                  <div key={s} className="relative z-10 flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i <= stepIdx ? "bg-[#15B968] text-[#06120B]" : "glass text-[#14201A]/30"}`}>
                      {i <= stepIdx ? <Check size={16} /> : i + 1}
                    </div>
                    <span className={`text-xs font-medium ${i <= stepIdx ? "text-[#15B968]" : "text-[#14201A]/40"}`}>{s}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-7 pt-5 border-t border-[var(--line)] space-y-1.5">
              {((order.items ?? []) as OrderItem[]).map((it, i) => (
                <div key={i} className="flex justify-between text-sm text-[#14201A]/65">
                  <span>{it.qty}× {it.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer base="../" />
      <WhatsAppFloat />
    </div>
  );
}
