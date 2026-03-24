// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// TanStack Start projects often use Vite-style env access in client code.
// If your starter uses a different pattern, keep the same idea:
// 1) read env vars
// 2) validate them
// 3) create and export a single client

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl) {
  throw new Error(
    "Missing VITE_SUPABASE_URL. Add it to .env.local and restart the dev server."
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "Missing VITE_SUPABASE_ANON_KEY. Add it to .env.local and restart the dev server."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);