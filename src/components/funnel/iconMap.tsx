import {
  BicepsFlexed,
  LeafyGreen,
  Timer,
  Coffee,
  MessageCircle,
  Moon,
  Sparkles,
  Minimize,
  Snowflake,
  Sun,
  CakeSlice,
  Zap,
  Loader,
  Laugh,
  EqualApproximately,
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
  solo: (
    <img
      src={iconAlone}
      alt="solo"
      className="w-[15px] h-[20px] object-contain"
    />
  ),
  duo: (
    <img
      src={iconTwo}
      alt="duo"
      className="w-[30px] h-[20px] object-contain"
    />
  ),
  group3p: (
    <img
      src={iconGroup}
      alt="group"
      className="w-[44px] h-[20px] object-contain"
    />
  ),

  // taste (lucide 아이콘)
  hearty: <BicepsFlexed className="w-8 h-8 text-current" />,
  light: <LeafyGreen className="w-8 h-8 text-current" />,
  spicy: <Zap className="w-8 h-8 text-current" />,
  sweet: <CakeSlice className="w-8 h-8 text-current" />,
  no_appetite: <HelpCircle className="w-8 h-8 text-current" />,

  // texture
  soft: <EqualApproximately className="w-8 h-8 text-current" />,
  chewy: <Minimize className="w-8 h-8 text-current" />,
  crispy: <Loader className="w-8 h-8 text-current" />,
  any: <Laugh className="w-8 h-8 text-current" />,

  // temperature
  cold: <Snowflake className="w-8 h-8 text-current" />,
  warmPlate: <Sun className="w-8 h-8 text-current" />,

  // avoid
  greasy: <Timer className="w-8 h-8 text-current" />,
  soupy: <Timer className="w-8 h-8 text-current" />,
  wheat: <Timer className="w-8 h-8 text-current" />,
  seafood: <Timer className="w-8 h-8 text-current" />,
  salad: <Timer className="w-8 h-8 text-current" />,
  null: <Timer className="w-8 h-8 text-current" />,
  // 'any-speed': <Coffee className="w-8 h-8 text-current" />,

  // aftermeal
  back_to_work: <Moon className="w-8 h-8 text-current" />,
  coffee_break: <MessageCircle className="w-8 h-8 text-current" />,
  long_chat: <MessageCircle className="w-8 h-8 text-current" />,
};

/**
 * 아이콘 ID로 아이콘 컴포넌트 가져오기
 */
export function getIcon(iconId?: IconId): React.ReactNode {
  if (!iconId) return undefined;
  return iconMap[iconId];
}
