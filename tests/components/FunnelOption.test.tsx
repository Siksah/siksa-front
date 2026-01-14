import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FunnelOption } from '../../src/components/funnel/FunnelOption';
import { FunnelOptionData } from '../../src/types/funnel';

describe('FunnelOption', () => {
  const mockOption: FunnelOptionData = {
    id: 'opt1',
    label: 'Option 1',
    value: 10,
  };

  it('renders correctly', () => {
    render(
      <FunnelOption
        option={mockOption}
        isSelected={false}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onSelect = vi.fn();
    render(
      <FunnelOption
        option={mockOption}
        isSelected={false}
        onSelect={onSelect}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith(mockOption);
  });

  it('displays selected state correctly', () => {
    render(
      <FunnelOption option={mockOption} isSelected={true} onSelect={() => {}} />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    // Check for styling class specific to selected state (e.g., bg-white/30)
    // Note: checking class names can be brittle, but verifies conditional logic
    expect(button.className).toContain('bg-white/30');
  });
});
