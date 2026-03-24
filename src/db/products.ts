// src/db/products.ts
import { supabase } from './supabaseClient'

export async function getActiveProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('id,name,description,price_cents,image_url,is_active,created_at')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}