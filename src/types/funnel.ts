export type StepId = number;
export type OptionId = string;

// 레이아웃 타입: Figma 디자인에서 파악한 5가지 패턴
export type FunnelLayoutType =
  | 'vertical-3'   // Q1, Q6: 3개 수직 카드 (140px)
  | 'vertical-5'   // Q2: 5개 수직 리스트 (80px)
  | 'grid-2x2'     // Q3: 2x2 이미지/아이콘 그리드 (160x214)
  | 'cards-2'      // Q4: 2개 대형 카드 (335x195)
  | 'grid-2x3';    // Q5: 2x3 그리드 (161.5x126.67)

export interface FunnelOptionData {
  id: OptionId;
  label: string;
  subLabel?: string; // 보조 텍스트 (괄호 안 설명 등)
  icon?: string; // Lucide 아이콘 이름 (예: 'snowflake', 'sun')
  value?: string | number;
}

export interface FunnelStepData {
  id: StepId;
  title: string;
  subtitle?: string;
  layoutType: FunnelLayoutType;
  options: FunnelOptionData[];
  backgroundImage?: string;
}

export interface FunnelData {
  steps: FunnelStepData[];
}
