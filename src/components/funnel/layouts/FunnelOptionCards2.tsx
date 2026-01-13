import React from 'react';
import type { FunnelOptionData } from '@/types/funnel';
import { Typography } from '@/components/ui/typography';
import { getLucideIcon } from '../iconMap';
import { clsx } from 'clsx';

interface FunnelOptionCards2Props {
  option: FunnelOptionData;
  isSelected: boolean;
  onSelect: (option: FunnelOptionData) => void;
}

/**
 * Q4: 2개 대형 카드 옵션 (온도)
 * Figma: 335×195 카드, 대형 아이콘 + 텍스트
 */
export const FunnelOptionCards2: React.FC<FunnelOptionCards2Props> = ({
  option,
  isSelected,
  onSelect,
}) => {
  const iconNode = getLucideIcon(option.icon, 'w-[60px] h-[60px]');

  return (
    <button
      onClick={() => onSelect(option)}
      className={clsx(
        'w-full h-[195px] flex flex-col items-center justify-center gap-4 rounded-[20px] transition-all duration-200 border-2',
        isSelected
          ? 'bg-[#f8e8e4] border-[#fa502d] shadow-sm'
          : 'bg-white border-[#dae1e9] hover:bg-[#fafafa]'
      )}
    >
      {/* Large Icon */}
      {iconNode && (
        <div className={clsx(
          'flex items-center justify-center',
          isSelected ? 'text-[#fa502d]' : 'text-[#4b5767]'
        )}>
          {iconNode}
        </div>
      )}

      {/* Label */}
      <Typography
        preset="main-subtitle"
        className={clsx(
          '!text-[22px] !leading-none text-center',
          isSelected ? '!text-[#1c202c]' : '!text-[#4b5767]'
        )}
      >
        {option.label}
      </Typography>
    </button>
  );
};
