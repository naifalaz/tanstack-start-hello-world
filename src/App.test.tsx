import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import App from './App';

// Create a test wrapper with router context
const createTestRouter = () => {
  // Create a simple wrapper component instead of using App in the route
  const rootRoute = createRootRoute({
    component: () => <App />,  // Use App as child of root route
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <div>Home</div>,
  });

  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute]),
  });

  return router;
};

describe('App', () => {
  it('renders', () => {
    const router = createTestRouter();
    render(
      <RouterProvider router={router} />
    );
    // Add your assertions here
    expect(screen.getByText('Home')).toBeDefined();
  });
});