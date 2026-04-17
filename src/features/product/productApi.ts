// src/features/products/productApi.ts
import { supabase } from "../../lib/supabaseClient";
import type { Product } from "./productTypes";

// GET all active products
export async function getActiveProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map((item) => ({
    id: String(item.id), // convert number -> string
    title: item.title ?? "",
    description: item.description ?? "",
    badge_text: Number(item.badge_text ?? 0), // convert string | null -> number
    created_at: item.created_at ?? "",
    featured: item.featured ?? false,
    is_selected: item.is_selected ?? false,
    image_url: item.image_url ?? "",
  }));
}

// INSERT a new product
export async function insertProductApi(input: {
  title: string;
  badge_text: number;
}): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        title: input.title,
        badge_text: String(input.badge_text), // convert number -> string
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return {
    id: String(data.id),
    title: data.title ?? "",
    description: data.description ?? "",
    badge_text: Number(data.badge_text ?? 0), // convert string | null -> number
    created_at: data.created_at ?? "",
    featured: data.featured ?? false,
    is_selected: data.is_selected ?? false,
    image_url: data.image_url ?? "",
  };
}

// UPDATE an existing product
export async function updateProductApi(
  id: string,
  updates: {
    title?: string;
    badge_text?: number;
  }
): Promise<void> {
  const { error } = await supabase
    .from("products")
    .update({
      title: updates.title,
      badge_text: updates.badge_text !== undefined ? String(updates.badge_text) : undefined, // number -> string
    })
    .eq("id", Number(id)); // convert string -> number

  if (error) throw new Error(error.message);
}

// DELETE a product
export async function deleteProductApi(id: string): Promise<void> {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", Number(id)); // convert string -> number

  if (error) throw new Error(error.message);
}