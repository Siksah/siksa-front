import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { FunnelPage } from '../../src/pages/FunnelPage';
import { MemoryRouter } from 'react-router-dom';
import * as router from 'react-router-dom';

// Mock useNavigate
const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('FunnelPage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('renders the first step', () => {
    render(
      <MemoryRouter>
        <FunnelPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Q1')).toBeInTheDocument();
  });

  it('navigates to next step on selection', async () => {
    render(
      <MemoryRouter>
        <FunnelPage />
      </MemoryRouter>
    );

    // Click the first option
    const options = screen.getAllByRole('button');
    fireEvent.click(options[0]);

    // Fast-forward time
    await act(async () => {
      vi.advanceTimersByTime(400);
    });

    // Should see Q2
    expect(screen.getByText('Q2')).toBeInTheDocument();
  });
});
