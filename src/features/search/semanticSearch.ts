import { supabase } from '@/lib/supabaseClient';

export type SemanticProductRow = {
  id: number;
  title: string;
  description: string | null;
  similarity: number;
};

export type SemanticSearchArgs = {
  queryEmbedding: number[];
  minSimilarity: number;
  matchCount: number; // FIX: add this property
};

export async function semanticSearchProducts(
  args: SemanticSearchArgs
): Promise<SemanticProductRow[]> {
  const { queryEmbedding, matchCount, minSimilarity } = args;

  if (queryEmbedding.length !== 1024) {
    throw new Error(
      `queryEmbedding must be length 1024, got ${queryEmbedding.length}`
    );
  }

  const { data, error } = await supabase.rpc('search_products_semantic', {
    query_embedding: JSON.stringify(queryEmbedding),
    match_count: matchCount,
    min_similarity: minSimilarity,
  });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as SemanticProductRow[];
}