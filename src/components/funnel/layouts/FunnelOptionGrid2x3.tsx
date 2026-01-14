import React from 'react';
import type { FunnelOptionData } from '@/types/funnel';
import { Typography } from '@/components/ui/typography';
import { clsx } from 'clsx';

interface FunnelOptionGrid2x3Props {
  option: FunnelOptionData;
  isSelected: boolean;
  onSelect: (option: FunnelOptionData) => void;
}

/**
 * Q5: 2x3 그리드 옵션 (식욕 저하 요소)
 * Figma: 161.5×126.67 카드, 텍스트 중심
 */
export const FunnelOptionGrid2x3: React.FC<FunnelOptionGrid2x3Props> = ({
  option,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={() => onSelect(option)}
      className={clsx(
        'flex flex-col items-center justify-center gap-2 p-3 rounded-[16px] transition-all duration-200 border-2 aspect-[161.5/126.67]',
        isSelected
          ? 'bg-[#f8e8e4] border-[#fa502d] shadow-sm'
          : 'bg-white border-[#dae1e9] hover:bg-[#fafafa]'
      )}
    >
      {/* Label */}
      <Typography
        preset="main-subtitle"
        className={clsx(
          '!text-[16px] !leading-tight text-center',
          isSelected ? '!text-[#1c202c]' : '!text-[#4b5767]'
        )}
      >
        {option.label}
      </Typography>

      {/* SubLabel */}
      {option.subLabel && (
        <Typography
          preset="main-subtitle"
          className="!text-[12px] !text-[#777a8d] text-center"
        >
          ({option.subLabel})
        </Typography>
      )}
    </button>
  );
};
