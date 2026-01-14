import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StaticBackground } from './StaticBackground';

describe('StaticBackground', () => {
  it('renders image with correct src and alt', () => {
    const testSrc = 'test-image.jpg';
    const testAlt = 'Test Background';

    render(<StaticBackground src={testSrc} alt={testAlt} />);

    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', testSrc);
    expect(imgElement).toHaveAttribute('alt', testAlt);
  });

  it('renders image with correct classes', () => {
    render(<StaticBackground src="test.jpg" />);

    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveClass('w-full', 'h-full', 'object-cover', 'object-center');
  });

  it('renders container with correct classes', () => {
    render(<StaticBackground src="test.jpg" />);

    const imgElement = screen.getByRole('img');
    const container = imgElement.parentElement;
    expect(container).toHaveClass('fixed', 'inset-0', '-z-10', 'overflow-hidden');
  });

  it('uses default alt when not provided', () => {
    render(<StaticBackground src="test.jpg" />);

    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('alt', 'Background');
  });

  it('applies additional className to container', () => {
    render(<StaticBackground src="test.jpg" className="custom-class" />);

    const imgElement = screen.getByRole('img');
    const container = imgElement.parentElement;
    expect(container).toHaveClass('custom-class');
  });
});
