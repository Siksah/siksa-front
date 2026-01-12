import React from 'react';

interface QuestionBadgeProps {
  stepIndex: number; // 0-based index
  totalSteps?: number;
}

export const QuestionBadge: React.FC<QuestionBadgeProps> = ({ stepIndex }) => {
  return (
    <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1 self-start shadow-sm">
      <span className="text-sm font-semibold text-white tracking-wide">
        Q{stepIndex + 1}
      </span>
    </div>
  );
};
