import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QuestionTitle } from '../../src/components/funnel/QuestionTitle';

describe('QuestionTitle', () => {
  it('renders title', () => {
    const title = 'What would you like to eat?';
    render(<QuestionTitle title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    const title = 'Main Question';
    const subtitle = 'Optional helper text';
    render(<QuestionTitle title={title} subtitle={subtitle} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(subtitle)).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(<QuestionTitle title="Main Only" />);
    // Just ensuring no empty paragraph or errors
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings).toHaveLength(1);
  });
});
