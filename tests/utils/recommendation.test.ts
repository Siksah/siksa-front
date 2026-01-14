import { describe, it, expect } from 'vitest';
import { getRecommendation, RECOMMENDATIONS } from '@/utils/recommendation';
import { FunnelOptionData } from '@/types/funnel';

describe('getRecommendation', () => {
  const createMockAnswers = (
    values: Record<number, string>
  ): Record<number, FunnelOptionData> => {
    const answers: Record<number, FunnelOptionData> = {};
    for (const [key, value] of Object.entries(values)) {
      answers[Number(key)] = { id: 'mock', label: 'Mock', value };
    }
    return answers;
  };

  it('recommends donkatsu for crispy texture preference', () => {
    const answers = createMockAnswers({
      2: 'salty',
      3: 'crispy', // Key factor
      4: 'hot',
      5: 'none',
    });
    const result = getRecommendation(answers);
    expect(result.id).toBe('donkatsu');
  });

  it('recommends soba for cold temp preference', () => {
    const answers = createMockAnswers({
      2: 'mild',
      3: 'soft',
      4: 'cold', // Key factor
      5: 'none',
    });
    const result = getRecommendation(answers);
    expect(result.id).toBe('soba');
  });

  it('filters out meat if disliked', () => {
    const answers = createMockAnswers({
      2: 'salty',
      3: 'crispy',
      4: 'hot',
      5: 'no_meat', // Dislike meat -> should not be donkatsu
    });
    const result = getRecommendation(answers);
    expect(result.id).not.toBe('donkatsu');
  });

  it('recommends kimchi stew for spicy preference', () => {
    const answers = createMockAnswers({
      2: 'spicy', // Key factor
      3: 'soft',
      4: 'hot',
      5: 'none',
    });
    const result = getRecommendation(answers);
    expect(result.id).toBe('kimchi_stew');
  });
});
