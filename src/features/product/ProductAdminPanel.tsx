// src/features/product/ProductAdminPanel.tsx
import { useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
};

type ProductAdminPanelProps = {
  products?: Product[];
};

export function ProductAdminPanel({ products = [] }: ProductAdminPanelProps) {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const adminLabel = showAdmin ? 'Hide admin controls' : 'Show admin controls';
  const formLabel = showAddForm ? 'Hide add product form' : 'Show add product form';

  function toggleAdmin(): void {
    setShowAdmin((prev) => !prev);
  }

  function toggleAddForm(): void {
    setShowAddForm((prev) => !prev);
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 p-4">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900">SkyLaunch Gear</h1>
        <p className="text-sm text-slate-600">Manage products and review the catalog before launch.</p>
      </header>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50"
          aria-expanded={showAdmin}
          aria-controls="admin-controls"
          onClick={toggleAdmin}
        >
          {adminLabel}
        </button>

        <button
          type="button"
          className="rounded-lg border border-sky-300 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-800 shadow-sm hover:bg-sky-100"
          aria-expanded={showAddForm}
          aria-controls="add-product-panel"
          onClick={toggleAddForm}
        >
          {formLabel}
        </button>
      </div>

      {showAddForm && (
        <section id="add-product-panel" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Add a new product</h2>
          <div className="mt-3 grid gap-3">
            <label className="grid gap-1 text-sm text-slate-700">
              <span>Product name</span>
              <input className="rounded-lg border border-slate-300 px-3 py-2" type="text" name="name" />
            </label>
            <label className="grid gap-1 text-sm text-slate-700">
              <span>Price</span>
              <input className="rounded-lg border border-slate-300 px-3 py-2" type="number" name="price" />
            </label>
          </div>
        </section>
      )}

      <section className="grid gap-3" id="admin-controls">
        <h2 className="text-lg font-semibold text-slate-900">Products</h2>
        {products.map((product) => (
          <article key={product.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-900">{product.name}</h3>
                <p className="text-sm text-slate-600">${product.price.toFixed(2)}</p>
              </div>

              {showAdmin && (
                <div className="flex gap-2">
                  <button type="button" className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900">
                    Edit
                  </button>
                  <button type="button" className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-900">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}