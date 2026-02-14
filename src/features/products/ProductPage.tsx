import * as React from "react";

//import { ProductHighlight } from "../../components/ProductHighlight";
import type { ProductHighlightProps } from "../../components/ProductHighlight";
import { HighlightsSection } from "@/components/HighlightsSection";
import { ProductCard } from "../../components/ProductCard";
import { ViewToggle } from "./ViewToggle";


type ViewMode = "list" | "grid";

const highlights: ProductHighlightProps[] = [
    {
        id: "fast-shipping",
        title: "Fast shipping",
        description: "Get your order in 2–3 business days with live tracking.",
        badgeText: "Popular",
    },
    {
        id: "quality",
        title: "Built to last",
        description: "Durable materials and a 2-year warranty included.",
    },
    {
        id: "support",
        title: "Human support",
        description: "Chat with a real person in under 2 minutes.",
        badgeText: "New",
    },

    {
        id: "eco-friendly",
        title: "Eco-Friendly",
        description: "Made with sustainable materials and processes.",
        badgeText: "New",
        // featured: "true",
    },
];

export default function HomePage() {
    const [viewMode, setViewMode] = React.useState<ViewMode>("grid");
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

    const baseBtn = "px-3 py-2 rounded border text-sm";
    const activeBtn = "bg-slate-900 text-white border-slate-900";
    const inactiveBtn = "bg-white text-slate-900 border-slate-300";

    // ✅ Immutable toggle
    function toggleSelected(id: string) {
        setSelectedIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((x) => x !== id);
            }
            return [...prev, id];
        });
    }

    return (
        <main className="mx-auto max-w-4xl p-6">
            <h1 className="text-2xl font-bold text-zinc-900">
                Product Highlights
            </h1>

            <p className="mt-2 text-zinc-600">
                Selected:{" "}
                <span className="font-medium">{selectedIds.length}</span>
            </p>

            <HighlightsSection
                heading="Why customers love this"
                subheading="Highlights are passed as props"
            >
                {/* HEADER */}
                <header className="flex items-center mb-4">
                    <h1 className="text-xl font-semibold flex-1">
                        Products Highlights
                    </h1>

                    <div className="flex items-center justify-center gap-2 flex-1">
                        <button
                            type="button"
                            className={`${baseBtn} ${viewMode === "list" ? activeBtn : inactiveBtn
                                }`}
                            onClick={() => setViewMode("list")}
                        >
                            List
                        </button>

                        <button
                            type="button"
                            className={`${baseBtn} ${viewMode === "grid" ? activeBtn : inactiveBtn
                                }`}
                            onClick={() => setViewMode("grid")}
                        >
                            Grid
                        </button>
                    </div>

                    {/* <p className="text-sm text-slate-600 flex-1 text-right whitespace-nowrap">
                        Current view:{" "}
                        <span className="font-medium">{viewMode}</span>
                    </p> */}
                </header>

                {/* PRODUCTS */}
                {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {highlights.map((h) => (
                            <ProductCard
                                key={h.id}
                                {...h}
                                isSelected={selectedIds.includes(h.id)}
                                onToggleSelected={toggleSelected}
                            />
                        ))}

                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {highlights.map((h) => (
                            <ProductCard
                                key={h.id}
                                {...h}
                                isSelected={selectedIds.includes(h.id)}
                                onToggleSelected={toggleSelected}
                            />
                        ))}

                    </div>
                )}
            </HighlightsSection>
        </main>
    );
}
