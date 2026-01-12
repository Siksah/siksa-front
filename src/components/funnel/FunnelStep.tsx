import React from 'react';
import type { FunnelStepData, FunnelOptionData } from '../../types/funnel';
import { FunnelLayout } from './FunnelLayout';
import { QuestionBadge } from './QuestionBadge';
import { QuestionTitle } from './QuestionTitle';
import { FunnelOption } from './FunnelOption';

interface FunnelStepProps {
  step: FunnelStepData;
  currentStepIndex: number;
  totalSteps: number;
  selectedOptionId?: string;
  onSelectOption: (option: FunnelOptionData) => void;
}

export const FunnelStep: React.FC<FunnelStepProps> = ({
  step,
  currentStepIndex,
  totalSteps,
  selectedOptionId,
  onSelectOption,
}) => {
  return (
    <FunnelLayout>
      <QuestionBadge stepIndex={currentStepIndex} totalSteps={totalSteps} />

      <QuestionTitle title={step.title} subtitle={step.subtitle} />

      <div className="flex flex-col gap-3 w-full mt-2">
        {step.options.map((option) => (
          <FunnelOption
            key={option.id}
            option={option}
            isSelected={selectedOptionId === option.id}
            onSelect={onSelectOption}
          />
        ))}
      </div>
    </FunnelLayout>
  );
};
