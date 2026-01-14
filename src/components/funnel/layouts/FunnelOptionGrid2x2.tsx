import React from 'react';
import type { FunnelOptionData } from '@/types/funnel';
import { Typography } from '@/components/ui/typography';
import { getLucideIcon } from '../iconMap';
import { clsx } from 'clsx';

interface FunnelOptionGrid2x2Props {
  option: FunnelOptionData;
  isSelected: boolean;
  onSelect: (option: FunnelOptionData) => void;
}

/**
 * Q3: 2x2 그리드 옵션 (식감)
 * Figma: 160×214 카드, 아이콘 + 텍스트
 */
export const FunnelOptionGrid2x2: React.FC<FunnelOptionGrid2x2Props> = ({
  option,
  isSelected,
  onSelect,
}) => {
  const iconNode = option.icon?.endsWith('.svg') ? (
    <div
      className={clsx(
        "w-[45px] h-[45px]",
        isSelected ? "bg-[#E91B0E]" : "bg-[#4b5767]"
      )}
      style={{
        maskImage: `url(${option.icon})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: `url(${option.icon})`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
      }}
    />
  ) : (
    getLucideIcon(option.icon, 'w-[45px] h-[45px]')
  );

  return (
    <button
      onClick={() => onSelect(option)}
      className={clsx(
        'flex flex-col items-center justify-center gap-3 p-4 rounded-[20px] transition-all duration-200 border-2 aspect-[160/214]',
        isSelected
          ? 'bg-[#f8e8e4] border-[#E91B0E] shadow-sm'
          : 'bg-white border-[#dae1e9] hover:bg-[#fafafa]'
      )}
    >
      {/* Icon */}
      {iconNode && (
        <div className={clsx(
          'flex items-center justify-center',
          // SVG가 아닌 경우(Lucide 아이콘)에만 색상 클래스 적용
          !option.icon?.endsWith('.svg') && (isSelected ? 'text-[#E91B0E]' : 'text-[#4b5767]')
        )}>
          {iconNode}
        </div>
      )}

      {/* Label */}
      <Typography
        preset="main-subtitle"
        className={clsx(
          '!text-[18px] !leading-tight text-center',
          isSelected ? '!text-[#1c202c]' : '!text-[#4b5767]'
        )}
      >
        {option.label}
      </Typography>

      {/* SubLabel */}
      {option.subLabel && (
        <Typography
          preset="main-subtitle"
          className="!text-[14px] !text-[#777a8d] text-center"
        >
          ({option.subLabel})
        </Typography>
      )}
    </button>
  );
};
