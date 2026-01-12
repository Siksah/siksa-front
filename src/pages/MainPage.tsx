import { useNavigate } from 'react-router-dom';
import { useSession } from '../hooks/useSession';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

// 이미지 import
import mainBgTexture from '@/assets/images/main_bg.png'; // 텍스처용
import mainDecorFinal from '@/assets/images/main_decor_final.png'; // 장식용
import mainHeroFinal from '@/assets/images/main_hero_final.png';

export function MainPage() {
  const navigate = useNavigate();
  const { createSession } = useSession();

  const startMenuClick = async () => {
    await createSession();
    navigate('/question');
  };

  return (
    <div className="grid grid-cols-1 grid-rows-1 w-full h-full overflow-hidden bg-gradient-to-t from-[#fa502d] via-[#f73418] to-[#e91b0e]">
      {/* 1. 배경 텍스처 레이어 (Grid Item) */}
      <img
        src={mainBgTexture}
        alt=""
        className="col-start-1 row-start-1 w-full h-full object-cover z-0 mix-blend-overlay opacity-60 pointer-events-none"
      />

      {/* 2. 배경 장식 레이어 (Grid Item으로 배치) */}
      {/* Figma: Group 1707481895 (x: -11.89, y: 94.47). Margin-top (25.19%) is relative to width (375px) to maintain aspect ratio */}
      <img
        src={mainDecorFinal}
        alt=""
        className="col-start-1 row-start-1 z-0 ml-[-3.17%] mt-[25.19%] w-[109.32%] h-auto max-w-none pointer-events-none self-start justify-self-start"
      />
      
      {/* 3. 콘텐츠 그룹 (Grid Item & Flexbox 레이아웃) */}
      <div className="col-start-1 row-start-1 z-20 flex flex-col items-center w-full h-full pt-[177px] pb-[97px]">
        {/* 텍스트 그룹 */}
        <div className="flex flex-col items-center">
          <Typography 
            preset="main-subtitle"
            className="!text-white !leading-none"
          >
            오늘은 무얼 먹어볼까?
          </Typography>

          <Typography 
            preset="main-title"
            className="mt-[10px] !text-white !leading-none"
          >
            냠냠쩝쩝
          </Typography>
        </div>

        {/* 히어로 이미지 영역 */}
        <div className="mt-[60px] w-[324px] h-[187px]">
          <img
            src={mainHeroFinal}
            alt="Food Illustrations"
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>

        {/* 하단 버튼 영역 */}
        <div className="mt-auto w-full px-[28px]">
          <Button
            variant="handwriting"
            size="lg"
            className="w-full h-[65px] text-[40px] rounded-[8px] bg-[#1C202C] text-white border-none shadow-xl"
            style={{ fontFamily: "'Nanum AmSeuTeReuDam', sans-serif" }}
            onClick={startMenuClick}
          >
            메뉴 정하기
          </Button>
        </div>
      </div>
    </div>
  );
}
