import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QuestionBadge } from '../../src/components/funnel/QuestionBadge';

describe('QuestionBadge', () => {
  it('renders correct step number', () => {
    render(<QuestionBadge stepIndex={0} />);
    expect(screen.getByText('Q1')).toBeInTheDocument();

    render(<QuestionBadge stepIndex={4} />);
    expect(screen.getByText('Q5')).toBeInTheDocument();
  });
});
