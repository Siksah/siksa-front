import React from 'react';
import { Typography } from '../ui/typography';

interface QuestionBadgeProps {
  stepIndex: number; // 0-based index
  totalSteps?: number;
}

export const QuestionBadge: React.FC<QuestionBadgeProps> = ({ stepIndex }) => {
  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Background shape could be an image or SVG if strictly following Figma, 
          but simpler to use a styled div or Typography background if possible. 
          For now, maintaining the pill shape but using Typography for text. 
      */}
      <div className="bg-[#f73418] border border-[#f73418] text-white px-5 py-1.5 rounded-full shadow-sm">
        <Typography 
          preset="main-subtitle" 
          className="!text-white !text-[20px] !leading-none"
        >
          Q{stepIndex + 1}.
        </Typography>
      </div>
    </div>
  );
};
