import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useCallback } from 'react';
import type { StepId } from '@/types/funnel';
import type { FunnelOptionData } from '@/types/funnel';
import { CommonService } from '@/comm/common.service';
import { getRecommendations } from '@/utils/recommendation';

export type FunnelResult = Partial<Record<StepId, string>>;

export interface RecommendationItem {
  rank: 1 | 2 | 3;
  menu: string;
  reason: string;
}

export interface AnswerApiResponse {
  data: {
    message: string;
    answerId: string;
    recommendation: RecommendationItem[];
  };
  statusCode: number;
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
  const goToResult = (recommendations: RecommendationItem[], sessionId: string) =>
    navigate('/result', { state: { recommendations, sessionId } });
  const goToError = (errorMessage?: string) =>
    navigate('/error', { state: { error: errorMessage } });

  const fetchRecommendations = useCallback(
    async (answers: Record<number, FunnelOptionData>): Promise<RecommendationItem[]> => {
      setIsLoading(true);
      setError(null);

      try {
        const sessionId = sessionStorage.getItem('anon_session_id') || '';
        const response = await commonService.requestService<AnswerApiResponse>({
          serviceId: 'answer',
          data: { answers, sessionId },
        });

        const actualData = response.data?.data;

        if (actualData?.recommendation && actualData.recommendation.length > 0) {
          return actualData.recommendation;
        }

        throw new Error('추천 결과를 받아오지 못했습니다.');
      } catch (err) {
        console.warn('API 호출 실패, 로컬 추천으로 폴백:', err);
        return getRecommendations(answers);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const sendFeedback = useCallback(
    async (params: {
      sessionId: string;
      retryCount: number;
      result: { rank: number; menu: string };
      feedback: 'like' | 'dislike';
    }): Promise<boolean> => {
      try {
        await commonService.requestService({
          serviceId: 'feedback',
          data: {
            sessionId: params.sessionId,
            retryCount: String(params.retryCount),
            result: params.result,
            feedback: params.feedback,
            timestamp: new Date().toISOString(),
          },
        });
        return true;
      } catch (err) {
        console.error('피드백 전송 실패:', err);
        return false;
      }
    },
    []
  );

  const submitAnswersAndNavigate = useCallback(
    async (answers: Record<number, FunnelOptionData>) => {
      try {
        const recommendations = await fetchRecommendations(answers);
        const sessionId = sessionStorage.getItem('anon_session_id') || crypto.randomUUID?.() || `${Date.now()}`;
        goToResult(recommendations, sessionId);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
        setError(errorMessage);
        goToError(errorMessage);
      }
    },
    [fetchRecommendations]
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
    fetchRecommendations,
    sendFeedback,
    submitAnswersAndNavigate,
  };
}
