import { useEffect, useMemo } from 'react';
import { ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useMenuResultFlow } from '@/hooks';

import { foodIcons } from '@/components/funnel/IconPresets';
import decorTopLeft from '@/assets/images/result_decor_top_left.svg';
import decorTopRight from '@/assets/images/result_decor_top_right.svg';
import decorBottomRight from '@/assets/images/result_decor_bottom_right.svg';

export function ResultPage() {
  const { funnelResult, goToHome, goToQuestion } = useMenuResultFlow();

  const RandomIcon = useMemo(() => {
    return foodIcons[Math.floor(Math.random() * foodIcons.length)];
  }, []);

  useEffect(() => {
    if (!funnelResult) {
      goToHome();
    }
  }, [funnelResult, goToHome]);

  if (!funnelResult) {
    return null;
  }

  const menuName = '냉면';
  const menuDescription = '오늘은 시원하게\n새콤한 냉면';

  const handleRetry = () => {
    goToQuestion();
  };

  const handleFindRestaurant = () => {
    console.log('식당 찾아보기', funnelResult);
  };

  return (
    <>
      {/* Content */}
      <div className="flex flex-col flex-1 px-5 pt-24">
        {/* Title */}
        <Typography variant="text-lg" className="text-navy text-center mb-8">
          오늘의 추천 메뉴는..!
        </Typography>

        {/* Menu Card */}
        <div className="flex justify-center mb-6">
          <div className="bg-white border-[3px] border-orange-30 border-solid rounded-[1.875rem] w-[291px] h-[463px] overflow-hidden relative shadow-[5px_5px_5px_0px_rgba(250,80,45,0.3)]">
            {/* Card Background Gradient */}
            <div className="absolute inset-[11.5px_12.5px] bg-gradient-to-t from-orange-40 to-orange-50 border-[3px] border-orange-10 border-solid rounded-[1.0625rem] overflow-hidden flex flex-col items-center">
              {/* Decoration Icons */}
              <img src={decorTopLeft} alt="" className="absolute left-[12px] top-[78px] w-[58.7px] h-[55.4px] pointer-events-none" />
              <img src={decorTopRight} alt="" className="absolute left-[219.6px] top-[33.7px] w-[36.3px] h-[37.8px] pointer-events-none" />
              <img src={decorBottomRight} alt="" className="absolute left-[186px] top-[214.5px] w-[79.2px] h-[75.6px] rotate-[331.87deg] pointer-events-none opacity-100" />
              
              {/* Text Area */}
              <div className="mt-[120px] w-full px-4 text-center z-10 flex flex-col gap-2">
                <Typography
                  variant="title-lg"
                  className="text-white"
                >
                  {menuName}
                </Typography>
                <Typography
                  variant="text-lg"
                  className="text-orange-10 whitespace-pre-line leading-[1.2] tracking-[-0.3px]"
                >
                  {menuDescription}
                </Typography>
              </div>

              {/* Food Illustration */}
              <div className="mt-auto mb-12 w-[244.2px] h-[176.9px] flex items-center justify-center z-10">
                <img src={RandomIcon} alt="Recommended Food" className="w-full h-full object-contain drop-shadow-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex justify-center gap-[2.8125rem] mb-8">
          <button className="w-6 h-6 flex items-center justify-center text-orange-30 hover:text-orange-40 transition-colors">
            <ThumbsUp className="w-6 h-6" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center text-orange-30 hover:text-orange-40 transition-colors">
            <ThumbsDown className="w-6 h-6" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center text-orange-30 hover:text-orange-40 transition-colors">
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-[0.625rem] mt-auto mb-6">
          <Button variant="navy" size="sm" onClick={handleRetry} className="flex-1">
            다시하기
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleFindRestaurant}
            className="flex-1"
          >
            식당 찾아보기
          </Button>
        </div>
      </div>
    </>
  );
}
