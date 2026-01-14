import React from 'react';
import { Typography } from '../ui/typography';

interface QuestionTitleProps {
  title: string;
  subtitle?: string;
}

export const QuestionTitle: React.FC<QuestionTitleProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="flex flex-col items-center gap-2 mb-4">
      <Typography
        preset="funnel-title"
        className="!text-[#1c202c] !leading-normal text-center whitespace-pre-wrap"
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          preset="main-subtitle"
          className="!text-[#777a8d] !text-[18px] text-center whitespace-pre-wrap"
        >
          {subtitle}
        </Typography>
      )}
    </div>
  );
};
