import { useState, useCallback } from 'react';
import type { FunnelData, FunnelOptionData } from '../types/funnel';

interface UseFunnelReturn {
  currentStepIndex: number;
  currentStep: FunnelData['steps'][0];
  isLastStep: boolean;
  progress: number;
  answers: Record<number, FunnelOptionData>;
  selectOption: (option: FunnelOptionData) => void;
  nextStep: () => void;
  prevStep: () => void;
  canNext: boolean;
}

export const useFunnel = (data: FunnelData): UseFunnelReturn => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, FunnelOptionData>>({});

  const currentStep = data.steps[currentStepIndex];
  const isLastStep = currentStepIndex === data.steps.length - 1;
  const progress = ((currentStepIndex + 1) / data.steps.length) * 100;

  const selectOption = useCallback(
    (option: FunnelOptionData) => {
      setAnswers((prev) => ({
        ...prev,
        [currentStep.id]: option,
      }));
    },
    [currentStep.id]
  );

  const canNext = !!answers[currentStep.id];

  const nextStep = useCallback(() => {
    if (!isLastStep) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  }, [isLastStep]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [currentStepIndex]);

  return {
    currentStepIndex,
    currentStep,
    isLastStep,
    progress,
    answers,
    selectOption,
    nextStep,
    prevStep,
    canNext,
  };
};
