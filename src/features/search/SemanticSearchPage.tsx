// src/features/search/SemanticSearchPage.tsx
import * as React from "react";
import { semanticSearchProducts, type SemanticProductRow } from "./semanticSearch";
import { embedText } from "@/features/ai/embedText";

export function SemanticSearchPage(): React.ReactElement {
  const [query, setQuery] = React.useState<string>("");
  const [results, setResults] = React.useState<SemanticProductRow[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const [minSimilarity, setMinSimilarity] = React.useState<number>(0.3);
  const [matchCount, setMatchCount] = React.useState<number>(10);

  async function runSearch(): Promise<void> {
    const trimmed = query.trim();
    if (!trimmed) {
      setError("Type a search query first.");
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // ✅ Real embedding (Ollama)
      const queryEmbedding = await embedText(trimmed);

      const rows = await semanticSearchProducts({
        queryEmbedding,
        matchCount,
        minSimilarity,
      });

      setResults(rows);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";

      // ✅ Detect connection / Ollama issues
      if (
        message.toLowerCase().includes("failed to fetch") ||
        message.toLowerCase().includes("networkerror") ||
        message.toLowerCase().includes("network error") ||
        message.toLowerCase().includes("connection refused")
      ) {
        setError(
          "Cannot connect to the AI service. Make sure Ollama is running and accessible."
        );
      } else {
        setError(message);
      }

      setResults([]);
    }finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Semantic Search
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Search products by meaning using pgvector cosine similarity. (Ollama embeddings)
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <label className="block text-sm font-medium text-slate-700">
          Search query
        </label>

        <div className="mt-2 flex gap-2">
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={query}
            placeholder="e.g. lightweight laptop for travel"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void runSearch();
            }}
          />

          <button
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
            onClick={() => void runSearch()}
            disabled={loading}
          >
            Search
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block text-sm text-slate-700">
            <span className="font-medium">Min similarity</span>
            <input
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              type="number"
              step="0.05"
              min="0"
              max="1"
              value={minSimilarity}
              onChange={(e) => setMinSimilarity(Number(e.target.value))}
            />
          </label>

          <label className="block text-sm text-slate-700">
            <span className="font-medium">Match count</span>
            <input
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              type="number"
              step="1"
              min="1"
              max="50"
              value={matchCount}
              onChange={(e) => setMatchCount(Number(e.target.value))}
            />
          </label>
        </div>

        {loading && (
          <p className="mt-4 text-sm text-slate-600">Searching…</p>
        )}

        {error && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Results</h2>
          <p className="text-sm text-slate-600">{results.length} found</p>
        </div>

        <ul className="mt-3 space-y-3">
          {results.map((r) => (
            <li
              key={r.id}
              className="rounded-lg border border-slate-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-slate-900">
                    {r.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {r.description ?? "No description"}
                  </p>
                </div>

                <div className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                  sim {r.similarity.toFixed(3)}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {!loading && !error && results.length === 0 && (
          <p className="mt-3 text-sm text-slate-600">
            No matches yet. Try lowering min similarity or searching for something broader.
          </p>
        )}
      </div>
    </div>
  );
}