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
} from "lucide-react";
import type { FunnelStepData } from "@/components/funnel/FunnelStep";

export const funnelSteps: FunnelStepData[] = [
  {
    id: "party-size",
    stepNumber: 1,
    question: "점심 식사 파티원 수는?",
    options: [
      {
        id: "alone",
        icon: <img src="/assets/images/icon_alone_figma.svg" alt="alone" className="w-[15px] h-[20px] object-contain" />,
        title: "혼자만의 고독한 미식가",
        subtitle: "(혼자)",
      },
      {
        id: "two",
        icon: <img src="/assets/images/icon_two_figma.svg" alt="two" className="w-[30px] h-[20px] object-contain" />,
        title: "딱 한 명의 식사메이트",
        subtitle: "(둘이)",
      },
      {
        id: "group",
        icon: <img src="/assets/images/icon_group_figma.svg" alt="group" className="w-[44px] h-[20px] object-contain" />,
        title: "왁자지껄 그룹",
        subtitle: "(3인 이상)",
      },
    ],
  },
  {
    id: "taste",
    stepNumber: 2,
    question: "오늘의 입맛은?",
    options: [
      {
        id: "healthy",
        title: "튼튼! 건강 챙기는 보양식",
        icon: <BicepsFlexed className="w-8 h-8 text-current" />,
      },
      {
        id: "light",
        title: "산뜻하게! 가벼운 샐러드",
        icon: <LeafyGreen className="w-8 h-8 text-current" />,
      },
      {
        id: "any",
        title: "아무거나! 집 나간 입맛",
        icon: <HelpCircle className="w-8 h-8 text-current" />,
      },
    ],
  },
  {
    id: "texture",
    stepNumber: 3,
    question: "선호하는 식감은?",
    options: [
      {
        id: "crispy",
        title: "와삭 콰사삭!",
        subtitle: "(바삭하게)",
        icon: <Sparkles className="w-8 h-8 text-current" />,
      },
      {
        id: "soft",
        title: "말랑 말랑~",
        subtitle: "(부드럽게)",
        icon: <Cloud className="w-8 h-8 text-current" />,
      },
    ],
  },
  {
    id: "temperature",
    stepNumber: 4,
    question: "원하는 온도는?",
    options: [
      {
        id: "cold",
        title: "이냉치냉! 속 시원한 요리",
        icon: <Snowflake className="w-8 h-8 text-current" />,
      },
      {
        id: "hot",
        title: "따뜻하고 갓 만든 요리",
        icon: <Sun className="w-8 h-8 text-current" />,
      },
    ],
  },
  {
    id: "speed",
    stepNumber: 5,
    question: "식사 시간은?",
    options: [
      {
        id: "fast",
        title: "후루룩 뚝딱!",
        subtitle: "(빠르게)",
        icon: <Timer className="w-8 h-8 text-current" />,
      },
      {
        id: "any-speed",
        title: "오늘은 뭐든 괜찮아",
        icon: <Coffee className="w-8 h-8 text-current" />,
      },
    ],
  },
  {
    id: "atmosphere",
    stepNumber: 6,
    question: "선호하는 분위기는?",
    options: [
      {
        id: "quiet",
        title: "조용하게 식사에 집중",
        icon: <Moon className="w-8 h-8 text-current" />,
      },
      {
        id: "relaxed",
        title: "여유롭게",
        subtitle: "수다와 산책까지 풀코스",
        icon: <MessageCircle className="w-8 h-8 text-current" />,
      },
    ],
  },
];
