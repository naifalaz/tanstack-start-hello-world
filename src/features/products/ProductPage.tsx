import { useState } from "react";
import type { Product } from "./productTypes";

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
          style={{
            fontWeight: "bold",
            backgroundColor: "#eee",
            border: "none",
            padding: "0.2rem 0.5rem",
            cursor: "pointer",
          }}
        >
          View details
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          style={{
            fontWeight: "bold",
            backgroundColor: isSelected ? "#ccc" : "#eee",
            border: "none",
            padding: "0.2rem 0.5rem",
            cursor: "pointer",
          }}
        >
          {isSelected ? "Selected" : "Select"}
        </button>
      </div>
      {featured && (
        <p style={{ color: "red", fontWeight: "bold", margin: "0.2rem 0 0 0" }}>
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
        <button
          onClick={onEdit}
          style={{
            color: "blue",
            textDecoration: "underline",
            marginRight: "0.3rem",
            fontWeight: "normal",
            fontSize: "0.7rem",
          }}
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          style={{
            color: "red",
            textDecoration: "underline",
            fontWeight: "normal",
            fontSize: "0.7rem",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [gridView, setGridView] = useState(true);

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
  };

  const deleteProduct = (id: string) => setProducts(products.filter((p) => p.id !== id));

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

  const viewDetails = (title: string) => alert(`Viewing details for ${title}`);

  return (
    <div style={{ padding: "2rem" }}>
      {/* Page title */}
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.2rem" }}>
        Product Highlights
      </h1>
      <p style={{ marginBottom: "1rem" }}>
        These highlights come from a parent data array and render via reusable child components
      </p>

      {/* Big tile */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        {/* Subtitle */}
        <h3 style={{ margin: "0.2rem 0", fontWeight: "bold" }}>Why customers love this</h3>
        <p style={{ fontWeight: "normal", marginBottom: "1rem" }}>Highlights are passed as props</p>

        {/* Products title above Add Product */}
        <h2 style={{ margin: "0.2rem 0", fontWeight: "bold" }}>Products</h2>

        {/* Grid/List toggle */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.5rem" }}>
          <button
            onClick={() => setGridView(true)}
            style={{
              marginRight: "0.5rem",
              fontWeight: gridView ? "bold" : "normal",
              backgroundColor: gridView ? "#ddd" : "#eee",
              border: "none",
              padding: "0.3rem 0.6rem",
              cursor: "pointer",
            }}
          >
            Grid
          </button>
          <button
            onClick={() => setGridView(false)}
            style={{
              fontWeight: !gridView ? "bold" : "normal",
              backgroundColor: !gridView ? "#ddd" : "#eee",
              border: "none",
              padding: "0.3rem 0.6rem",
              cursor: "pointer",
            }}
          >
            List
          </button>
        </div>

        {/* Add product */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          <input
            type="text"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            placeholder="Product name"
            style={{ flex: 1, marginRight: "0.5rem" }}
          />
          <button
            onClick={addProduct}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "0.4rem 0.8rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Product
          </button>
        </div>

        {/* Added products */}
        {products.length ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: gridView ? "repeat(3, 1fr)" : "1fr",
              gap: "0.5rem",
              marginBottom: "1rem",
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
          <p>No products added yet</p>
        )}

        {/* Selected count */}
        <p style={{ fontWeight: "bold", marginBottom: "1rem" }}>
          Selected: {selectedProducts.size}
        </p>

        {/* Highlights grid/list */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridView ? "repeat(3, 1fr)" : "1fr",
            gap: "0.5rem",
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
      </div>
    </div>
  );
}