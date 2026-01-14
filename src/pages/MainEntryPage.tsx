import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StaticBackground } from '../components/common/StaticBackground';

export const MainEntryPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-end p-6 pb-12 relative text-white">
      <StaticBackground
        src="/assets/images/bg-main.jpg"
        alt="Main Background"
      />

      <div className="z-10 w-full max-w-md flex flex-col gap-8 animate-fade-in-up">
        <div className="space-y-4 text-left">
          <p className="text-xl text-white/90 font-medium">오늘 뭐 먹지?</p>
          <h1 className="text-5xl font-extrabold leading-tight">
            나를 위한
            <br />
            <span className="text-blue-400">한 끼 메뉴</span>를<br />
            추천해드려요
          </h1>
        </div>

        <button
          onClick={() => navigate('/funnel')}
          className="w-full py-5 bg-blue-600 text-white text-xl font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/30 active:scale-[0.98]"
        >
          추천 받기
        </button>
      </div>
    </div>
  );
};
