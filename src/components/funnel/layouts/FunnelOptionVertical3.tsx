import React from 'react';
import type { FunnelOptionData } from '@/types/funnel';
import { Typography } from '@/components/ui/typography';
import { getIcon } from '../iconMap';
import { clsx } from 'clsx';

interface FunnelOptionVertical3Props {
  option: FunnelOptionData;
  isSelected: boolean;
  onSelect: (option: FunnelOptionData) => void;
}

export const FunnelOptionVertical3: React.FC<FunnelOptionVertical3Props> = ({
  option,
  isSelected,
  onSelect,
}) => {
  // Q1 uses SVG icons from iconMap
  const iconNode = option.icon ? getIcon(option.icon as any) : null;

  return (
    <button
      onClick={() => onSelect(option)}
      className={clsx(
        'w-full h-[140px] relative flex flex-col items-center justify-center gap-3 rounded-[8px] transition-all duration-200 border-2',
        isSelected
          ? 'bg-[#f8e8e4] border-[#fa502d] text-[#1c202c]'
          : 'bg-white border-[#dae1e9] text-[#4b5767] hover:bg-[#fafafa]'
      )}
    >
      {iconNode && (
        <div className="flex items-center justify-center mb-1">
          {iconNode}
        </div>
      )}

      <Typography
        preset="main-subtitle"
        className={clsx(
          '!text-[26px] !leading-[1.2] !whitespace-pre-wrap text-center',
          isSelected ? '!text-[#1c202c]' : '!text-[#4b5767]'
        )}
      >
        {option.label}
      </Typography>
    </button>
  );
};
