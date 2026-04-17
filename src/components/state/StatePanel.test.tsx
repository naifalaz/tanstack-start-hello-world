// src/components/state/StatePanel.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { StatePanel } from './StatePanel';

describe('StatePanel', () => {
  it('renders a title and message for an empty state', () => {
    render(
      <StatePanel
        title="No products yet"
        message="Seed your database with demo gear so search has something to work with."
      />
    );

    expect(
      screen.getByRole('heading', { name: /no products yet/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/seed your database with demo gear/i)
    ).toBeInTheDocument();
  });

  it('renders an action button when action props are provided', () => {
    const onAction = vi.fn();

    render(
      <StatePanel
        title="We couldn't load products"
        message="Please try again."
        actionLabel="Try again"
        onAction={onAction}
      />
    );

    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
  });
});

