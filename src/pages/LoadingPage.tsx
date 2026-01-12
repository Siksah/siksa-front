import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRecommendation } from '../utils/recommendation';
import { StaticBackground } from '../components/common/StaticBackground';

export const LoadingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check for answers
    const state = location.state as { answers?: any } | null;
    if (!state?.answers) {
      navigate('/', { replace: true });
      return;
    }

    // Determine result immediately (synchronous)
    const result = getRecommendation(state.answers);

    // Simulate loading progress
    const duration = 2500; // 2.5 seconds
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        // Navigate to result
        navigate('/result', { state: { result } });
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [navigate, location.state]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative text-white">
      <StaticBackground
        src="/assets/images/bg-loading.jpg"
        alt="Loading"
        className="brightness-50"
      />

      <div className="z-10 flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />

        <h2 className="text-2xl font-bold text-center">
          최고의 메뉴를
          <br />
          찾고 있어요
        </h2>

        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
