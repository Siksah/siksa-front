import React from 'react';

interface QuestionTitleProps {
  title: string;
  subtitle?: string;
}

export const QuestionTitle: React.FC<QuestionTitleProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <h2 className="text-3xl font-bold text-white leading-tight">{title}</h2>
      {subtitle && (
        <p className="text-lg text-white/80 font-medium">{subtitle}</p>
      )}
    </div>
  );
};
