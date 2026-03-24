import { supabase } from "../../lib/supabaseClient";
import type { Product } from "./productTypes";

// GET
export async function getActiveProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as Product[]) ?? [];
}

// INSERT
export async function insertProductApi(input: {
  title: string;
  badge_text: number;
}): Promise<Product> {
  const { data, error } = await (supabase as any)
    .from("products")
    .insert([input]) //  correct
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Product;
}

// UPDATE
export async function updateProductApi(
  id: string,
  updates: {
    title: string;
    badge_text: number;
  }
): Promise<void> {
  const { error } = await (supabase as any)
    .from("products")
    .update(updates)
    .eq("id", id);

  if (error) throw new Error(error.message);
}

// DELETE
export async function deleteProductApi(id: string): Promise<void> {
  const { error } = await (supabase as any)
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}