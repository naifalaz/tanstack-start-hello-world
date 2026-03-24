// Example: src/routes/supabase-check.tsx (adapt to your TanStack Start routing)
import * as React from "react";
import { supabase } from "src/utils/supabaseClient";

export default function SupabaseCheckPage() {
  const [result, setResult] = React.useState<string>("Loading...");

  React.useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setResult(`Error: ${error.message}`);
        return;
      }

      // data.session is often null when not signed in (that is OK)
      setResult(JSON.stringify(data, null, 2));
    })();
  }, []);

  return (
    <main style={{ padding: 16 }}>
      <h1>Supabase Config Check</h1>
      <p>If you see JSON below, your client can talk to Supabase.</p>
      <pre>{result}</pre>
    </main>
  );
}