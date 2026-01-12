import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FunnelStep } from '../../src/components/funnel/FunnelStep';
import { FunnelStepData } from '../../src/types/funnel';

describe('FunnelStep', () => {
  const mockStep: FunnelStepData = {
    id: 1,
    title: 'Test Step Title',
    subtitle: 'Test Subtitle',
    options: [
      { id: 'opt1', label: 'Option 1' },
      { id: 'opt2', label: 'Option 2' },
    ],
  };

  it('renders title, subtitle and options', () => {
    render(
      <FunnelStep
        step={mockStep}
        currentStepIndex={0}
        totalSteps={5}
        onSelectOption={() => {}}
      />
    );

    expect(screen.getByText('Test Step Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Q1')).toBeInTheDocument(); // Badge check
  });

  it('calls onSelectOption when an option is clicked', () => {
    const onSelect = vi.fn();
    render(
      <FunnelStep
        step={mockStep}
        currentStepIndex={0}
        totalSteps={5}
        onSelectOption={onSelect}
      />
    );

    fireEvent.click(screen.getByText('Option 1'));
    expect(onSelect).toHaveBeenCalledWith(mockStep.options[0]);
  });
});
