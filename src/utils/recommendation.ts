import type { FunnelOptionData } from '../types/funnel';
import { FOOD_RESULTS } from '../data/resultData';
import type { FoodResult } from '../data/resultData';
import type { RecommendationItem } from '@/hooks/useMenuResultFlow';

export type RecommendationResult = FoodResult;

export const RECOMMENDATIONS = FOOD_RESULTS.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
}, {} as Record<string, FoodResult>);

interface ScoredCandidate {
  item: FoodResult;
  score: number;
}

export const getRecommendations = (
  answers: Record<number, FunnelOptionData>
): RecommendationItem[] => {
  const need = answers[2]?.value; 
  const texture = answers[3]?.value; 
  const temp = answers[4]?.value; 
  const dislike = answers[5]?.value; 

  const candidates = FOOD_RESULTS.filter((item) => {
    const tags = item.tags;
    
    if (dislike === 'no_oily' && (tags.includes('튀김') || tags.includes('헤비한'))) return false;
    if (dislike === 'no_soup' && tags.includes('국물')) return false;
    if (dislike === 'no_carbs' && (tags.includes('면') || tags.includes('빵'))) return false;
    if (dislike === 'no_seafood' && tags.includes('해산물')) return false;
    if (dislike === 'no_salad' && (tags.includes('채소') || tags.includes('샐러드'))) return false;
    
    return true;
  });

  if (candidates.length === 0) {
    const fallback = RECOMMENDATIONS['bibimbap'] || FOOD_RESULTS[0];
    return [
      { rank: 1, menu: fallback.name, reason: fallback.description },
      { rank: 2, menu: FOOD_RESULTS[1]?.name || '김치찌개', reason: FOOD_RESULTS[1]?.description || '칼칼하고 개운한' },
      { rank: 3, menu: FOOD_RESULTS[2]?.name || '된장찌개', reason: FOOD_RESULTS[2]?.description || '구수한 집밥 느낌' },
    ];
  }

  const scoredCandidates: ScoredCandidate[] = candidates.map((candidate) => {
    let score = 0;
    const tags = candidate.tags;

    if (texture === 'crispy' && tags.includes('바삭한')) score += 5;
    if (texture === 'soft' && (tags.includes('부드러운') || tags.includes('죽') || tags.includes('국물'))) score += 3;
    if (texture === 'chewy' && (tags.includes('쫄깃한') || tags.includes('면'))) score += 3;

    if (temp === 'cold' && tags.includes('시원한')) score += 10;
    if (temp === 'hot' && tags.includes('뜨거운')) score += 5;

    if (need === 'hearty' && (tags.includes('든든한') || tags.includes('고기') || tags.includes('국밥'))) score += 3;
    if (need === 'light' && (tags.includes('가벼운') || tags.includes('샐러드') || tags.includes('샌드위치') || tags.includes('일식'))) score += 4;
    if (need === 'comfort' && (tags.includes('매운') || tags.includes('자극적인') || tags.includes('마라탕'))) score += 5;
    if (need === 'healthy' && (tags.includes('건강한') || tags.includes('채소'))) score += 4;
    if (need === 'special' && (tags.includes('이색적인') || tags.includes('양식') || tags.includes('아시안'))) score += 3;

    return { item: candidate, score };
  });

  scoredCandidates.sort((a, b) => b.score - a.score);

  const top3 = scoredCandidates.slice(0, 3);
  
  while (top3.length < 3) {
    const fallbackIndex = top3.length;
    const fallbackItem = FOOD_RESULTS[fallbackIndex] || FOOD_RESULTS[0];
    top3.push({ item: fallbackItem, score: 0 });
  }

  return top3.map((scored, index) => ({
    rank: (index + 1) as 1 | 2 | 3,
    menu: scored.item.name,
    reason: scored.item.description,
  }));
};

export const getRecommendation = (
  answers: Record<number, FunnelOptionData>
): RecommendationResult => {
  const recommendations = getRecommendations(answers);
  const topMenu = recommendations[0]?.menu;
  return FOOD_RESULTS.find(f => f.name === topMenu) || FOOD_RESULTS[0];
};
