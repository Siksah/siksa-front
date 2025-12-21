import { useEffect, useState } from 'react';

import { Typography } from '@/components/ui/typography';
import { useMenuResultFlow } from '@/hooks';

interface LoadingPageProps {
  menuImage?: string;
  menuName?: string;
}

export function LoadingPage({ menuImage, menuName }: LoadingPageProps) {
  const [progress, setProgress] = useState(0);
  const { funnelResult, goToResult } = useMenuResultFlow();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            goToResult(funnelResult || {});
          }, 200);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
    return () => clearInterval(timer);
  }, [goToResult, funnelResult]);

  return (
    <>
      {/* Content */}
      <div className="flex flex-col flex-1">
        {/* Menu Image - flex-1로 공간 차지 */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          {menuImage ? (
            <div className="w-[12.5rem] h-[12.5rem] flex items-center justify-center">
              <img
                src={menuImage}
                alt={menuName || '메뉴'}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ) : null}
        </div>

        {/* Loading Text and Progress Bar - flex로 하단 정렬 */}
        <div className="flex flex-col items-center gap-[3.1875rem] pb-[12.5rem] shrink-0">
          <Typography
            variant="text-lg"
            className="text-black text-center text-stroke-black"
          >
            오늘의 메뉴 고르는 중...
          </Typography>

          {/* Progress Bar */}
          <div className="bg-white border-2 border-orange-30 border-solid rounded-[3.125rem] w-[14.0625rem] h-[0.5rem] p-px">
            <div
              className="bg-orange-50 h-full rounded-[3.125rem] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
