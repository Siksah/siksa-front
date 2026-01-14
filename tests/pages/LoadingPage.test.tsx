import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LoadingPage } from '../../src/pages/LoadingPage';
import { MemoryRouter } from 'react-router-dom';
import * as router from 'react-router-dom';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('LoadingPage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    navigateMock.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders loading state', () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: '/loading', state: { answers: { 1: 'mock' } } },
        ]}
      >
        <LoadingPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/최고의 메뉴를/)).toBeInTheDocument();
  });

  it('navigates to result after timeout', async () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: '/loading', state: { answers: { 1: 'mock' } } },
        ]}
      >
        <LoadingPage />
      </MemoryRouter>
    );

    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    expect(navigateMock).toHaveBeenCalledWith(
      '/result',
      expect.objectContaining({ state: expect.any(Object) })
    );
  });

  it('redirects if no answers provided', () => {
    render(
      <MemoryRouter initialEntries={['/loading']}>
        <LoadingPage />
      </MemoryRouter>
    );

    expect(navigateMock).toHaveBeenCalledWith('/', { replace: true });
  });
});
