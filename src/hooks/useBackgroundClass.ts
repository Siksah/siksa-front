import { useLocation, matchPath } from 'react-router-dom';

const backgroundMap: Record<string, string> = {
  '/': 'bg-gradient-to-t from-orange-40 via-orange-50 to-orange-60 bg-repeat bg-auto bg-blend-overlay bg-pattern-with-gradient',
  '/question': 'bg-repeat bg-auto bg-blend-overlay bg-pattern-party-size',
  '/loading': 'bg-repeat bg-auto bg-blend-overlay bg-pattern-loading',
  '/result': 'bg-orange-10 bg-repeat bg-auto bg-blend-overlay bg-pattern-with-gradient',
};

export function useBackgroundClass(): string {
  const { pathname } = useLocation();

  for (const [pattern, className] of Object.entries(backgroundMap)) {
    if (matchPath({ path: pattern, end: pattern === '/' }, pathname)) {
      return className;
    }
  }
  return '';
}
