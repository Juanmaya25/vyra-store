import { createClient } from "@supabase/supabase-js";

// La "clave publicable" es pública por diseño y está protegida por RLS.
// Es seguro incluirla en el frontend (igual que la anon key clásica).
const SUPABASE_URL = "https://pungeqeuikweymizvlmr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_hEWG33zkWc6exp6DvLjf6g_zK10DH93";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export type Coupon = { id?: number; code: string; percent: number; single_use?: boolean; used?: boolean; expires_at?: string | null };

export async function listCoupons(): Promise<Coupon[]> {
  try {
    const { data } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
    return data ?? [];
  } catch { return []; }
}

export async function getCoupon(code: string): Promise<Coupon | null> {
  try {
    const { data } = await supabase.from("coupons").select("*").eq("code", code.toUpperCase().trim()).single();
    return data ?? null;
  } catch { return null; }
}

export async function addCoupon(code: string, percent: number, singleUse = false, expiresAt?: Date | null): Promise<boolean> {
  try {
    const row: Record<string, unknown> = { code: code.toUpperCase().trim(), percent, single_use: singleUse };
    if (expiresAt) row.expires_at = expiresAt.toISOString();
    const { error } = await supabase.from("coupons").insert(row);
    return !error;
  } catch { return false; }
}

export async function markCouponUsed(code: string) {
  try {
    await supabase.from("coupons").update({ used: true }).eq("code", code.toUpperCase().trim());
  } catch { /* ignore */ }
}

export async function emailUsedCoupon(email: string, code: string): Promise<boolean> {
  if (!email || !code) return false;
  try {
    const { count } = await supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("email", email.toLowerCase().trim())
      .eq("coupon", code.toUpperCase().trim());
    return (count ?? 0) > 0;
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
