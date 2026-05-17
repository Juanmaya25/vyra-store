"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, ShoppingBag, X, Plus, Minus, Search, ArrowRight,
  Truck, ShieldCheck, RefreshCw, Zap, ChevronRight, Heart, Check
} from "lucide-react";
import { PRODUCTS, CATEGORIES, fmt, type Product } from "./products";

type Currency = "USD" | "COP";
type CartLine = { product: Product; qty: number; variant: string };

/* ── Stars (imported rating) ── */
function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(value) ? "fill-[#C6FF3D] text-[#C6FF3D]" : "text-white/15"}
        />
      ))}
    </div>
  );
}

/* ── Scroll reveal ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

export default function Page() {
  const [currency, setCurrency] = useState<Currency>("COP");
  const [cat, setCat] = useState<string>("Todos");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [active, setActive] = useState<Product | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [variant, setVariant] = useState("");
  const [added, setAdded] = useState(false);

  useReveal();

  const filtered = useMemo(() => {
    return PRODUCTS.filter(
      (p) =>
        (cat === "Todos" || p.category === cat) &&
        (query === "" || p.name.toLowerCase().includes(query.toLowerCase()))
    );
  }, [cat, query]);

  const cartCount = cart.reduce((s, l) => s + l.qty, 0);
  const cartTotal = cart.reduce((s, l) => s + l.product.priceUSD * l.qty, 0);

  function openProduct(p: Product) {
    setActive(p);
    setActiveImg(0);
    setVariant(p.colors?.[0]?.name ?? p.sizes?.[0] ?? "Único");
    setAdded(false);
  }

  function addToCart(p: Product, v: string) {
    setCart((c) => {
      const found = c.find((l) => l.product.id === p.id && l.variant === v);
      if (found) return c.map((l) => (l === found ? { ...l, qty: l.qty + 1 } : l));
      return [...c, { product: p, qty: 1, variant: v }];
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  function changeQty(idx: number, d: number) {
    setCart((c) =>
      c.map((l, i) => (i === idx ? { ...l, qty: Math.max(1, l.qty + d) } : l)).filter((l) => l.qty > 0)
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="aurora" />
      <div className="grain" />

      {/* ── Ticker ── */}
      <div className="relative z-20 bg-[#C6FF3D] text-[#0A0A0F] py-2 overflow-hidden text-xs font-mono font-bold uppercase tracking-wider">
        <div className="flex whitespace-nowrap marquee">
          {Array(2).fill(0).map((_, k) => (
            <div key={k} className="flex shrink-0">
              {["Envío gratis desde $50", "Garantía VYRA 30 días", "Colombia + USA", "Pago contra entrega disponible", "Productos curados 2026"].map((t) => (
                <span key={t} className="flex items-center px-6">{t}<span className="ml-6 w-1.5 h-1.5 rounded-full bg-[#0A0A0F]" /></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Navbar ── */}
      <nav className="relative z-20 sticky top-0">
        <div className="glass border-b border-[var(--line)]">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="#" className="font-display font-black text-2xl tracking-tight">
              VY<span className="text-[#C6FF3D]">R</span>A
            </a>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#catalogo" className="navx text-white/80 hover:text-white">Catálogo</a>
              <a href="#tech" className="navx text-white/80 hover:text-white" onClick={() => setCat("Tecnología")}>Tech</a>
              <a href="#moda" className="navx text-white/80 hover:text-white" onClick={() => setCat("Moda")}>Moda</a>
              <a href="#confianza" className="navx text-white/80 hover:text-white">Garantía</a>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex rounded-full border border-[var(--line)] overflow-hidden text-xs font-mono">
                {(["COP", "USD"] as Currency[]).map((c) => (
                  <button key={c} onClick={() => setCurrency(c)}
                    className={`px-3 py-1.5 transition-colors ${currency === c ? "bg-[#C6FF3D] text-[#0A0A0F] font-bold" : "text-white/60 hover:text-white"}`}>
                    {c}
                  </button>
                ))}
              </div>
              <button onClick={() => setCartOpen(true)} className="relative p-2 rounded-full hover:bg-white/5 transition-colors">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#C6FF3D] text-[#0A0A0F] text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-7 text-xs font-mono uppercase tracking-widest text-[#C6FF3D]">
              <span className="dot" /> Drop 01 · 2026
            </div>
            <h1 className="font-display font-black leading-[0.95] text-5xl sm:text-6xl lg:text-7xl mb-6">
              EL FUTURO,<br />
              <span className="grad">A TU PUERTA</span>
            </h1>
            <p className="text-white/60 text-lg max-w-md mb-9 leading-relaxed">
              Tecnología y moda de nueva generación. Productos curados uno a uno, calificados por miles de personas reales. Sin relleno.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#catalogo" className="btn-lime px-8 py-4 rounded-full flex items-center gap-2">
                Explorar drop <ArrowRight size={18} />
              </a>
              <a href="#confianza" className="btn-ghost px-8 py-4 rounded-full">Por qué VYRA</a>
            </div>
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-[var(--line)]">
              {[["62K+", "Clientes felices"], ["4.8★", "Rating promedio"], ["48h", "Despacho"]].map(([a, b]) => (
                <div key={b}>
                  <p className="font-display font-bold text-2xl">{a}</p>
                  <p className="text-xs text-white/45 mt-0.5">{b}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[440px] hidden lg:block">
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#7B5CFF]/20 blur-3xl" />
            <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-[#C6FF3D]/15 blur-3xl" />
            <div className="absolute top-4 right-8 w-64 float">
              <div className="pcard glass rounded-3xl p-4 glow-lime">
                <img src={PRODUCTS[0].images[0]} alt="" className="rounded-2xl w-full h-56 object-cover" />
                <p className="font-display font-bold mt-3">{PRODUCTS[0].name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[#C6FF3D] font-mono">{fmt(PRODUCTS[0].priceUSD, currency)}</span>
                  <Stars value={PRODUCTS[0].rating} />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-52 float" style={{ animationDelay: "1.5s" }}>
              <div className="pcard glass rounded-3xl p-4">
                <img src={PRODUCTS[4].images[0]} alt="" className="rounded-2xl w-full h-40 object-cover" />
                <p className="font-display font-bold text-sm mt-3">{PRODUCTS[4].name}</p>
                <span className="text-[#C6FF3D] font-mono text-sm">{fmt(PRODUCTS[4].priceUSD, currency)}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Catalog ── */}
      <section id="catalogo" className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#C6FF3D] mb-2">// El drop</p>
            <h2 className="font-display font-black text-4xl">Productos curados</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar..."
                className="glass rounded-full pl-11 pr-4 py-2.5 text-sm w-44 focus:w-56 transition-all outline-none focus:border-[#C6FF3D]"
              />
            </div>
            <div className="flex gap-2">
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCat(c)}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                    cat === c ? "bg-[#C6FF3D] text-[#0A0A0F] font-bold" : "glass text-white/70 hover:text-white"
                  }`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div key={p.id} className="reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <div className="pcard glass rounded-3xl overflow-hidden cursor-pointer group h-full" onClick={() => openProduct(p)}>
                <div className="relative overflow-hidden">
                  <img src={p.images[0]} alt={p.name} className="pcard-img w-full h-64 object-cover" />
                  {p.badge && (
                    <span className="absolute top-4 left-4 bg-[#C6FF3D] text-[#0A0A0F] text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {p.badge}
                    </span>
                  )}
                  <span className="absolute top-4 right-4 glass rounded-full px-2.5 py-1 text-[10px] font-mono">
                    {p.sold.toLocaleString()} vendidos
                  </span>
                </div>
                <div className="p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">{p.category}</p>
                  <h3 className="font-display font-bold text-lg leading-tight">{p.name}</h3>
                  <p className="text-white/45 text-xs mt-1 mb-3">{p.tagline}</p>
                  {/* Imported rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <Stars value={p.rating} />
                    <span className="text-xs font-mono text-[#C6FF3D]">{p.rating}</span>
                    <span className="text-xs text-white/40">({p.reviewsCount.toLocaleString()})</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-display font-bold text-xl">{fmt(p.priceUSD, currency)}</p>
                      <p className="text-white/35 text-xs line-through font-mono">{fmt(p.compareUSD, currency)}</p>
                    </div>
                    <span className="w-10 h-10 rounded-full bg-[#C6FF3D] text-[#0A0A0F] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Plus size={18} strokeWidth={3} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trust ── */}
      <section id="confianza" className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Truck, t: "Envío Colombia + USA", d: "Despacho en 48h, tracking en tiempo real" },
            { icon: ShieldCheck, t: "Garantía VYRA 30 días", d: "Devolución sin preguntas incómodas" },
            { icon: RefreshCw, t: "Pago contra entrega", d: "Disponible en Colombia, paga al recibir" },
            { icon: Zap, t: "Productos validados", d: "Solo lo que tiene rating real 4.5★+" },
          ].map(({ icon: Icon, t, d }, i) => (
            <div key={t} className="reveal glass rounded-3xl p-6" style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="w-12 h-12 rounded-2xl bg-[#C6FF3D]/15 flex items-center justify-center mb-4">
                <Icon size={22} className="text-[#C6FF3D]" />
              </div>
              <h3 className="font-display font-bold mb-1">{t}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-[var(--line)] mt-10">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <p className="font-display font-black text-3xl mb-3">VY<span className="text-[#C6FF3D]">R</span>A</p>
              <p className="text-white/45 text-sm max-w-xs leading-relaxed">
                El futuro, a tu puerta. Tecnología y moda curada para Colombia y Estados Unidos.
              </p>
            </div>
            {[
              { h: "Tienda", l: ["Catálogo", "Tech", "Moda", "Novedades"] },
              { h: "Ayuda", l: ["Envíos", "Garantía", "Devoluciones", "Contacto"] },
            ].map((col) => (
              <div key={col.h}>
                <p className="font-mono text-xs uppercase tracking-widest text-[#C6FF3D] mb-4">{col.h}</p>
                <ul className="space-y-2.5">
                  {col.l.map((x) => (
                    <li key={x}><a href="#" className="text-white/55 text-sm hover:text-white transition-colors">{x}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-[var(--line)]">
            <p className="text-white/35 text-xs font-mono">© 2026 VYRA · Todos los derechos reservados</p>
            <a href="./admin/" className="text-white/35 text-xs font-mono hover:text-[#C6FF3D] transition-colors">Panel admin →</a>
          </div>
        </div>
      </footer>

      {/* ── Product Modal ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActive(null)} />
            <motion.div
              className="relative glass rounded-t-3xl sm:rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto"
              initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              <button onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/10">
                <X size={18} />
              </button>
              <div className="grid md:grid-cols-2 gap-0">
                {/* Gallery */}
                <div className="p-6">
                  <img src={active.images[activeImg]} alt={active.name} className="rounded-2xl w-full h-80 object-cover" />
                  <div className="flex gap-3 mt-4">
                    {active.images.map((img, i) => (
                      <button key={i} onClick={() => setActiveImg(i)}
                        className={`rounded-xl overflow-hidden border-2 transition-colors ${activeImg === i ? "border-[#C6FF3D]" : "border-transparent opacity-60"}`}>
                        <img src={img} alt="" className="w-16 h-16 object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
                {/* Info */}
                <div className="p-6 sm:p-8">
                  {active.badge && (
                    <span className="bg-[#C6FF3D] text-[#0A0A0F] text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase">{active.badge}</span>
                  )}
                  <h2 className="font-display font-black text-2xl mt-3">{active.name}</h2>
                  <p className="text-white/50 text-sm mt-1">{active.tagline}</p>

                  {/* Imported rating block */}
                  <div className="flex items-center gap-3 mt-4 glass rounded-2xl px-4 py-3">
                    <Stars value={active.rating} size={16} />
                    <span className="font-mono font-bold text-[#C6FF3D]">{active.rating}</span>
                    <span className="text-white/45 text-xs">· {active.reviewsCount.toLocaleString()} reseñas · {active.sold.toLocaleString()} vendidos</span>
                  </div>

                  <div className="flex items-end gap-3 mt-5">
                    <p className="font-display font-black text-3xl">{fmt(active.priceUSD, currency)}</p>
                    <p className="text-white/35 line-through font-mono mb-1">{fmt(active.compareUSD, currency)}</p>
                    <span className="mb-1 text-[#C6FF3D] font-mono text-xs">
                      -{Math.round((1 - active.priceUSD / active.compareUSD) * 100)}%
                    </span>
                  </div>

                  <p className="text-white/55 text-sm mt-4 leading-relaxed">{active.description}</p>

                  {/* Variants */}
                  {(active.colors || active.sizes) && (
                    <div className="mt-5 space-y-3">
                      {active.colors && (
                        <div>
                          <p className="font-mono text-xs uppercase tracking-wider text-white/40 mb-2">Color</p>
                          <div className="flex gap-2">
                            {active.colors.map((c) => (
                              <button key={c.name} onClick={() => setVariant(c.name)}
                                className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${variant === c.name ? "border-[#C6FF3D] text-[#C6FF3D]" : "border-[var(--line)] text-white/60"}`}>
                                {c.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {active.sizes && (
                        <div>
                          <p className="font-mono text-xs uppercase tracking-wider text-white/40 mb-2">Talla</p>
                          <div className="flex flex-wrap gap-2">
                            {active.sizes.map((s) => (
                              <button key={s} onClick={() => setVariant(s)}
                                className={`min-w-10 px-3 py-1.5 rounded-lg text-xs border transition-colors ${variant === s ? "border-[#C6FF3D] text-[#C6FF3D]" : "border-[var(--line)] text-white/60"}`}>
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <button onClick={() => addToCart(active, variant)}
                    className="btn-lime w-full py-4 rounded-2xl mt-6 flex items-center justify-center gap-2">
                    {added ? <><Check size={18} /> Añadido</> : <><ShoppingBag size={18} /> Añadir al carrito</>}
                  </button>

                  {/* Imported reviews */}
                  <div className="mt-7">
                    <p className="font-display font-bold mb-3">Reseñas reales importadas</p>
                    <div className="space-y-3">
                      {active.reviews.map((r, i) => (
                        <div key={i} className="glass rounded-2xl p-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{r.author}</span>
                            <span className="text-white/35 text-xs font-mono">{r.date}</span>
                          </div>
                          <Stars value={r.rating} size={12} />
                          <p className="text-white/55 text-sm mt-2 leading-relaxed">{r.text}</p>
                          {r.photo && <img src={r.photo} alt="" className="rounded-xl w-20 h-20 object-cover mt-3" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Cart ── */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-md glass border-l border-[var(--line)] flex flex-col"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-6 border-b border-[var(--line)]">
                <p className="font-display font-bold text-lg">Tu carrito ({cartCount})</p>
                <button onClick={() => setCartOpen(false)} className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/10">
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 && (
                  <div className="text-center py-20">
                    <ShoppingBag size={40} className="mx-auto text-white/20 mb-4" />
                    <p className="text-white/45">Tu carrito está vacío</p>
                  </div>
                )}
                {cart.map((l, i) => (
                  <div key={i} className="flex gap-4 glass rounded-2xl p-3">
                    <img src={l.product.images[0]} alt="" className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="font-medium text-sm leading-tight">{l.product.name}</p>
                      <p className="text-white/40 text-xs mt-0.5">{l.variant}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button onClick={() => changeQty(i, -1)} className="w-6 h-6 rounded-full glass flex items-center justify-center"><Minus size={12} /></button>
                          <span className="font-mono text-sm w-5 text-center">{l.qty}</span>
                          <button onClick={() => changeQty(i, 1)} className="w-6 h-6 rounded-full glass flex items-center justify-center"><Plus size={12} /></button>
                        </div>
                        <span className="font-mono text-sm text-[#C6FF3D]">{fmt(l.product.priceUSD * l.qty, currency)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-[var(--line)]">
                  <div className="flex justify-between mb-4">
                    <span className="text-white/55">Total</span>
                    <span className="font-display font-black text-2xl">{fmt(cartTotal, currency)}</span>
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
    </div>
  );
}
