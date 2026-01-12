import type { FunnelData } from '../types/funnel';

export const funnelData: FunnelData = {
  steps: [
    {
      id: 1,
      title: '함께 식사하는 인원은\n몇 명인가요?',
      subtitle: '인원 수에 따라 추천 메뉴가 달라질 수 있어요',
      backgroundImage: '/assets/images/bg-step-1.jpg',
      options: [
        { id: '1-1', label: '혼자서', value: 'solo' },
        { id: '1-2', label: '2~3명', value: 'small_group' },
        { id: '1-3', label: '4명 이상', value: 'large_group' },
      ],
    },
    {
      id: 2,
      title: '어떤 맛을\n선호하시나요?',
      subtitle: '오늘따라 당기는 맛을 알려주세요',
      backgroundImage: '/assets/images/bg-step-2.jpg',
      options: [
        { id: '2-1', label: '매콤한 맛', value: 'spicy' },
        { id: '2-2', label: '담백한 맛', value: 'mild' },
        { id: '2-3', label: '달콤한 맛', value: 'sweet' },
        { id: '2-4', label: '짭짤한 맛', value: 'salty' },
      ],
    },
    {
      id: 3,
      title: '선호하는 식감은\n무엇인가요?',
      subtitle: '씹는 맛도 중요하니까요',
      backgroundImage: '/assets/images/bg-step-3.jpg',
      options: [
        { id: '3-1', label: '부드러운', value: 'soft' },
        { id: '3-2', label: '바삭한', value: 'crispy' },
        { id: '3-3', label: '쫄깃한', value: 'chewy' },
        { id: '3-4', label: '상관없음', value: 'any' },
      ],
    },
    {
      id: 4,
      title: '원하는 음식의\n온도는요?',
      subtitle: '날씨나 기분에 맞춰 골라보세요',
      backgroundImage: '/assets/images/bg-step-4.jpg',
      options: [
        { id: '4-1', label: '따뜻한 국물/요리', value: 'hot' },
        { id: '4-2', label: '시원한 요리', value: 'cold' },
        { id: '4-3', label: '이열치열', value: 'very_hot' },
      ],
    },
    {
      id: 5,
      title: '못 드시거나 싫어하는\n음식이 있나요?',
      subtitle: '해당 재료가 들어간 메뉴는 제외할게요',
      backgroundImage: '/assets/images/bg-step-5.jpg',
      options: [
        { id: '5-1', label: '해산물', value: 'no_seafood' },
        { id: '5-2', label: '고기류', value: 'no_meat' },
        { id: '5-3', label: '매운 것', value: 'no_spicy' },
        { id: '5-4', label: '없음', value: 'none' },
      ],
    },
    {
      id: 6,
      title: '어떤 분위기에서\n식사하고 싶으신가요?',
      subtitle: '식사 장소의 분위기도 중요하죠',
      backgroundImage: '/assets/images/bg-step-6.jpg',
      options: [
        { id: '6-1', label: '조용하고 차분한', value: 'quiet' },
        { id: '6-2', label: '활기차고 시끌벅적한', value: 'lively' },
        { id: '6-3', label: '깔끔하고 모던한', value: 'modern' },
        { id: '6-4', label: '전통적인/노포 감성', value: 'traditional' },
      ],
    },
  ],
};
