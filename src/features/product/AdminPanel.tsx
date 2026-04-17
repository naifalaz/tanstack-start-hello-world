// src/features/product/AdminPanel.tsx
import { useState } from 'react';

type Product = {
  id: number;
  title: string;
  price: number;
};

type AdminPanelProps = {
  products: Product[];
  onDelete: (productId: number) => void;
  onEdit: (productId: number) => void;
};

export function AdminPanel({ products, onDelete, onEdit }: AdminPanelProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [openProductId, setOpenProductId] = useState<number | null>(null);

  function toggleAddForm(): void {
    setShowAddForm((prev) => !prev);
  }

  function toggleManage(productId: number): void {
    setOpenProductId((prev) => (prev === productId ? null : productId));
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-900">Admin Controls</h2>
        <button
          type="button"
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
          onClick={toggleAddForm}
          aria-expanded={showAddForm}
        >
          {showAddForm ? 'Hide Add Product Form' : 'Show Add Product Form'}
        </button>
      </div>

      {showAddForm && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Add a New Product</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Product name" type="text" />
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Price" type="number" />
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {products.map((product) => (
          <article key={product.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
                <p className="text-sm text-slate-600">${product.price.toFixed(2)}</p>
              </div>
              <button
                type="button"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => toggleManage(product.id)}
                aria-expanded={openProductId === product.id}
              >
                {openProductId === product.id ? 'Hide Controls' : 'Manage Product'}
              </button>
            </div>

            {openProductId === product.id && (
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
                  onClick={() => onEdit(product.id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  onClick={() => onDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

