import React, { type ReactNode } from 'react';

interface FunnelLayoutProps {
  children: ReactNode;
  className?: string;
}

export const FunnelLayout: React.FC<FunnelLayoutProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 ${className}`}
    >
      <div className="w-full max-w-md mx-auto relative z-10 flex flex-col gap-6">
        {children}
      </div>
    </div>
  );
};
