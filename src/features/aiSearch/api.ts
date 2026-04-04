import { supabase } from "@/lib/supabaseClient";
import type { ProductSearchResult } from "./types";

export type SearchProductsSemanticParams = {
  queryEmbedding: number[];
  matchCount?: number;
  minScore?: number;
};

type RpcRow = {
  id: number;
  title: string;
  description: string | null;
  score: number;
};

export async function searchProductsSemantic(
  params: SearchProductsSemanticParams
): Promise<ProductSearchResult[]> {
  const { queryEmbedding, matchCount = 10, minScore = 0 } = params;

  // IMPORTANT: This calls the Postgres RPC created in Topic 3.
  // Your RPC might use parameter names like `query_embedding`, `match_count`, etc.
  // Adjust the object keys below to match your SQL function signature.
  const { data, error } = await supabase.rpc("search_products_semantic", {
    query_embedding: queryEmbedding,
    match_count: matchCount,
    min_score: minScore,
  });

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as RpcRow[];

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    score: r.score,
  }));
}

