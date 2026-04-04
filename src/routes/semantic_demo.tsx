import * as React from "react";
import { supabase } from "../lib/supabaseClient";

type SemanticDemoRow = {
  id: number;
  name: string;
  cosine_distance: number;
};

export default function SemanticDemoPage() {
  const [queryEmbedding, setQueryEmbedding] = React.useState("[0.89, 0.11, 0.00]");
  const [matchCount, setMatchCount] = React.useState(4);
  const [rows, setRows] = React.useState<SemanticDemoRow[]>([]);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  async function runSearch() {
    setErrorMessage("");
    setIsLoading(true);
    setRows([]);

    const { data, error } = await supabase.rpc("semantic_demo_search", {
      query_embedding: queryEmbedding,
      match_count: matchCount,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }

    setRows((data ?? []) as SemanticDemoRow[]);
    setIsLoading(false);
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">Semantic Demo Search (pgvector)</h1>
      <p className="mt-2 text-sm text-neutral-600">
        This page queries{" "}
        <code className="rounded bg-neutral-100 px-1 py-0.5">products_semantic_demo</code> via the{" "}
        <code className="rounded bg-neutral-100 px-1 py-0.5">semantic_demo_search</code> RPC.
        We are not touching the real products table.
      </p>

      <div className="mt-6 grid gap-4 rounded border border-neutral-200 p-4">
        <label className="grid gap-1">
          <span className="text-sm font-medium">Query vector literal (vector(3))</span>
          <input
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            type="text"
            value={queryEmbedding}
            onChange={(e) => setQueryEmbedding(e.target.value)}
            placeholder="[0.89, 0.11, 0.00]"
          />
          <span className="text-xs text-neutral-500">Must be exactly 3 numbers for this tutorial.</span>
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Result count</span>
          <input
            className="w-32 rounded border border-neutral-300 px-3 py-2 text-sm"
            type="number"
            min={1}
            max={20}
            value={matchCount}
            onChange={(e) => setMatchCount(Number(e.target.value))}
          />
        </label>

        <button
          className="w-fit rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
          onClick={runSearch}
          disabled={isLoading}
        >
          {isLoading ? "Searching\u2026" : "Run semantic search"}
        </button>

        {errorMessage && (
          <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <strong className="font-semibold">Error:</strong> {errorMessage}
          </div>
        )}
      </div>

      <h2 className="mt-8 text-lg font-semibold">Results</h2>
      {rows.length === 0 ? (
        <p className="mt-2 text-sm text-neutral-600">No results yet. Run a search to see ranked rows.</p>
      ) : (
        <ul className="mt-3 grid gap-2">
          {rows.map((r) => (
            <li key={r.id} className="rounded border border-neutral-200 p-3">
              <div className="flex items-center justify-between gap-4">
                <div className="font-medium">{r.name}</div>
                <div className="text-sm tabular-nums text-neutral-600">
                  dist: {r.cosine_distance.toFixed(4)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}