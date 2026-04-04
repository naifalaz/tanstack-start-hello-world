import { ProductSearchPanel } from "./ProductSearchPanel";
import { FaqAskPanel } from "./FaqAskPanel";

export function AiSearchPage() {
  return (
    <main className="mx-auto w-full max-w-6xl p-4">
      <header className="mb-4">
        <h1 className="text-xl font-bold text-slate-900">AI Search</h1>
        <p className="mt-1 text-sm text-slate-600">
          Semantic product search + FAQ Q&A. This is SkyLaunch’s polished AI experience for discovery and support.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ProductSearchPanel title="Semantic Product Search" />
        <FaqAskPanel title="FAQ: Ask a Question" />
      </div>
    </main>
  );
}

