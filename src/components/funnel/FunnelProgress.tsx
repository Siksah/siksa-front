import React from 'react';

interface FunnelProgressProps {
  currentStep: number; // 1-based
  totalSteps: number;
}

/**
 * Funnel Progress Indicator
 * 
 * Figma: Group 1707481741 (w=75, h=5)
 * 현재 스텝을 나타내는 도트 스타일 진행 표시기
 */
export const FunnelProgress: React.FC<FunnelProgressProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isPassed = stepNum < currentStep;
        
        return (
          <div
            key={stepNum}
            className={`
              h-[5px] rounded-full transition-all duration-300
              ${isActive 
                ? 'w-[24px] bg-[#1c202c] shadow-[0_0_8px_rgba(0,0,0,0.2)]' 
                : isPassed 
                  ? 'w-[8px] bg-[#1c202c]/60' 
                  : 'w-[8px] bg-[#1c202c]/20'
              }
            `}
          />
        );
      })}
    </div>
  );
};
