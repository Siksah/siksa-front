import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

import imgGroup5 from '@/assets/images/fork_figma.svg';
import imgGroup6 from '@/assets/images/spoon_figma.svg';
import imgGroup7 from '@/assets/images/plate_figma.svg';
import imgVector11 from '@/assets/images/bg_decor_bottom_right_figma.svg';
import imgVector10 from '@/assets/images/bg_decor_top_left_figma.svg';
import imgVector9 from '@/assets/images/bg_decor_bottom_left_figma.svg';
import imgVector12 from '@/assets/images/bg_decor_mid_right_figma.svg';
import imgImage103 from '@/assets/images/bg_texture.png';

export function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 relative">
      {/* 배경 텍스처 */}
      <div className="absolute flex items-center justify-center left-[-6.03rem] top-[-0.27rem] mix-blend-soft-light pointer-events-none w-[34.2rem] h-[51.2rem]">
        <div className="rotate-[270deg] w-full h-full">
          <img
            src={imgImage103}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 배경 장식 아이콘들 - absolute로 정확한 위치에 배치 */}
      {/* 왼쪽 상단 장식 */}
      <div className="absolute left-[-0.6rem] top-[5.9rem] w-[4.8rem] h-[4.5rem] pointer-events-none">
        <img
          src={imgVector10}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* 왼쪽 하단 장식 */}
      <div className="absolute left-[-0.74rem] top-[30.75rem] w-[4rem] h-[4.1rem] pointer-events-none">
        <img src={imgVector9} alt="" className="w-full h-full object-contain" />
      </div>

      {/* 오른쪽 중간 장식 */}
      <div className="absolute left-[18.02rem] top-[14.91rem] w-[2.27rem] h-[2.36rem] pointer-events-none">
        <img
          src={imgVector12}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* 오른쪽 하단 장식 */}
      <div className="absolute flex items-center justify-center left-[16.93rem] top-[34.46rem] w-[7.95rem] h-[5.3rem] pointer-events-none">
        <div className="rotate-[331.871deg] w-full h-full">
          <img
            src={imgVector11}
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
          <div className="flex items-center justify-center">
            {/* 왼쪽 포크 */}
            <div className="rotate-338 w-[5.84rem] h-[9.69rem] flex items-center justify-center -mr-2">
              <img
                src={imgGroup5}
                alt="포크"
                className="w-full h-full object-contain"
              />
            </div>

            {/* 가운데 접시 */}
            <div className="w-45 h-[10.94rem] flex items-center justify-center z-10">
              <img
                src={imgGroup7}
                alt="접시"
                className="w-full h-full object-contain"
              />
            </div>

            {/* 오른쪽 숟가락 */}
            <div className="rotate-25 w-[6.63rem] h-[9.74rem] flex items-center justify-center -ml-2">
              <img
                src={imgGroup6}
                alt="숟가락"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="mb-24">
          <Button
            variant="handwriting"
            size="lg"
            className="w-full"
            onClick={() => navigate('/question')}
          >
            메뉴 정하기
          </Button>
        </div>
      </div>
    </div>
  );
}
