import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface FunnelGuardProps {
  children: React.ReactNode;
}

export const FunnelGuard: React.FC<FunnelGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { answers?: any } | null;

  useEffect(() => {
    // Check if answers exist in location state
    if (!state || !state.answers || Object.keys(state.answers).length === 0) {
      // Redirect to main entry or funnel start
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  if (!state || !state.answers) {
    return null; // Don't render children while redirecting
  }

  return <>{children}</>;
};
