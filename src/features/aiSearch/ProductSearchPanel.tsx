import { useEffect, useMemo, useState } from "react";
import { getCachedSearch, setCachedSearch } from "./cache";
import { searchProductsSemantic } from "./api";
import { useEmbedding } from "./useEmbedding";
import type { ProductSearchResult } from "./types";

function scoreLabel(score: number): { label: "High" | "Medium" | "Low"; className: string } {
  if (score >= 0.85) return { label: "High", className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" };
  if (score >= 0.7) return { label: "Medium", className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200" };
  return { label: "Low", className: "bg-slate-50 text-slate-700 ring-1 ring-slate-200" };
}

export type ProductSearchPanelProps = {
  title?: string;
};

export function ProductSearchPanel(props: ProductSearchPanelProps) {
  const panelTitle = props.title ?? "Product Search";

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [results, setResults] = useState<ProductSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { embed, isLoading: isEmbedding, error: embeddingError } = useEmbedding();

  const isBusy = isSearching || isEmbedding;

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);

    return () => window.clearTimeout(handle);
  }, [query]);

  const normalized = useMemo(() => debouncedQuery.trim(), [debouncedQuery]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setError(null);

      if (!normalized) {
        setResults([]);
        return;
      }

      const cached = getCachedSearch(normalized, 60_000);
      if (cached) {
        setResults(cached);
        return;
      }

      setIsSearching(true);
      try {
        const vector = await embed(normalized);
        const found = await searchProductsSemantic({
          queryEmbedding: vector,
          matchCount: 10,
          minScore: 0,
        });

        if (cancelled) return;

        setResults(found);
        setCachedSearch(normalized, found);
      } catch (e) {
        if (cancelled) return;
        const message = e instanceof Error ? e.message : "Unknown error";
        setError(message);
        setResults([]);
      } finally {
        if (!cancelled) setIsSearching(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [normalized, embed]);

  const effectiveError = error ?? embeddingError;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <header className="mb-3">
        <h2 className="text-base font-semibold text-slate-900">{panelTitle}</h2>
        <p className="mt-1 text-sm text-slate-600">
          Type a query to run semantic search. Results are ranked by similarity and show a confidence label.
        </p>
      </header>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="product-search">
          Search products
        </label>
        <input
          id="product-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., lightweight laptop for travel"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Debounce: 350ms • Cache TTL: 60s</span>
          <span className={isBusy ? "text-indigo-600" : ""}>{isBusy ? "Searching…" : "Idle"}</span>
        </div>
      </div>

      {effectiveError ? (
        <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          <p className="font-medium">Search failed</p>
          <p className="mt-1 break-words">{effectiveError}</p>
          <p className="mt-2 text-xs text-rose-700/80">
            Tip: If this is a connection error, confirm Ollama is running locally (http://localhost:11434) and you\'ve pulled qwen3-embedding.
          </p>
        </div>
      ) : null}

      {!effectiveError && normalized && !isBusy && results.length === 0 ? (
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          No results found. Try a more specific query or check that product embeddings exist in the database.
        </div>
      ) : null}

      <ul className="mt-4 space-y-3">
        {results.map((r) => {
          const badge = scoreLabel(r.score);
          return (
            <li key={r.id} className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{r.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                    {r.description ?? "No description provided."}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}>
                    {badge.label}
                  </span>
                  <span className="text-xs text-slate-500">{r.score.toFixed(3)}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {!normalized ? (
        <div className="mt-4 rounded-lg border border-dashed border-slate-200 p-3 text-sm text-slate-600">
          Start by typing a query. Semantic search works best with intent-rich phrases (not just one keyword).
        </div>
      ) : null}
    </section>
  );
}