// src/features/products/ViewToggle.tsx

import type { ProductView } from "../.../components/ProductCard"

type ViewToggleProps = {
    value: ProductView
    onChange: (next: ProductView) => void
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
    const base =
        "rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30"

    return (
        <div className="inline-flex rounded-xl border border-zinc-200 bg-white p-1">
            <button
                type="button"
                className={
                    base +
                    " " +
                    (value === "grid"
                        ? "bg-zinc-900 text-white"
                        : "text-zinc-700 hover:bg-zinc-50")
                }
                onClick={() => onChange("grid")}
                aria-pressed={value === "grid"}
            >
                Grid
            </button>

            <button
                type="button"
                className={
                    base +
                    " " +
                    (value === "list"
                        ? "bg-zinc-900 text-white"
                        : "text-zinc-700 hover:bg-zinc-50")
                }
                onClick={() => onChange("list")}
                aria-pressed={value === "list"}
            >
                List
            </button>
        </div>
    )
}