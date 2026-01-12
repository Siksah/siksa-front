import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useFunnel } from '@/hooks/useFunnel';
import { funnelData } from '@/data/funnelData';

describe('useFunnel', () => {
  it('initializes correctly', () => {
    const { result } = renderHook(() => useFunnel(funnelData));

    expect(result.current.currentStepIndex).toBe(0);
    expect(result.current.currentStep.id).toBe(1);
    expect(result.current.isLastStep).toBe(false);
    expect(result.current.answers).toEqual({});
    expect(result.current.canNext).toBe(false);
  });

  it('selects an option', () => {
    const { result } = renderHook(() => useFunnel(funnelData));
    const option = funnelData.steps[0].options[0];

    act(() => {
      result.current.selectOption(option);
    });

    expect(result.current.answers[1]).toEqual(option);
    expect(result.current.canNext).toBe(true);
  });

  it('navigates to next step', () => {
    const { result } = renderHook(() => useFunnel(funnelData));
    const option = funnelData.steps[0].options[0];

    act(() => {
      result.current.selectOption(option);
    });

    act(() => {
      result.current.nextStep();
    });

    expect(result.current.currentStepIndex).toBe(1);
    expect(result.current.currentStep.id).toBe(2);
  });

  it('navigates to previous step', () => {
    const { result } = renderHook(() => useFunnel(funnelData));
    const option = funnelData.steps[0].options[0];

    // Go to step 2
    act(() => {
      result.current.selectOption(option);
    });

    act(() => {
      result.current.nextStep();
    });

    expect(result.current.currentStepIndex).toBe(1);

    // Go back
    act(() => {
      result.current.prevStep();
    });

    expect(result.current.currentStepIndex).toBe(0);
  });

  it('prevents navigation if no option selected', () => {
    const { result } = renderHook(() => useFunnel(funnelData));

    act(() => {
      result.current.nextStep();
    });

    expect(result.current.currentStepIndex).toBe(0);
  });
});
