import 'dotenv/config';
import OpenAI from 'openai';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

type ProductRow = {
  id: number;
  title: string;
  description: string | null;
  embedding: number[] | null;
  embedding_updated_at: string | null;
};

function mustGetEnv(key: string): string {
  const value = process.env[key];
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function buildEmbeddingInput(p: Pick<ProductRow, 'title' | 'description'>): string {
  // CRITICAL: Use title (not name) and description.
  const description = p.description?.trim() ?? '';
  return `Title: ${p.title.trim()}\nDescription: ${description}`.trim();
}

async function fetchProductsMissingEmbeddings(supabase: SupabaseClient): Promise<ProductRow[]> {
  const { data, error } = await supabase
    .from('products')
    .select('id, title, description, embedding, embedding_updated_at')
    .is('embedding', null)
    .order('id', { ascending: true })
    .limit(200);

  if (error) throw error;
  return (data ?? []) as ProductRow[];
}

async function generateEmbedding(client: OpenAI, input: string): Promise<number[]> {
  // The OpenAI SDK talks to Ollama's OpenAI-compatible endpoint.
  // Model name matches what you pulled: qwen3-embedding
  const res = await client.embeddings.create({
    model: 'mxbai-embed-large',
    input
  });

  const vector = res.data[0]?.embedding;
  if (!vector || vector.length !== 1024) {
    throw new Error(`Unexpected embedding length: ${vector?.length ?? 'missing'} (expected 1024)`);
  }

  return vector;
}

async function updateProductEmbedding(
  supabase: SupabaseClient,
  args: { id: number; embedding: number[]; embedding_updated_at: string }
): Promise<void> {
  const { error } = await supabase
    .from('products')
    .update({
      embedding: args.embedding,
      embedding_updated_at: args.embedding_updated_at
    })
    .eq('id', args.id);

  if (error) throw error;
}

async function main() {
  const OLLAMA_BASE_URL = mustGetEnv('OLLAMA_BASE_URL');
  const SUPABASE_URL = mustGetEnv('SUPABASE_URL');
  const SUPABASE_SERVICE_ROLE_KEY = mustGetEnv('SUPABASE_SERVICE_ROLE_KEY');

  // Connect the OpenAI SDK to Ollama's local OpenAI-compatible endpoint.
  // No real API key needed — Ollama ignores it.
  const openai = new OpenAI({
    baseURL: `${OLLAMA_BASE_URL}/v1`,
    apiKey: 'ollama',
  });

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false }
  });

  const products = await fetchProductsMissingEmbeddings(supabase);
  console.log(`Found ${products.length} products missing embeddings.`);

  let updated = 0;

  for (const p of products) {
    const input = buildEmbeddingInput({ title: p.title, description: p.description });

    console.log(`Embedding product id=${p.id} title=${JSON.stringify(p.title)}...`);

    const embedding = await generateEmbedding(openai, input);

    await updateProductEmbedding(supabase, {
      id: p.id,
      embedding,
      embedding_updated_at: new Date().toISOString()
    });

    updated += 1;
  }

  console.log(`Done. Updated ${updated} products.`);
}

main().catch((err) => {
  console.error('Embedding script failed:', err);
  process.exit(1);
});
