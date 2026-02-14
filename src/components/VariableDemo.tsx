export function VariableDemo() {
    let viewMode = "list"; // normal variable

    return (
      <div className="p-4 space-y-3">
        <p className="text-sm">Current view mode (variable): {viewMode}</p>
        <button
          className="px-3 py-2 rounded bg-slate-900 text-white"
          onClick={() => {
            viewMode = viewMode === "list" ? "grid" : "list";
            console.log("viewMode changed to:", viewMode);
          }}
        >
          Toggle (variable)
        </button>
        <p className="text-xs text-slate-600">
          Notice: the console logs change, but the text above usually does not.
        </p>
      </div>
    );
  }