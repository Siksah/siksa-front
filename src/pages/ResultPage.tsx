import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RefreshCw, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
import type { FoodResult } from '@/data/resultData';
import { Typography } from '@/components/ui/typography';

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

  // 결과가 없으면 fallback UI
  if (!result) {
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
      {/* 배경 텍스처 */}
      <img
        src={mainBgTexture}
        alt=""
        className="absolute inset-0 w-full h-full object-cover mix-blend-soft-light opacity-60 pointer-events-none z-0"
      />

      {/* 메인 콘텐츠 - Flex 레이아웃 */}
      <div className="relative z-10 flex flex-col items-center w-full h-full pt-[95px]">
        {/* 타이틀 */}
        <Typography
          preset="funnel-title"
          fontSize="30px"
          className="!text-navy text-center !leading-normal"
          isShadow={false}
          sketchy={true}
        >
          오늘의 추천 메뉴는..!
        </Typography>

        {/* 결과 카드 */}
        <div
          className="relative mt-[30px] w-[291px] h-[463px] bg-white rounded-[30px] border-[3px] border-orange-30 overflow-hidden flex flex-col"
          style={{
            boxShadow: '5px 5px 5px 0px rgba(250, 80, 45, 0.3)',
          }}
        >
          {/* 카드 내부 그라디언트 배경 - Flex grow */}
          <div
            className="relative m-[13px] rounded-[17px] border-[3px] border-orange-10 overflow-hidden flex-1 flex flex-col items-center z-0"
            style={{
              background: 'linear-gradient(to top, var(--color-orange-40) 0%, var(--color-orange-50) 100%)',
            }}
          >
            {/* 질감 텍스처 */}
            <img
              src={mainBgTexture}
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-soft-light opacity-40 pointer-events-none"
            />

{/* 랜덤 배경 일러스트 - 그라디언트 박스 밖에서 관리 */}

            {/* 텍스트 영역 - 상단 */}
            <div className="relative z-20 flex flex-col items-center pt-[52px] px-4">
              {/* 음식 이름 */}
              <Typography
                fontSize="55px"
                lineHeight="1"
                className="!text-white text-center break-keep"
                isShadow={true}
                shadowColor="#C4250E"
                sketchy={true}
              >
                {result.name}
              </Typography>

              {/* 설명 */}
              <Typography
                fontSize="30px"
                lineHeight="normal"
                className="!text-orange-10 text-center break-keep whitespace-pre-wrap mt-[18px]"
                isShadow={false}
                sketchy={true}
              >
                {result.description}
              </Typography>
            </div>

            {/* 일러스트 영역 - 하단 (flex-grow로 남은 공간 차지) */}
            <div className="relative z-10 flex-1 flex items-end justify-center pb-[20px] w-full">
              {/* 배경 장식 패턴 */}
              <img
                src={decorationPattern}
                alt=""
                className="absolute bottom-[120px] left-[42%] -translate-x-1/2 w-[90%] h-auto pointer-events-none opacity-80"
              />
              
            </div>

            {/* 랜덤 배경 일러스트 (제거 - 밖으로 이동) */}
            {/* <img
              src={randomBg}
              alt=""
              className="absolute z-50 w-[200px] bottom-[-20px] h-auto pointer-events-none"
            /> */}
          </div>

          {/* 랜덤 배경 일러스트 - 그라디언트 박스 밖으로 이동하여 잘림 방지 */}
          <img
            src={randomBg}
            alt=""
            className="absolute z-20 w-[240px] h-auto pointer-events-none left-1/2 -translate-x-1/2"
            style={{
              top: '230px',
              // 또는 bottom 기준으로 배치
            }}
          />

          {/* 아이콘 바 - 카드 하단 흰색 영역 */}
          <div className="flex items-center justify-center gap-[45px] py-[12px]">
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
        </div>

        {/* 하단 버튼 영역 - mt-auto로 하단 고정 */}
        <div className="flex items-center justify-center gap-[10px] mt-auto mb-[78px] px-[20px] w-full">
          {/* 다시하기 버튼 */}
          <button
            onClick={handleRetry}
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

          {/* 식당 찾아보기 버튼 */}
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
