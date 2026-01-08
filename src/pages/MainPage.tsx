import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

import mainVisualGroup from '@/assets/images/main_visual_group.svg';
import decorBottomRight from '@/assets/images/main_decor_bottom_right.svg';
import decorTopLeft from '@/assets/images/main_decor_top_left.svg';
import decorBottomLeft from '@/assets/images/main_decor_bottom_left.svg';
import decorMidRight from '@/assets/images/main_decor_mid_right.svg';
import bgTexture from '@/assets/images/bg_texture.png';

import { useSession } from '../hooks/useSession';

export function MainPage() {
  const navigate = useNavigate();
  const { createSession } = useSession();
  
  // '메뉴 시작하기' 버튼 클릭 시
  const startMenuClick = async () => {

    // session 생성
    await createSession();

    // 페이지 이동
    navigate('/question');
  };

  return (
    <div className="flex flex-col flex-1 relative">
      {/* 배경 텍스처 */}
      <div className="absolute flex items-center justify-center left-[-6.03rem] top-[-0.27rem] mix-blend-soft-light pointer-events-none w-[34.2rem] h-[51.2rem]">
        <div className="rotate-[270deg] w-full h-full">
          <img
            src={bgTexture}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 배경 장식 아이콘들 - absolute로 정확한 위치에 배치 */}
      {/* 왼쪽 상단 장식 */}
      <div className="absolute left-[-0.6rem] top-[5.9rem] w-[4.8rem] h-[4.5rem] pointer-events-none">
        <img
          src={decorTopLeft}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* 왼쪽 하단 장식 */}
      <div className="absolute left-[-0.74rem] top-[30.75rem] w-[4rem] h-[4.1rem] pointer-events-none">
        <img src={decorBottomLeft} alt="" className="w-full h-full object-contain" />
      </div>

      {/* 오른쪽 중간 장식 */}
      <div className="absolute left-[18.02rem] top-[14.91rem] w-[2.27rem] h-[2.36rem] pointer-events-none">
        <img
          src={decorMidRight}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* 오른쪽 하단 장식 */}
      <div className="absolute flex items-center justify-center left-[16.93rem] top-[34.46rem] w-[7.95rem] h-[5.3rem] pointer-events-none">
        <div className="rotate-[331.871deg] w-full h-full">
          <img
            src={decorBottomRight}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-7 pt-40 relative z-10">
        {/* 상단 텍스트 영역 */}
        <div className="flex flex-col items-center mb-8">
          <Typography className="text-center mb-4" preset="main-subtitle">
            오늘은 무얼 먹어볼까?
          </Typography>
          <Typography className="text-center" preset="main-title">
            냠냠쩝쩝
          </Typography>
        </div>

        {/* 가운데 접시 아이콘 */}
        <div className="flex items-center justify-center mb-auto py-8">
          <div className="w-[21.88rem] h-[12.5rem] flex items-center justify-center">
            <img
              src={mainVisualGroup}
              alt="접시와 수저"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="mb-24">
          <Button
            variant="handwriting"
            size="lg"
            className="w-full"
            // onClick={() => navigate('/question')}
            onClick={startMenuClick}
          >
            메뉴 정하기
          </Button>
        </div>
      </div>
    </div>
  );
}
