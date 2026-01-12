import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FunnelGuard } from '../../src/components/funnel/FunnelGuard';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as router from 'react-router-dom';

const navigateMock = vi.fn();

// Partial mock for useNavigate only
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('FunnelGuard', () => {
  it('renders children if state has answers', () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: '/protected', state: { answers: { 1: 'a' } } },
        ]}
      >
        <Routes>
          <Route
            path="/protected"
            element={
              <FunnelGuard>
                <div>Protected Content</div>
              </FunnelGuard>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('redirects if state is missing', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <FunnelGuard>
                <div>Protected Content</div>
              </FunnelGuard>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(navigateMock).toHaveBeenCalledWith('/', { replace: true });
  });
});
