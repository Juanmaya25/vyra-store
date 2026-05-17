"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingBag, X, Plus, Minus, ChevronRight, MessageCircle } from "lucide-react";
import { useCart } from "./cart";
import { fmt } from "./products";

const WHATSAPP = "573192859483";

export type Currency = "USD" | "COP";

export function useCurrency(): [Currency, (c: Currency) => void] {
  const [cur, setCur] = useState<Currency>("COP");
  useEffect(() => {
    const v = (localStorage.getItem("vyra_cur") as Currency) || "COP";
    setCur(v);
    const sync = () => setCur((localStorage.getItem("vyra_cur") as Currency) || "COP");
    window.addEventListener("vyra_cur_change", sync);
    return () => window.removeEventListener("vyra_cur_change", sync);
  }, []);
  const set = (c: Currency) => { localStorage.setItem("vyra_cur", c); window.dispatchEvent(new Event("vyra_cur_change")); };
  return [cur, set];
}

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size}
          className={i <= Math.round(value) ? "fill-[#C6FF3D] text-[#C6FF3D]" : "text-white/15"} />
      ))}
    </div>
  );
}

export function WhatsAppFloat() {
  return (
    <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola VYRA, tengo una pregunta sobre un producto.")}`}
      target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group" aria-label="WhatsApp">
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-2xl group-hover:scale-110 transition-transform">
        <MessageCircle size={26} className="text-white" />
      </span>
    </a>
  );
}

export function Nav({ base = "" }: { base?: string }) {
  const { count } = useCart();
  const [cur, setCur] = useCurrency();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative z-30 bg-[#C6FF3D] text-[#0A0A0F] py-2 overflow-hidden text-xs font-mono font-bold uppercase tracking-wider">
        <div className="flex whitespace-nowrap marquee">
          {Array(2).fill(0).map((_, k) => (
            <div key={k} className="flex shrink-0">
              {["Envío gratis desde $50", "Garantía VYRA 30 días", "Colombia + USA", "Pago contra entrega", "Productos curados 2026"].map((t) => (
                <span key={t} className="flex items-center px-6">{t}<span className="ml-6 w-1.5 h-1.5 rounded-full bg-[#0A0A0F]" /></span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <nav className="relative z-30 sticky top-0">
        <div className="glass border-b border-[var(--line)]">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href={base + "./"} className="font-display font-black text-2xl tracking-tight">
              VY<span className="text-[#C6FF3D]">R</span>A
            </a>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href={base + "./#catalogo"} className="navx text-white/80 hover:text-white">Catálogo</a>
              <a href={base + "./#confianza"} className="navx text-white/80 hover:text-white">Garantía</a>
              <a href={base + "./envios/"} className="navx text-white/80 hover:text-white">Envíos</a>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex rounded-full border border-[var(--line)] overflow-hidden text-xs font-mono">
                {(["COP", "USD"] as Currency[]).map((c) => (
                  <button key={c} onClick={() => setCur(c)}
                    className={`px-3 py-1.5 transition-colors ${cur === c ? "bg-[#C6FF3D] text-[#0A0A0F] font-bold" : "text-white/60 hover:text-white"}`}>
                    {c}
                  </button>
                ))}
              </div>
              <button onClick={() => setOpen(true)} className="relative p-2 rounded-full hover:bg-white/5 transition-colors">
                <ShoppingBag size={20} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#C6FF3D] text-[#0A0A0F] text-[10px] font-bold flex items-center justify-center">{count}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lines, changeQty, count, total } = useCart();
  const [cur] = useCurrency();
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div className="absolute right-0 top-0 h-full w-full max-w-md glass border-l border-[var(--line)] flex flex-col"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}>
            <div className="flex items-center justify-between p-6 border-b border-[var(--line)]">
              <p className="font-display font-bold text-lg">Tu carrito ({count})</p>
              <button onClick={onClose} className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/10"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {lines.length === 0 && (
                <div className="text-center py-20">
                  <ShoppingBag size={40} className="mx-auto text-white/20 mb-4" />
                  <p className="text-white/45">Tu carrito está vacío</p>
                </div>
              )}
              {lines.map((l, i) => (
                <div key={i} className="flex gap-4 glass rounded-2xl p-3">
                  <img src={l.image} alt="" className="w-20 h-20 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-sm leading-tight">{l.name}</p>
                    <p className="text-white/40 text-xs mt-0.5">{l.variant}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button onClick={() => changeQty(i, -1)} className="w-6 h-6 rounded-full glass flex items-center justify-center"><Minus size={12} /></button>
                        <span className="font-mono text-sm w-5 text-center">{l.qty}</span>
                        <button onClick={() => changeQty(i, 1)} className="w-6 h-6 rounded-full glass flex items-center justify-center"><Plus size={12} /></button>
                      </div>
                      <span className="font-mono text-sm text-[#C6FF3D]">{fmt(l.priceUSD * l.qty, cur)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {lines.length > 0 && (
              <div className="p-6 border-t border-[var(--line)]">
                <div className="flex justify-between mb-4">
                  <span className="text-white/55">Total</span>
                  <span className="font-display font-black text-2xl">{fmt(total, cur)}</span>
                </div>
                <button className="btn-lime w-full py-4 rounded-2xl flex items-center justify-center gap-2">
                  Finalizar compra <ChevronRight size={18} />
                </button>
                <p className="text-center text-white/35 text-xs mt-3 font-mono">Pago seguro · Wompi · Stripe · Contra entrega</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Footer({ base = "" }: { base?: string }) {
  return (
    <footer className="relative z-10 border-t border-[var(--line)] mt-10">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <p className="font-display font-black text-3xl mb-3">VY<span className="text-[#C6FF3D]">R</span>A</p>
            <p className="text-white/45 text-sm max-w-xs leading-relaxed">El futuro, a tu puerta. Tecnología y moda curada para Colombia y Estados Unidos.</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#C6FF3D] mb-4">Tienda</p>
            <ul className="space-y-2.5">
              <li><a href={base + "./#catalogo"} className="text-white/55 text-sm hover:text-white">Catálogo</a></li>
              <li><a href={base + "./envios/"} className="text-white/55 text-sm hover:text-white">Envíos</a></li>
              <li><a href={base + "./devoluciones/"} className="text-white/55 text-sm hover:text-white">Devoluciones</a></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#C6FF3D] mb-4">Legal</p>
            <ul className="space-y-2.5">
              <li><a href={base + "./terminos/"} className="text-white/55 text-sm hover:text-white">Términos</a></li>
              <li><a href={base + "./privacidad/"} className="text-white/55 text-sm hover:text-white">Privacidad</a></li>
              <li><a href={base + "./admin/"} className="text-white/55 text-sm hover:text-white">Panel admin</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-[var(--line)]">
          <p className="text-white/35 text-xs font-mono">© 2026 VYRA · Todos los derechos reservados</p>
          <p className="text-white/35 text-xs font-mono">Hecho con visión de futuro</p>
        </div>
      </div>
    </footer>
  );
}

export function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="aurora" /><div className="grain" />
      <Nav base="../" />
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <a href="../" className="text-white/45 text-sm font-mono hover:text-[#C6FF3D]">← Volver a la tienda</a>
        <h1 className="font-display font-black text-4xl mt-6 mb-8">{title}</h1>
        <div className="space-y-5 text-white/60 leading-relaxed text-sm">{children}</div>
      </main>
      <Footer base="../" />
      <WhatsAppFloat />
    </div>
  );
}
