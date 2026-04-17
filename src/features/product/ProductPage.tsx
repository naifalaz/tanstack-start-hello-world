import { useState } from "react";
import type { Product } from "./productTypes";

import { Spinner } from "../../components/state/Spinner";
import { ProductSkeletonList } from "../../components/state/ProductSkeletonList";
import { StatePanel } from "../../components/state/StatePanel";

// Reusable child component for small highlight tiles
function ProductTile({
  title,
  description,
  featured,
  isSelected,
  onSelect,
  onViewDetails,
}: {
  title: string;
  description: string;
  featured?: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onViewDetails: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      style={{
        border: "1px solid #ccc",
        padding: "0.5rem",
        borderRadius: "6px",
        backgroundColor: isSelected ? "#ddd" : "#fff",
        fontSize: "0.75rem",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      <h3 style={{ margin: "0.2rem 0", fontWeight: "bold" }}>{title}</h3>
      <p style={{ margin: "0.2rem 0" }}>{description}</p>

      <div style={{ marginTop: "auto", display: "flex", gap: "0.5rem" }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
        >
          View details
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          {isSelected ? "Selected" : "Select"}
        </button>
      </div>

      {featured && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          Featured highlights
        </p>
      )}
    </div>
  );
}

// Small tile for added products
function AddedProductTile({
  title,
  onEdit,
  onDelete,
}: {
  title: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "6px",
        padding: "0.3rem",
        fontSize: "0.75rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0.3rem",
        backgroundColor: "#f9f9f9",
      }}
    >
      <span style={{ fontWeight: "bold" }}>{title}</span>
      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [gridView, setGridView] = useState(true);

  const [showAddForm, setShowAddForm] = useState(false);

  // ✅ NEW STATE (simulated loading for now)
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const highlights = [
    { title: "Test Product one", description: "Some description" },
    { title: "Classic Mug", description: "Ceramic mug with store logo", featured: true },
    { title: "Canvas Tote", description: "Reusable tote bag", featured: true },
    { title: "Limited Sticker Pack", description: "A set of 5 stickers" },
  ];

  const addProduct = () => {
    if (!newProductName) return;

    setProducts([
      ...products,
      {
        id: Date.now().toString(),
        title: newProductName,
        badge_text: 0,
        description: "",
        created_at: new Date().toISOString(),
        featured: false,
        is_selected: false,
        image_url: "",
      },
    ]);

    setNewProductName("");
    setShowAddForm(false);
  };

  const deleteProduct = (id: string) =>
    setProducts(products.filter((p) => p.id !== id));

  const editProduct = (id: string) => {
    const newName = prompt("Enter new product name:");
    if (!newName) return;
    setProducts(products.map((p) => (p.id === id ? { ...p, title: newName } : p)));
  };

  const toggleSelectProduct = (id: string) => {
    const newSet = new Set(selectedProducts);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedProducts(newSet);
  };

  const viewDetails = (title: string) =>
    alert(`Viewing details for ${title}`);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
        Product Highlights
      </h1>

      {/* ===================== */}
      {/* STATE: LOADING */}
      {/* ===================== */}
      {loading && (
        <div style={{ marginTop: "1rem" }}>
          <Spinner label="Loading products..." />
          <div style={{ marginTop: "1rem" }}>
            <ProductSkeletonList count={6} />
          </div>
        </div>
      )}

      {/* ===================== */}
      {/* STATE: ERROR */}
      {/* ===================== */}
      {error && (
        <StatePanel
          title="Something went wrong"
          message={error}
          tone="error"
          actionLabel="Retry"
          onAction={() => window.location.reload()}
        />
      )}

      {/* ===================== */}
      {/* MAIN CONTENT */}
      {/* ===================== */}
      {!loading && !error && (
        <>
          {/* Toggle button */}
          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            style={{
              margin: "1rem 0",
              padding: "0.5rem 1rem",
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {showAddForm ? "Hide Form" : "Add Product"}
          </button>

          {/* Add form */}
          {showAddForm && (
            <div style={{ display: "flex", marginBottom: "1rem" }}>
              <input
                type="text"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                placeholder="Product name"
                style={{ flex: 1, marginRight: "0.5rem" }}
              />
              <button onClick={addProduct}>Save</button>
            </div>
          )}

          {/* Products */}
          {products.length ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: gridView ? "repeat(3, 1fr)" : "1fr",
                gap: "0.5rem",
              }}
            >
              {products.map((p) => (
                <AddedProductTile
                  key={p.id}
                  title={p.title}
                  onEdit={() => editProduct(p.id)}
                  onDelete={() => deleteProduct(p.id)}
                />
              ))}
            </div>
          ) : (
            <StatePanel
              title="No products yet"
              message="Add your first product to get started building your catalog."
            />
          )}

          {/* Highlights */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: gridView ? "repeat(3, 1fr)" : "1fr",
              gap: "0.5rem",
              marginTop: "2rem",
            }}
          >
            {highlights.map((h) => (
              <ProductTile
                key={h.title}
                title={h.title}
                description={h.description}
                featured={h.featured}
                isSelected={selectedProducts.has(h.title)}
                onSelect={() => toggleSelectProduct(h.title)}
                onViewDetails={() => viewDetails(h.title)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}