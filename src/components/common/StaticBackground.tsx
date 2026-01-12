import React from 'react';

interface StaticBackgroundProps {
  src: string;
  alt?: string;
  className?: string;
}

export const StaticBackground: React.FC<StaticBackgroundProps> = ({
  src,
  alt = 'Background',
  className = '',
}) => {
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
    </div>
  );
};
