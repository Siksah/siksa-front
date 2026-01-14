import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StaticBackground } from '../../src/components/common/StaticBackground';

describe('StaticBackground', () => {
  it('renders the image with correct src and alt text', () => {
    const testSrc = 'test-image.jpg';
    const testAlt = 'Test Background';

    render(<StaticBackground src={testSrc} alt={testAlt} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', testSrc);
    expect(img).toHaveAttribute('alt', testAlt);
  });

  it('renders with default alt text if not provided', () => {
    const testSrc = 'test-image.jpg';
    render(<StaticBackground src={testSrc} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Background');
  });

  it('applies custom className to the container', () => {
    const testClass = 'custom-test-class';
    const { container } = render(
      <StaticBackground src="img.jpg" className={testClass} />
    );

    // The first child is the wrapper div
    expect(container.firstChild).toHaveClass(testClass);
  });
});
