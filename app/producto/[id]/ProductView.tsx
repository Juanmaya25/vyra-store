"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, Check, Truck, ShieldCheck, RefreshCw, Heart, Flame, Eye, Star } from "lucide-react";
import type { Product } from "../../products";
import { fmt } from "../../products";
import { useCart, useWishlist, pushRecent } from "../../cart";
import { Nav, Footer, Stars, WhatsAppFloat, useCurrency, RecentlyViewed, BackToTop } from "../../ui";
import { listReviews, addReview, type ReviewRow } from "../../reviews";

export default function ProductView({ product, related }: { product: Product; related: Product[] }) {
  const { add } = useCart();
  const wish = useWishlist();
  const [cur] = useCurrency();
  const stock = 3 + (product.id.length % 7);
  const viewing = 8 + (product.reviewsCount % 23);
  const [img, setImg] = useState(0);
  const [variant, setVariant] = useState(product.colors?.[0]?.name ?? product.sizes?.[0] ?? "Único");
  const [added, setAdded] = useState(false);

  const [custReviews, setCustReviews] = useState<ReviewRow[]>([]);
  const [rForm, setRForm] = useState({ author: "", rating: 5, text: "" });
  const [rSent, setRSent] = useState(false);

  useEffect(() => {
    pushRecent(product.id);
    listReviews(product.id).then(setCustReviews);
  }, [product.id]);

  async function submitReview(e: React.FormEvent) {
    e.preventDefault();
    const res = await addReview({ product_id: product.id, author: rForm.author, rating: rForm.rating, text: rForm.text });
    if (res.ok) {
      setCustReviews([{ ...rForm, product_id: product.id, created_at: new Date().toISOString() }, ...custReviews]);
      setRForm({ author: "", rating: 5, text: "" });
      setRSent(true);
      setTimeout(() => setRSent(false), 2500);
    } else {
      alert("Error al enviar la reseña:\n\n" + (res.msg || "desconocido"));
    }
  }

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
        <nav className="text-xs font-mono text-[#14201A]/40 mb-8">
          <a href="../../" className="hover:text-[#15B968]">Inicio</a> / <span className="text-[#14201A]/60">{product.category}</span> / <span className="text-[#15B968]">{product.name}</span>
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
                  className={`rounded-xl overflow-hidden border-2 transition-colors ${img === i ? "border-[#15B968]" : "border-transparent opacity-60"}`}>
                  <img src={im} alt="" className="w-20 h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            {product.badge && (
              <span className="bg-[#15B968] text-[#06120B] text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase">{product.badge}</span>
            )}
            <div className="flex items-start justify-between gap-4 mt-3">
              <h1 className="font-display font-black text-3xl sm:text-4xl">{product.name}</h1>
              <button onClick={() => wish.toggle(product.id)} aria-label="Favorito"
                className="w-11 h-11 rounded-full glass flex items-center justify-center shrink-0 hover:scale-110 transition-transform">
                <Heart size={18} className={wish.has(product.id) ? "fill-[#FF4D8D] text-[#FF4D8D]" : "text-[#14201A]/70"} />
              </button>
            </div>
            <p className="text-[#14201A]/50 mt-2">{product.tagline}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="flex items-center gap-1.5 text-xs font-mono bg-[#FF4D8D]/10 text-[#FF4D8D] rounded-full px-3 py-1.5">
                <Flame size={13} /> Solo {stock} en stock
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono bg-[#15B968]/10 text-[#15B968] rounded-full px-3 py-1.5">
                <Eye size={13} /> {viewing} personas viendo ahora
              </span>
            </div>

            <div className="flex items-center gap-3 mt-4 glass rounded-2xl px-4 py-3 w-fit">
              <Stars value={product.rating} size={16} />
              <span className="font-mono font-bold text-[#15B968]">{product.rating}</span>
              <span className="text-[#14201A]/45 text-xs">· {product.reviewsCount.toLocaleString()} reseñas · {product.sold.toLocaleString()} vendidos</span>
            </div>

            <div className="flex items-end gap-3 mt-6">
              <p className="font-display font-black text-4xl">{fmt(product.priceUSD, cur)}</p>
              <p className="text-[#14201A]/35 line-through font-mono mb-1.5">{fmt(product.compareUSD, cur)}</p>
              <span className="mb-1.5 text-[#15B968] font-mono text-sm">-{Math.round((1 - product.priceUSD / product.compareUSD) * 100)}%</span>
            </div>

            <p className="text-[#14201A]/55 mt-5 leading-relaxed">{product.description}</p>

            {(product.colors || product.sizes) && (
              <div className="mt-6 space-y-4">
                {product.colors && (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[#14201A]/40 mb-2">Color</p>
                    <div className="flex gap-2">
                      {product.colors.map((c) => (
                        <button key={c.name} onClick={() => setVariant(c.name)}
                          className={`px-4 py-2 rounded-full text-sm border transition-colors ${variant === c.name ? "border-[#15B968] text-[#15B968]" : "border-[var(--line)] text-[#14201A]/60"}`}>
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {product.sizes && (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[#14201A]/40 mb-2">Talla</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button key={s} onClick={() => setVariant(s)}
                          className={`min-w-11 px-3 py-2 rounded-lg text-sm border transition-colors ${variant === s ? "border-[#15B968] text-[#15B968]" : "border-[var(--line)] text-[#14201A]/60"}`}>
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
                  <Ic size={18} className="text-[#15B968] mx-auto mb-1.5" />
                  <p className="text-[11px] text-[#14201A]/55">{t}</p>
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
                  <span className="text-[#14201A]/35 text-xs font-mono">{r.date}</span>
                </div>
                <Stars value={r.rating} size={12} />
                <p className="text-[#14201A]/55 text-sm mt-2 leading-relaxed">{r.text}</p>
                {r.photo && <img src={r.photo} alt="" className="rounded-xl w-24 h-24 object-cover mt-3" />}
              </div>
            ))}
          </div>

          {/* Customer reviews */}
          <div className="mt-12 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h3 className="font-display font-bold text-xl mb-4">Opiniones de clientes VYRA</h3>
              {custReviews.length === 0 && <p className="text-[#14201A]/45 text-sm">Sé el primero en opinar sobre este producto.</p>}
              <div className="space-y-3">
                {custReviews.map((r, i) => (
                  <div key={i} className="glass rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{r.author}</span>
                      <span className="text-[#14201A]/35 text-xs font-mono">
                        {r.created_at ? new Date(r.created_at).toLocaleDateString("es-CO", { day: "2-digit", month: "short" }) : ""}
                      </span>
                    </div>
                    <Stars value={r.rating} size={12} />
                    <p className="text-[#14201A]/60 text-sm mt-2 leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={submitReview} className="glass rounded-2xl p-5 h-fit">
              <h4 className="font-display font-bold mb-3">Deja tu reseña</h4>
              {rSent ? (
                <p className="text-[#15B968] text-sm flex items-center gap-2"><Check size={16} /> ¡Gracias por tu opinión!</p>
              ) : (
                <div className="space-y-3">
                  <input required value={rForm.author} onChange={(e) => setRForm({ ...rForm, author: e.target.value })}
                    placeholder="Tu nombre" className="w-full glass rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#15B968]" />
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button type="button" key={n} onClick={() => setRForm({ ...rForm, rating: n })} aria-label={`${n} estrellas`}>
                        <Star size={22} className={n <= rForm.rating ? "fill-[#15B968] text-[#15B968]" : "text-[#14201A]/20"} />
                      </button>
                    ))}
                  </div>
                  <textarea required rows={3} value={rForm.text} onChange={(e) => setRForm({ ...rForm, text: e.target.value })}
                    placeholder="¿Qué te pareció el producto?" className="w-full glass rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#15B968] resize-none" />
                  <button className="btn-lime w-full py-3 rounded-xl text-sm">Publicar reseña</button>
                </div>
              )}
            </form>
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
                      <span className="text-xs text-[#14201A]/40">({p.reviewsCount.toLocaleString()})</span>
                    </div>
                    <p className="font-display font-bold text-lg">{fmt(p.priceUSD, cur)}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>

      <RecentlyViewed exclude={product.id} base="../../" />
      <Footer base="../../" />
      <WhatsAppFloat />
      <BackToTop />
    </div>
  );
}
