// src/components/state/ProductSkeletonList.tsx
type ProductSkeletonListProps = {
    count?: number;
  };

  export function ProductSkeletonList({ count = 6 }: ProductSkeletonListProps) {
    const items = Array.from({ length: count }, (_, index) => index);

    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
        {items.map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="h-40 animate-pulse bg-slate-200"></div>
            <div className="space-y-3 p-4">
              <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200"></div>
              <div className="h-4 w-full animate-pulse rounded bg-slate-100"></div>
              <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100"></div>
              <div className="h-6 w-24 animate-pulse rounded bg-slate-200"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
