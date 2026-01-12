import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FunnelLayout } from '../../src/components/funnel/FunnelLayout';

describe('FunnelLayout', () => {
  it('renders children correctly', () => {
    render(
      <FunnelLayout>
        <div data-testid="child">Child Content</div>
      </FunnelLayout>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <FunnelLayout className="custom-layout">
        <div>Content</div>
      </FunnelLayout>
    );

    expect(container.firstChild).toHaveClass('custom-layout');
  });
});
