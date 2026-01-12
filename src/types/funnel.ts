export type StepId = number;
export type OptionId = string;

export interface FunnelOptionData {
  id: OptionId;
  label: string;
  icon?: string; // Path to icon or component identifier
  value?: string | number; // Value associated with the option for scoring
}

export interface FunnelStepData {
  id: StepId;
  title: string;
  subtitle?: string;
  options: FunnelOptionData[];
  backgroundImage?: string; // Path to background image
}

export interface FunnelData {
  steps: FunnelStepData[];
}
