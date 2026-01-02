/**
 * Funnel 관련 공통 타입 정의
 */

export const FUNNEL_STEPS = [
  'party-size',
  'taste',
  'texture',
  'temperature',
  'avoid',
  'aftermeal',
] as const;

export type StepId = (typeof FUNNEL_STEPS)[number];

/**
 * 아이콘 ID - 데이터와 UI 분리를 위한 토큰
 */
export type IconId =
  // party-size
  | 'solo'
  | 'duo'
  | 'group3p'
  // taste
  | 'hearty'
  | 'light'
  | 'spicy'
  | 'sweet'
  | 'no_appetite'
  // texture
  | 'soft'
  | 'chewy'
  | 'crispy'
  | 'any'
  // temperature
  | 'cold'
  | 'warmPlate'
  // avoid
  | 'greasy'
  | 'soupy'
  | 'wheat'
  | 'seafood'
  | 'salad'
  | 'null'
  // aftermeal
  | 'back_to_work'
  | 'coffee_break'
  | 'long_chat'
  ;

/**
 * Funnel 옵션 데이터 (순수 데이터, UI 없음)
 */
export interface FunnelOptionData {
  id: string;
  iconId?: IconId;
  title: string;
  subtitle?: string;
}

/**
 * Funnel 스텝 데이터 (순수 데이터, UI 없음)
 */
export interface FunnelStepData {
  id: StepId;
  question: string;
  options: FunnelOptionData[];
}

/**
 * Funnel 렌더링 설정
 */
export interface FunnelRenderConfig {
  id: StepId;
  next?: StepId;
}

export const FUNNEL_RENDER_CONFIG: FunnelRenderConfig[] = [
  { id: 'party-size', next: 'taste' },
  { id: 'taste', next: 'texture' },
  { id: 'texture', next: 'temperature' },
  { id: 'temperature', next: 'avoid' },
  { id: 'avoid', next: 'aftermeal' },
  { id: 'aftermeal' },
];
