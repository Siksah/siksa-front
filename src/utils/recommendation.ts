import type { FunnelOptionData } from '../types/funnel';
import { FOOD_RESULTS } from '../data/resultData';
import type { FoodResult } from '../data/resultData';

// Re-export for compatibility if needed, but we should switch to using FoodResult directly
export type RecommendationResult = FoodResult;

export const RECOMMENDATIONS = FOOD_RESULTS.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
}, {} as Record<string, FoodResult>);

export const getRecommendation = (
  answers: Record<number, FunnelOptionData>
): RecommendationResult => {
  // Extract values for easier logic
  // Q2: Need? (hearty, light, comfort, healthy, special) -> mapped to taste/style?
  const need = answers[2]?.value; 
  // Q3: Texture (soft, chewy, crispy, any)
  const texture = answers[3]?.value; 
  // Q4: Temp (cold, hot)
  const temp = answers[4]?.value; 
  // Q5: Dislike (no_oily, no_soup, no_carbs, no_seafood, no_salad, none)
  const dislike = answers[5]?.value; 

  // Rule 1: Filtering
  const candidates = FOOD_RESULTS.filter((item) => {
    const tags = item.tags;
    
    // Dislike filtering
    if (dislike === 'no_oily' && (tags.includes('튀김') || tags.includes('헤비한'))) return false;
    if (dislike === 'no_soup' && tags.includes('국물')) return false;
    if (dislike === 'no_carbs' && (tags.includes('면') || tags.includes('빵') || tags.includes('밥'))) return false; // Maybe not exclude rice for carbs? user intent 'sok-i deoburook' (bloated) usually means flour/heavy.
    // 'no_carbs' label is "속이 더부룩 -> 면, 빵류". So exclude noodles and bread. Rice is okay?
    if (dislike === 'no_carbs' && (tags.includes('면') || tags.includes('빵'))) return false;
    
    if (dislike === 'no_seafood' && tags.includes('해산물')) return false;
    if (dislike === 'no_salad' && (tags.includes('채소') || tags.includes('샐러드'))) return false; // Salad specific
    
    return true;
  });

  // Fallback if all filtered out
  if (candidates.length === 0) {
      // Return something safe, e.g. Bibimbap or Rice Soup?
      return RECOMMENDATIONS['bibimbap'] || FOOD_RESULTS[0];
  }

  // Rule 2: Scoring
  let bestMatch = candidates[0];
  let maxScore = -1;

  candidates.forEach((candidate) => {
    let score = 0;
    const tags = candidate.tags;

    // Texture match
    if (texture === 'crispy' && tags.includes('바삭한')) score += 5;
    if (texture === 'soft' && (tags.includes('부드러운') || tags.includes('죽') || tags.includes('국물'))) score += 3; // soft usually implies soup or soft texture
    if (texture === 'chewy' && (tags.includes('쫄깃한') || tags.includes('면'))) score += 3;

    // Temp match
    if (temp === 'cold' && tags.includes('시원한')) score += 10; // Strong signal
    if (temp === 'hot' && tags.includes('뜨거운')) score += 5;

    // Need/Taste match
    if (need === 'hearty' && (tags.includes('든든한') || tags.includes('고기') || tags.includes('국밥'))) score += 3;
    if (need === 'light' && (tags.includes('가벼운') || tags.includes('샐러드') || tags.includes('샌드위치') || tags.includes('일식'))) score += 4;
    if (need === 'comfort' && (tags.includes('매운') || tags.includes('자극적인') || tags.includes('마라탕'))) score += 5; // Stress relief -> spicy
    if (need === 'healthy' && (tags.includes('건강한') || tags.includes('채소'))) score += 4;
    if (need === 'special' && (tags.includes('이색적인') || tags.includes('양식') || tags.includes('아시안'))) score += 3;

    if (score > maxScore) {
      maxScore = score;
      bestMatch = candidate;
    } else if (score === maxScore) {
        // Random tie-breaker
        if (Math.random() > 0.5) {
            bestMatch = candidate;
        }
    }
  });

  return bestMatch;
};
