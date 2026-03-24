// // src/features/product/productService.ts
// import { supabase } from "src/lib/supabaseClient.ts";

// export type ProductInsert = {
// 	name: string;
// 	description: string | null;
// 	price_cents: number;
// 	is_active: boolean;
// };

// export type ProductUpdate = {
// 	name?: string;
// 	description?: string | null;
// 	price_cents?: number;
// 	is_active?: boolean;
// };

// export async function getActiveProducts() {
// 	const { data, error } = await supabase
// 		.from("products")
// 		.select("id, name, description, price_cents, is_active, created_at")
// 		.eq("is_active", true)
// 		.order("created_at", { ascending: false });

// 	if (error) {
// 		throw new Error(`Failed to load products: ${error.message}`);
// 	}

// 	return data;
// }

// export async function addProduct(payload: ProductInsert) {
// 	const { data, error } = await supabase
// 		.from("products")
// 		.insert(payload)
// 		.select("id, name, description, price_cents, is_active, created_at")
// 		.single();

// 	if (error) {
// 		throw new Error(`Failed to add product: ${error.message}`);
// 	}

// 	return data;
// }

// export async function updateProduct(productId: string, patch: ProductUpdate) {
// 	const { data, error } = await supabase
// 		.from("products")
// 		.update(patch)
// 		.eq("id", productId)
// 		.select("id, name, description, price_cents, is_active, created_at")
// 		.single();

// 	if (error) {
// 		throw new Error(`Failed to update product: ${error.message}`);
// 	}

// 	return data;
// }

// export async function deleteProduct(productId: string) {
// 	const { error } = await supabase.from("products").delete().eq("id", productId);

// 	if (error) {
// 		throw new Error(`Failed to delete product: ${error.message}`);
// 	}
// }
