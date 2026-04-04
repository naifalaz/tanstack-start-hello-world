import * as React from 'react';
import { searchProductsHybrid, type HybridSearchRow } from './hybridSearch';

// TODO: Replace this import with YOUR existing embedding helper from Topics 1–2.
// Example shapes you might have:
//   import { embedText } from '@/features/ai/embedText';
//   import { getEmbedding } from '@/features/ai/embeddings';
import { embedText } from '../ai/embedText';

type CategoryOption = {
  label: string;
  value: string;
};

const PAGE_SIZE = 10;

export function HybridSearchPage(): React.JSX.Element {
  const [query, setQuery] = React.useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = React.useState<string>('');
  const [category, setCategory] = React.useState<string>('');
  const [activeOnly, setActiveOnly] = React.useState<boolean>(true);
  const [page, setPage] = React.useState<number>(1);

  const [rows, setRows] = React.useState<HybridSearchRow[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const categoryOptions: CategoryOption[] = React.useMemo(
    () => [
      { label: 'All categories', value: '' },
      { label: 'Backpacks', value: 'Backpacks' },
      { label: 'Shoes', value: 'Shoes' },
      { label: 'Jackets', value: 'Jackets' },
      { label: 'Other', value: 'Other' }
    ],
    []
  );

  // Debounce typing: wait 350ms after the user stops typing
  React.useEffect(() => {
    const t = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
      setPage(1); // reset pagination when the query changes
    }, 350);

    return () => {
      window.clearTimeout(t);
    };
  }, [query]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setPage(1);
  }, [category, activeOnly]);

  React.useEffect(() => {
    let cancelled = false;

    async function run(): Promise<void> {
      setError(null);

      // If there's no query, show empty state instead of wasting calls.
      if (!debouncedQuery) {
        setRows([]);
        return;
      }

      setLoading(true);
      try {
        const embedding = await embedText(debouncedQuery);

        const offset = (page - 1) * PAGE_SIZE;
        const data = await searchProductsHybrid({
          query: debouncedQuery,
          queryEmbedding: embedding,
          category: category || undefined,
          activeOnly,
          limit: PAGE_SIZE,
          offset
        });

        if (!cancelled) {
          setRows(data);
        }
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        if (!cancelled) {
          setError(message);
          setRows([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, category, activeOnly, page]);

  return (
    <div className="mx-auto w-full max-w-5xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900">Hybrid Search</h1>
        <p className="mt-2 text-sm text-zinc-600">
          SkyLaunch hybrid search combines keyword relevance (full-text search) and semantic relevance (pgvector)
          with filters and pagination.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="text-sm font-medium text-zinc-800">Search</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try: waterproof hiking backpack"
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400"
            />
            <div className="mt-1 text-xs text-zinc-500">
              Debounced: we search ~350ms after you stop typing.
            </div>
          </div>

          <div className="w-full md:w-56">
            <label className="text-sm font-medium text-zinc-800">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm text-zinc-800">
            <input
              type="checkbox"
              checked={activeOnly}
              onChange={(e) => setActiveOnly(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-300"
            />
            Active only
          </label>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-sm text-zinc-600">
            {loading ? 'Searching…' : debouncedQuery ? `Showing up to ${PAGE_SIZE} results` : 'Type to search'}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 disabled:opacity-50"
            >
              Prev
            </button>
            <div className="text-sm text-zinc-700">Page {page}</div>
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              disabled={loading || rows.length < PAGE_SIZE}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {error ? (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        ) : null}

        <div className="mt-4 divide-y divide-zinc-100 overflow-hidden rounded-lg border border-zinc-200">
          {rows.length === 0 ? (
            <div className="p-4 text-sm text-zinc-600">
              {debouncedQuery ? 'No results found.' : 'Enter a search query to see results.'}
            </div>
          ) : (
            rows.map((r) => (
              <div key={r.id} className="p-4">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <div className="font-medium text-zinc-900">{r.title}</div>
                  <div className="text-xs text-zinc-500">
                    category: {r.category ?? '—'} • active: {String(r.is_active)}
                  </div>
                </div>

                {r.description ? (
                  <div className="mt-1 text-sm text-zinc-700">{r.description}</div>
                ) : null}

                <div className="mt-2 grid grid-cols-1 gap-2 text-xs text-zinc-600 md:grid-cols-3">
                  <div className="rounded-md bg-zinc-50 px-2 py-1">
                    keyword_rank: <span className="font-mono">{r.keyword_rank.toFixed(4)}</span>
                  </div>
                  <div className="rounded-md bg-zinc-50 px-2 py-1">
                    semantic_score: <span className="font-mono">{r.semantic_score.toFixed(4)}</span>
                  </div>
                  <div className="rounded-md bg-zinc-50 px-2 py-1">
                    combined_score: <span className="font-mono">{r.combined_score.toFixed(4)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4">
        <div className="text-sm font-medium text-zinc-900">Try this relevance experiment</div>
        <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700">
          <li>Search a very specific keyword like <span className="font-mono">"boot"</span> and watch keyword_rank dominate.</li>
          <li>Search a fuzzy phrase like <span className="font-mono">"rainy mountain bag"</span> and watch semantic_score help.</li>
          <li>Toggle <span className="font-mono">Active only</span> and confirm results disappear when items are inactive.</li>
        </ul>
      </div>
    </div>
  );
}