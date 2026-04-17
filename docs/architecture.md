# SkyLaunch Architecture

```mermaid
flowchart LR
    A["User Browser"] --> B["React App"]
    B --> C["TanStack Router"]
    C --> D["Products Route"]
    D --> E["Product UI and Search"]
    E --> F["Feature Flags"]
    E --> G["Supabase Client"]
    F --> H["Local AI and Hybrid Search"]
    G --> I["Supabase Database"]
```

The browser loads the React app, which uses TanStack Router to render the products route. The product UI reads feature flags to hide local-only AI search in production and sends data requests through the Supabase client to the database.