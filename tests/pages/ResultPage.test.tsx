import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ResultPage } from '../../src/pages/ResultPage';
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

describe('ResultPage', () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  const mockResult = {
    id: 'test',
    name: 'Test Food',
    description: 'Test Description',
    image: 'test.jpg',
    tags: ['Tag1', 'Tag2'],
  };

  it('renders result correctly', () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: '/result', state: { result: mockResult } },
        ]}
      >
        <ResultPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Food')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('#Tag1')).toBeInTheDocument();
  });

  it('redirects if no result provided', () => {
    render(
      <MemoryRouter initialEntries={['/result']}>
        <ResultPage />
      </MemoryRouter>
    );

    expect(navigateMock).toHaveBeenCalledWith('/', { replace: true });
  });

  it('navigates home on restart', () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: '/result', state: { result: mockResult } },
        ]}
      >
        <ResultPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('다시하기'));
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
