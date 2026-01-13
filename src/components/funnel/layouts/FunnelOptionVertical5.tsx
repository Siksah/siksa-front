import React from 'react';
import type { FunnelOptionData } from '@/types/funnel';
import { Typography } from '@/components/ui/typography';
import { getLucideIcon } from '../iconMap';
import { clsx } from 'clsx';

interface FunnelOptionVertical5Props {
  option: FunnelOptionData;
  isSelected: boolean;
  onSelect: (option: FunnelOptionData) => void;
}

/**
 * Q2: 5개 수직 리스트 옵션 (높이 80px)
 * Figma: Frame 2087325573 (335×80)
 */
export const FunnelOptionVertical5: React.FC<FunnelOptionVertical5Props> = ({
  option,
  isSelected,
  onSelect,
}) => {
  // 선택 상태에 따라 아이콘 색상 변경 (선택: #E91B0E, 미선택: #ADB5BD)
  const iconColor = isSelected ? 'text-[#E91B0E]' : 'text-[#ADB5BD]';
  const iconNode = getLucideIcon(option.icon, clsx('w-[24px] h-[24px]', iconColor));

  return (
    <button
      onClick={() => onSelect(option)}
      className={clsx(
        'w-full h-[80px] flex items-center gap-4 px-5 rounded-[16px] transition-all duration-200 border-2',
        isSelected
          ? 'bg-[#f8e8e4] border-[#E91B0E]'
          : 'bg-white border-[#dae1e9] hover:bg-[#fafafa]'
      )}
    >
      {/* Left-aligned Icon */}
      {iconNode && (
        <div className="flex items-center justify-center">
          {iconNode}
        </div>
      )}

      <Typography
        preset="main-subtitle"
        className={clsx(
          '!text-[20px] !leading-none text-left flex-1',
          isSelected ? '!text-[#1c202c]' : '!text-[#4b5767]'
        )}
      >
        {option.label}
      </Typography>
    </button>
  );
};
