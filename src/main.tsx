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

// ✅ Navigation Bar
function NavBar() {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '1px solid #ccc',
      }}
    >
      {/* Left */}
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        SkyLaunch
      </div>

      {/* Right */}
      <div>
        <Link
          to="/"
          activeProps={{ style: { fontWeight: 'bold', color: 'blue' } }}
          style={{ marginRight: '1rem' }}
        >
          Home
        </Link>

        <Link
          to="/products"
          activeProps={{ style: { fontWeight: 'bold', color: 'blue' } }}
          style={{ marginRight: '1rem' }}
        >
          Products
        </Link>

        <Link
          to="/contact"
          activeProps={{ style: { fontWeight: 'bold', color: 'blue' } }}
        >
          Contact
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

// ✅ Route Tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  productRoute,
  contactRoute,
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