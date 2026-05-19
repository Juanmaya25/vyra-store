"use client";

import { Heart } from "lucide-react";
import { PRODUCTS, fmt } from "../products";
import { Nav, Footer, Stars, WhatsAppFloat, useCurrency } from "../ui";
import { useWishlist } from "../cart";

export default function Favoritos() {
  const [cur] = useCurrency();
  const wish = useWishlist();
  const items = PRODUCTS.filter((p) => wish.ids.includes(p.id));

  return (
    <div className="relative min-h-screen">
      <div className="aurora" /><div className="grain" />
      <Nav base="../" />
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-10">
          <Heart size={26} className="text-[#15B968]" />
          <h1 className="font-display font-black text-3xl">Tus favoritos</h1>
        </div>

        {items.length === 0 ? (
          <div className="glass rounded-3xl p-14 text-center">
            <Heart size={40} className="text-[#14201A]/20 mx-auto mb-4" />
            <p className="text-[#14201A]/50">Aún no has guardado favoritos.</p>
            <a href="../" className="btn-lime inline-block px-7 py-3 rounded-full mt-6">Explorar productos</a>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p) => (
              <div key={p.id} className="pcard glass rounded-3xl overflow-hidden group">
                <a href={`../producto/${p.id}/`} className="block overflow-hidden">
                  <img src={p.images[0]} alt={p.name} className="pcard-img w-full h-60 object-cover" />
                </a>
                <div className="p-5">
                  <a href={`../producto/${p.id}/`}><h3 className="font-display font-bold text-lg">{p.name}</h3></a>
                  <div className="flex items-center gap-2 mt-2 mb-3">
                    <Stars value={p.rating} />
                    <span className="text-xs text-[#14201A]/40">({p.reviewsCount.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-display font-bold text-xl">{fmt(p.priceUSD, cur)}</p>
                    <button onClick={() => wish.toggle(p.id)} aria-label="Quitar"
                      className="w-9 h-9 rounded-full glass flex items-center justify-center">
                      <Heart size={16} className="fill-[#E0457E] text-[#E0457E]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer base="../" />
      <WhatsAppFloat />
    </div>
  );
}
