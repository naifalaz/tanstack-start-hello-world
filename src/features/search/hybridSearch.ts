import { supabase } from '@/lib/supabaseClient';

export type HybridSearchRow = {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  is_active: boolean;
  keyword_rank: number;
  semantic_score: number;
  combined_score: number;
};

// Use proper optional and array types
export type HybridSearchParams = {
  query: string;
  queryEmbedding: number[]; // length 1024
  category?: string;
  activeOnly: boolean;
  limit: number;
  offset: number;
};

export async function searchProductsHybrid(
  params: HybridSearchParams
): Promise<HybridSearchRow[]> {
  const { query, queryEmbedding, category, activeOnly, limit, offset } = params;

  // Supabase RPC expects JSON string for array/vector types
  const { data, error } = await supabase.rpc('search_products_hybrid', {
    p_query: query,
    p_query_embedding: JSON.stringify(queryEmbedding), // FIX: convert number[] → string
    p_category: category ?? undefined,                // FIX: undefined instead of null
    p_active_only: activeOnly,
    p_limit: limit,
    p_offset: offset
  });

  if (error) {
    throw new Error(`Hybrid search RPC failed: ${error.message}`);
  }

  return (data ?? []) as HybridSearchRow[];
}