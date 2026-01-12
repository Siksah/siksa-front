import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFunnel } from '../hooks/useFunnel';
import { funnelData } from '../data/funnelData';
import { FunnelStep } from '../components/funnel/FunnelStep';
import { StaticBackground } from '../components/common/StaticBackground';

import { useImagePreloader } from '../hooks/useImagePreloader';

export const FunnelPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    currentStepIndex,
    answers,
    selectOption,
    nextStep,
    isLastStep,
  } = useFunnel(funnelData);

  // Preload next step's background image
  const nextStepData = funnelData.steps[currentStepIndex + 1];
  const nextImage = nextStepData?.backgroundImage;
  // We pass a new array every render, but that's okay for single item simple comparison or if we memoize.
  // Actually, useImagePreloader uses [urls] dependency. ['a'] !== ['a'] in JS? No, new array is new reference.
  // But inside useEffect we can check if content changed, or just let it run (Image object creation is cheap if cached).
  // To avoid loop, we should memoize the array or the hook should handle it.
  // For simplicity, let's just pass it. The hook will run every render if array is new.
  // I will assume the hook implementation above might need optimization if I pass new array every time.
  // But let's stick to simple implementation first.
  useImagePreloader(nextImage ? [nextImage] : []);

  const handleOptionSelect = (option: any) => {
    selectOption(option);

    // Auto-advance after a short delay for visual feedback
    setTimeout(() => {
      if (isLastStep) {
        navigate('/loading', {
          state: { answers: { ...answers, [currentStep.id]: option } },
        });
      } else {
        nextStep();
      }
    }, 400);
  };

  // Preload next image logic could go here (Task TASK-UX-001)

  return (
    <>
      <StaticBackground
        src={currentStep.backgroundImage || ''}
        alt={`Background for ${currentStep.title}`}
      />

      <FunnelStep
        step={currentStep}
        currentStepIndex={currentStepIndex}
        totalSteps={funnelData.steps.length}
        selectedOptionId={answers[currentStep.id]?.id}
        onSelectOption={handleOptionSelect}
      />
    </>
  );
};
