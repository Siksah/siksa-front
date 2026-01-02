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
        id: 'solo',
        iconId: 'solo',
        title: '혼자만의 고독한 미식가',
        subtitle: '(혼자)',
      },
      {
        id: 'duo',
        iconId: 'duo',
        title: '딱 한 명의 식사메이트',
        subtitle: '(둘이)',
      },
      {
        id: 'group3p',
        iconId: 'group3p',
        title: '왁자지껄 그룹',
        subtitle: '(3인 이상)',
      },
    ],
  },
  {
    id: 'taste',
    question: '오늘 당신의 혀가 원하는 특별한 자극은?',
    options: [
      {
        id: 'hearty',
        iconId: 'hearty',
        title: '힘 불끈! 든든하게!',
      },
      {
        id: 'light',
        iconId: 'light',
        title: '산뜻하게 리프레시!',
      },
      {
        id: 'spicy',
        iconId: 'spicy',
        title: '스트레스 해소! 맵고 자극적인 맛!',
      },
      {
        id: 'sweet',
        iconId: 'sweet',
        title: '기분전환! 달달함 추가',
      },
      {
        id: 'no_appetite',
        iconId: 'any',
        title: '아무거나! 집나간 입맛',
      },
    ],
  },
  {
    id: 'texture',
    question: '메인 메뉴의 가장 기대하는 식감은?',
    options: [
      {
        id: 'soft',
        iconId: 'soft',
        title: '목 넘김이 좋은',
        subtitle: '(국물/소스 자작한)',
      },
      {
        id: 'chewy',
        iconId: 'chewy',
        title: '쫀득쫀득한',
        subtitle: '(떡/고기 같은 쫄깃함)',
      },
      {
        id: 'crispy',
        iconId: 'crispy',
        title: '겉바속촉한',
        subtitle: '(튀김/구이 같은 바삭함)',
      },
      {
        id: 'any',
        iconId: 'any',
        title: '무엇이든 환영',
        subtitle: '(상관 없음)',
      },
    ],
  },
  {
    id: 'temperature',
    question: '오늘 당신의 위장을 달래줄 메뉴의 온도는?',
    options: [
      {
        id: 'cold',
        iconId: 'cold',
        title: '쨍하고 시원한 요리',
      },
      {
        id: 'warmPlate',
        iconId: 'warmPlate',
        title: '따뜻하고 갓 만든 요리',
      },
    ],
  },
  {
    id: 'avoid',
    question: '당신의 식욕을 급격히 떨어뜨리는 요소는?',
    options: [
      {
        id: 'greasy',
        iconId: 'greasy',
        title: '기름기는 헤비해',
        subtitle: '(튀김, 볶음류)',
      },
      {
        id: 'soupy',
        iconId: 'soupy',
        title: '또 국물이야?',
        subtitle: '(국물, 탕류)',
      },
      {
        id: 'wheat',
        iconId: 'wheat',
        title: '속이 더부룩',
        subtitle: '(면, 빵 류)',
      },
      {
        id: 'seafood',
        iconId: 'seafood',
        title: '바다 향은 좀…',
        subtitle: '(회, 해물류)',
      },
      {
        id: 'salad',
        iconId: 'salad',
        title: '풀떼기는 안돼!',
        subtitle: '(샐러드류)',
      },
      {
        id: 'null',
        iconId: 'null',
        title: '오늘은 뭐든 괜찮아',
      },
    ],
  },
  {
    id: 'aftermeal',
    question: '오늘의 점심 루틴은?',
    options: [
      {
        id: 'back_to_work',
        iconId: 'back_to_work',
        title: '빠르게 먹고 바로 가기',
      },
      {
        id: 'coffee_break',
        iconId: 'coffee_break',
        title: '밥 먹고 짧은 휴식 챙기기',
      },
      {
        id: 'long_chat',
        iconId: 'long_chat',
        title: '여유롭게 수다와 산책까지 풀코스',
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
