import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useFunnel } from '../hooks/useFunnel';
import { funnelData } from '../data/funnelData';
import { FunnelStep } from '../components/funnel/FunnelStep';

export const FunnelPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    currentStepIndex,
    answers,
    selectOption,
    nextStep,
    prevStep,
    isLastStep,
  } = useFunnel(funnelData);

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

  const handleBack = () => {
    if (currentStepIndex > 0) {
      prevStep();
    } else {
      navigate(-1);
    }
  };

  return (
    <div
      className="w-full h-full min-h-screen overflow-y-auto pt-[20px] pb-[40px] relative"
      style={{
        background:
          'linear-gradient(179.31deg, rgba(255, 247, 244, 1) 0.28%, rgba(255, 255, 255, 1) 19.9%, rgba(255, 255, 255, 1) 91.2%, rgba(255, 247, 244, 1) 99.81%)',
      }}
    >
      {/* Back Button */}
      <div className="absolute top-[10px] left-[10px] z-50">
        <button
          onClick={handleBack}
          className="p-2 text-[#1c202c] hover:bg-black/5 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      </div>

      <FunnelStep
        step={currentStep}
        currentStepIndex={currentStepIndex}
        totalSteps={funnelData.steps.length}
        selectedOptionId={answers[currentStep.id]?.id}
        onSelectOption={handleOptionSelect}
      />
    </div>
  );
};
