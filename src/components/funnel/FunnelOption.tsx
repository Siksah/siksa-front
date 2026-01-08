import { cn } from '@/lib/utils';
import { Typography } from '@/components/ui/typography';

interface FunnelOptionProps<T extends string = string> {
  value: T;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  onChange?: (value: T) => void;
  className?: string;
  disabled?: boolean;
}

export function FunnelOption<T extends string = string>({
  value,
  title,
  subtitle,
  icon,
  selected,
  onChange,
  className,
  disabled,
}: FunnelOptionProps<T>) {
  return (
    <button
      onClick={() => !disabled && onChange?.(value)}
      disabled={disabled}
      className={cn(
        'flex-1 min-h-0 relative rounded-lg transition-all duration-200',
        selected
          ? 'bg-[#f8e8e4] border-2 border-orange-40'
          : 'bg-white border-2 border-grey-20',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <div className="flex flex-col gap-[0.625rem] items-center justify-center px-[1.875rem] py-[0.9375rem] h-full">
        {icon && (
          <div className="flex items-center justify-center mb-1">{icon}</div>
        )}
        <div className="flex flex-col items-center text-center tracking-[-0.3px]">
          <Typography
            variant="text-md"
            className={cn(
              'leading-[1.2]',
              selected ? 'text-navy' : 'text-grey-50'
            )}
            sketchy={true}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="text-sm"
              className="leading-[1.875rem] text-grey-30"
            >
              {subtitle}
            </Typography>
          )}
        </div>
      </div>
    </button>
  );
}
