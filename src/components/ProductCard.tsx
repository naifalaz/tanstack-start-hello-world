import { useState } from "react";

export type ProductView = "grid" | "list";

export type ProductCardProps = {
  id: string;
  title: string;
  description: string;
  badgeText?: string;

  // ✅ New fields
  imageUrl?: string | null;
  category?: string;
  price?: number;

  isSelected: boolean;
  onToggleSelected: (productId: string) => void;
};

export function ProductCard({
  id,
  title,
  description,
  badgeText,
  imageUrl,
  category,
  price,
  isSelected,
  onToggleSelected,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      onClick={() => onToggleSelected(id)}
      className={`
        rounded border p-4 cursor-pointer
        transition hover:shadow-md
        ${isSelected ? "border-slate-900 bg-slate-50" : "border-slate-200"}
      `}
    >
      {/* Image */}
      {imageUrl && !imgError ? (
        <img
          src={imageUrl}
          alt={title}
          className="h-48 w-full object-cover rounded mb-3"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="h-48 w-full flex items-center justify-center bg-slate-100 text-sm text-slate-500 mb-3 rounded">
          No image available
        </div>
      )}

      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-medium">{title}</h3>

          {category && (
            <p className="text-xs text-slate-500">{category}</p>
          )}
        </div>

        <div className="flex flex-col items-end gap-1">
          {badgeText && (
            <span className="text-xs bg-slate-100 px-2 py-1 rounded">
              {badgeText}
            </span>
          )}

          {price !== undefined && (
            <span className="text-sm font-semibold text-emerald-700">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
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