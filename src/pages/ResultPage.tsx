import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RefreshCw, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
import type { FoodResult } from '@/data/resultData';

// Import assets (Figma API로 받은 시멘틱 이름의 SVG들)
import bgThumbsUp from '@/assets/images/result/bg_thumbs_up.svg';
import bgConfetti from '@/assets/images/result/bg_confetti.svg';
import bgSparkle from '@/assets/images/result/bg_sparkle.svg';
import decorationPattern from '@/assets/images/result/decoration_pattern.svg';

// 배경 텍스처 (메인 페이지와 동일)
import mainBgTexture from '@/assets/images/main_bg.png';

// 랜덤 배경 일러스트 3종
const BACKGROUND_IMAGES = [bgThumbsUp, bgConfetti, bgSparkle];

export function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // LoadingPage에서 전달받은 결과 데이터
  const result = (location.state as { result?: FoodResult } | null)?.result;

  // 랜덤 배경 선택 (컴포넌트 마운트 시 한 번만)
  const randomBg = useMemo(
    () => BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)],
    []
  );

  // 결과가 없으면 메인으로 리다이렉트
  if (!result) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-orange-10">
        <p className="text-[26px] text-navy">결과를 불러오는 중...</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-3 bg-navy text-white rounded-lg"
        >
          처음으로
        </button>
      </div>
    );
  }

  // 다시하기: Q1으로 이동
  const handleRetry = () => {
    navigate('/funnel');
  };

  // 공유하기
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '냠냠쩝쩝 - 오늘의 메뉴 추천',
          text: `오늘의 추천: ${result.name}`,
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

  // 식당 찾아보기: 네이버 지도 검색
  const handleFindRestaurant = () => {
    const url = `https://map.naver.com/p/search/${encodeURIComponent(result.name)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-orange-10">
      {/* 배경 텍스처 (mix-blend-soft-light) */}
      <img
        src={mainBgTexture}
        alt=""
        className="absolute inset-0 w-full h-full object-cover mix-blend-soft-light opacity-60 pointer-events-none z-0"
      />

      {/* 배경 장식 패턴 (제거) */}
      {/* <img
        src={decorationPattern}
        alt=""
        className="absolute left-1/2 top-[164px] -translate-x-1/2 w-[280px] h-auto mix-blend-soft-light pointer-events-none z-0"
      /> */}

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center w-full h-full pt-[95px] pb-[22px]">
        {/* 타이틀 */}
        <h1 className="text-[30px] text-navy text-center leading-normal">
          오늘의 추천 메뉴는..!
        </h1>

        {/* 결과 카드 */}
        <div
          className="relative mt-[30px] w-[291px] h-[463px] bg-white rounded-[30px] border-[3px] border-orange-30 overflow-hidden shrink-0"
          style={{
            boxShadow: '5px 5px 5px 0px rgba(250, 80, 45, 0.3)',
          }}
        >
          {/* 카드 내부 그라디언트 배경 */}
          <div
            className="absolute top-[11.5px] left-[12.5px] w-[265px] h-[372px] rounded-[17px] border-[3px] border-orange-10 overflow-hidden"
            style={{
              background: 'linear-gradient(to top, var(--color-orange-40) 0%, var(--color-orange-50) 100%)',
            }}
          >
            {/* 배경 장식 패턴 (카드 내부) */}
            <img
              src={decorationPattern}
              alt=""
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-auto mix-blend-soft-light pointer-events-none opacity-80"
            />
            
            {/* 랜덤 배경 일러스트 (카드 중앙 하단) */}
            <img
              src={randomBg}
              alt=""
              className="absolute bottom-[60px] left-1/2 -translate-x-1/2 w-[180px] h-auto pointer-events-none z-10"
            />

            {/* 음식 이름 */}
            <p className="absolute top-[64px] left-1/2 -translate-x-1/2 text-[55px] text-white text-center leading-none z-20 w-[200px] break-keep">
              {result.name}
            </p>

            {/* 설명 */}
            <div className="absolute top-[135px] left-1/2 -translate-x-1/2 text-[30px] text-orange-10 text-center leading-normal z-20 w-[220px] break-keep whitespace-pre-wrap">
              {result.description}
            </div>
          </div>
        </div>

        {/* 아이콘 바 (공유, 좋아요, 싫어요 등) */}
        <div className="flex items-center justify-center gap-[45px] mt-[24px]">
          <button
            onClick={handleRetry}
            className="text-orange-30 hover:text-orange-40 transition-colors"
            aria-label="다시하기"
          >
            <RefreshCw size={24} strokeWidth={2} />
          </button>
          <button
            className="text-orange-30 hover:text-orange-40 transition-colors"
            aria-label="좋아요"
          >
            <ThumbsUp size={24} strokeWidth={2} />
          </button>
          <button
            className="text-orange-30 hover:text-orange-40 transition-colors"
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

        {/* 하단 버튼 영역 */}
        <div className="flex items-center justify-center gap-[10px] mt-auto px-[20px] w-full">
          {/* 다시하기 버튼 */}
          <button
            onClick={handleRetry}
            className="flex items-center justify-center w-[162px] h-[53px] bg-navy rounded-[8px] text-[26px] text-white tracking-[-0.3px] leading-[1.2] active:scale-95 transition-transform"
          >
            다시하기
          </button>

          {/* 식당 찾아보기 버튼 */}
          <button
            onClick={handleFindRestaurant}
            className="flex items-center justify-center w-[162px] h-[53px] bg-orange-50 rounded-[8px] text-[26px] text-white tracking-[-0.3px] leading-[1.2] active:scale-95 transition-transform"
          >
            식당 찾아보기
          </button>
        </div>
      </div>
    </div>
  );
}
