import { describe, it, expect } from 'vitest';
import { funnelData } from '@/data/funnelData';
import { RECOMMENDATIONS } from '@/utils/recommendation';
import fs from 'fs';
import path from 'path';

describe('Assets', () => {
  const publicDir = path.resolve(__dirname, '../../public');

  it('should have all funnel step background images', () => {
    funnelData.steps.forEach((step) => {
      if (step.backgroundImage) {
        const filePath = path.join(publicDir, step.backgroundImage);
        expect(
          fs.existsSync(filePath),
          `Missing: ${step.backgroundImage}`
        ).toBe(true);
      }
    });
  });

  it('should have all recommendation images', () => {
    Object.values(RECOMMENDATIONS).forEach((rec) => {
      const filePath = path.join(publicDir, rec.image);
      expect(fs.existsSync(filePath), `Missing: ${rec.image}`).toBe(true);
    });
  });

  it('should have main and loading backgrounds', () => {
    expect(
      fs.existsSync(path.join(publicDir, '/assets/images/bg-main.jpg'))
    ).toBe(true);
    expect(
      fs.existsSync(path.join(publicDir, '/assets/images/bg-loading.jpg'))
    ).toBe(true);
  });
});
