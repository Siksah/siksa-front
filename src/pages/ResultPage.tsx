import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { RecommendationResult } from '../utils/recommendation';
import { StaticBackground } from '../components/common/StaticBackground';

export const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { result?: RecommendationResult } | null;

  useEffect(() => {
    if (!state?.result) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  if (!state?.result) return null;

  const { result } = state;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative text-white">
      <StaticBackground
        src={result.image}
        alt={result.name}
        className="brightness-[0.4]"
      />

      <div className="z-10 w-full max-w-md flex flex-col gap-8 animate-fade-in-up">
        <div className="text-center space-y-2">
          <p className="text-lg text-white/80 font-medium">오늘의 추천 메뉴</p>
          <h1 className="text-4xl font-bold leading-tight">{result.name}</h1>
        </div>

        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <img
            src={result.image}
            alt={result.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {result.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20"
              >
                #{tag}
              </span>
            ))}
          </div>

          <p className="text-center text-lg text-white/90 leading-relaxed">
            {result.description}
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full py-4 bg-white text-black text-lg font-bold rounded-xl hover:bg-white/90 transition-colors shadow-lg active:scale-[0.98] mt-4"
        >
          다시하기
        </button>
      </div>
    </div>
  );
};
