"use client";

import { useState } from "react";
import { ShoppingBag, Check, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import type { Product } from "../../products";
import { fmt } from "../../products";
import { useCart } from "../../cart";
import { Nav, Footer, Stars, WhatsAppFloat, useCurrency } from "../../ui";

export default function ProductView({ product, related }: { product: Product; related: Product[] }) {
  const { add } = useCart();
  const [cur] = useCurrency();
  const [img, setImg] = useState(0);
  const [variant, setVariant] = useState(product.colors?.[0]?.name ?? product.sizes?.[0] ?? "Único");
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(product, variant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="relative min-h-screen">
      <div className="aurora" /><div className="grain" />
      <Nav base="../../" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <nav className="text-xs font-mono text-white/40 mb-8">
          <a href="../../" className="hover:text-[#C6FF3D]">Inicio</a> / <span className="text-white/60">{product.category}</span> / <span className="text-[#C6FF3D]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <div className="glass rounded-3xl p-4">
              <img src={product.images[img]} alt={product.name} className="rounded-2xl w-full h-[440px] object-cover" />
            </div>
            <div className="flex gap-3 mt-4">
              {product.images.map((im, i) => (
                <button key={i} onClick={() => setImg(i)}
                  className={`rounded-xl overflow-hidden border-2 transition-colors ${img === i ? "border-[#C6FF3D]" : "border-transparent opacity-60"}`}>
                  <img src={im} alt="" className="w-20 h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            {product.badge && (
              <span className="bg-[#C6FF3D] text-[#0A0A0F] text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase">{product.badge}</span>
            )}
            <h1 className="font-display font-black text-3xl sm:text-4xl mt-3">{product.name}</h1>
            <p className="text-white/50 mt-2">{product.tagline}</p>

            <div className="flex items-center gap-3 mt-4 glass rounded-2xl px-4 py-3 w-fit">
              <Stars value={product.rating} size={16} />
              <span className="font-mono font-bold text-[#C6FF3D]">{product.rating}</span>
              <span className="text-white/45 text-xs">· {product.reviewsCount.toLocaleString()} reseñas · {product.sold.toLocaleString()} vendidos</span>
            </div>

            <div className="flex items-end gap-3 mt-6">
              <p className="font-display font-black text-4xl">{fmt(product.priceUSD, cur)}</p>
              <p className="text-white/35 line-through font-mono mb-1.5">{fmt(product.compareUSD, cur)}</p>
              <span className="mb-1.5 text-[#C6FF3D] font-mono text-sm">-{Math.round((1 - product.priceUSD / product.compareUSD) * 100)}%</span>
            </div>

            <p className="text-white/55 mt-5 leading-relaxed">{product.description}</p>

            {(product.colors || product.sizes) && (
              <div className="mt-6 space-y-4">
                {product.colors && (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-white/40 mb-2">Color</p>
                    <div className="flex gap-2">
                      {product.colors.map((c) => (
                        <button key={c.name} onClick={() => setVariant(c.name)}
                          className={`px-4 py-2 rounded-full text-sm border transition-colors ${variant === c.name ? "border-[#C6FF3D] text-[#C6FF3D]" : "border-[var(--line)] text-white/60"}`}>
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {product.sizes && (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-white/40 mb-2">Talla</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button key={s} onClick={() => setVariant(s)}
                          className={`min-w-11 px-3 py-2 rounded-lg text-sm border transition-colors ${variant === s ? "border-[#C6FF3D] text-[#C6FF3D]" : "border-[var(--line)] text-white/60"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <button onClick={handleAdd} className="btn-lime w-full py-4 rounded-2xl mt-7 flex items-center justify-center gap-2">
              {added ? <><Check size={18} /> Añadido al carrito</> : <><ShoppingBag size={18} /> Añadir al carrito · {fmt(product.priceUSD, cur)}</>}
            </button>

            <div className="grid grid-cols-3 gap-3 mt-6">
              {[[Truck, "Envío 48h"], [ShieldCheck, "Garantía 30d"], [RefreshCw, "Contra entrega"]].map(([Ic, t]: any) => (
                <div key={t} className="glass rounded-2xl p-3 text-center">
                  <Ic size={18} className="text-[#C6FF3D] mx-auto mb-1.5" />
                  <p className="text-[11px] text-white/55">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-16">
          <h2 className="font-display font-black text-2xl mb-5">Reseñas reales importadas</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {product.reviews.map((r, i) => (
              <div key={i} className="glass rounded-2xl p-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{r.author}</span>
                  <span className="text-white/35 text-xs font-mono">{r.date}</span>
                </div>
                <Stars value={r.rating} size={12} />
                <p className="text-white/55 text-sm mt-2 leading-relaxed">{r.text}</p>
                {r.photo && <img src={r.photo} alt="" className="rounded-xl w-24 h-24 object-cover mt-3" />}
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display font-black text-2xl mb-5">También te puede gustar</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <a key={p.id} href={`../${p.id}/`} className="pcard glass rounded-3xl overflow-hidden group">
                  <div className="overflow-hidden">
                    <img src={p.images[0]} alt={p.name} className="pcard-img w-full h-52 object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold">{p.name}</h3>
                    <div className="flex items-center gap-2 mt-2 mb-3">
                      <Stars value={p.rating} />
                      <span className="text-xs text-white/40">({p.reviewsCount.toLocaleString()})</span>
                    </div>
                    <p className="font-display font-bold text-lg">{fmt(p.priceUSD, cur)}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer base="../../" />
      <WhatsAppFloat />
    </div>
  );
}
