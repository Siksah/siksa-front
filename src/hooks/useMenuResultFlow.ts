import { useNavigate, useLocation } from 'react-router-dom';
import type { StepId } from '@/types/funnel';

export type FunnelResult = Partial<Record<StepId, string>>;

export function useMenuResultFlow() {
  const navigate = useNavigate();
  const location = useLocation();

  const funnelResult = location.state as FunnelResult | undefined;

  const goToHome = () => navigate('/');
  const goToQuestion = () => navigate('/question');
  const goToLoading = (ctx: FunnelResult) =>
    navigate('/loading', { state: ctx });
  const goToResult = (ctx: FunnelResult) => navigate('/result', { state: ctx });

  return {
    funnelResult,
    goToHome,
    goToQuestion,
    goToLoading,
    goToResult,
  };
}
