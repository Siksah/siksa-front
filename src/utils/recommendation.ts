import type { FunnelOptionData } from '../types/funnel';

export interface RecommendationResult {
  id: string;
  name: string;
  description: string;
  image: string; // placeholder path
  tags: string[];
}

export const RECOMMENDATIONS: Record<string, RecommendationResult> = {
  donkatsu: {
    id: 'donkatsu',
    name: '프리미엄 돈카츠',
    description: '바삭한 식감과 육즙이 가득한 일식 돈카츠입니다.',
    image: '/assets/images/result-donkatsu.jpg',
    tags: ['바삭한', '고기', '일식'],
  },
  soba: {
    id: 'soba',
    name: '냉소바',
    description: '시원하고 깔끔한 국물의 메밀국수입니다.',
    image: '/assets/images/result-soba.jpg',
    tags: ['시원한', '면요리', '깔끔한'],
  },
  kimchi_stew: {
    id: 'kimchi_stew',
    name: '김치찌개',
    description: '한국인의 소울푸드, 얼큰한 김치찌개입니다.',
    image: '/assets/images/result-kimchi.jpg',
    tags: ['매운', '한식', '국물'],
  },
  sushi: {
    id: 'sushi',
    name: '모둠 초밥',
    description: '신선한 해산물이 올라간 초밥 세트입니다.',
    image: '/assets/images/result-sushi.jpg',
    tags: ['해산물', '일식', '깔끔한'],
  },
};

export const getRecommendation = (
  answers: Record<number, FunnelOptionData>
): RecommendationResult => {
  // Extract values for easier logic
  const taste = answers[2]?.value; // spicy, mild, sweet, salty
  const texture = answers[3]?.value; // soft, crispy, chewy, any
  const temp = answers[4]?.value; // hot, cold, very_hot
  const dislike = answers[5]?.value; // no_seafood, no_meat, no_spicy, none

  // Rule 1: Filtering
  const candidates = Object.values(RECOMMENDATIONS).filter((item) => {
    if (dislike === 'no_meat' && item.tags.includes('고기')) return false;
    if (dislike === 'no_seafood' && item.tags.includes('해산물')) return false;
    if (dislike === 'no_spicy' && item.tags.includes('매운')) return false;
    return true;
  });

  // Fallback if all filtered out
  if (candidates.length === 0) return RECOMMENDATIONS.soba;

  // Rule 2: Scoring
  let bestMatch = candidates[0];
  let maxScore = -1;

  candidates.forEach((candidate) => {
    let score = 0;

    // Texture match
    if (texture === 'crispy' && candidate.tags.includes('바삭한')) score += 3;

    // Temp match
    if (temp === 'cold' && candidate.tags.includes('시원한')) score += 3;
    if (temp === 'hot' && candidate.tags.includes('국물')) score += 2;

    // Taste match
    if (taste === 'spicy' && candidate.tags.includes('매운')) score += 3;
    if (taste === 'mild' && candidate.tags.includes('깔끔한')) score += 2;

    if (score > maxScore) {
      maxScore = score;
      bestMatch = candidate;
    }
  });

  return bestMatch;
};
