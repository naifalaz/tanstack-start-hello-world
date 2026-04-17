# SkyLaunch Launch Checklist

## Pre-Deploy
- [ ] README updated with live demo URL and docs links
- [ ] docs/environment.md matches actual environment variable names
- [ ] docs/demo-script.md reviewed and timed
- [ ] Seeded product data is present and search results are meaningful
- [ ] Add, edit, and delete controls are toggled appropriately
- [ ] Unit tests pass locally
- [ ] End-to-end test passes locally

## Deploy
- [ ] Vercel environment variables are set
- [ ] Production build completes successfully
- [ ] Latest commit is deployed

## Post-Deploy
- [ ] Home page loads on production URL
- [ ] `/api/health` returns status ok
- [ ] Product search works with seeded data
- [ ] AI and Hybrid search UI are hidden in production
- [ ] Browser console has no critical runtime errors
- [ ] Demo path works from start to finish