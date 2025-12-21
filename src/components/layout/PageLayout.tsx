import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useBackgroundClass } from '@/hooks';

export function PageLayout() {
  const background = useBackgroundClass();

  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <div
        className={cn(
          'w-93.75 h-203 flex flex-col overflow-hidden',
          background
        )}
      >
        <Outlet />
      </div>
    </div>
  );
}
