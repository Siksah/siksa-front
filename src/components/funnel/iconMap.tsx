import {
  BicepsFlexed,
  LeafyGreen,
  Timer,
  Coffee,
  MessageCircle,
  Moon,
  Sparkles,
  Cloud,
  Snowflake,
  Sun,
  CircleHelp as HelpCircle,
  Equal,
  AudioWaveform,
  Loader,
  Clover,
  User,
  Users,
  UsersRound,
  Zap,
  CakeSlice,
  Soup,
  Waves,
  type LucideIcon,
} from 'lucide-react';

// Lucide 아이콘 이름 → 컴포넌트 매핑
export const lucideIconMap: Record<string, LucideIcon> = {
  'equal-approximately': Equal,
  'waves': Waves,
  'audio-waveform': AudioWaveform,
  'loader': Loader,
  'clover': Clover,
  'snowflake': Snowflake,
  'sun': Sun,
  'sparkles': Sparkles,
  'cloud': Cloud,
  'biceps-flexed': BicepsFlexed,
  'leafy-green': LeafyGreen,
  'timer': Timer,
  'coffee': Coffee,
  'message-circle': MessageCircle,
  'moon': Moon,
  'help-circle': HelpCircle,
  'user': User,
  'users': Users,
  'users-round': UsersRound,
  'zap': Zap,
  'cake-slice': CakeSlice,
  'soup': Soup,
};

/**
 * Lucide 아이콘 이름으로 아이콘 컴포넌트 가져오기
 */
export function getLucideIcon(iconName?: string, className = 'w-8 h-8'): React.ReactNode {
  if (!iconName) return null;
  const IconComponent = lucideIconMap[iconName];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

// Legacy icon map (using Lucide icons now instead of SVG imports)
// Q1 Party Size icons - now use Lucide
export const iconMap: Record<string, React.ReactNode> = {
  // party-size (Lucide 아이콘으로 대체)
  alone: <User className="w-[20px] h-[20px] text-current" />,
  two: <Users className="w-[30px] h-[20px] text-current" />,
  group: <UsersRound className="w-[44px] h-[20px] text-current" />,
};

/**
 * 아이콘 ID로 아이콘 컴포넌트 가져오기
 */
export function getIcon(iconId?: string): React.ReactNode {
  if (!iconId) return undefined;
  return iconMap[iconId];
}
