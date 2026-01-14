import type { FunnelData } from '../types/funnel';

/**
 * Funnel Data - Figma 디자인 기반 6단계 질문
 * 
 * Q1: 점심 식사 파티원 수는? (3 options, vertical-3)
 * Q2: 지금 나에게 필요한 건? (5 options, vertical-5)
 * Q3: 메인 메뉴에서 기대하는 식감은? (4 options, grid-2x2)
 * Q4: 오늘 나를 달래줄 메뉴의 온도는? (2 options, cards-2)
 * Q5: 내 식욕을 급격히 떨어뜨리는 요소는? (6 options, grid-2x3)
 * Q6: 오늘의 점심 루틴은? (3 options, vertical-3)
 */
export const funnelData: FunnelData = {
  steps: [
    {
      id: 1,
      title: '점심 식사 <u>파티원 <c>수</c></u>는?',
      layoutType: 'vertical-3',
      options: [
        { id: '1-1', label: '나 홀로 식사', value: 'solo', icon: 'alone' },
        { id: '1-2', label: '둘이서 오붓하게', value: 'duo', icon: 'two' },
        { id: '1-3', label: '셋 이상 왁자지껄', value: 'group', icon: 'group' },
      ],
    },
    {
      id: 2,
      title: '지금 나에게 <u>필요한 건</u>?',
      layoutType: 'vertical-5',
      options: [
        { id: '2-1', label: '힘 불끈! 든든하게!', value: 'hearty', icon: 'soup' },
        { id: '2-2', label: '산틋하게 리프레시!', value: 'light', icon: 'leafy-green' },
        { id: '2-3', label: '스트레스 해소! 맵고 자극적인 맛!', value: 'comfort', icon: 'zap' },
        { id: '2-4', label: '기분전환! 달달함 추가', value: 'healthy', icon: 'biceps-flexed' },
        { id: '2-5', label: '아무거나! 집 나간 입맛', value: 'special', icon: 'cake-slice' },
      ],
    },
    {
      id: 3,
      title: '메인 메뉴에서 <u>기대하는</u> <c>식감</c>은?',
      layoutType: 'grid-2x2',
      options: [
        { 
          id: '3-1', 
          label: '후루룩- 호로록-', 
          subLabel: '부드럽게',
          icon: '/assets/images/funnel/icon_soft.svg',
          value: 'soft' 
        },
        { 
          id: '3-2', 
          label: '쫄깃 쫠깃', 
          subLabel: '쫄깃/탄력있게',
          icon: 'audio-waveform',
          value: 'chewy' 
        },
        { 
          id: '3-3', 
          label: '와삭 콰사삭!', 
          subLabel: '바삭하게',
          icon: 'loader',
          value: 'crispy' 
        },
        { 
          id: '3-4', 
          label: '무엇이든 환영', 
          subLabel: '상관 없음',
          icon: '/assets/images/funnel/icon_any.svg',
          value: 'any' 
        },
      ],
    },
    {
      id: 4,
      title: '오늘 나를 달래줄 메뉴의 <c>온도</c>는?',
      layoutType: 'cards-2',
      options: [
        { 
          id: '4-1', 
          label: '쨍하게 시원한 요리', 
          icon: 'snowflake',
          value: 'cold' 
        },
        { 
          id: '4-2', 
          label: '따뜻하고 갓 만든 요리', 
          icon: 'sun',
          value: 'hot' 
        },
      ],
    },
    {
      id: 5,
      title: '내 식욕을 급격히\n<u>떨어뜨리는 요소</u>는?',
      layoutType: 'grid-2x3',
      options: [
        { 
          id: '5-1', 
          label: '기름기는 헤비해..', 
          subLabel: '튀김, 볶음류',
          value: 'no_oily' 
        },
        { 
          id: '5-2', 
          label: '또 국물이야?', 
          subLabel: '국물, 탕류',
          value: 'no_soup' 
        },
        { 
          id: '5-3', 
          label: '속이 더부룩', 
          subLabel: '면, 빵류',
          value: 'no_carbs' 
        },
        { 
          id: '5-4', 
          label: '바다 향은 좀...', 
          subLabel: '회, 해물류',
          value: 'no_seafood' 
        },
        { 
          id: '5-5', 
          label: '풀떼기는 안 돼!', 
          subLabel: '샐러드류',
          value: 'no_salad' 
        },
        { 
          id: '5-6', 
          label: '오늘은 뭐든 괜찮아', 
          value: 'none' 
        },
      ],
    },
    {
      id: 6,
      title: '오늘의 <u>점심</u> <c>루틴</c>은?',
      layoutType: 'vertical-3',
      options: [
        { id: '6-1', label: '빠르게 먹고 바로 가기', value: 'fast' },
        { id: '6-2', label: '밥 먹고 짧은 휴식 챙기기', value: 'normal' },
        { id: '6-3', label: '여유롭게\n수다와 산책까지 풀코스', value: 'slow' },
      ],
    },
  ],
};
