# SkyLaunch Environment Variables

## Local Development
Create a file named `.env.local` in the project root.

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
VITE_ENABLE_AI_SEARCH=true
VITE_ENABLE_HYBRID_SEARCH=true
```

## Production on Vercel
Set these in the Vercel project settings:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ENABLE_AI_SEARCH=false`
- `VITE_ENABLE_HYBRID_SEARCH=false`

## Variable Reference
| Variable | Required | Example | Purpose |
|---|---|---|---|
| `VITE_SUPABASE_URL` | Yes | `https://abc.supabase.co` | Connects the app to Supabase |
| `VITE_SUPABASE_ANON_KEY` | Yes | `eyJ...` | Public client key for Supabase |
| `VITE_ENABLE_AI_SEARCH` | Yes | `true` or `false` | Controls whether AI search UI is shown |
| `VITE_ENABLE_HYBRID_SEARCH` | Yes | `true` or `false` | Controls whether Hybrid search UI is shown |

## Notes
- Vite only exposes environment variables that begin with `VITE_` to client-side code.
- In production on Vercel, AI and Hybrid search should be hidden because local Ollama-based embeddings are not available there.
- After changing environment variables, restart the dev server so Vite reloads them.