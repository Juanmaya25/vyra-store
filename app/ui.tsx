"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingBag, X, Plus, Minus, ChevronRight, MessageCircle, Globe, Check, LogOut, Package, Heart, ArrowUp } from "lucide-react";
import { useCart, useWishlist, useRecent } from "./cart";
import { PRODUCTS } from "./products";
import { useAuth } from "./auth";
import { fmt, CURRENCIES, type CurrencyCode } from "./products";

const WHATSAPP = "573192859483";

export type Currency = CurrencyCode;

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

function CurrencyPicker() {
  const [cur, setCur] = useCurrency();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-mono hover:border-[#15B968] transition-colors">
        <Globe size={13} className="text-[#15B968]" />
        {CURRENCIES[cur].flag} {cur}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 z-50 glass rounded-2xl p-2 w-44 max-h-72 overflow-y-auto">
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
              <button key={c} onClick={() => { setCur(c); setOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${cur === c ? "bg-[#15B968]/15 text-[#15B968]" : "hover:bg-black/5 text-[#14201A]/70"}`}>
                <span>{CURRENCIES[c].flag} {CURRENCIES[c].label}</span>
                {cur === c ? <Check size={14} /> : <span className="font-mono text-xs text-[#14201A]/40">{c}</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size}
          className={i <= Math.round(value) ? "fill-[#15B968] text-[#15B968]" : "text-[#14201A]/15"} />
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
        <MessageCircle size={26} className="text-[#14201A]" />
      </span>
    </a>
  );
}

function Account() {
  const { user, loginGoogle, logout } = useAuth();
  const [menu, setMenu] = useState(false);
  if (!user) {
    return (
      <button onClick={loginGoogle}
        className="hidden sm:flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-medium hover:border-[#15B968] transition-colors">
        <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#15B968" d="M21.35 11.1h-9.17v2.99h5.27c-.23 1.49-1.64 4.37-5.27 4.37-3.17 0-5.76-2.62-5.76-5.86s2.59-5.86 5.76-5.86c1.81 0 3.02.77 3.71 1.43l2.53-2.44C16.46 3.94 14.43 3 12.18 3 7.03 3 2.86 7.17 2.86 12.6S7.03 22.2 12.18 22.2c5.95 0 9.88-4.18 9.88-10.06 0-.68-.07-1.2-.71-1.04Z"/></svg>
        Entrar
      </button>
    );
  }
  return (
    <div className="relative">
      <button onClick={() => setMenu(!menu)} className="flex items-center gap-2 rounded-full glass px-2 py-1.5">
        {user.avatar
          ? <img src={user.avatar} alt="" className="w-6 h-6 rounded-full" />
          : <span className="w-6 h-6 rounded-full bg-[#15B968] text-[#06120B] flex items-center justify-center text-xs font-bold">{user.name[0]?.toUpperCase()}</span>}
        <span className="hidden sm:block text-xs font-medium max-w-[90px] truncate">{user.name}</span>
      </button>
      {menu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setMenu(false)} />
          <div className="absolute right-0 mt-2 z-50 glass rounded-2xl p-2 w-52">
            <div className="px-3 py-2 border-b border-[var(--line)] mb-1">
              <p className="text-xs text-[#14201A]/40">Sesión iniciada</p>
              <p className="text-sm truncate">{user.email}</p>
            </div>
            <a href="/vyra-store/cuenta/" className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#14201A]/70 hover:bg-black/5">
              <Package size={14} /> Mis pedidos
            </a>
            <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#14201A]/70 hover:bg-black/5">
              <LogOut size={14} /> Cerrar sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function Nav({ base = "" }: { base?: string }) {
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative z-30 bg-[#15B968] text-[#06120B] py-2 overflow-hidden text-xs font-mono font-bold uppercase tracking-wider">
        <div className="flex whitespace-nowrap marquee">
          {Array(2).fill(0).map((_, k) => (
            <div key={k} className="flex shrink-0">
              {["Envío gratis desde $120", "Garantía VYRA 30 días", "Colombia + USA", "Pago contra entrega", "Productos curados 2026"].map((t) => (
                <span key={t} className="flex items-center px-6">{t}<span className="ml-6 w-1.5 h-1.5 rounded-full bg-[#06120B]" /></span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <nav className="relative z-30 sticky top-0">
        <div className="glass border-b border-[var(--line)]">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href={base + "./"} className="font-display font-black text-2xl tracking-tight">
              VY<span className="text-[#15B968]">R</span>A
            </a>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href={base + "./#catalogo"} className="navx text-[#14201A]/80 hover:text-[#14201A]">Catálogo</a>
              <a href={base + "./#confianza"} className="navx text-[#14201A]/80 hover:text-[#14201A]">Garantía</a>
              <a href={base + "./envios/"} className="navx text-[#14201A]/80 hover:text-[#14201A]">Envíos</a>
            </div>
            <div className="flex items-center gap-3">
              <Account />
              <CurrencyPicker />
              <a href="/vyra-store/favoritos/" aria-label="Favoritos" className="relative p-2 rounded-full hover:bg-black/5 transition-colors">
                <Heart size={20} />
                {wishCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#E0457E] text-white text-[10px] font-bold flex items-center justify-center">{wishCount}</span>
                )}
              </a>
              <button onClick={() => setOpen(true)} className="relative p-2 rounded-full hover:bg-black/5 transition-colors">
                <ShoppingBag size={20} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#15B968] text-[#06120B] text-[10px] font-bold flex items-center justify-center">{count}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
      <CookieConsent />
      <SpinWheel />
    </>
  );
}

const SPIN_PRIZES = [
  { label: "5% OFF", code: "BIENVENIDA5", color: "#15B968" },
  { label: "Sigue", code: "", color: "#0B3D2A" },
  { label: "8% OFF", code: "VYRA8", color: "#0FA88A" },
  { label: "Envío gratis", code: "DROP10", color: "#0B3D2A" },
  { label: "10% OFF", code: "DROP10", color: "#15B968" },
  { label: "Casi...", code: "", color: "#0FA88A" },
];
const SEG = 360 / SPIN_PRIZES.length;

function slicePath(i: number) {
  const a0 = ((i * SEG - 90) * Math.PI) / 180;
  const a1 = (((i + 1) * SEG - 90) * Math.PI) / 180;
  const x0 = 100 + 100 * Math.cos(a0), y0 = 100 + 100 * Math.sin(a0);
  const x1 = 100 + 100 * Math.cos(a1), y1 = 100 + 100 * Math.sin(a1);
  return `M100,100 L${x0},${y0} A100,100 0 0,1 ${x1},${y1} Z`;
}

function SpinWheel() {
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [rot, setRot] = useState(0);
  const [result, setResult] = useState<{ label: string; code: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [pieces, setPieces] = useState<{ left: string; bg: string; delay: string; dur: string; w: string; h: string }[]>([]);
  const [done, setDone] = useState(true);

  useEffect(() => {
    const spun = !!localStorage.getItem("vyra_spin_v2");
    setDone(spun);
    if (!spun && !sessionStorage.getItem("vyra_spin_seen")) {
      const t = setTimeout(() => { setOpen(true); sessionStorage.setItem("vyra_spin_seen", "1"); }, 8000);
      return () => clearTimeout(t);
    }
  }, []);

  function close() { setOpen(false); }

  function spin() {
    if (spinning || result) return;
    setSpinning(true);
    const idx = Math.floor(Math.random() * SPIN_PRIZES.length);
    const target = 360 * 7 + (360 - idx * SEG - SEG / 2);
    setRot(target);
    setTimeout(() => {
      setSpinning(false);
      setResult(SPIN_PRIZES[idx]);
      localStorage.setItem("vyra_spin_v2", "1");
      setDone(true);
      if (SPIN_PRIZES[idx].code) {
        const cols = ["#15B968", "#0FA88A", "#E0457E", "#FFB84D", "#14201A"];
        setPieces(Array.from({ length: 60 }).map((_, i) => ({
          left: `${Math.random() * 100}%`,
          bg: cols[i % 5],
          delay: `${Math.random() * 0.6}s`,
          dur: `${2.4 + Math.random() * 1.6}s`,
          w: `${6 + Math.random() * 6}px`,
          h: `${10 + Math.random() * 8}px`,
        })));
        setTimeout(() => setPieces([]), 4000);
      }
    }, 5200);
  }

  if (!open) {
    if (done) return null;
    return (
      <button onClick={() => setOpen(true)} aria-label="Gira y gana"
        className="fixed left-4 bottom-24 sm:bottom-28 z-40 group flex items-center gap-3">
        <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#15B968] shadow-2xl pulse-ring">
          <span className="absolute inset-0 rounded-full bg-[#15B968] animate-ping opacity-30" />
          <span className="text-3xl spin-slow">🎡</span>
          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#E0457E] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">1</span>
        </span>
        <span className="glass rounded-full px-4 py-2 text-sm font-bold shadow-lg whitespace-nowrap hidden sm:block group-hover:scale-105 transition-transform">
          🎁 ¡Tienes 1 giro <span className="text-[#15B968]">gratis</span>!
        </span>
      </button>
    );
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={close} />

      {pieces.length > 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {pieces.map((p, i) => (
            <span key={i} className="confetti-piece"
              style={{ left: p.left, background: p.bg, animationDelay: p.delay, animationDuration: p.dur, width: p.w, height: p.h }} />
          ))}
        </div>
      )}

      <div className="relative glass rounded-[2rem] p-8 sm:p-10 max-w-md w-full text-center">
        <button onClick={close} className="absolute top-5 right-5 w-9 h-9 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"><X size={17} /></button>

        <div className="inline-flex items-center gap-2 bg-[#15B968]/12 text-[#15B968] rounded-full px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest mb-3">
          🎁 Solo hoy
        </div>
        <h2 className="font-display font-black text-3xl leading-tight">Gira y <span className="grad">gana</span></h2>
        <p className="text-[#14201A]/50 text-sm mt-2 mb-7">Tienes <strong>1 giro gratis</strong>. ¡La suerte está echada!</p>

        <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto mb-8">
          {/* Pointer */}
          <div className="absolute left-1/2 -top-1 -translate-x-1/2 z-20"
            style={{ filter: "drop-shadow(0 3px 4px rgba(0,0,0,0.3))" }}>
            <div style={{ width: 0, height: 0, borderLeft: "14px solid transparent", borderRight: "14px solid transparent", borderTop: "26px solid #14201A" }} />
          </div>

          <div className="absolute inset-0 rounded-full"
            style={{ boxShadow: "0 0 0 10px #fff, 0 0 0 14px #15B968, 0 24px 60px -12px rgba(21,185,104,0.55)" }}>
            <svg viewBox="0 0 200 200" className="w-full h-full"
              style={{ transform: `rotate(${rot}deg)`, transition: spinning ? "transform 5s cubic-bezier(0.12,0.7,0.12,1)" : "none" }}>
              {SPIN_PRIZES.map((p, i) => {
                const mid = ((i * SEG + SEG / 2 - 90) * Math.PI) / 180;
                const tx = 100 + 60 * Math.cos(mid), ty = 100 + 60 * Math.sin(mid);
                return (
                  <g key={i}>
                    <path d={slicePath(i)} fill={p.color} stroke="#ffffff" strokeWidth="1.5" />
                    <text x={tx} y={ty} fill="#ffffff" fontSize="9.5" fontWeight="800"
                      textAnchor="middle" dominantBaseline="middle"
                      transform={`rotate(${i * SEG + SEG / 2}, ${tx}, ${ty})`}>
                      {p.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Hub */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-[#15B968]">
              <span className="font-display font-black text-[#15B968] text-lg">VY</span>
            </div>
          </div>
        </div>

        {!result ? (
          <button onClick={spin} disabled={spinning}
            className="btn-lime w-full py-4 rounded-full text-lg disabled:opacity-60 pulse-ring">
            {spinning ? "Girando..." : "🎰 ¡GIRAR AHORA!"}
          </button>
        ) : result.code ? (
          <div className="space-y-3">
            <p className="font-display font-black text-2xl text-[#15B968]">🎉 ¡Ganaste {result.label}!</p>
            <p className="text-[#14201A]/55 text-sm">Copia tu código y úsalo en el carrito:</p>
            <button onClick={() => { navigator.clipboard?.writeText(result.code); setCopied(true); }}
              className="w-full glass rounded-xl py-4 font-mono font-bold text-[#15B968] border-2 border-dashed border-[#15B968] text-lg hover:bg-[#15B968]/5 transition-colors">
              {result.code} {copied ? "✓ copiado" : "· toca para copiar"}
            </button>
            <button onClick={close} className="text-[#14201A]/45 text-sm hover:text-[#14201A]">Seguir comprando →</button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="font-display font-black text-xl">¡Casi! 😅</p>
            <p className="text-[#14201A]/55 text-sm">Esta vez no ganaste, pero igual te regalamos <span className="text-[#15B968] font-mono font-bold">BIENVENIDA5</span></p>
            <button onClick={close} className="btn-ghost px-6 py-2.5 rounded-full text-sm mt-2">Entendido</button>
          </div>
        )}
      </div>
    </div>
  );
}

function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("vyra_cookies")) setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-sm z-50 glass rounded-2xl p-5">
      <p className="text-sm text-[#14201A]/70 leading-relaxed">
        Usamos almacenamiento local para recordar tu carrito y preferencias. Al continuar aceptas nuestra{" "}
        <a href="/vyra-store/privacidad/" className="text-[#15B968] underline">política de privacidad</a>.
      </p>
      <div className="flex gap-2 mt-3">
        <button onClick={() => { localStorage.setItem("vyra_cookies", "1"); setShow(false); }}
          className="btn-lime px-4 py-2 rounded-lg text-sm flex-1">Aceptar</button>
        <a href="/vyra-store/privacidad/" className="btn-ghost px-4 py-2 rounded-lg text-sm">Más info</a>
      </div>
    </div>
  );
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lines, changeQty, count, total, clear } = useCart();
  const [cur] = useCurrency();
  const { user } = useAuth();
  const [step, setStep] = useState<"cart" | "checkout" | "done">("cart");
  const [form, setForm] = useState({ cliente: "", email: "", pais: "Colombia" });
  const [promo, setPromo] = useState(true);
  const [sending, setSending] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<{ code: string; pct: number } | null>(null);
  const [couponErr, setCouponErr] = useState(false);

  const COUPONS: Record<string, number> = { BIENVENIDA5: 5, VYRA8: 8, DROP10: 10 };
  const discount = applied ? total * (applied.pct / 100) : 0;
  const finalTotal = total - discount;

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) { setApplied({ code, pct: COUPONS[code] }); setCouponErr(false); }
    else { setApplied(null); setCouponErr(true); }
  }

  useEffect(() => {
    if (user) setForm((f) => ({ ...f, cliente: f.cliente || user.name, email: f.email || user.email }));
  }, [user]);

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const { supabase, addSubscriber } = await import("./supabase");
      const { data, error } = await supabase.from("orders").insert({
        cliente: form.cliente,
        email: form.email,
        pais: form.pais,
        items: lines.map((l) => ({ name: l.name, qty: l.qty, variant: l.variant, priceUSD: l.priceUSD })),
        total_usd: finalTotal,
        estado: "Procesando",
        coupon: applied?.code ?? null,
      }).select("id").single();
      if (error) throw error;
      if (promo) await addSubscriber(form.email, "checkout", form.cliente);
      setOrderId(data?.id ?? null);
      clear();
      setStep("done");
    } catch {
      alert("No se pudo registrar el pedido. Revisa que el esquema SQL se haya ejecutado en Supabase.");
    } finally {
      setSending(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div className="absolute right-0 top-0 h-full w-full max-w-md glass border-l border-[var(--line)] flex flex-col"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}>
            <div className="flex items-center justify-between p-6 border-b border-[var(--line)]">
              <p className="font-display font-bold text-lg">
                {step === "cart" && `Tu carrito (${count})`}
                {step === "checkout" && "Tus datos"}
                {step === "done" && "¡Pedido confirmado!"}
              </p>
              <button onClick={() => { onClose(); setStep("cart"); }} className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-black/10"><X size={18} /></button>
            </div>

            {step === "done" && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#15B968]/15 flex items-center justify-center mb-5">
                  <Check size={30} className="text-[#15B968]" />
                </div>
                <p className="font-display font-black text-xl">¡Gracias por tu compra!</p>
                <p className="text-[#14201A]/50 text-sm mt-2">Tu pedido <span className="text-[#15B968] font-mono">#VY-{orderId}</span> fue registrado. Te contactaremos por correo para coordinar el pago y envío.</p>
                <button onClick={() => { onClose(); setStep("cart"); }} className="btn-ghost px-6 py-3 rounded-full mt-7">Seguir comprando</button>
              </div>
            )}

            {step === "checkout" && (
              <form onSubmit={placeOrder} className="flex-1 overflow-y-auto p-6 space-y-4">
                <button type="button" onClick={() => setStep("cart")} className="text-[#14201A]/45 text-sm font-mono hover:text-[#15B968]">← Volver al carrito</button>
                {[
                  { k: "cliente", label: "Nombre completo", type: "text", ph: "Juan García" },
                  { k: "email", label: "Correo electrónico", type: "email", ph: "juan@correo.com" },
                ].map((f) => (
                  <div key={f.k}>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#14201A]/40 mb-1.5">{f.label}</label>
                    <input type={f.type} required value={form[f.k as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                      placeholder={f.ph}
                      className="w-full glass rounded-xl px-4 py-3 text-sm outline-none focus:border-[#15B968]" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#14201A]/40 mb-1.5">País</label>
                  <select value={form.pais} onChange={(e) => setForm({ ...form, pais: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-3 text-sm outline-none focus:border-[#15B968]">
                    {["Colombia", "USA", "México", "España", "Chile", "Perú", "Argentina", "Brasil"].map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <label className="flex items-start gap-3 glass rounded-xl p-4 cursor-pointer">
                  <input type="checkbox" checked={promo} onChange={(e) => setPromo(e.target.checked)}
                    className="mt-0.5 accent-[#15B968] w-4 h-4" />
                  <span className="text-xs text-[#14201A]/55 leading-relaxed">
                    Quiero recibir <span className="text-[#15B968]">ofertas exclusivas y novedades</span> de VYRA por correo. Puedo cancelar cuando quiera.
                  </span>
                </label>
                <div className="glass rounded-xl p-4 flex justify-between text-sm">
                  <span className="text-[#14201A]/55">Total a pagar {applied && <span className="text-[#15B968] text-xs">({applied.code})</span>}</span>
                  <span className="font-display font-bold">{fmt(finalTotal, cur)}</span>
                </div>
                <button type="submit" disabled={sending} className="btn-lime w-full py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-60">
                  {sending ? "Registrando..." : <>Confirmar pedido <ChevronRight size={18} /></>}
                </button>
                <p className="text-center text-[#14201A]/35 text-xs font-mono">Te contactaremos para coordinar el pago (Wompi · Stripe · contra entrega)</p>
              </form>
            )}

            {step === "cart" && (
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {lines.length === 0 && (
                <div className="text-center py-20">
                  <ShoppingBag size={40} className="mx-auto text-[#14201A]/20 mb-4" />
                  <p className="text-[#14201A]/45">Tu carrito está vacío</p>
                </div>
              )}
              {lines.length > 0 && (
                <div className="glass rounded-2xl p-4">
                  {total >= 120 ? (
                    <p className="text-sm text-[#15B968] font-medium flex items-center gap-2">🎉 ¡Tienes envío GRATIS!</p>
                  ) : (
                    <p className="text-sm text-[#14201A]/65">
                      Te faltan <span className="text-[#15B968] font-bold font-mono">{fmt(120 - total, cur)}</span> para <strong>envío gratis</strong>
                    </p>
                  )}
                  <div className="h-2 rounded-full bg-black/10 mt-2 overflow-hidden">
                    <div className="h-full bg-[#15B968] transition-all" style={{ width: `${Math.min(100, (total / 120) * 100)}%` }} />
                  </div>
                </div>
              )}
              {lines.map((l, i) => (
                <div key={i} className="flex gap-4 glass rounded-2xl p-3">
                  <img src={l.image} alt="" className="w-20 h-20 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-sm leading-tight">{l.name}</p>
                    <p className="text-[#14201A]/40 text-xs mt-0.5">{l.variant}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button onClick={() => changeQty(i, -1)} className="w-6 h-6 rounded-full glass flex items-center justify-center"><Minus size={12} /></button>
                        <span className="font-mono text-sm w-5 text-center">{l.qty}</span>
                        <button onClick={() => changeQty(i, 1)} className="w-6 h-6 rounded-full glass flex items-center justify-center"><Plus size={12} /></button>
                      </div>
                      <span className="font-mono text-sm text-[#15B968]">{fmt(l.priceUSD * l.qty, cur)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
            {step === "cart" && lines.length > 0 && (
              <div className="p-6 border-t border-[var(--line)]">
                <div className="flex gap-2 mb-4">
                  <input value={coupon} onChange={(e) => { setCoupon(e.target.value); setCouponErr(false); }}
                    placeholder="Código de descuento"
                    className="flex-1 glass rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#15B968] uppercase" />
                  <button onClick={applyCoupon} className="btn-ghost px-4 py-2.5 rounded-xl text-sm">Aplicar</button>
                </div>
                {couponErr && <p className="text-[#E0457E] text-xs mb-3 font-mono">Cupón inválido. Prueba: BIENVENIDA5</p>}
                {applied && (
                  <div className="flex justify-between text-sm mb-2 text-[#15B968]">
                    <span>Cupón {applied.code} (−{applied.pct}%)</span>
                    <span className="font-mono">−{fmt(discount, cur)}</span>
                  </div>
                )}
                <div className="flex justify-between mb-4">
                  <span className="text-[#14201A]/55">Total</span>
                  <span className="font-display font-black text-2xl">{fmt(finalTotal, cur)}</span>
                </div>
                <button onClick={() => setStep("checkout")} className="btn-lime w-full py-4 rounded-2xl flex items-center justify-center gap-2">
                  Finalizar compra <ChevronRight size={18} />
                </button>
                <p className="text-center text-[#14201A]/35 text-xs mt-3 font-mono">Pago seguro · Wompi · Stripe · Contra entrega</p>
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
            <p className="font-display font-black text-3xl mb-3">VY<span className="text-[#15B968]">R</span>A</p>
            <p className="text-[#14201A]/45 text-sm max-w-xs leading-relaxed">El futuro, a tu puerta. Tecnología y moda curada para Colombia y Estados Unidos.</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#15B968] mb-4">Tienda</p>
            <ul className="space-y-2.5">
              <li><a href={base + "./#catalogo"} className="text-[#14201A]/55 text-sm hover:text-[#14201A]">Catálogo</a></li>
              <li><a href={base + "./rastreo/"} className="text-[#14201A]/55 text-sm hover:text-[#14201A]">Rastrear pedido</a></li>
              <li><a href={base + "./envios/"} className="text-[#14201A]/55 text-sm hover:text-[#14201A]">Envíos</a></li>
              <li><a href={base + "./devoluciones/"} className="text-[#14201A]/55 text-sm hover:text-[#14201A]">Devoluciones</a></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#15B968] mb-4">Legal</p>
            <ul className="space-y-2.5">
              <li><a href={base + "./nosotros/"} className="text-[#14201A]/55 text-sm hover:text-[#14201A]">Sobre nosotros</a></li>
              <li><a href={base + "./contacto/"} className="text-[#14201A]/55 text-sm hover:text-[#14201A]">Contacto</a></li>
              <li><a href={base + "./terminos/"} className="text-[#14201A]/55 text-sm hover:text-[#14201A]">Términos</a></li>
              <li><a href={base + "./privacidad/"} className="text-[#14201A]/55 text-sm hover:text-[#14201A]">Privacidad</a></li>
              <li><a href={base + "./admin/"} className="text-[#14201A]/55 text-sm hover:text-[#14201A]">Panel admin</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-12 pt-8 border-t border-[var(--line)]">
          <span className="text-[#14201A]/35 text-xs font-mono mr-2">Pago 100% seguro:</span>
          {["VISA", "MASTERCARD", "PSE", "NEQUI", "PAYPAL", "STRIPE"].map((m) => (
            <span key={m} className="glass rounded-lg px-3 py-1.5 text-[10px] font-mono font-bold text-[#14201A]/60">{m}</span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <p className="text-[#14201A]/35 text-xs font-mono">© 2026 VYRA · Todos los derechos reservados</p>
          <p className="text-[#14201A]/35 text-xs font-mono">Envíos a 8 países · Hecho con visión de futuro</p>
        </div>
      </div>
    </footer>
  );
}

/* ── Social proof toasts ── */
const PROOF = [
  ["Camila", "Bogotá", "VYRA Aura Buds Pro"],
  ["Miguel", "Medellín", "VYRA Vortex Runner"],
  ["Sofía", "Ciudad de México", "VYRA Shadow Hoodie"],
  ["James", "Miami", "VYRA Pulse Smartwatch"],
  ["Lucía", "Cali", "VYRA Titan Bottle"],
  ["Mateo", "Santiago", "VYRA Nova Proyector"],
];
export function SocialProof() {
  const [show, setShow] = useState(false);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    let i = 0;
    const cycle = () => {
      setIdx(i % PROOF.length); i++;
      setShow(true);
      setTimeout(() => setShow(false), 4500);
    };
    const first = setTimeout(cycle, 6000);
    const iv = setInterval(cycle, 13000);
    return () => { clearTimeout(first); clearInterval(iv); };
  }, []);
  const [n, c, p] = PROOF[idx];
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
          className="fixed bottom-6 left-6 z-40 glass rounded-2xl p-4 pr-6 flex items-center gap-3 max-w-xs">
          <span className="w-9 h-9 rounded-full bg-[#15B968]/15 flex items-center justify-center text-lg">🛍️</span>
          <div>
            <p className="text-sm font-medium leading-tight"><strong>{n}</strong> de {c}</p>
            <p className="text-[#14201A]/50 text-xs mt-0.5">acaba de comprar {p}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── FAQ ── */
const FAQS = [
  ["¿A qué países envían?", "Enviamos a Colombia, USA, México, España, Chile, Perú, Argentina y Brasil, con seguimiento en tiempo real."],
  ["¿Cuánto tarda el envío?", "Colombia 3-7 días hábiles, internacional 7-14 días. Despacho dentro de las 48h tras confirmar el pedido."],
  ["¿Puedo pagar contra entrega?", "Sí, disponible en las principales ciudades de Colombia. Pagas en efectivo al recibir."],
  ["¿Tienen garantía?", "Sí, Garantía VYRA de 30 días. Si hay defecto de fábrica, cambiamos o devolvemos tu dinero."],
  ["¿Las reseñas son reales?", "Sí, importamos las calificaciones y reseñas reales verificadas de los productos."],
];
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative z-10 max-w-3xl mx-auto px-6 pb-24">
      <div className="text-center mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-[#15B968] mb-2">{"// Dudas"}</p>
        <h2 className="font-display font-black text-4xl">Preguntas frecuentes</h2>
      </div>
      <div className="space-y-3">
        {FAQS.map(([q, a], i) => (
          <div key={i} className="glass rounded-2xl overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
              <span className="font-medium">{q}</span>
              {open === i ? <Minus size={18} className="text-[#15B968] shrink-0" /> : <Plus size={18} className="text-[#15B968] shrink-0" />}
            </button>
            {open === i && <div className="px-5 pb-5 text-[#14201A]/55 text-sm leading-relaxed">{a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Newsletter ── */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
      <div className="glass rounded-3xl p-10 sm:p-14 text-center glow-lime">
        <h2 className="font-display font-black text-3xl sm:text-4xl mb-3">Sé el primero en el próximo drop</h2>
        <p className="text-[#14201A]/55 mb-7 max-w-md mx-auto">Suscríbete y recibe <span className="text-[#15B968] font-bold">5% de descuento</span> en tu primera compra + acceso anticipado.</p>
        {done ? (
          <p className="text-[#15B968] font-display font-bold flex items-center justify-center gap-2"><Check size={20} /> ¡Listo! Revisa tu correo.</p>
        ) : (
          <form onSubmit={async (e) => { e.preventDefault(); if (email) { const { addSubscriber } = await import("./supabase"); await addSubscriber(email, "newsletter"); setDone(true); } }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com"
              className="flex-1 glass rounded-full px-5 py-3.5 text-sm outline-none focus:border-[#15B968]" />
            <button className="btn-lime px-7 py-3.5 rounded-full whitespace-nowrap">Quiero mi 10%</button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ── Offer banner with countdown ── */
export function OfferBanner() {
  const [t, setT] = useState({ h: 5, m: 59, s: 59 });
  useEffect(() => {
    const iv = setInterval(() => {
      setT((p) => {
        let { h, m, s } = p;
        s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 5; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 pt-6">
      <div className="glass rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-l-4 border-[#15B968]">
        <p className="font-display font-bold text-sm sm:text-base">
          🔥 OFERTA FLASH · usa <span className="text-[#15B968] font-mono">BIENVENIDA5</span> y ahorra 5%
        </p>
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="text-[#14201A]/45">Termina en</span>
          {[t.h, t.m, t.s].map((n, i) => (
            <span key={i} className="bg-[#15B968] text-[#06120B] font-bold rounded-lg px-2 py-1">{pad(n)}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Back to top ── */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
      className="fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
      <ArrowUp size={18} className="text-[#15B968]" />
    </button>
  );
}

/* ── Recently viewed ── */
export function RecentlyViewed({ exclude, base = "" }: { exclude?: string; base?: string }) {
  const ids = useRecent();
  const items = PRODUCTS.filter((p) => ids.includes(p.id) && p.id !== exclude).slice(0, 4);
  const [cur] = useCurrency();
  if (items.length === 0) return null;
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
      <h2 className="font-display font-black text-2xl mb-5">Vistos recientemente</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((p) => (
          <a key={p.id} href={`${base}producto/${p.id}/`} className="pcard glass rounded-2xl overflow-hidden group">
            <div className="overflow-hidden">
              <img src={p.images[0]} alt={p.name} className="pcard-img w-full h-40 object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-display font-bold text-sm leading-tight">{p.name}</h3>
              <p className="font-mono text-[#15B968] text-sm mt-1.5">{fmt(p.priceUSD, cur)}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="aurora" /><div className="grain" />
      <Nav base="../" />
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <a href="../" className="text-[#14201A]/45 text-sm font-mono hover:text-[#15B968]">← Volver a la tienda</a>
        <h1 className="font-display font-black text-4xl mt-6 mb-8">{title}</h1>
        <div className="space-y-5 text-[#14201A]/60 leading-relaxed text-sm">{children}</div>
      </main>
      <Footer base="../" />
      <WhatsAppFloat />
    </div>
  );
}
