// src/lib/database.types.ts
export type Database = {
	public: {
		Tables: {
			products: {
				Row: {
					id: string;
					name: string;
					description: string | null;
					price_cents: number;
					is_active: boolean;
					created_at: string;
				};
				Insert: {
					id?: string;
					name: string;
					description?: string | null;
					price_cents: number;
					is_active?: boolean;
					created_at?: string;
				};
				Update: {
					id?: string;
					name?: string;
					description?: string | null;
					price_cents?: number;
					is_active?: boolean;
					created_at?: string;
				};
			};
			messages: {
				Row: {
					id: string;
					name: string | null;
					email: string | null;
					message: string | null;
					status: string;
					created_at: string;
				};
				Insert: {
					id?: string;
					name?: string | null;
					email?: string | null;
					message?: string | null;
					status?: string;
					created_at?: string;
				};
				Update: {
					id?: string;
					name?: string | null;
					email?: string | null;
					message?: string | null;
					status?: string;
					created_at?: string;
				};
			};
		};
	};
};