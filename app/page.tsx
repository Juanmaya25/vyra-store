"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, ArrowRight, Truck, ShieldCheck, RefreshCw, Zap, Plus, Heart } from "lucide-react";
import { PRODUCTS, CATEGORIES, fmt } from "./products";
import { Nav, Footer, Stars, WhatsAppFloat, useCurrency, Faq, Newsletter, SocialProof } from "./ui";
import { useWishlist } from "./cart";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && x.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

export default function Page() {
  const [cur] = useCurrency();
  const [cat, setCat] = useState("Todos");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("destacados");
  const wish = useWishlist();
  useReveal();

  const filtered = useMemo(() => {
    const list = PRODUCTS.filter(
      (p) => (cat === "Todos" || p.category === cat) &&
             (query === "" || p.name.toLowerCase().includes(query.toLowerCase()))
    );
    if (sort === "precio-asc") list.sort((a, b) => a.priceUSD - b.priceUSD);
    if (sort === "precio-desc") list.sort((a, b) => b.priceUSD - a.priceUSD);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "vendidos") list.sort((a, b) => b.sold - a.sold);
    return list;
  }, [cat, query, sort]);

  return (
    <div className="relative min-h-screen">
      <div className="aurora" /><div className="grain" />
      <Nav />

      {/* Hero */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-7 text-xs font-mono uppercase tracking-widest text-[#2BE08A]">
              <span className="dot" /> Drop 01 · 2026
            </div>
            <h1 className="font-display font-black leading-[0.95] text-5xl sm:text-6xl lg:text-7xl mb-6">
              EL FUTURO,<br /><span className="grad">A TU PUERTA</span>
            </h1>
            <p className="text-white/60 text-lg max-w-md mb-9 leading-relaxed">
              Tecnología y moda de nueva generación. Productos curados uno a uno, calificados por miles de personas reales. Sin relleno.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#catalogo" className="btn-lime px-8 py-4 rounded-full flex items-center gap-2">Explorar drop <ArrowRight size={18} /></a>
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
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#14C8A0]/20 blur-3xl" />
            <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-[#2BE08A]/15 blur-3xl" />
            <a href={`producto/${PRODUCTS[0].id}/`} className="absolute top-4 right-8 w-64 float block">
              <div className="pcard glass rounded-3xl p-4 glow-lime">
                <img src={PRODUCTS[0].images[0]} alt="" className="rounded-2xl w-full h-56 object-cover" />
                <p className="font-display font-bold mt-3">{PRODUCTS[0].name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[#2BE08A] font-mono">{fmt(PRODUCTS[0].priceUSD, cur)}</span>
                  <Stars value={PRODUCTS[0].rating} />
                </div>
              </div>
            </a>
            <a href={`producto/${PRODUCTS[4].id}/`} className="absolute bottom-0 left-0 w-52 float block" style={{ animationDelay: "1.5s" }}>
              <div className="pcard glass rounded-3xl p-4">
                <img src={PRODUCTS[4].images[0]} alt="" className="rounded-2xl w-full h-40 object-cover" />
                <p className="font-display font-bold text-sm mt-3">{PRODUCTS[4].name}</p>
                <span className="text-[#2BE08A] font-mono text-sm">{fmt(PRODUCTS[4].priceUSD, cur)}</span>
              </div>
            </a>
          </div>
        </div>
      </header>

      {/* Catalog */}
      <section id="catalogo" className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#2BE08A] mb-2">// El drop</p>
            <h2 className="font-display font-black text-4xl">Productos curados</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar..."
                className="glass rounded-full pl-11 pr-4 py-2.5 text-sm w-44 focus:w-56 transition-all outline-none focus:border-[#2BE08A]" />
            </div>
            <div className="flex gap-2">
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCat(c)}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${cat === c ? "bg-[#2BE08A] text-[#06120B] font-bold" : "glass text-white/70 hover:text-white"}`}>
                  {c}
                </button>
              ))}
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="glass rounded-full px-4 py-2.5 text-sm outline-none focus:border-[#2BE08A] cursor-pointer">
              <option value="destacados">Destacados</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="rating">Mejor calificados</option>
              <option value="vendidos">Más vendidos</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <a key={p.id} href={`producto/${p.id}/`} className="reveal block" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <div className="pcard glass rounded-3xl overflow-hidden cursor-pointer group h-full">
                <div className="relative overflow-hidden">
                  <img src={p.images[0]} alt={p.name} className="pcard-img w-full h-64 object-cover" />
                  {p.badge && (
                    <span className="absolute top-4 left-4 bg-[#2BE08A] text-[#06120B] text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">{p.badge}</span>
                  )}
                  <button
                    onClick={(e) => { e.preventDefault(); wish.toggle(p.id); }}
                    aria-label="Favorito"
                    className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
                    <Heart size={16} className={wish.has(p.id) ? "fill-[#FF4D8D] text-[#FF4D8D]" : "text-white/70"} />
                  </button>
                  <span className="absolute bottom-3 right-3 glass rounded-full px-2.5 py-1 text-[10px] font-mono">{p.sold.toLocaleString()} vendidos</span>
                </div>
                <div className="p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">{p.category}</p>
                  <h3 className="font-display font-bold text-lg leading-tight">{p.name}</h3>
                  <p className="text-white/45 text-xs mt-1 mb-3">{p.tagline}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <Stars value={p.rating} />
                    <span className="text-xs font-mono text-[#2BE08A]">{p.rating}</span>
                    <span className="text-xs text-white/40">({p.reviewsCount.toLocaleString()})</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-display font-bold text-xl">{fmt(p.priceUSD, cur)}</p>
                      <p className="text-white/35 text-xs line-through font-mono">{fmt(p.compareUSD, cur)}</p>
                    </div>
                    <span className="w-10 h-10 rounded-full bg-[#2BE08A] text-[#06120B] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Plus size={18} strokeWidth={3} />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section id="confianza" className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Truck, t: "Envío Colombia + USA", d: "Despacho en 48h, tracking en tiempo real" },
            { icon: ShieldCheck, t: "Garantía VYRA 30 días", d: "Devolución sin preguntas incómodas" },
            { icon: RefreshCw, t: "Pago contra entrega", d: "Disponible en Colombia, paga al recibir" },
            { icon: Zap, t: "Productos validados", d: "Solo lo que tiene rating real 4.5★+" },
          ].map(({ icon: Icon, t, d }, i) => (
            <div key={t} className="reveal glass rounded-3xl p-6" style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="w-12 h-12 rounded-2xl bg-[#2BE08A]/15 flex items-center justify-center mb-4">
                <Icon size={22} className="text-[#2BE08A]" />
              </div>
              <h3 className="font-display font-bold mb-1">{t}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <Newsletter />
      <Faq />
      <Footer />
      <WhatsAppFloat />
      <SocialProof />
    </div>
  );
}
