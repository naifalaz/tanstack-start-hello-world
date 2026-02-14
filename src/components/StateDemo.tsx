import * as React from "react";

type ViewMode = "list" | "grid";

export function StateDemo() {
    const [viewMode, setViewMode] = React.useState<ViewMode>("list");

    return (
        <div className="p-4 space-y-3">
            <p className="text-sm">Current view mode (state): {viewMode}</p>

            <button
                className="px-3 py-2 rounded bg-slate-900 text-white"
                onClick={() => {
                    setViewMode(viewMode === "list" ? "grid" : "list");
                }}
            >
                Toggle (state)
            </button>

            <p className="text-xs text-slate-600">
                This one updates immediately because state changes trigger a re-render.
            </p>
        </div>
    );
}