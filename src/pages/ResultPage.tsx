import { useEffect, useState } from 'react';
import { ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useMenuResultFlow } from '@/hooks';

import { foodIcons } from '@/components/funnel/IconPresets';
import decorTopLeft from '@/assets/images/result_decor_top_left.svg';
import decorTopRight from '@/assets/images/result_decor_top_right.svg';
import decorBottomRight from '@/assets/images/result_decor_bottom_right.svg';

function getRandomFoodIcon(): string {
  return foodIcons[Math.floor(Math.random() * foodIcons.length)];
}

export function ResultPage() {
  const { funnelResult, goToHome, goToQuestion } = useMenuResultFlow();

  const [randomIcon] = useState<string>(getRandomFoodIcon);

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
    <div className="flex flex-col flex-1 px-5 pt-24">
      {/* Title */}
      <Typography variant="text-lg" className="text-navy text-center mb-8">
        오늘의 추천 메뉴는..!
      </Typography>

      {/* Menu Card */}
      <section id="result-card" className="flex flex-col items-center mb-6">
        <div className="bg-white border-[3px] border-orange-30 border-solid rounded-[1.875rem] w-[291px] h-[463px] p-[11.5px_12.5px] shadow-[5px_5px_5px_0px_rgba(250,80,45,0.3)]">
          {/* Card Background Gradient */}
          <div className="relative flex h-full w-full flex-col items-center overflow-hidden rounded-[1.0625rem] border-[3px] border-solid border-orange-10 bg-gradient-to-t from-orange-40 to-orange-50">
            {/* Decoration Icons - absolute inside relative container */}
            <img
              src={decorTopLeft}
              alt=""
              className="pointer-events-none absolute left-3 top-[78px] h-[55.4px] w-[58.7px]"
            />
            <img
              src={decorTopRight}
              alt=""
              className="pointer-events-none absolute right-2.5 top-[33.7px] h-[37.8px] w-[36.3px]"
            />
            <img
              src={decorBottomRight}
              alt=""
              className="pointer-events-none absolute right-0 top-[214.5px] h-[75.6px] w-[79.2px] rotate-[331.87deg] opacity-100"
            />

            {/* Text Area */}
            <div className="z-10 mt-[120px] flex w-full flex-col gap-2 px-4 text-center">
              <Typography variant="title-lg" className="text-white">
                {menuName}
              </Typography>
              <Typography
                variant="text-lg"
                className="whitespace-pre-line leading-[1.2] tracking-[-0.3px] text-orange-10"
              >
                {menuDescription}
              </Typography>
            </div>

            {/* Food Illustration */}
            <div className="z-10 mb-12 mt-auto flex h-[176.9px] w-[244.2px] items-center justify-center">
              <img
                src={randomIcon}
                alt="Recommended Food"
                className="h-full w-full object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Action Icons */}
      <div className="mb-8 flex justify-center gap-[2.8125rem]">
        <button className="flex h-6 w-6 items-center justify-center text-orange-30 transition-colors hover:text-orange-40">
          <ThumbsUp className="h-6 w-6" />
        </button>
        <button className="flex h-6 w-6 items-center justify-center text-orange-30 transition-colors hover:text-orange-40">
          <ThumbsDown className="h-6 w-6" />
        </button>
        <button className="flex h-6 w-6 items-center justify-center text-orange-30 transition-colors hover:text-orange-40">
          <Share2 className="h-6 w-6" />
        </button>
      </div>

      {/* Action Buttons */}
      <nav
        id="action-buttons"
        className="mb-6 mt-auto flex flex-row gap-2.5"
        role="group"
        aria-label="결과 페이지 액션"
      >
        <Button
          variant="navy"
          size="sm"
          onClick={handleRetry}
          className="flex-1"
        >
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
      </nav>
    </div>
  );
}
