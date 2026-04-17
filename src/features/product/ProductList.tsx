import { useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
  onEdit: (productId: string) => void;
  onDelete: (productId: string) => void;
}

export function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  const [openActionsId, setOpenActionsId] = useState<string | null>(null);

  function toggleActions(productId: string): void {
    setOpenActionsId((prev) => (prev === productId ? null : productId));
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <article
          key={product.id}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{product.name}</h2>
              <p className="text-sm text-slate-600">{product.description}</p>
              <p className="mt-2 text-sm font-medium text-emerald-700">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => toggleActions(product.id)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {openActionsId === product.id ? "Close Actions" : "Manage"}
            </button>
          </div>

          {openActionsId === product.id && (
            <div className="mt-4 flex gap-3 border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={() => onEdit(product.id)}
                className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(product.id)}
                className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}