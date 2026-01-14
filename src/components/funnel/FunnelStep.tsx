import React from 'react';
import type { FunnelStepData, FunnelOptionData } from '../../types/funnel';
import { QuestionBadge } from './QuestionBadge';
import { QuestionTitle } from './QuestionTitle';
import { FunnelProgress } from './FunnelProgress';
import {
  FunnelOptionVertical3,
  FunnelOptionVertical5,
  FunnelOptionGrid2x2,
  FunnelOptionCards2,
  FunnelOptionGrid2x3,
} from './layouts';

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
  const renderOptions = () => {
    switch (step.layoutType) {
      case 'vertical-3':
        return (
          <div className="flex flex-col gap-[10px] w-full">
            {step.options.map((option) => (
              <FunnelOptionVertical3
                key={option.id}
                option={option}
                isSelected={selectedOptionId === option.id}
                onSelect={onSelectOption}
              />
            ))}
          </div>
        );

      case 'vertical-5':
        return (
          <div className="flex flex-col gap-[10px] w-full">
            {step.options.map((option) => (
              <FunnelOptionVertical5
                key={option.id}
                option={option}
                isSelected={selectedOptionId === option.id}
                onSelect={onSelectOption}
              />
            ))}
          </div>
        );

      case 'grid-2x2':
        return (
          <div className="grid grid-cols-2 gap-[15px] w-full">
            {step.options.map((option) => (
              <FunnelOptionGrid2x2
                key={option.id}
                option={option}
                isSelected={selectedOptionId === option.id}
                onSelect={onSelectOption}
              />
            ))}
          </div>
        );

      case 'cards-2':
        return (
          <div className="flex flex-col gap-[10px] w-full">
            {step.options.map((option) => (
              <FunnelOptionCards2
                key={option.id}
                option={option}
                isSelected={selectedOptionId === option.id}
                onSelect={onSelectOption}
              />
            ))}
          </div>
        );

      case 'grid-2x3':
        return (
          <div className="grid grid-cols-2 gap-[10px] w-full">
            {step.options.map((option) => (
              <FunnelOptionGrid2x3
                key={option.id}
                option={option}
                isSelected={selectedOptionId === option.id}
                onSelect={onSelectOption}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-[20px]">
      {/* Progress Indicator */}
      <FunnelProgress currentStep={currentStepIndex + 1} totalSteps={totalSteps} />

      {/* Badge */}
      <div className="mt-[15px]">
        <QuestionBadge stepIndex={currentStepIndex} totalSteps={totalSteps} />
      </div>

      {/* Title */}
      <div className="mt-[20px]">
        <QuestionTitle title={step.title} subtitle={step.subtitle} />
      </div>

      {/* Options */}
      <div className="mt-[40px] w-full">
        {renderOptions()}
      </div>
    </div>
  );
};
