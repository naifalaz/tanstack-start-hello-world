import * as React from "react";

export type ProductCardProps = {
  id: string;
  title: string;
  description: string;
  badgeText?: string;

  isSelected: boolean;
  onToggleSelected: (productId: string) => void;
};

export function ProductCard({
  id,
  title,
  description,
  badgeText,
  isSelected,
  onToggleSelected,
}: ProductCardProps) {
  return (
    <article
      onClick={() => onToggleSelected(id)}
      className={`
        rounded border p-4 cursor-pointer
        transition hover:shadow-md
        ${isSelected ? "border-slate-900 bg-slate-50" : "border-slate-200"}
      `}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium">{title}</h3>

        {badgeText && (
          <span className="text-xs bg-slate-100 px-2 py-1 rounded">
            {badgeText}
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-slate-600">
        {description}
      </p>

      {/* Buttons */}
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          className="text-sm underline text-slate-900"
          onClick={(e) => {
            e.stopPropagation();
            console.log("View details:", id);
          }}
        >
          View details
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelected(id);
          }}
          className={`
            text-sm px-2 py-1 rounded border
            ${
              isSelected
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-900 border-slate-300"
            }
          `}
        >
          {isSelected ? "Selected" : "Select"}
        </button>
      </div>
    </article>
  );
}
