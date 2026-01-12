import React from 'react';
import type { FunnelOptionData } from '../../types/funnel';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FunnelOptionProps {
  option: FunnelOptionData;
  isSelected: boolean;
  onSelect: (option: FunnelOptionData) => void;
  className?: string;
}

export const FunnelOption: React.FC<FunnelOptionProps> = ({
  option,
  isSelected,
  onSelect,
  className,
}) => {
  return (
    <button
      onClick={() => onSelect(option)}
      className={twMerge(
        clsx(
          'w-full text-left p-4 rounded-2xl transition-all duration-200 border group',
          'hover:bg-white/20 active:scale-[0.98]',
          'flex items-center gap-4',
          isSelected
            ? 'bg-white/30 border-white/60 shadow-lg backdrop-blur-md'
            : 'bg-white/10 border-white/20 backdrop-blur-sm shadow-sm'
        ),
        className
      )}
      aria-pressed={isSelected}
    >
      <div
        className={clsx(
          'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
          isSelected
            ? 'border-white bg-white'
            : 'border-white/50 group-hover:border-white'
        )}
      >
        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
      </div>

      <span
        className={clsx(
          'text-lg font-medium',
          isSelected ? 'text-white' : 'text-white/90'
        )}
      >
        {option.label}
      </span>
    </button>
  );
};
