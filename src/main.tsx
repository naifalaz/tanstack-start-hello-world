// ✅ Debug ENV (remove later if you want)
console.log("ENV URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("ENV KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  Link,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import './styles.css';
import App from './App.tsx';
import ContactPage from './features/contact/ContactPage.tsx';
import ProductPage from './features/products/ProductPage.tsx';
import SemanticDemoPage from './routes/semantic_demo.tsx';
import { SemanticSearchPage } from './features/search/SemanticSearchPage';

import { HybridSearchPage } from './features/search/HybridSearchPage';
import { AiSearchPage } from './features/aiSearch/AiSearchPage';


// ✅ Navigation Bar
//import { Link } from '@tanstack/router';

function NavBar() {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        borderBottom: '1px solid #ccc',
        backgroundColor: '#f9f9f9', // subtle background for contrast
      }}
    >
      {/* Left */}
      <div style={{ fontWeight: 'bold', fontSize: '1.4rem', color: '#111' }}>
        SkyLaunch
      </div>

      {/* Left navigation link */}
      <Link
        to="/search"
        activeProps={{ style: { fontWeight: 'bold', color: 'blue' } }}
        style={{ marginRight: '2rem', textDecoration: 'none', color: '#333' }}
      >
        Search
      </Link>

      {/* Right */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link
          to="/"
          activeProps={{ style: { fontWeight: 'bold', color: 'blue' } }}
          style={{ textDecoration: 'none', color: '#333' }}
        >
          Home
        </Link>

        <Link
          to="/products"
          activeProps={{ style: { fontWeight: 'bold', color: 'blue' } }}
          style={{ textDecoration: 'none', color: '#333' }}
        >
          Products
        </Link>

        <Link
          to="/contact"
          activeProps={{ style: { fontWeight: 'bold', color: 'blue' } }}
          style={{ textDecoration: 'none', color: '#333' }}
        >
          Contact
        </Link>

        <Link
          to="/semantic-demo"
          activeProps={{ style: { fontWeight: 'bold', color: 'blue' } }}
          style={{ textDecoration: 'none', color: '#333' }}
        >
          Semantic Demo
        </Link>
        <Link
          to="/hybrid-search"
          activeProps={{ style: { fontWeight: 'bold', color: 'blue' } }}
          style={{ textDecoration: 'none', color: '#333' }}
        >
          Hybrid Search
        </Link>
        {/* ✅ New AI Search link */}
        <Link
          to="/ai-search"
          activeProps={{ style: { fontWeight: 'bold', color: 'blue' } }}
          style={{ textDecoration: 'none', color: '#333' }}
        >
          AI Search
        </Link>
      </div>
    </nav>
  );
}
// ✅ Root Route (layout)
const rootRoute = createRootRoute({
  component: () => (
    <>
      <NavBar />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

// ✅ Routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/', // ✅ Home route
  component: App,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: ProductPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});


const semanticDemoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/semantic-demo',
  component: SemanticDemoPage,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/search',
  component: SemanticSearchPage,
});

const hybridSearchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hybrid-search',
  component: function HybridSearchRoute(): React.ReactElement {
    return <HybridSearchPage />;
  },
});

const aiSearchRoute = createRoute({
  getParentRoute: () => rootRoute, // adapt to your existing root
  path: '/ai-search',
  component: AiSearchPage,
});
// ✅ Route Tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  productRoute,
  contactRoute,
  semanticDemoRoute,
  searchRoute,
  hybridSearchRoute,
  aiSearchRoute,
]);

// ✅ Router
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => <h1>Page Not Found ❌</h1>,
});

// ✅ Mount React App (FIXED ROOT)
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found. Check index.html");
}

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);