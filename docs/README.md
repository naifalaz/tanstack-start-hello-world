# SkyLaunch Docs

## Quality Checks

- [Lighthouse report](./lighthouse-report.html)
- [Lighthouse notes](./lighthouse-notes.md)
- [Architecture diagram](./architecture.md)

## Accessibility Review Summary

We reviewed the product list, Add Product toggle, and admin edit/delete controls using Chrome DevTools and keyboard-only navigation. The main fixes focused on semantic buttons, clear control labels, and state visibility for toggled panels.

## Supabase Metrics Summary

We added a lightweight development-only wrapper around key Supabase calls. This currently tracks request counts and timing for product loading so we can detect duplicate fetches and observe whether seeded product data changes request cost.

## Why this matters

These artifacts show that SkyLaunch is not only functional, but also audited, explainable, and prepared for a portfolio demo.