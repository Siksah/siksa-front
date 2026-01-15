import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMenuResultFlow } from '@/hooks/useMenuResultFlow';
import type { FunnelOptionData } from '@/types/funnel';
import { Typography } from '@/components/ui/typography';
import mainBg from '@/assets/images/main_bg.png';

export const LoadingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchRecommendation } = useMenuResultFlow();
  const [progress, setProgress] = useState(0);
  const [isApiComplete, setIsApiComplete] = useState(false);
  const resultRef = useRef<any>(null);

  const LOADING_IMAGES = [
    '된장찌개.svg',
    '라멘.svg',
    '햄버거.svg',
    '소바.svg',
    '떡볶이.svg',
    '짜장면.svg',
    '김밥.svg',
    '초밥.svg',
    '돈까스.svg',
    '샌드위치.svg',
    '파스타.svg',
    '치킨.svg',
  ];

  const [randomImage] = useState(() =>
    LOADING_IMAGES[Math.floor(Math.random() * LOADING_IMAGES.length)]
  );
  const imageUrl = `/assets/images/loading/${randomImage}`;

  useEffect(() => {
    const state = location.state as { answers?: Record<number, FunnelOptionData> } | null;
    if (!state?.answers) {
      navigate('/', { replace: true });
      return;
    }

    const callApi = async () => {
      try {
        const result = await fetchRecommendation(state.answers!);
        resultRef.current = result;
        setIsApiComplete(true);
      } catch (error) {
        console.error('API 호출 실패:', error);
        navigate('/error', { replace: true, state: { error: '추천을 가져오는 데 실패했습니다.' } });
      }
    };

    callApi();
  }, [location.state, navigate, fetchRecommendation]);

  useEffect(() => {
    const minDuration = 2000;
    const intervalTime = 50;
    const steps = minDuration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isApiComplete && progress >= 100 && resultRef.current) {
      navigate('/result', { state: { result: resultRef.current } });
    }
  }, [isApiComplete, progress, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative text-[#171717]"
      style={{
        background:
          'linear-gradient(180deg, rgba(254, 193, 172, 1) 0%, rgba(255, 242, 238, 1) 27%, rgba(255, 242, 238, 1) 76%, rgba(254, 193, 172, 1) 100%)',
      }}
    >
      <img
        src={mainBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none mix-blend-soft-light opacity-100"
      />

      <div className="z-10 flex flex-col items-center gap-8 w-full max-w-md">
        <div className="w-64 h-64 flex items-center justify-center">
          <img
            src={imageUrl}
            alt="Loading illustration"
            className="w-full h-full object-contain animate-pulse"
          />
        </div>

        <Typography preset="main-subtitle" className="text-2xl font-bold text-center text-[#171717]">
          오늘의 메뉴 고르는 중
        </Typography>

        <div className="w-64 h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#F73418] transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
