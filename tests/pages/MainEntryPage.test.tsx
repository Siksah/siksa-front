import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MainEntryPage } from '../../src/pages/MainEntryPage';
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

describe('MainEntryPage', () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <MainEntryPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/나를 위한/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '추천 받기' })
    ).toBeInTheDocument();
  });

  it('navigates to funnel on click', () => {
    render(
      <MemoryRouter>
        <MainEntryPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: '추천 받기' }));
    expect(navigateMock).toHaveBeenCalledWith('/funnel');
  });
});
