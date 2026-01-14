import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { useImagePreloader } from '@/hooks/useImagePreloader';

describe('useImagePreloader', () => {
  let originalImage: any;

  beforeAll(() => {
    originalImage = window.Image;
    // Mock Image constructor
    class MockImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      src: string = '';

      set src(value: string) {
        this._src = value;
        // Simulate async load
        setTimeout(() => {
          if (this.onload) this.onload();
        }, 10);
      }

      get src() {
        return this._src;
      }

      private _src: string = '';
    }
    window.Image = MockImage as any;
  });

  afterAll(() => {
    window.Image = originalImage;
  });

  it('sets loaded to true after images load', async () => {
    const { result } = renderHook(() =>
      useImagePreloader(['test1.jpg', 'test2.jpg'])
    );

    expect(result.current.loaded).toBe(false);

    await waitFor(() => {
      expect(result.current.loaded).toBe(true);
    });
  });
});
