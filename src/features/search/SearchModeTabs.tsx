// src/components/search/SearchModeTabs.tsx
type SearchMode = 'standard' | 'ai' | 'hybrid';

type SearchModeTabsProps = {
  activeMode: SearchMode;
  onModeChange: (mode: SearchMode) => void;
};

const showExperimentalSearch =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_AI_SEARCH === 'true';

export function SearchModeTabs({ activeMode, onModeChange }: SearchModeTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        className={`rounded-lg px-4 py-2 text-sm font-medium ${activeMode === 'standard' ? 'bg-sky-600 text-white' : 'border border-slate-300 text-slate-700'}`}
        onClick={() => onModeChange('standard')}
      >
        Standard Search
      </button>

      {showExperimentalSearch && (
        <>
          <button
            type="button"
            className={`rounded-lg px-4 py-2 text-sm font-medium ${activeMode === 'ai' ? 'bg-sky-600 text-white' : 'border border-slate-300 text-slate-700'}`}
            onClick={() => onModeChange('ai')}
          >
            AI Search
          </button>
          <button
            type="button"
            className={`rounded-lg px-4 py-2 text-sm font-medium ${activeMode === 'hybrid' ? 'bg-sky-600 text-white' : 'border border-slate-300 text-slate-700'}`}
            onClick={() => onModeChange('hybrid')}
          >
            Hybrid Search
          </button>
        </>
      )}
    </div>
  );
}