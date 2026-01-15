import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useCallback } from 'react';
import type { StepId } from '@/types/funnel';
import type { FunnelOptionData } from '@/types/funnel';
import { CommonService } from '@/comm/common.service';
import { getRecommendation } from '@/utils/recommendation';
import type { FoodResult } from '@/data/resultData';

export type FunnelResult = Partial<Record<StepId, string>>;

export interface RecommendationResponse {
  success: boolean;
  data?: FoodResult;
  error?: string;
}

const commonService = new CommonService();

export function useMenuResultFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const funnelResult = location.state as FunnelResult | undefined;

  const goToHome = () => navigate('/');
  const goToQuestion = () => navigate('/question');
  const goToFunnel = () => navigate('/funnel');
  const goToLoading = (ctx: FunnelResult) =>
    navigate('/loading', { state: ctx });
  const goToResult = (result: FoodResult) =>
    navigate('/result', { state: { result } });
  const goToError = (errorMessage?: string) =>
    navigate('/error', { state: { error: errorMessage } });

  const fetchRecommendation = useCallback(
    async (answers: Record<number, FunnelOptionData>): Promise<FoodResult> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await commonService.requestService<RecommendationResponse>({
          serviceId: 'recommendation/get',
          data: { answers },
        });

        if (response.data?.success && response.data.data) {
          return response.data.data;
        }

        throw new Error(response.data?.error || '추천 결과를 받아오지 못했습니다.');
      } catch (err) {
        console.warn('API 호출 실패, 로컬 추천으로 폴백:', err);
        return getRecommendation(answers);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const submitAnswersAndNavigate = useCallback(
    async (answers: Record<number, FunnelOptionData>) => {
      try {
        const result = await fetchRecommendation(answers);
        goToResult(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
        setError(errorMessage);
        goToError(errorMessage);
      }
    },
    [fetchRecommendation]
  );

  return {
    funnelResult,
    isLoading,
    error,
    goToHome,
    goToQuestion,
    goToFunnel,
    goToLoading,
    goToResult,
    goToError,
    fetchRecommendation,
    submitAnswersAndNavigate,
  };
}
