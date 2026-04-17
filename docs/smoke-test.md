# SkyLaunch Production Smoke Test

## Target
- Production URL: https://your-vercel-app.vercel.app

## Checks
1. Open `https://your-vercel-app.vercel.app`
   - Expected: Home page loads without a blank screen
2. Open `https://your-vercel-app.vercel.app/api/health`
   - Expected: JSON response with `"status":"ok"`
3. Confirm product cards render with seeded data
   - Expected: Multiple realistic items and images are visible
4. Use the main search input
   - Expected: Searching for `tent` or `backpack` returns relevant products
5. Confirm AI and Hybrid search UI are hidden
   - Expected: No production UI for local-only AI search appears
6. Open browser dev tools console
   - Expected: No critical runtime errors during the demo path