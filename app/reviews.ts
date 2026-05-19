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

export async function addReview(r: ReviewRow): Promise<boolean> {
  try {
    const { error } = await supabase.from("reviews").insert(r);
    return !error;
  } catch {
    return false;
  }
}
