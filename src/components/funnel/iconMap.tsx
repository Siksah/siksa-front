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
} from 'lucide-react';
import type { IconId } from '@/types/funnel';

import iconAlone from '@/assets/images/icon_alone.svg';
import iconTwo from '@/assets/images/icon_two.svg';
import iconGroup from '@/assets/images/icon_group.svg';

/**
 * 아이콘 ID를 React 노드로 매핑
 * 디자인 변경 시 이 파일만 수정하면 됨
 */
export const iconMap: Record<IconId, React.ReactNode> = {
  // party-size (이미지 아이콘)
  alone: (
    <img
      src={iconAlone}
      alt="alone"
      className="w-[15px] h-[20px] object-contain"
    />
  ),
  two: (
    <img
      src={iconTwo}
      alt="two"
      className="w-[30px] h-[20px] object-contain"
    />
  ),
  group: (
    <img
      src={iconGroup}
      alt="group"
      className="w-[44px] h-[20px] object-contain"
    />
  ),

  // taste (lucide 아이콘)
  healthy: <BicepsFlexed className="w-8 h-8 text-current" />,
  light: <LeafyGreen className="w-8 h-8 text-current" />,
  any: <HelpCircle className="w-8 h-8 text-current" />,

  // texture
  crispy: <Sparkles className="w-8 h-8 text-current" />,
  soft: <Cloud className="w-8 h-8 text-current" />,

  // temperature
  cold: <Snowflake className="w-8 h-8 text-current" />,
  hot: <Sun className="w-8 h-8 text-current" />,

  // speed
  fast: <Timer className="w-8 h-8 text-current" />,
  'any-speed': <Coffee className="w-8 h-8 text-current" />,

  // atmosphere
  quiet: <Moon className="w-8 h-8 text-current" />,
  relaxed: <MessageCircle className="w-8 h-8 text-current" />,
};

/**
 * 아이콘 ID로 아이콘 컴포넌트 가져오기
 */
export function getIcon(iconId?: IconId): React.ReactNode {
  if (!iconId) return undefined;
  return iconMap[iconId];
}
