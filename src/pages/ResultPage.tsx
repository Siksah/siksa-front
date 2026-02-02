import { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RefreshCw, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
import { Typography } from '@/components/ui/typography';
import { useMenuResultFlow, type RecommendationItem } from '@/hooks/useMenuResultFlow';

import bgThumbsUp from '@/assets/images/result/bg_thumbs_up.svg';
import bgConfetti from '@/assets/images/result/bg_confetti.svg';
import bgSparkle from '@/assets/images/result/bg_sparkle.svg';
import decorationPattern from '@/assets/images/result/decoration_pattern.svg';
import mainBgTexture from '@/assets/images/main_bg.png';

const BACKGROUND_IMAGES = [bgThumbsUp, bgConfetti, bgSparkle];

type FeedbackType = 'like' | 'dislike';

interface ResultPageState {
  recommendations: RecommendationItem[];
  sessionId: string;
}

export function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sendFeedback } = useMenuResultFlow();

  const state = location.state as ResultPageState | null;
  // Mock data for development - always show result page
  const mockRecommendations: RecommendationItem[] = [
    {
      rank: 1,
      menu: '돈까스',
      reason: '오늘은 바삭하고\n달달한 돈까스!',
    },
    {
      rank: 2,
      menu: '쌀국수',
      reason: '답답한 국물\n쌀국수',
    },
    {
      rank: 3,
      menu: '떡볶이',
      reason: '매콤달콤\n떡볶이',
    },
  ];
  const recommendations = state?.recommendations?.length ? state.recommendations : mockRecommendations;
  const sessionId = state?.sessionId || 'mock-session';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbackByRank, setFeedbackByRank] = useState<Record<number, FeedbackType | null>>({
    1: null,
    2: null,
    3: null,
  });
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const randomBg = useMemo(
    () => BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)],
    []
  );

  const current = recommendations[currentIndex];

  if (!current || recommendations.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-orange-10 gap-4">
        <Typography preset="funnel-title" className="!text-navy" isShadow={false}>
          결과를 불러오는 중...
        </Typography>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-navy text-white rounded-lg text-[22px]"
        >
          처음으로
        </button>
      </div>
    );
  }

  const isRetryDisabled = currentIndex >= recommendations.length - 1;
  const currentRank = current.rank;
  const hasFeedback = feedbackByRank[currentRank] !== null;

  const handleRetry = () => {
    if (isRetryDisabled) return;
    setCurrentIndex((i) => i + 1);
  };

  const handleFeedback = async (feedback: FeedbackType) => {
    if (hasFeedback || isSendingFeedback) return;

    setFeedbackByRank((prev) => ({ ...prev, [currentRank]: feedback }));
    setIsSendingFeedback(true);

    await sendFeedback({
      sessionId,
      retryCount: currentIndex,
      result: { rank: currentRank, menu: current.menu },
      feedback,
    });

    setIsSendingFeedback(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '냠냠쩝쩝 - 오늘의 메뉴 추천',
          text: `오늘의 추천: ${current.menu}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 복사되었습니다!');
      } catch {
        alert('공유하기 기능을 사용할 수 없습니다.');
      }
    }
  };

  const handleFindRestaurant = () => {
    const url = `https://map.naver.com/p/search/${encodeURIComponent(current.menu)}`;
    window.open(url, '_blank');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-orange-10">
      {/* Card Sketchy Effect Filter */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="card-sketchy" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <img
        src={mainBgTexture}
        alt=""
        className="absolute inset-0 w-full h-full object-cover mix-blend-soft-light opacity-60 pointer-events-none z-0"
      />

      <div className="relative z-10 flex flex-col items-center w-full h-full pt-[95px]">
        <Typography
          preset="funnel-title"
          fontSize="30px"
          className="!text-navy text-center !leading-normal"
          isShadow={false}
          sketchy={true}
        >
          오늘의 추천 메뉴는..!
        </Typography>

        <div
          className="relative mt-[30px] w-[291px] h-[463px] bg-white rounded-[30px] border-[3px] border-orange-30 overflow-hidden flex flex-col"
          style={{
            boxShadow: '5px 5px 5px 0px rgba(250, 80, 45, 0.3)',
            filter: 'url(#card-sketchy)',
          }}
        >
          <div
            className="relative m-[13px] rounded-[17px] border-[3px] border-orange-10 overflow-hidden flex-1 flex flex-col items-center z-0"
            style={{
              background: 'linear-gradient(to top, var(--color-orange-40) 0%, var(--color-orange-50) 100%)',
            }}
          >
            <img
              src={mainBgTexture}
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-soft-light opacity-40 pointer-events-none"
            />

            <div className="relative z-20 flex flex-col items-center pt-[52px] px-4">
              <Typography
                fontSize="48px"
                lineHeight="1"
                className="!text-white text-center break-keep"
                isShadow={true}
                shadowColor="#C4250E"
                sketchy={true}
              >
                {current.menu}
              </Typography>

              <Typography
                fontSize="26px"
                lineHeight="normal"
                className="!text-orange-10 text-center break-keep whitespace-pre-wrap mt-[18px]"
                isShadow={false}
                sketchy={true}
              >
                {current.reason}
              </Typography>
            </div>

            <div className="relative z-10 flex-1 flex items-end justify-center pb-[20px] w-full">
              <img
                src={decorationPattern}
                alt=""
                className="absolute bottom-[120px] left-[42%] -translate-x-1/2 w-[90%] h-auto pointer-events-none opacity-80"
              />
            </div>
          </div>

          <img
            src={randomBg}
            alt=""
            className="absolute z-20 w-[240px] h-auto pointer-events-none left-1/2 -translate-x-1/2"
            style={{ top: '230px' }}
          />

          <div className="flex items-center justify-center gap-[45px] py-[12px]">
            <button
              onClick={handleRetry}
              disabled={isRetryDisabled}
              className={`transition-colors ${
                isRetryDisabled
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-orange-30 hover:text-orange-40'
              }`}
              aria-label="다음 추천"
            >
              <RefreshCw size={24} strokeWidth={2} />
            </button>
            <button
              onClick={() => handleFeedback('like')}
              disabled={hasFeedback || isSendingFeedback}
              className={`transition-colors ${
                feedbackByRank[currentRank] === 'like'
                  ? 'text-green-500'
                  : hasFeedback
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-orange-30 hover:text-orange-40'
              }`}
              aria-label="좋아요"
            >
              <ThumbsUp size={24} strokeWidth={2} />
            </button>
            <button
              onClick={() => handleFeedback('dislike')}
              disabled={hasFeedback || isSendingFeedback}
              className={`transition-colors ${
                feedbackByRank[currentRank] === 'dislike'
                  ? 'text-red-500'
                  : hasFeedback
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-orange-30 hover:text-orange-40'
              }`}
              aria-label="싫어요"
            >
              <ThumbsDown size={24} strokeWidth={2} />
            </button>
            <button
              onClick={handleShare}
              className="text-orange-30 hover:text-orange-40 transition-colors"
              aria-label="공유하기"
            >
              <Share2 size={24} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-[10px] mt-auto mb-[78px] px-[20px] w-full">
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center w-[162px] h-[53px] bg-navy rounded-[8px] active:scale-95 transition-transform"
          >
            <Typography
              fontSize="26px"
              lineHeight="1.2"
              letterSpacing="-0.3px"
              className="!text-white"
              isShadow={false}
              sketchy={true}
            >
              다시하기
            </Typography>
          </button>

          <button
            onClick={handleFindRestaurant}
            className="flex items-center justify-center w-[162px] h-[53px] bg-orange-50 rounded-[8px] active:scale-95 transition-transform"
          >
            <Typography
              fontSize="26px"
              lineHeight="1.2"
              letterSpacing="-0.3px"
              className="!text-white"
              isShadow={false}
              sketchy={true}
            >
              식당 찾아보기
            </Typography>
          </button>
        </div>
      </div>
    </div>
  );
}
