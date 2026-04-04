import type { ProductSearchResult } from "./types";

type CacheEntry = {
  value: ProductSearchResult[];
  createdAtMs: number;
};

const store = new Map<string, CacheEntry>();

export function normalizeQuery(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, " ");
}

export function getCachedSearch(query: string, ttlMs: number): ProductSearchResult[] | null {
  const key = normalizeQuery(query);
  const entry = store.get(key);
  if (!entry) return null;

  const age = Date.now() - entry.createdAtMs;
  if (age > ttlMs) {
    store.delete(key);
    return null;
  }

  return entry.value;
}

export function setCachedSearch(query: string, value: ProductSearchResult[]): void {
  const key = normalizeQuery(query);
  store.set(key, { value, createdAtMs: Date.now() });
}

export function clearSearchCache(): void {
  store.clear();
}