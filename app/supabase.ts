import { createClient } from "@supabase/supabase-js";

// La "clave publicable" es pública por diseño y está protegida por RLS.
// Es seguro incluirla en el frontend (igual que la anon key clásica).
const SUPABASE_URL = "https://pungeqeuikweymizvlmr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_hEWG33zkWc6exp6DvLjf6g_zK10DH93";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export type Coupon = { id?: number; code: string; percent: number };

export async function listCoupons(): Promise<Coupon[]> {
  try {
    const { data } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
    return data ?? [];
  } catch { return []; }
}

export async function addCoupon(code: string, percent: number): Promise<boolean> {
  try {
    const { error } = await supabase.from("coupons").insert({ code: code.toUpperCase().trim(), percent });
    return !error;
  } catch { return false; }
}

export async function deleteCoupon(id: number): Promise<boolean> {
  try {
    const { error } = await supabase.from("coupons").delete().eq("id", id);
    return !error;
  } catch { return false; }
}

export async function addSubscriber(email: string, source: string, name?: string) {
  try {
    await supabase.from("subscribers").upsert(
      { email: email.toLowerCase().trim(), source, name: name ?? null },
      { onConflict: "email" }
    );
  } catch { /* silencioso: no bloquea la compra */ }
}

export type OrderRow = {
  id?: number;
  created_at?: string;
  cliente: string;
  email: string;
  pais: string;
  items: { name: string; qty: number; variant: string; priceUSD: number }[];
  total_usd: number;
  estado: string;
};
