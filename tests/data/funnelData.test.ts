import { describe, it, expect } from 'vitest';
import { funnelData } from '@/data/funnelData';

describe('funnelData', () => {
  it('should have 6 steps', () => {
    expect(funnelData.steps).toHaveLength(6);
  });

  it('should have correct structure for each step', () => {
    funnelData.steps.forEach((step, index) => {
      expect(step.id).toBe(index + 1);
      expect(step.title).toBeDefined();
      expect(Array.isArray(step.options)).toBe(true);
      expect(step.options.length).toBeGreaterThan(0);
    });
  });

  it('should have unique ids for all options within a step', () => {
    funnelData.steps.forEach((step) => {
      const ids = step.options.map((o) => o.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });
  });
});
