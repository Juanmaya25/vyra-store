import { supabase } from "./supabase";

export type ReviewRow = {
  id?: number;
  created_at?: string;
  product_id: string;
  author: string;
  rating: number;
  text: string;
};

export async function listReviews(productId: string): Promise<ReviewRow[]> {
  try {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export async function addReview(r: ReviewRow): Promise<{ ok: boolean; msg?: string }> {
  try {
    const { error } = await supabase.from("reviews").insert(r);
    if (error) return { ok: false, msg: `${error.code ?? ""} ${error.message ?? ""}`.trim() };
    return { ok: true };
  } catch (e: unknown) {
    return { ok: false, msg: e instanceof Error ? e.message : "error de red" };
  }
}
