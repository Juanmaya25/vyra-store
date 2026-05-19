"use client";

import { useEffect, useState } from "react";
import type { Product } from "./products";

export type CartLine = { id: string; name: string; priceUSD: number; image: string; variant: string; qty: number };

const KEY = "vyra_cart";
const EVT = "vyra_cart_change";

function read(): CartLine[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function write(lines: CartLine[]) {
  localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event(EVT));
}

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([]);
  useEffect(() => {
    setLines(read());
    const sync = () => setLines(read());
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener(EVT, sync); window.removeEventListener("storage", sync); };
  }, []);

  const add = (p: Product, variant: string) => {
    const c = read();
    const f = c.find((l) => l.id === p.id && l.variant === variant);
    if (f) f.qty += 1;
    else c.push({ id: p.id, name: p.name, priceUSD: p.priceUSD, image: p.images[0], variant, qty: 1 });
    write(c);
  };
  const changeQty = (i: number, d: number) => {
    const c = read();
    c[i].qty = Math.max(0, c[i].qty + d);
    write(c.filter((l) => l.qty > 0));
  };
  const clear = () => write([]);

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.priceUSD * l.qty, 0);
  return { lines, add, changeQty, clear, count, total };
}

/* ── Wishlist ── */
const WKEY = "vyra_wish";
const WEVT = "vyra_wish_change";

function wread(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(WKEY) || "[]"); } catch { return []; }
}

export function useWishlist() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    setIds(wread());
    const sync = () => setIds(wread());
    window.addEventListener(WEVT, sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener(WEVT, sync); window.removeEventListener("storage", sync); };
  }, []);
  const toggle = (id: string) => {
    const c = wread();
    const next = c.includes(id) ? c.filter((x) => x !== id) : [...c, id];
    localStorage.setItem(WKEY, JSON.stringify(next));
    window.dispatchEvent(new Event(WEVT));
  };
  const has = (id: string) => ids.includes(id);
  return { ids, toggle, has, count: ids.length };
}

/* ── Recently viewed ── */
export function pushRecent(id: string) {
  if (typeof window === "undefined") return;
  try {
    const cur: string[] = JSON.parse(localStorage.getItem("vyra_recent") || "[]");
    const next = [id, ...cur.filter((x) => x !== id)].slice(0, 6);
    localStorage.setItem("vyra_recent", JSON.stringify(next));
  } catch { /* ignore */ }
}

export function useRecent() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    try { setIds(JSON.parse(localStorage.getItem("vyra_recent") || "[]")); } catch { setIds([]); }
  }, []);
  return ids;
}
