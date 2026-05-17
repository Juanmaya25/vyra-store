import { createClient } from "@supabase/supabase-js";

// La "clave publicable" es pública por diseño y está protegida por RLS.
// Es seguro incluirla en el frontend (igual que la anon key clásica).
const SUPABASE_URL = "https://pungeqeuikweymizvlmr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_hEWG33zkWc6exp6DvLjf6g_zK10DH93";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

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
