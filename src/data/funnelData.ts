import type { FunnelStepData, StepId } from '@/types/funnel';
import { FUNNEL_STEPS } from '@/types/funnel';

/**
 * Funnel 스텝 데이터 (순수 데이터, JSX 없음)
 * - iconId 토큰으로 UI 분리
 * - stepNumber는 자동 계산
 */
const funnelStepsRaw: Omit<FunnelStepData, 'stepNumber'>[] = [
  {
    id: 'party-size',
    question: '점심 식사 파티원 수는?',
    options: [
      {
        id: 'alone',
        iconId: 'alone',
        title: '혼자만의 고독한 미식가',
        subtitle: '(혼자)',
      },
      {
        id: 'two',
        iconId: 'two',
        title: '딱 한 명의 식사메이트',
        subtitle: '(둘이)',
      },
      {
        id: 'group',
        iconId: 'group',
        title: '왁자지껄 그룹',
        subtitle: '(3인 이상)',
      },
    ],
  },
  {
    id: 'taste',
    question: '오늘의 입맛은?',
    options: [
      {
        id: 'healthy',
        iconId: 'healthy',
        title: '튼튼! 건강 챙기는 보양식',
      },
      {
        id: 'light',
        iconId: 'light',
        title: '산뜻하게! 가벼운 샐러드',
      },
      {
        id: 'any',
        iconId: 'any',
        title: '아무거나! 집 나간 입맛',
      },
    ],
  },
  {
    id: 'texture',
    question: '선호하는 식감은?',
    options: [
      {
        id: 'crispy',
        iconId: 'crispy',
        title: '와삭 콰사삭!',
        subtitle: '(바삭하게)',
      },
      {
        id: 'soft',
        iconId: 'soft',
        title: '말랑 말랑~',
        subtitle: '(부드럽게)',
      },
    ],
  },
  {
    id: 'temperature',
    question: '원하는 온도는?',
    options: [
      {
        id: 'cold',
        iconId: 'cold',
        title: '이냉치냉! 속 시원한 요리',
      },
      {
        id: 'hot',
        iconId: 'hot',
        title: '따뜻하고 갓 만든 요리',
      },
    ],
  },
  {
    id: 'speed',
    question: '식사 시간은?',
    options: [
      {
        id: 'fast',
        iconId: 'fast',
        title: '후루룩 뚝딱!',
        subtitle: '(빠르게)',
      },
      {
        id: 'any-speed',
        iconId: 'any-speed',
        title: '오늘은 뭐든 괜찮아',
      },
    ],
  },
  {
    id: 'atmosphere',
    question: '선호하는 분위기는?',
    options: [
      {
        id: 'quiet',
        iconId: 'quiet',
        title: '조용하게 식사에 집중',
      },
      {
        id: 'relaxed',
        iconId: 'relaxed',
        title: '여유롭게',
        subtitle: '수다와 산책까지 풀코스',
      },
    ],
  },
];

/**
 * stepNumber가 자동 계산된 스텝 데이터 (배열)
 */
export const funnelSteps: (FunnelStepData & { stepNumber: number })[] =
  funnelStepsRaw.map((step, index) => ({
    ...step,
    stepNumber: index + 1,
  }));

/**
 * stepId로 O(1) 접근 가능한 맵
 * - funnelSteps.find() 대신 사용
 * - 타입 안전하게 접근 가능
 */
export const funnelStepsById: Record<
  StepId,
  FunnelStepData & { stepNumber: number }
> = Object.fromEntries(funnelSteps.map((step) => [step.id, step])) as Record<
  StepId,
  FunnelStepData & { stepNumber: number }
>;

/**
 * 스텝 순서 검증 (FUNNEL_STEPS와 일치하는지)
 */
if (process.env.NODE_ENV === 'development') {
  const dataStepIds = funnelSteps.map((s) => s.id);
  const configStepIds = [...FUNNEL_STEPS];
  if (JSON.stringify(dataStepIds) !== JSON.stringify(configStepIds)) {
    console.warn('funnelData와 FUNNEL_STEPS의 순서가 일치하지 않습니다.', {
      dataStepIds,
      configStepIds,
    });
  }
}
